export function AdminCards(props) {
  //Handle Accept
  async function handleAccept() {
    const res = await fetch(`http://localhost:3000/user/accept/${props._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      alert("Appointment Accepted ✅");
      if (props.onRefresh) props.onRefresh();
    }
  }

  //Handle Decline
  async function handleDecline() {
    const res = await fetch(`http://localhost:3000/user/decline/${props._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      alert("Appointment Declined ✅");
      if (props.onRefresh) props.onRefresh();
    }
  }

  //Handle Soft Delete
  async function handleDelete() {
    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
    if (!confirmDelete) return;

    const res = await fetch(`http://localhost:3000/user/soft-delete/${props._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      alert("Appointment Deleted 🗑️");
      if (props.onRefresh) props.onRefresh();
    }
  }

  // Status badge color
  const statusColor =
    props.status === "accepted"
      ? "success"
      : props.status === "declined"
      ? "danger"
      : "warning";

  return (
    <>
      <div className="card shadow-sm border-0" style={{ borderRadius: "12px" }}>
        <div className="card-body">
          <h5 className="card-title fw-bold">{props.name}</h5>
          <p className="card-text mb-1"><strong>Email:</strong> {props.email}</p>
          <p className="card-text mb-1"><strong>Phone:</strong> {props.phone}</p>
          <p className="card-text mb-1"><strong>Date:</strong> {props.date}</p>
          <p className="card-text mb-1"><strong>Time:</strong> {props.time}</p>
          {props.message && (
            <p className="card-text mb-2"><strong>Message:</strong> {props.message}</p>
          )}
          <p className="card-text mb-3">
            <strong>Status: </strong>
            <span className={`badge bg-${statusColor}`}>
              {props.status}
            </span>
          </p>

          <div className="d-flex gap-2 flex-wrap">
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={handleAccept}
              disabled={props.status === "accepted"}
            >
              Accept
            </button>
            <button
              type="button"
              className="btn btn-warning btn-sm"
              onClick={handleDecline}
              disabled={props.status === "declined"}
            >
              Decline
            </button>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={handleDelete}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
