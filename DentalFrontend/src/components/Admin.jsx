import { useEffect, useState } from "react";
import { AdminCards } from "./AdminCards";

export function Admin() {
  const [appointment, setAppointment] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function handleData(currentPage = 1) {
    const limit = 8;
    const res = await fetch(`http://localhost:3000/user/view?page=${currentPage}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const parsed = await res.json();
    
    // Check if the response follows the new paginated format
    if (parsed.appointments) {
      setAppointment(parsed.appointments);
      setTotalPages(parsed.totalPages);
      setPage(parsed.currentPage);
    } else {
      // Fallback in case backend returns raw array
      setAppointment(parsed);
      setTotalPages(1);
    }
  }

  useEffect(() => {
    handleData(page);
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const refreshData = () => {
    handleData(page);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Manage Appointments</h3>
      <div
        className="adminDiv"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {appointment.length === 0 ? (
          <p className="text-center w-100">No appointments found.</p>
        ) : (
          appointment.map((item) => {
            return (
              <AdminCards
                _id={item._id}
                key={item._id}
                name={item.name}
                email={item.email}
                phone={item.phone}
                date={item.date}
                time={item.time}
                message={item.message}
                status={item.status}
                onRefresh={refreshData}
              ></AdminCards>
            );
          })
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-3 mb-5">
          <button 
            className="btn btn-primary" 
            onClick={handlePrev} 
            disabled={page === 1}
          >
            Previous
          </button>
          
          <span className="fw-bold">
            Page {page} of {totalPages}
          </span>
          
          <button 
            className="btn btn-primary" 
            onClick={handleNext} 
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
