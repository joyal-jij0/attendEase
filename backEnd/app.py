from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import csv

from detector import recognize_faces

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        if 'image' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            semester = request.form.get('semester')
            lecture_no = request.form.get('lectureNo')
            branch = request.form.get('branch')
            date_time = request.form.get('dateTime')

            # Recognize faces
            detected_names = recognize_faces(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            # Save data to CSV
            with open('form_data.csv', 'a', newline='') as csvfile:
                writer = csv.writer(csvfile)
                for name in detected_names:
                    writer.writerow([semester, lecture_no, branch, date_time, filename, name])

            return jsonify({'message': 'File uploaded successfully'}), 200

        else:
            return jsonify({'error': 'Invalid file format'}), 400


if __name__ == '__main__':
    app.run(debug=True, host='192.168.1.4', port=8000)

