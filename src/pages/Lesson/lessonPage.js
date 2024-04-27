import * as React from "react";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepIndicator from "@mui/joy/StepIndicator";
import "./lessonPage.css";

const lessonPage = () => {
  return (
    <div className="lesson">
      <div className="stepper">
        <Stepper sx={{ width: "100%", color: "white" }}>
          <Step
            indicator={
              <StepIndicator variant="soft" color="neutral">
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
              <StepIndicator variant="primary" color="primary">
                3
              </StepIndicator>
            }
          >
            Rezultat
          </Step>
        </Stepper>
      </div>
      <h1>Prvi Njutnov zakon</h1>
      <div className="tekst">
        <p>
          Njutnovi zakoni su skup tri zakona klasične fizike. Oni opisuju vezu
          između kretanja tela i sila koje deluju na telo i prvi ih je
          predstavio Isak Njutn. Oni su objavljeni u knjizi „Philosophiae
          Naturalis Principia matematica“ ili u slobodnom prevodu Matematičke
          osnove prirodne filozofije (kako je Njutn zvao fiziku) iz 1687.
          godine. Ovi zakoni čine temelje klasične mehanike.
          <br />
          Njutn ih je koristio da objasni i istraži kretanje mnogih fizičkih
          objekata i sistema. Na primer, u trećem tomu teksta, Njutn je pokazao
          da zakoni kretanja, u kombinaciji sa njegovim zakonom univerzalne
          gravitacije, mogu da objasne Keplerove zakone planetarnog kretanja.
          <br />
          <h2>
            <b>Prvi zakon: Zakon inercije</b>
          </h2>
          <br />
          Prvi Njutnov zakon ili zakon inercije glasi: Svako telo zadržava
          stanje mirovanja ili ravnomernog pravolinijskog kretanja, sve dok ga
          neka sila ne prinudi da to stanje promeni.
          <h2>
            <b>Drugi zakon: Zakon sile</b>
          </h2>
          <br /> Drugi Njutnov zakon ili zakon sile glasi: Ubrzanje koje pri
          kretanju dobija jedno telo srazmerno je intenzitetu sile koja na njega
          deluje, a obrnuto srazmerno masi tog tela.
          <h2>
            <b>Treći zakon: Zakon akcije i reakcije</b>
          </h2>
          <br />
          Treći Njutnov zakon ili zakon akcije i reakcije glasi: Sile kojima
          tela uzajamno deluju imaju jednake intenzitete, iste pravce, a
          suprotne smerove.
        </p>
      </div>
      <button>Dalje</button>
    </div>
  );
};

export default lessonPage;
