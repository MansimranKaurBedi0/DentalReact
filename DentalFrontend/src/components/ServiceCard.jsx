import { Link } from "react-router-dom";

export function ServiceCard(props) {
  return (
    <>
      <div
        className="card"
        style={{ width: "18rem", boxShadow: "2px 1px 3px 1px #b12d51" }}
      >
        <img
          src={props.img}
          className="card-img-top"
          style={{
            height: "170px",
            marginLeft: "20px",
            marginRight: "20px",
            width: "230px",
          }}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card’s content.
          </p>
          <Link
            to="/appointment"
            className="btn "
            style={{ backgroundColor: "#b12d51" }}
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </>
  );
}
