import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { storage, db, auth, getUserData } from "../../firebase";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { Box, Typography, Button } from "@mui/material";
import sajtLogo from "../../../src/styles/sajtLogo.png";
import NavigationCard from "../../components/CourseCards/NavigationCard";
import "./AddCourse.css";

const AddCourse = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const token = localStorage.getItem("admin");
  const [imageUrls, setImageUrls] = useState([]);
  const [imageInput, setImageInput] = useState(null);
  const getUser = async (uid) => {
    const result = await getUserData(uid);
    setUser(result);
  };
  useEffect(() => {
    console.log(user);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        getUser(authUser.uid);
      }
    });
    return () => unsubscribe();
  }, [auth]);
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
        .required("Obavezno polje")
        .max(25, "Naslov mora imati manje od 25 karaktera"),
      description: Yup.string()
        .required("Obavezno polje")
        .max(125, "Opis mora imati manje od 125 karaktera"),
      price: Yup.number().required("Obavezno polje"),
      lessons: Yup.array().required("Obavezno polje"),
      pitanja: Yup.array().required("Obavezno polje"),
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
      try {
        await addDoc(collectionRef, data);
        navigate("/");
      } catch (error) {
        alert(error);
      }
    },
  });

  if (user && !user.isAdmin) {
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
          <Box className={`logo-addcourse`} sx={{ marginBottom: 2 }}>
            <img src={sajtLogo} className="logo2" alt="Profile Picture" />
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
                placeholder="Unesite naslov Vaseg kursa"
                error={formik.errors.title && formik.touched.title}
                helperText={
                  formik.errors.title && formik.touched.title
                    ? formik.errors.title
                    : null
                }
              />
              {formik.errors.title && formik.touched.title && (
                <Typography color="error">{formik.errors.title}</Typography>
              )}

              <input
                className="tf"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label="Description"
                placeholder="Opis kursa"
                multiline
                rows={4}
                error={formik.errors.description && formik.touched.description}
                helperText={
                  formik.errors.description && formik.touched.description
                    ? formik.errors.description
                    : null
                }
              />
              {formik.errors.description && formik.touched.description && (
                <Typography color="error">
                  {formik.errors.description}
                </Typography>
              )}

              <input
                className="tf"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
                label="Cena"
                placeholder="Enter Price"
                error={formik.errors.price && formik.touched.price}
                helperText={
                  formik.errors.price && formik.touched.price
                    ? formik.errors.price
                    : null
                }
              />
              {formik.errors.price && formik.touched.price && (
                <Typography color="error">{formik.errors.price}</Typography>
              )}

              <Button
                variant="contained"
                color="primary"
                className="lessons-button-add"
                onClick={handleAddLesson}
                sx={{
                  backgroundColor: "#bc7c19",
                  "&:hover": {
                    backgroundColor: "#b27417",
                  },
                }}
              >
                Dodaj lekciju
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
                    placeholder="Unesite naslov lekcije"
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
                    placeholder="Unesite sadrzaj teksta"
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
                sx={{
                  backgroundColor: "#bc7c19",
                  "&:hover": {
                    backgroundColor: "#b27417",
                  },
                }}
              >
                Dodaj pitanje
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
                    placeholder="Unesite pitanje"
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
                    placeholder="Unesite resenje"
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

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#bc7c19",
                  "&:hover": {
                    backgroundColor: "#b27417",
                  },

                  marginBottom: 10,
                }}
              >
                Krejiraj
              </Button>
            </Box>
          </Box>
        </Box>
      </main>
    </div>
  );
};

export default AddCourse;
