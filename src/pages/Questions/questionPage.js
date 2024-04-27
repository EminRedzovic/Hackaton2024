import * as React from "react";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepIndicator from "@mui/joy/StepIndicator";
import "./questionPage.css";
import { useNavigate } from "react-router-dom";

const QuestionPage = () => {
  const [checkAnswer, setCheckAnswer] = React.useState();
  const [answer, setAnswer] = React.useState();

  const navigate = useNavigate();
  const mockedQuestions = [
    {
      question:
        "Svako telo zadržava stanje mirovanja ili ravnomernog pravolinijskog kretanja, sve dok ga neka sila ne prinudi da to stanje promeni.",
      correct: false,
      id: 1,
    },
    {
      question:
        " Ubrzanje koje pri kretanju dobija jedno telo srazmerno je intenzitetu sile koja na njega deluje, a obrnuto srazmerno masi tog tela.",
      correct: false,
      id: 2,
    },
    {
      question:
        "Sile kojima tela uzajamno deluju imaju jednake intenzitete, iste pravce, a suprotne smerove.",
      correct: true,
      id: 3,
    },
  ];
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
              <StepIndicator variant="soft" color="neutral">
                2
              </StepIndicator>
            }
          >
            Pitanje
          </Step>
          <Step
            indicator={
              <StepIndicator variant="primary" color="primary">
                3
              </StepIndicator>
            }
          >
            Rezultat
          </Step>
        </Stepper>
      </div>
      <h1>Koji od navedenih odgovora je Treci Njutnov Zakon?</h1>
      {mockedQuestions.map((item, index) => {
        console.log(index);
        return (
          <div
            className="dugme"
            style={
              index + 1 === checkAnswer ? { border: "2px solid green" } : {}
            }
            onClick={() => {
              setCheckAnswer(index + 1);
              setAnswer(item);
            }}
          >
            <p>{item.question}</p>
          </div>
        );
      })}
      {/* <div className="dugme">
        <p>
          Ubrzanje koje pri kretanju dobija jedno telo srazmerno je intenzitetu
          sile koja na njega deluje, a obrnuto srazmerno masi tog tela.
        </p>
      </div>
      <div className="dugme">
        <p>
          Sile kojima tela uzajamno deluju imaju jednake intenzitete, iste
          pravce, a suprotne smerove.
        </p>
      </div> */}
      <button
        onClick={() => {
          navigate("/results", { state: { mockedQuestions, answer } });
        }}
      >
        Dalje
      </button>
    </div>
  );
};

export default QuestionPage;
