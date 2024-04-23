# AttendEase

This project is an Attendance marking application which uses the powerful face_recognition library of python.

The teacher or professor takes picture of the classroom from his mobile phone and sends that data to the backend and the backend uses the face reconition's library pre trained machine learning algoritms to detect faces from the image and mark the attendance accordingly.

The Mobile Application is a Cross-Platform application built using react-native and expo.

Backend is built using a light weight web framework flask.

Image data is procured, pre-processed and fed to the CNN based machine learning algorithms of face_recognition library which outputs a pickle file with encodings of each face.

The faces from the unknown images are then compared with the encodings and then and it predicts the faces from the image.

## Run Locally

Install Cmake from https://cmake.org .

Make sure you have python 3.9 or 3.10 installed.

```bash
  git clone https://github.com/joyal-jij0/practicum
```

Go to the project directory

```bash
  cd attendEase
```

### Edit Some Files

open this on your favorite Code Editer or IDE

for VS Code

```bash
  code .
```

Navigate to frontEnd/components/FormComponent.jsx

At line 14 add your IP Address

It should look like

```react

const backendURL = "1xx.xx.xx.xx/upload";

```

Now Navigate to backEnd/app.py

At line 57 add your IP Address

It should look like

```python

if __name__ == '__main__':
    app.run(debug=True, host='1xx.xx.xx.xx', port=8000)

```

### Setup the Front End

Navigate back to frontEnd

```bash
  cd frontEnd
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npx expo start
```

Follow the on screen instructions.

For more Info look into expo docs https://docs.expo.dev .

### Setup the Back End

Navigate back to the backEnd

```bash
  cd backEnd
```

Create a Virtual Environment

```bash
  python3.10 -m venv venv
```

Activate Virtual Environment

```bash
  source venv/bin/activate
```

Install dependencies

```bash
python -m pip install -r requirements.txt
```

Start the server

```bash
  python3 app.py
```

## Recommended Reads

### For Additional Information the following docs and articles are Highly Recommended

[Face Recognition Python Library Docs](https://pypi.org/project/face-recognition/)

[Face Recognition Python Library Article](https://realpython.com/face-recognition-with-python/)

[Expo Docs](https://expo.dev)

[React Native Docs](https://reactnative.dev)

[Flask Docs](https://flask.palletsprojects.com/en/3.0.x/)
