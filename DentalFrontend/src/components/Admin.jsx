import { useEffect, useState } from "react";
import { AdminCards } from "./AdminCards";
import { motion } from "framer-motion";
import { Users, Calendar, ChevronLeft, ChevronRight, Filter, Search } from "lucide-react";
import { API_URL } from '../config.js';

export function Admin() {
  const [appointment, setAppointment] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAppointments, setTotalAppointments] = useState(0);

  async function handleData(currentPage = 1) {
    const limit = 8;
    try {
      const res = await fetch(`${API_URL}/user/view?page=${currentPage}&limit=${limit}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const parsed = await res.json();
      
      if (parsed.appointments) {
        setAppointment(parsed.appointments);
        setTotalPages(parsed.totalPages);
        setPage(parsed.currentPage);
        setTotalAppointments(parsed.totalAppointments || parsed.appointments.length);
      } else {
        setAppointment(parsed);
        setTotalPages(1);
        setTotalAppointments(Array.isArray(parsed) ? parsed.length : 0);
      }
    } catch (error) {
      console.error("Failed to fetch data");
    }
  }

  useEffect(() => {
    handleData(page);
  }, [page]);

  const refreshData = () => handleData(page);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage appointments and clinic activity.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="Search patients..." className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20" />
            </div>
            <button className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {/* Total Appointments Stat */}
        <div className="mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-premium p-6 flex items-center gap-5 max-w-sm"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center">
              <Calendar className="text-brand-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-500">Total Appointments</div>
              <div className="text-2xl font-bold text-slate-900">{totalAppointments}</div>
            </div>
          </motion.div>
        </div>

        {/* Appointments Grid */}
        <div className="bg-white rounded-[2rem] shadow-soft border border-slate-100 overflow-hidden mb-8">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recent Appointments</h2>
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
            {appointment.length === 0 ? (
              <div className="py-20 text-center">
                <Calendar className="mx-auto text-slate-200 mb-4" size={48} />
                <p className="text-slate-500 font-medium">No appointments scheduled yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {appointment.map((item) => (
                  <AdminCards
                    key={item._id}
                    {...item}
                    onRefresh={refreshData}
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
