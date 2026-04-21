import { Appointment } from "./Appointment";
import { Service } from "./Service";

export function Home() {
  return (
    <>
      <div className="conatiner">
        <section id="Home">
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: "50%",
                paddingTop: "20%",
                paddingLeft: "10%",
                backgroundImage:
                  'url("https://i.pinimg.com/736x/95/e2/06/95e2062f806c4e45d4e116857ee2aa98.jpg")',
                backgroundSize: "cover", // image cover kare pura div
                backgroundPosition: "center",
              }}
            >
              <h1 style={{ marginLeft: "40px" }}>We Care About Your Smile </h1>
              <p>
                A dental clinic is a place where dentists take care of people’s
                teeth and gums. They help keep teeth clean, fix cavities, and
                make sure smiles stay healthy. People visit the clinic to get
                their teeth checked, cleaned, or treated when they hurt. It’s a
                friendly place that helps everyone have strong and bright teeth.
              </p>
              <button
                type="button"
                className="btn "
                style={{
                  marginLeft: "180px",
                  backgroundColor: "#b12d51",
                  height: "45px",
                }}
              >
                Book Your Appointment
              </button>
            </div>

            <div style={{ width: "50%" }}>
              <img src="https://i.pinimg.com/736x/8a/6e/ea/8a6eea0768ccc30ff00a502aca858858.jpg"></img>
            </div>
          </div>
        </section>
        {/* Service Compnent starts from here */}

        <section id="service" styke={{ marginTop: "300px" }}>
          <Service></Service>
        </section>

        <section>
          <Appointment></Appointment>
        </section>
      </div>
    </>
  );
}
