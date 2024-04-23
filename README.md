# AttendEase

This project is an Attendance marking application which uses the powerful face_recognition library of python. The teacher or professor takes picture of the classroom from his mobile phone and sends that data to the backend and the backend uses the face reconition's library pre trained machine learning algoritms to detect faces from the image and mark the attendance accordingly.
The Mobile Application is a Cross-Platform application built using react-native and expo. Backend is built using a light weight web framework flask.
Image data is procured, pre-processed and fed to the CNN based machine learning algorithms of face_recognition library which outputs a pickle file with encodings of each face.
The faces from the unknown images are then compared with the encodings and then and it predicts the faces from the image.

# To run Locally
