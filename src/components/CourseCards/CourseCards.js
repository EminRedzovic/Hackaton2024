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
    <div className="courses">
      {courses.map((course) => (
        <div class="card">
          <img src={course.imageURL} class="card-img-top" alt="..." />
          <div class="card-body">
            <h2 class="card-title">{course.title}</h2>
            <p class="card-text">{course.description}</p>
            <a
              class="btn btn-primary"
              onClick={() => {
                navigate("/course", { state: { course } });
              }}
            >
              More
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCards;
