import React, { useState, useEffect } from "react";
import "../../styles/CourseCards.css";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { CardActionArea } from "@mui/material";

const CourseCards = ({ isSidebarOpen }) => {
  // Dodajte prop isSidebarOpen za praćenje stanja otvorenosti/zatvorenosti bočne trake
  const [courses, setCourses] = useState([]);
  const coursesCollections = collection(db, "courses");

  const getCourses = async () => {
    const data = await getDocs(coursesCollections);
    const filteredData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setCourses(filteredData);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className={`CourseCards ${isSidebarOpen ? "sidebar-open" : ""}`}>
      {" "}
      {/* Dodajte klasu sidebar-open ako je bočna traka otvorena */}
      <Grid container spacing={2} rowSpacing={1}>
        {courses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                maxWidth: 300,
                backgroundColor: "#22222e",
                color: "white",
                marginTop: "20px",
                transform: isSidebarOpen ? "translateX(250px)" : "none", // Primena transformacije na kartice ako je bočna traka otvorena
                transition: "transform 0.3s ease-in-out", // Dodajte prelaz za glatko animiranje
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={course.imageURL}
                  alt={course.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {course.title}
                  </Typography>
                  <Typography variant="body2">{course.description}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CourseCards;
