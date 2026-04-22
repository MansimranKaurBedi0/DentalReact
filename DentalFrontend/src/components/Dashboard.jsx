import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle, Plus, User, Mail, Phone, MapPin, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export function Dashboard() {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [user]);

  const upcoming = appointments.filter(a => a.status === 'pending' || a.status === 'accepted');
  const past = appointments.filter(a => a.status === 'declined' || a.status === 'completed');

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.name}!</h1>
            <p className="text-slate-500 mt-1">Manage your health and track your appointments.</p>
          </div>
          <Link to="/appointment" className="btn-primary py-3 px-6 shadow-xl shadow-brand-100">
            <Plus size={20} /> Book New Appointment
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column: Appointments */}
          <div className="lg:col-span-2 space-y-8">
            
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
                      
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          app.status === 'accepted' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                          {app.status}
                        </div>
                        <button className="text-slate-400 hover:text-slate-600 p-2">
                          <AlertCircle size={20} />
                        </button>
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

          {/* Right Column: Profile & Stats */}
          <div className="space-y-8">
            
            {/* Profile Card */}
            <section className="card-premium p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-brand-600"></div>
              <div className="w-24 h-24 rounded-full bg-slate-100 mx-auto mb-4 border-4 border-white shadow-lg flex items-center justify-center text-slate-400">
                <User size={48} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
              <p className="text-slate-500 text-sm mb-6">Patient ID: #DC-{user?._id?.slice(-5).toUpperCase()}</p>
              
              <div className="space-y-4 text-left border-t border-slate-100 pt-6">
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-brand-600" />
                  <span className="text-slate-600">{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={16} className="text-brand-600" />
                  <span className="text-slate-600">+1 (555) 000-0000</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin size={16} className="text-brand-600" />
                  <span className="text-slate-600">New York, USA</span>
                </div>
              </div>

              <button className="btn-secondary w-full mt-8 py-3 text-sm">
                <Settings size={16} /> Edit Profile
              </button>
            </section>

            {/* Quick Stats */}
            <section className="grid grid-cols-2 gap-4">
              <div className="bg-brand-600 rounded-3xl p-6 text-white shadow-lg shadow-brand-100">
                <div className="text-3xl font-bold mb-1">{upcoming.length}</div>
                <div className="text-xs font-medium opacity-80 uppercase tracking-wider">Active</div>
              </div>
              <div className="bg-medical-teal rounded-3xl p-6 text-white shadow-lg shadow-medical-teal/20">
                <div className="text-3xl font-bold mb-1">{appointments.length}</div>
                <div className="text-xs font-medium opacity-80 uppercase tracking-wider">Total</div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
