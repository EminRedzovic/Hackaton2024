import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import sajtLogo from "../../../src/styles/sajtLogo.png";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./LoginScreen.css";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Neispravna email adresa")
    .required("Email je obavezan"),
  password: Yup.string().required("Lozinka je obavezna"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [user, setUser] = useState();
  const handleSubmit = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/");
    } catch (error) {
      alert(error);
    }
    console.log("Podaci:", values);
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
      <div className="Logincontainer">
        <div className="login-container">
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
            <h2>Sign In</h2>
          </center>

          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
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

                <center>
                  <button type="submit" className="btn btn-primary">
                    Sign In
                  </button>{" "}
                  or{" "}
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/registerPage");
                    }}
                  >
                    Register
                  </span>
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

export default LoginPage;
