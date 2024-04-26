import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../src/styles/RegisterPage.css";
import sajtLogo from "../../src/styles/sajtLogo.png";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, isUsernameAvailable, submitLoginData } from "../firebase";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Password confirmation is required"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [user, setUser] = useState();

  const handleSubmit = async (values) => {
    try {
      const data = {
        displayName: values.username,
        email: values.email,
        isAdmin: false,
        badges: [],
      };
      const isAvailable = await isUsernameAvailable(values.username);
      if (isAvailable) {
        console.log("radi", values);
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        await submitLoginData(data);
        navigate("/");
      } else {
        alert("Ime je zauzeto");
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      if (isLoading) {
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth, isLoading]);
  if (!user) {
    return (
      <div className="container">
        <div className="register-container">
          <Box className={`logo`}>
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
          <center>
            <h2>Sign Up</h2>
          </center>

          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="username">Full Name</label>
                  <Field
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Enter ur Full Name"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter ur E-mail"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter ur Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm ur password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error-message"
                  />
                </div>
                <center>
                  <div>
                    <button type="submit" className="btn btn-primary">
                      Sign Up
                    </button>{" "}
                    or{" "}
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate("/LoginPage");
                      }}
                    >
                      Login
                    </span>
                  </div>
                </center>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
  navigate("/");
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default RegisterPage;
