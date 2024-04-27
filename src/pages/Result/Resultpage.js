import React from "react";
import "../../pages/Questions/questionPage.css";
import { Step, StepIndicator, Stepper } from "@mui/joy";
import { useLocation, useNavigate } from "react-router-dom";
import wrong from "../../mockedData/wrong.png";
import correct from "../../mockedData/correct.png";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const questions = location.state?.mockedQuestions;
  const correctQuestion = location.state?.answer;
  console.log(questions, correctQuestion);

  return (
    <div className="question">
      <div className="stepper">
        <Stepper sx={{ width: "100%", color: "white" }}>
          <Step
            indicator={
              <StepIndicator variant="primary" color="primary">
                1
              </StepIndicator>
            }
          >
            Lekcija
          </Step>
          <Step
            indicator={
              <StepIndicator variant="primary" color="primary">
                2
              </StepIndicator>
            }
          >
            Pitanje
          </Step>
          <Step
            indicator={
              <StepIndicator variant="soft" color="neutral">
                3
              </StepIndicator>
            }
          >
            Rezultat
          </Step>
        </Stepper>
      </div>
      <div
        style={{
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "50px",
        }}
      >
        {correctQuestion && correctQuestion.correct ? (
          <div>
            <center>
              <img
                src={correct}
                style={{
                  height: "300px",
                }}
              ></img>
              <center>
                <h2>Vas odgovor je tacan</h2>
              </center>
            </center>
          </div>
        ) : (
          <div>
            <center>
              <img
                src={wrong}
                style={{
                  height: "300px",
                }}
              ></img>
              <center>
                <h2>Vas odgovor je netacan</h2>
              </center>
            </center>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
