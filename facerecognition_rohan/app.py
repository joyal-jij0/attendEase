import csv
import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import uuid
from pathlib import Path
import pickle
import face_recognition
from collections import Counter
from PIL import Image, ImageDraw

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
KNOWN_FACES_FILE = 'known_faces.pkl'
DEFAULT_ENCODINGS_PATH = Path("output/encodings.pkl")

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

Path("training").mkdir(exist_ok=True)
Path("output").mkdir(exist_ok=True)
Path("validation").mkdir(exist_ok=True)

BOUNDING_BOX_COLOR = "blue"
TEXT_COLOR = "white"

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

@app.route('/encode-known-faces', methods=['POST'])
def encode_known_faces_endpoint():
    encode_known_faces()
    return jsonify({'message': 'Known faces encoded successfully'}), 200

@app.route('/mark-attendance', methods=['POST'])
def mark_attendance():
    data = request.json
    filename = data.get('filename')

    if not filename:
        return jsonify({'error': 'No filename provided'}), 400

    image_path = os.path.join(UPLOAD_FOLDER, filename)
    if not os.path.exists(image_path):
        return jsonify({'error': 'File not found'}), 404

    recognized_name = recognize_from_known_encodings(image_path)

    if recognized_name:
        timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        writecsv(file_path="data.csv", data=[recognized_name, timestamp, "present"])
        return jsonify({'attendance': [{'student_name': recognized_name, 'timestamp': timestamp}]}), 200
    else:
        return jsonify({'attendance': []}), 200

def writecsv(file_path, data):
    with open(file_path, 'a', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(data)

def encode_known_faces():
    names = []
    encodings = []
    for filepath in Path("training").glob("*/*"):
        if not filepath.is_file() or filepath.suffix.lower() not in ['.jpg', '.jpeg', '.png']:
            continue

        name = filepath.parent.name
        image = face_recognition.load_image_file(filepath)

        face_locations = face_recognition.face_locations(image, model="hog")
        face_encodings = face_recognition.face_encodings(image, face_locations)

        for encoding in face_encodings:
            names.append(name)
            encodings.append(encoding)

    name_encodings = {"names": names, "encodings": encodings}
    with DEFAULT_ENCODINGS_PATH.open(mode="wb") as f:
        pickle.dump(name_encodings, f)

def recognize_from_known_encodings(unknown_image_path):
    with DEFAULT_ENCODINGS_PATH.open(mode="rb") as f:
        name_encodings = pickle.load(f)

    unknown_image = face_recognition.load_image_file(unknown_image_path)
    unknown_encoding = face_recognition.face_encodings(unknown_image)[0]

    votes = Counter()
    for known_encoding in name_encodings["encodings"]:
        matches = face_recognition.compare_faces([known_encoding], unknown_encoding)
        if matches[0]:
            name = name_encodings["names"][name_encodings["encodings"].index(known_encoding)]
            votes.update([name])

    most_common_face, count = votes.most_common(1)[0]
    return most_common_face if count > 0 else None

if __name__ == '__main__':
    app.run(debug=True)
