import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller, useController } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState } from "react";

const branches = ["AI&DS", "AI&ML", "CS", "IT"];
const backendURL = "http://192.168.1.4:8000/upload";

const DateTimeDisplay = () => {
  const [currentDateTime, setCurrentDateTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString();
  const formattedTime = currentDateTime.toLocaleTimeString();

  return (
    <View style={styles.dateTimeContainer}>
      <Text style={styles.dateTimeText}>{formattedDate}</Text>
      <Text style={styles.dateTimeText}>{formattedTime}</Text>
    </View>
  );
};

const SemesterToggle = ({ control }) => {
  const {
    field: { onChange, value: selectedSemester },
  } = useController({ control, name: "semester", defaultValue: 1 });

  const toggleSemester = (value) => {
    onChange(value);
  };

  return (
    <View style={styles.toggleContainer}>
      {Array.from({ length: 8 }, (_, i) => i + 1).map((value) => (
        <TouchableOpacity
          key={value}
          style={[
            styles.toggleButton,
            selectedSemester === value && styles.selectedToggleButton,
          ]}
          onPress={() => toggleSemester(value)}
        >
          <Text style={styles.toggleText}>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const LectureToggle = ({ control }) => {
  const {
    field: { onChange, value: selectedLecture },
  } = useController({ control, name: "lectureNo", defaultValue: 1 });

  const toggleLecture = (value) => {
    onChange(value);
  };

  return (
    <View style={styles.toggleContainer}>
      {Array.from({ length: 6 }, (_, i) => i + 1).map((value) => (
        <TouchableOpacity
          key={value}
          style={[
            styles.toggleButton,
            selectedLecture === value && styles.selectedToggleButton,
          ]}
          onPress={() => toggleLecture(value)}
        >
          <Text style={styles.toggleText}>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const BranchToggle = ({ control }) => {
  const {
    field: { onChange, value: selectedBranch },
  } = useController({ control, name: "branch", defaultValue: branches[0] });

  const toggleBranch = (value) => {
    onChange(value);
  };

  return (
    <View style={styles.toggleContainer}>
      {branches.map((value) => (
        <TouchableOpacity
          key={value}
          style={[
            styles.toggleButton,
            selectedBranch === value && styles.selectedToggleButton,
          ]}
          onPress={() => toggleBranch(value)}
        >
          <Text style={styles.toggleText}>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const FormComponent = () => {
  const { control, handleSubmit } = useForm();
  const image = useSelector((state) => state.image.image);
  const [loading, setLoading] = useState(false);
  const [detectedFacesCount, setDetectedFacesCount] = useState(null);

  const onSubmit = async (data) => {
    const currentDateTime = new Date();
    const formData = new FormData();

    formData.append("semester", data.semester);
    formData.append("lectureNo", data.lectureNo);
    formData.append("branch", data.branch);
    formData.append("dateTime", currentDateTime.toISOString());
    if (image) {
      const filename = image.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image";
      formData.append("image", { uri: image, name: filename, type });
    }

    setLoading(true);

    try {
      console.log("Sending request to:", backendURL);
      const response = await fetch(backendURL, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response);

      if (response.ok) {
        const responseData = await response.json();
        console.log("Success:", responseData.message);
        console.log("Detected Faces Count:", responseData.detected_faces_count);
        setDetectedFacesCount(responseData.detected_faces_count);
      } else {
        console.log("Error", "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <DateTimeDisplay />
      <Text style={styles.label}>Semester</Text>
      <Controller
        control={control}
        name="semester"
        defaultValue={1}
        render={({ field: { value, onChange } }) => (
          <SemesterToggle control={control} setValue={onChange} />
        )}
      />

      <Text style={styles.label}>Lecture No.</Text>
      <Controller
        control={control}
        name="lectureNo"
        defaultValue={1}
        render={({ field: { value, onChange } }) => (
          <LectureToggle control={control} setValue={onChange} />
        )}
      />

      <Text style={styles.label}>Branch</Text>
      <Controller
        control={control}
        name="branch"
        defaultValue={branches[0]}
        render={({ field: { value, onChange } }) => (
          <BranchToggle control={control} setValue={onChange} />
        )}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      {/* Loading indicator and detected faces count */}
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : detectedFacesCount !== null ? (
        <Text style={styles.totalPresentText}>
          Total Present: {detectedFacesCount}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  toggleButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedToggleButton: {
    backgroundColor: "#007AFF",
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  dateTimeText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  totalPresentText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default FormComponent;
