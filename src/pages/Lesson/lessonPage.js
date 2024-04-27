import * as React from "react";
import Stepper from "@mui/joy/Stepper";
import Step from "@mui/joy/Step";
import StepIndicator from "@mui/joy/StepIndicator";
import mockedProfile from "../../mockedData/profile.png";
import "./lessonPage.css";
import NavigationCard from "../../components/CourseCards/NavigationCard";
import { useNavigate } from "react-router-dom";

const LessonPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavigationCard />
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
        <div className="kanta">
          <div className="tekst">
            <p>
              Njutnovi zakoni su skup tri zakona klasične fizike. Oni opisuju
              vezu između kretanja tela i sila koje deluju na telo i prvi ih je
              predstavio Isak Njutn. Oni su objavljeni u knjizi „Philosophiae
              Naturalis Principia matematica“ ili u slobodnom prevodu
              Matematičke osnove prirodne filozofije (kako je Njutn zvao fiziku)
              iz 1687. godine. Ovi zakoni čine temelje klasične mehanike.
              <br />
              Njutn ih je koristio da objasni i istraži kretanje mnogih fizičkih
              objekata i sistema. Na primer, u trećem tomu teksta, Njutn je
              pokazao da zakoni kretanja, u kombinaciji sa njegovim zakonom
              univerzalne gravitacije, mogu da objasne Keplerove zakone
              planetarnog kretanja.
              <br />
              <h2>
                <b>Prvi zakon: Zakon inercije</b>
              </h2>
              <br />
              Prvi Njutnov zakon ili zakon inercije glasi: Svako telo zadržava
              stanje mirovanja ili ravnomernog pravolinijskog kretanja, sve dok
              ga neka sila ne prinudi da to stanje promeni.
              <h2>
                <b>Drugi zakon: Zakon sile</b>
              </h2>
              <br /> Drugi Njutnov zakon ili zakon sile glasi: Ubrzanje koje pri
              kretanju dobija jedno telo srazmerno je intenzitetu sile koja na
              njega deluje, a obrnuto srazmerno masi tog tela.
              <h2>
                <b>Treći zakon: Zakon akcije i reakcije</b>
              </h2>
              <br />
              Treći Njutnov zakon ili zakon akcije i reakcije glasi: Sile kojima
              tela uzajamno deluju imaju jednake intenzitete, iste pravce, a
              suprotne smerove.
            </p>
          </div>
          <div className="komentari">
            <h3
              style={{
                position: "absolute",
                left: "35%",
                top: "10px",
              }}
            >
              Komentari
            </h3>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={mockedProfile}
                alt="profilna"
                style={{
                  height: "25px",
                  borderRadius: "12.5px",
                }}
              ></img>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <p style={{ marginLeft: "10px", paddingTop: "5px" }}>
                  Marijana Jukic
                </p>
                <span
                  style={{
                    marginLeft: "10px",
                    paddingTop: "5px",
                    color: "gray",
                  }}
                >
                  17:50PM
                </span>
              </div>
            </div>
            <p style={{ paddingTop: "15px" }}>Ko je taj njutn</p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <img
                src={mockedProfile}
                alt="profilna"
                style={{
                  height: "25px",
                  borderRadius: "12.5px",
                }}
              ></img>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <p style={{ marginLeft: "10px", paddingTop: "5px" }}>
                  Anes Kurtagic
                </p>
                <span
                  style={{
                    marginLeft: "10px",
                    paddingTop: "5px",
                    color: "gray",
                  }}
                >
                  16:30PM
                </span>
              </div>
            </div>
            <p style={{ paddingTop: "15px" }}>UAA njutn</p>
          </div>
        </div>
        <button
          onClick={() => {
            navigate("/questions");
          }}
        >
          Dalje
        </button>
      </div>
    </>
  );
};

export default LessonPage;
