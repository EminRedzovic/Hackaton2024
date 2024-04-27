import React, { useState, useEffect } from "react";
import "../../styles/CourseCards.css";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { CardActionArea } from "@mui/material";

const CourseCards = () => {
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
    <div className="courses">
      {courses.map((course) => (
        <div class="card">
          <img src={course.imageURL} class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" class="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCards;
