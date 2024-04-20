from detector import recognize_faces

detected_names, detected_faces_count = recognize_faces("./unknown.jpg")
print("Detected Names:", detected_names)
print("Detected Faces Count:", detected_faces_count)
