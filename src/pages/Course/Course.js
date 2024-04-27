import React, { useState } from "react";
import NavigationCard from "../../components/CourseCards/NavigationCard";
import { useLocation } from "react-router-dom";
import "./Course.css";
import { CardMedia, Collapse, IconButton, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
const Course = () => {
  const mockedLekcija = [
    {
      Lekcija: "Lekcija1",
      Content: "Pobediti barcelonu 4-0 na campnou",
      Difficiulty: "easy",
    },
    {
      Lekcija: "Lekcija2",
      Content: "Pobediti barcelonu 4-0 na campnou",
      Difficiulty: "easy",
    },
    {
      Lekcija: "Lekcija3",
      Content: "Pobediti barcelonu 4-0 na campnou",
      Difficiulty: "easy",
    },
    {
      Lekcija: "Lekcija4",
      Content: "Pobediti barcelonu 4-0 na campnou",
      Difficiulty: "easy",
    },
    {
      Lekcija: "Lekcija5",
      Content: "Pobediti barcelonu 4-0 na campnou",
      Difficiulty: "easy",
    },
  ];
  const [open, setOpen] = useState(false);
  const location = useLocation();
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
            <p className="cardTittle">{item && item.title}</p>
          </div>
          <div className="container-footer">
            <p className="cardText">{item && item.description}</p>
          </div>
          {mockedLekcija.map((item, index) => {
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
                        <ArrowDropDownIcon />
                      </>
                    ) : (
                      <ArrowDropUpIcon />
                    )}
                    <p
                      style={{
                        fontSize: 20,
                      }}
                    >
                      {item && item.Lekcija}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span
                        style={{
                          color: "#34eb52",
                        }}
                      >
                        {item && item.Difficiulty}
                      </span>
                    </p>
                  </div>
                </div>
                <Collapse
                  in={open === index}
                  style={{ color: "white", marginTop: 5 }}
                  unmountOnExit
                >
                  {item && item.Content}
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
