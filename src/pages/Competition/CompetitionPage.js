import NavigationCard from "../../components/CourseCards/NavigationCard";
import "./CompetitionPage.css";

const CompetitionPage = () => {
  return (
    <div className="pre-container">
      <NavigationCard />
      <div className="competition">
        <div className="questions-section">
          <h3>Pitanje 5/15</h3>
          <h1>Glavni Grad Turske?</h1>
          <div className="odgovori">
            <div className="odgovor">
              <p>Istanbul</p>
            </div>
            <div className="odgovor">
              <p>Ankara</p>
            </div>
            <div className="odgovor">
              <p>Izmir</p>
            </div>
            <div className="odgovor">
              <p>Bursa</p>
            </div>
          </div>
        </div>
        <div className="rang-lista">
          <div className="ucesnik">
            <p className="ime">Daris Mavric</p>
            <p>P 3</p>
            <p>I 1</p>
          </div>
          <div className="ucesnik">
            <p className="ime">Danilo Petrovic</p>
            <p>P 2</p>
            <p>I 2</p>
          </div>
          <div className="ucesnik">
            <p className="ime">Emin Redzovic</p>
            <p>P 1</p>
            <p>I 3</p>
          </div>
          <div className="ucesnik">
            <p className="ime">Neko Nekic</p>
            <p>P 0</p>
            <p>I 4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionPage;
