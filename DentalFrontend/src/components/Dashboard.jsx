import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle, Plus, Trash2, Pencil, X } from "lucide-react";
import { Link } from "react-router-dom";

export function Dashboard() {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reschedule modal state
  const [showReschedule, setShowReschedule] = useState(null); // holds appointment object
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [rescheduleLoading, setRescheduleLoading] = useState(false);
  const [rescheduleError, setRescheduleError] = useState("");

  // Cancel confirmation state
  const [showCancelConfirm, setShowCancelConfirm] = useState(null); // holds appointment _id
  const [cancelLoading, setCancelLoading] = useState(false);

  // Toast notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchAppointments = () => {
    if (user?.email) {
      fetch(`http://localhost:3000/user/my-appointments/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setAppointments(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const upcoming = appointments.filter(a => a.status === 'pending' || a.status === 'accepted');
  const past = appointments.filter(a => a.status === 'declined' || a.status === 'completed');

  // Cancel appointment
  const handleCancel = async (id) => {
    setCancelLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/user/cancel/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setAppointments(prev => prev.filter(a => a._id !== id));
        showToast("Appointment cancelled successfully");
      } else {
        showToast(data.message || "Failed to cancel", "error");
      }
    } catch {
      showToast("Network error", "error");
    } finally {
      setCancelLoading(false);
      setShowCancelConfirm(null);
    }
  };

  // Open reschedule modal
  const openReschedule = (app) => {
    setShowReschedule(app);
    setRescheduleDate(app.date);
    setRescheduleTime(app.time);
    setRescheduleError("");
  };

  // Submit reschedule
  const handleReschedule = async (e) => {
    e.preventDefault();
    if (!rescheduleDate || !rescheduleTime) {
      setRescheduleError("Date and time are required.");
      return;
    }
    setRescheduleLoading(true);
    setRescheduleError("");
    try {
      const res = await fetch(`http://localhost:3000/user/reschedule/${showReschedule._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: rescheduleDate, time: rescheduleTime })
      });
      const data = await res.json();
      if (res.ok) {
        setAppointments(prev => prev.map(a => a._id === showReschedule._id ? { ...a, date: rescheduleDate, time: rescheduleTime } : a));
        showToast("Appointment rescheduled successfully");
        setShowReschedule(null);
      } else {
        setRescheduleError(data.message || "Failed to reschedule");
      }
    } catch {
      setRescheduleError("Network error. Please try again.");
    } finally {
      setRescheduleLoading(false);
    }
  };

  // Get today's date as YYYY-MM-DD for min date picker
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 font-heading">Welcome back, {user?.name}!</h1>
            <p className="text-slate-400 mt-1">Manage your health and track your appointments.</p>
          </div>
          <Link to="/appointment" className="btn-primary py-3 px-6 shadow-xl shadow-brand-100">
            <Plus size={20} /> Book New Appointment
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="bg-gradient-to-br from-brand-500 to-brand-600 rounded-3xl p-6 text-white shadow-lg shadow-brand-500/20">
            <div className="text-3xl font-extrabold mb-1 font-heading">{upcoming.length}</div>
            <div className="text-xs font-medium opacity-80 uppercase tracking-wider">Active</div>
          </div>
          <div className="bg-gradient-to-br from-mint-500 to-mint-600 rounded-3xl p-6 text-white shadow-lg shadow-mint-500/20">
            <div className="text-3xl font-extrabold mb-1 font-heading">{appointments.length}</div>
            <div className="text-xs font-medium opacity-80 uppercase tracking-wider">Total</div>
          </div>
          <div className="card-float p-6">
            <div className="text-3xl font-extrabold text-green-600 mb-1 font-heading">{appointments.filter(a => a.status === 'completed').length}</div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Completed</div>
          </div>
          <div className="card-float p-6">
            <div className="text-3xl font-extrabold text-amber-500 mb-1 font-heading">{appointments.filter(a => a.status === 'pending').length}</div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Pending</div>
          </div>
        </div>

        <div className="space-y-8">
          
          {/* Upcoming Appointments */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Calendar className="text-brand-600" size={24} /> Upcoming Appointments
            </h2>
            
            {loading ? (
              <div className="grid gap-4">
                {[1, 2].map(i => <div key={i} className="h-32 bg-slate-200 animate-pulse rounded-2xl"></div>)}
              </div>
            ) : upcoming.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-10 text-center">
                <Calendar className="mx-auto text-slate-300 mb-4" size={40} />
                <p className="text-slate-500 font-medium">No upcoming appointments.</p>
                <Link to="/appointment" className="text-brand-600 font-bold mt-2 inline-block">Schedule one now</Link>
              </div>
            ) : (
              <div className="grid gap-4">
                {upcoming.map((app, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={app._id}
                    className="card-premium p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{app.date}</h3>
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                          <Clock size={14} /> {app.time}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        app.status === 'accepted' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {app.status}
                      </div>

                      {/* Show Reschedule & Cancel only for pending appointments */}
                      {app.status === 'pending' && (
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => openReschedule(app)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-100 transition-all"
                            title="Reschedule"
                          >
                            <Pencil size={13} /> Reschedule
                          </button>
                          <button 
                            onClick={() => setShowCancelConfirm(app._id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 transition-all"
                            title="Cancel appointment"
                          >
                            <Trash2 size={13} /> Cancel
                          </button>
                        </div>
                      )}

                      {app.status === 'accepted' && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 bg-slate-50 border border-slate-100">
                          <CheckCircle2 size={13} /> Confirmed
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* History */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6">Past History</h2>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-sm font-bold text-slate-600">Date</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-600">Time</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {past.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-10 text-center text-slate-400 italic">No past history found.</td>
                    </tr>
                  ) : (
                    past.map(app => (
                      <tr key={app._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-slate-700 font-medium">{app.date}</td>
                        <td className="px-6 py-4 text-slate-500 text-sm">{app.time}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            app.status === 'completed' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {showCancelConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCancelConfirm(null)}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden"
            >
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-red-50 mx-auto mb-5 flex items-center justify-center">
                  <Trash2 size={28} className="text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Cancel Appointment?</h3>
                <p className="text-slate-500 text-sm mb-8">This action cannot be undone. Your appointment will be permanently removed.</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCancelConfirm(null)}
                    className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
                  >
                    Keep It
                  </button>
                  <button
                    onClick={() => handleCancel(showCancelConfirm)}
                    disabled={cancelLoading}
                    className="flex-1 py-3 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {cancelLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Cancelling...
                      </>
                    ) : (
                      "Yes, Cancel"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reschedule Modal */}
      <AnimatePresence>
        {showReschedule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowReschedule(null)}></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-8 py-6 text-white relative">
                <button
                  onClick={() => setShowReschedule(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X size={18} />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Reschedule Appointment</h3>
                    <p className="text-white/70 text-sm">Pick a new date & time</p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleReschedule} className="p-8 space-y-5">
                {rescheduleError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-medium"
                  >
                    <XCircle size={18} />
                    {rescheduleError}
                  </motion.div>
                )}

                {/* Current schedule info */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Current Schedule</p>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-brand-600" /> {showReschedule.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-brand-600" /> {showReschedule.time}</span>
                  </div>
                </div>

                {/* New Date */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">New Date</label>
                  <input
                    type="date"
                    value={rescheduleDate}
                    min={today}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all text-sm"
                  />
                </div>

                {/* New Time */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">New Time</label>
                  <input
                    type="time"
                    value={rescheduleTime}
                    onChange={(e) => setRescheduleTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all text-sm"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReschedule(null)}
                    className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={rescheduleLoading}
                    className="flex-1 py-3 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {rescheduleLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      "Confirm Reschedule"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className={`fixed bottom-8 left-1/2 z-[200] px-6 py-3 rounded-2xl shadow-2xl font-semibold text-sm flex items-center gap-2 ${
              toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
            }`}
          >
            {toast.type === 'error' ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
