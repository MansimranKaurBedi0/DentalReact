import { useEffect, useState } from "react";
import { AdminCards } from "./AdminCards";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, CheckCircle2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function AdminCompleted() {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCompleted, setTotalCompleted] = useState(0);

  async function fetchCompleted(currentPage = 1) {
    const limit = 8;
    try {
      const res = await fetch(`http://localhost:3000/user/view-completed?page=${currentPage}&limit=${limit}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const parsed = await res.json();

      if (parsed.appointments) {
        setAppointments(parsed.appointments);
        setTotalPages(parsed.totalPages);
        setPage(parsed.currentPage);
        setTotalCompleted(parsed.totalAppointments || parsed.appointments.length);
      } else {
        setAppointments(parsed);
        setTotalPages(1);
        setTotalCompleted(Array.isArray(parsed) ? parsed.length : 0);
      }
    } catch (error) {
      console.error("Failed to fetch completed appointments");
    }
  }

  useEffect(() => {
    fetchCompleted(page);
  }, [page]);

  const refreshData = () => fetchCompleted(page);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link to="/admin" className="inline-flex items-center gap-2 text-sm text-brand-600 font-semibold mb-3 hover:underline">
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Completed Treatments</h1>
            <p className="text-slate-500 mt-1">View and manage completed appointment records.</p>
          </div>
        </div>

        {/* Stat */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-premium p-6 flex items-center gap-5 max-w-sm"
          >
            <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="text-green-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-500">Total Completed</div>
              <div className="text-2xl font-bold text-slate-900">{totalCompleted}</div>
            </div>
          </motion.div>
        </div>

        {/* Completed Appointments Grid */}
        <div className="bg-white rounded-[2rem] shadow-soft border border-slate-100 overflow-hidden mb-8">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Completed Appointments</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg hover:bg-slate-50 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm font-bold text-slate-600 px-2">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg hover:bg-slate-50 disabled:opacity-30 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="p-6">
            {appointments.length === 0 ? (
              <div className="py-20 text-center">
                <CheckCircle2 className="mx-auto text-slate-200 mb-4" size={48} />
                <p className="text-slate-500 font-medium">No completed treatments yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {appointments.map((item) => (
                  <AdminCards
                    key={item._id}
                    {...item}
                    onRefresh={refreshData}
                    showDeleteOnly={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
