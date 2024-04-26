import React from "react";
import "../../styles/CourseCards.css";
import { useState, useEffect } from "react";
import { getDocs, getDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

const CourseCards = () => {
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
    <div className="CourseCards">
      <Grid container spacing={2} rowSpacing={3}>
        {courses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <Card
              className="card"
              style={{ background: "#22222e", color: "white" }}
            >
              <CardMedia
                component="img"
                height="200"
                image={course.imageURL}
                alt={course.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {course.title}
                </Typography>
                <Typography variant="body2" className="description">
                  {course.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CourseCards;
