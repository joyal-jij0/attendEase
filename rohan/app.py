import csv


import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import uuid
import face_recognition
from collections import Counter
import pickle

app = Flask(__name__)
CORS(app)


UPLOAD_FOLDER = 'uploads'
KNOWN_FACES_FILE = 'known_faces.pkl'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload-photo', methods=['POST'])
def upload_photo():
    if 'photo' not in request.files:
        return jsonify({'error': 'No photo uploaded'}), 400

    photo = request.files['photo']
    if photo.filename == '':
        return jsonify({'error': 'No selected photo'}), 400

    filename = str(uuid.uuid4()) + '.jpg'
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    photo.save(filepath)

    return jsonify({'filename': filename}), 200


def writecsv(file__ka_path, data):
    with open(file__ka_path, 'a', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(data)

@app.route('/mark-attendance', methods=['POST'])
def mark_attendance():
    data = request.json
    filename = data.get('filename')

    if not filename:
        return jsonify({'error': 'No filename provided'}), 400

    image_path = os.path.join(UPLOAD_FOLDER, filename)
    if not os.path.exists(image_path):
        return jsonify({'error': 'File not found'}), 404

    known_faces = load_known_faces()

    unknown_image = face_recognition.load_image_file(image_path)
    unknown_encoding = face_recognition.face_encodings(unknown_image)[0]

    votes = Counter()
    for name, encodings in known_faces.items():
        matches = face_recognition.compare_faces(encodings, unknown_encoding)
        votes.update([name for match in matches if match])

    most_common_face, count = votes.most_common(1)[0]

    if count > 0:
        writecsv(file_ka_path="data.csv", data=[str(most_common_face), str(datetime.datetime.now()), "present"]),200
        return jsonify({'attendance': [{'student_name': most_common_face, 'timestamp': 'now'}]}), 200
    else:
        return jsonify({'attendance': []}), 200

def load_known_faces():
    if os.path.exists(KNOWN_FACES_FILE):
        with open(KNOWN_FACES_FILE, 'rb') as f:
            return pickle.load(f)
    else:
        return {}

if __name__ == '__main__':
    app.run(debug=True)
