import React, { useState, useEffect } from "react";
import "../../styles/CourseCards.css";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";


const CourseCards = () => {
  const navigate = useNavigate();

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
    <div>
      <Grid container spacing={2} rowSpacing={2}>
        {courses.map((course) => (
          <Grid className="cardd" item key={course.id} xs={12} sm={6} md={4}>
            <Card

              className="cardd"

              onClick={() => {
                navigate(`/course/${132424}`, { state: { item: course } });
              }}

              sx={{
                width: 200,
                backgroundColor: "#22222e",
                color: "white",
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
                  <Typography gutterBottom variant="h5">
                    {course.title + " " + course.price + "$"}
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
