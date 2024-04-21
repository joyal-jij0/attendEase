from typing import List, Tuple
from pathlib import Path
import pickle
import face_recognition
from collections import Counter

DEFAULT_ENCODINGS_PATH = Path("output/ecncodings.pkl")

def recognize_faces(
    image_location: str,
    model: str = "hog",
    encodings_location: Path = DEFAULT_ENCODINGS_PATH
) -> Tuple[List[str], int]:
    detected_names = []

    with encodings_location.open(mode="rb") as f:
        name_encodings = pickle.load(f)

    input_image = face_recognition.load_image_file(image_location)

    input_face_locations = face_recognition.face_locations(
        input_image, model=model
    )
    input_face_encodings = face_recognition.face_encodings(
        input_image, input_face_locations
    )

    for unknown_encoding in input_face_encodings:
        name = _recognize_face(unknown_encoding, name_encodings)
        if not name:
            name = "Unknown"
        detected_names.append(name)

    return detected_names, len(input_face_locations)


def _recognize_face(unkown_encoding, loaded_encodings):
    boolean_matches = face_recognition.compare_faces(
        loaded_encodings["encodings"], unkown_encoding
    )
    votes = Counter(
        name
        for match, name in zip(boolean_matches, loaded_encodings["names"])
        if match
    )
    if votes:
        return votes.most_common(1)[0][0]