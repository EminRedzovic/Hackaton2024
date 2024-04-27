import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { storage, db } from "../../firebase";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { Box, Typography, TextField, Button } from "@mui/material";
import sajtLogo from "../../../src/styles/sajtLogo.png";
import NavigationCard from "../../components/CourseCards/NavigationCard";
import "./AddCourse.css";

const AddCourse = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("admin");
  const [imageUrls, setImageUrls] = useState([]);
  const [imageInput, setImageInput] = useState(null);

  useEffect(() => {
    const importImg = () => {
      if (imageInput && imageInput[0]) {
        const storageRef = ref(storage, `${token + imageInput[0].name}`);
        uploadBytes(storageRef, imageInput[0]).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setImageUrls((prev) => [...prev, url]);
          });
        });
      }
    };

    importImg();
  }, [imageInput]);

  const handleAddLesson = () => {
    const newLesson = {
      title: "",
      content: "",
    };

    formik.setValues({
      ...formik.values,
      lessons: [...formik.values.lessons, newLesson],
    });
  };

  const handleAddPitanja = () => {
    const newPitanje = {
      title: "",
      content: "",
    };

    formik.setValues({
      ...formik.values,
      pitanja: [...formik.values.pitanja, newPitanje],
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      image: "" || imageUrls,
      title: "",
      description: "",
      price: "",
      lessons: [],
      pitanja: [],
    },

    validationSchema: Yup.object().shape({
      title: Yup.string()
        .required("required")
        .max(15, "max title length is 15"),
      description: Yup.string()
        .required("required")
        .max(70, "max description length is 70"),
      price: Yup.number().required("required"),
      lessons: Yup.array().required("required"),
      pitanja: Yup.array().required("required"),
    }),

    onSubmit: async (values) => {
      const collectionRef = collection(db, "courses");
      const data = {
        imageURL: imageUrls[0],
        title: values.title,
        description: values.description,
        price: values.price,
        lesson: values.lessons,
        pitanja: values.pitanja,
      };
      await addDoc(collectionRef, data);
      navigate("/");
    },
  });

  if (!(token === "msdos")) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <div
      className="AddCourse"
      style={{ backgroundColor: "#f5f5f5", color: "white", minHeight: "100vh" }}
    >
      <div className="side-bar">
        <NavigationCard />
      </div>

      <main className="main-add-course">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            color: "white",
          }}
        >
          <Box className={`logo`} sx={{ marginBottom: 2 }}>
            <img src={sajtLogo} alt="Profile Picture" />
            <Typography
              sx={{
                letterSpacing: 4,
                fontWeight: "bold",
                fontSize: 21,
              }}
            >
              - EduConnect
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ width: "100%", maxWidth: 400, color: "white" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                color: "white",
              }}
            >
              <input
                custom-file-upload
                name="image"
                onChange={(e) => setImageInput(e.target.files)}
                onBlur={formik.handleBlur}
                id="fileInput"
                type="file"
                className="custom-file-upload"
              />
              {formik.errors.image && formik.touched.image && (
                <Typography color="error">{formik.errors.image}</Typography>
              )}

              <input
                className="tf"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Name"
                placeholder="Enter title of your course"
                error={formik.errors.title && formik.touched.title}
                helperText={
                  formik.errors.title && formik.touched.title
                    ? formik.errors.title
                    : null
                }
              />

              <input
                className="tf"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Description"
                placeholder="Enter description"
                multiline
                rows={4}
                error={formik.errors.description && formik.touched.description}
                helperText={
                  formik.errors.description && formik.touched.description
                    ? formik.errors.description
                    : null
                }
              />

              <input
                className="tf"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
                label="Price"
                placeholder="Enter Price"
                error={formik.errors.price && formik.touched.price}
                helperText={
                  formik.errors.price && formik.touched.price
                    ? formik.errors.price
                    : null
                }
              />

              <Button
                variant="contained"
                color="primary"
                className="lessons-button-add"
                onClick={handleAddLesson}
              >
                Add Lesson
              </Button>

              {formik.values.lessons.map((lesson, index) => (
                <div key={index}>
                  <input
                    className="tf"
                    name={`lessons[${index}].title`}
                    value={lesson.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label={`Lesson ${index + 1} Title`}
                    placeholder="Enter lesson title"
                    error={
                      formik.errors.lessons &&
                      formik.errors.lessons[index] &&
                      formik.errors.lessons[index].title
                    }
                    helperText={
                      formik.errors.lessons &&
                      formik.errors.lessons[index] &&
                      formik.errors.lessons[index].title
                        ? formik.errors.lessons[index].title
                        : null
                    }
                    sx={{ width: "100%", color: "white" }}
                  />

                  <input
                    className="tf"
                    name={`lessons[${index}].content`}
                    value={lesson.content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label={`Lesson ${index + 1} Content`}
                    placeholder="Enter lesson content"
                    multiline
                    rows={4}
                    error={
                      formik.errors.lessons &&
                      formik.errors.lessons[index] &&
                      formik.errors.lessons[index].content
                    }
                    helperText={
                      formik.errors.lessons &&
                      formik.errors.lessons[index] &&
                      formik.errors.lessons[index].content
                        ? formik.errors.lessons[index].content
                        : null
                    }
                    sx={{ width: "100%", marginTop: "10px", color: "string" }}
                  />
                </div>
              ))}

              <Button
                variant="contained"
                color="primary"
                className="pitanja-button-add"
                onClick={handleAddPitanja}
              >
                Add Question
              </Button>

              {formik.values.pitanja.map((pitanje, index) => (
                <div key={index}>
                  <input
                    className="tf"
                    name={`pitanja[${index}].title`}
                    value={pitanje.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label={`Question ${index + 1} Title`}
                    placeholder="Enter question title"
                    error={
                      formik.errors.pitanja &&
                      formik.errors.pitanja[index] &&
                      formik.errors.pitanja[index].title
                    }
                    helperText={
                      formik.errors.pitanja &&
                      formik.errors.pitanja[index] &&
                      formik.errors.pitanja[index].title
                        ? formik.errors.pitanja[index].title
                        : null
                    }
                    sx={{ width: "100%" }}
                  />

                  <input
                    className="tf"
                    name={`pitanja[${index}].content`}
                    value={pitanje.content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label={`Question ${index + 1} Content`}
                    placeholder="Enter question content"
                    multiline
                    rows={4}
                    error={
                      formik.errors.pitanja &&
                      formik.errors.pitanja[index] &&
                      formik.errors.pitanja[index].content
                    }
                    helperText={
                      formik.errors.pitanja &&
                      formik.errors.pitanja[index] &&
                      formik.errors.pitanja[index].content
                        ? formik.errors.pitanja[index].content
                        : null
                    }
                    sx={{
                      width: "100%",
                      marginTop: "10px",
                    }}
                  />
                </div>
              ))}

              <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
            </Box>
          </Box>
        </Box>
      </main>
    </div>
  );
};

export default AddCourse;
