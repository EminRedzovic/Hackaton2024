import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { storage, db } from "../firebase";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { Box, Typography, TextField, Button } from "@mui/material";
import sajtLogo from "../../src/styles/sajtLogo.png";
import NavigationCard from "../components/CourseCards/NavigationCard";

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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      image: "" || imageUrls,
      title: "",
      description: "",
      price: "",
    },

    validationSchema: Yup.object().shape({
      title: Yup.string()
        .required("required")
        .max(15, "max title length is 15"),
      description: Yup.string()
        .required("required")
        .max(70, "max description length is 70"),
      price: Yup.number().required(),
    }),

    onSubmit: async (values) => {
      const collectionRef = collection(db, "courses");
      const data = {
        imageURL: imageUrls[0],
        title: values.title,
        description: values.description,
        price: values.price,
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
            color: "black",
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
            sx={{ width: "100%", maxWidth: 400, color: "black" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                color: "black",
              }}
            >
              <label
                htmlFor="image"
                className="file-upload"
                style={{ color: "black" }}
              >
                Choose image
              </label>
              <input
                name="image"
                onChange={(e) => setImageInput(e.target.files)}
                onBlur={formik.handleBlur}
                id="fileInput"
                type="file"
              />
              {formik.errors.image && formik.touched.image && (
                <Typography color="error">{formik.errors.image}</Typography>
              )}

              <TextField
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

              <TextField
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

              <TextField
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
