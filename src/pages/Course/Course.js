import React, { useState } from "react";
import NavigationCard from "../../components/CourseCards/NavigationCard";
import { useLocation, useNavigate } from "react-router-dom";
import "./Course.css";
import { CardMedia, Collapse, IconButton, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
const Course = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state && location.state.course;
  console.log(item);

  return (
    <>
      <NavigationCard />
      <div className="container">
        <div className="container-card">
          <div className="container-header">
            <CardMedia
              component="img"
              className="card_image"
              image={item && item.imageURL}
              alt={item && item.title}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className="cardTittle">{item && item.title}</p>
              {item.test ? (
                <button
                  className="startButton"
                  onClick={() => {
                    navigate("/lesson");
                  }}
                >
                  Zapocni
                </button>
              ) : (
                <button className="startButton">Kupi</button>
              )}
            </div>
          </div>
          <div className="container-footer">
            <p className="cardText">{item && item.description}</p>
          </div>
          {item &&
            item.lesson.map((item, index) => {
              return (
                <>
                  <div
                    className="lekcija-container"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setOpen(index);
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      {open === index ? (
                        <>
                          <ArrowDropDownIcon sx={{ color: "white" }} />
                        </>
                      ) : (
                        <ArrowDropUpIcon sx={{ color: "white" }} />
                      )}
                      <p
                        style={{
                          fontSize: 20,
                          color: "white",
                        }}
                      >
                        {item && item.title}
                      </p>
                    </div>
                  </div>
                  <Collapse
                    in={open === index}
                    style={{
                      color: "white",
                      // marginTop: 5,
                      backgroundColor: " #36363d",
                      padding: 20,
                    }}
                    unmountOnExit
                  >
                    {item && item.content}
                  </Collapse>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Course;
