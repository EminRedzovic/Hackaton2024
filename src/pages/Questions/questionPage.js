import * as React from "react";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepIndicator from "@mui/joy/StepIndicator";
import "./questionPage.css";

const questionPage = () => {
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
      <div className="dugme">
        <p>
          Svako telo zadržava stanje mirovanja ili ravnomernog pravolinijskog
          kretanja, sve dok ga neka sila ne prinudi da to stanje promeni.
        </p>
      </div>
      <div className="dugme">
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
      </div>
      <button>Dalje</button>
    </div>
  );
};

export default questionPage;
