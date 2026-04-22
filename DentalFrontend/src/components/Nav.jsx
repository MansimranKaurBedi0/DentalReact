import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User, Calendar, ShieldCheck, Stethoscope } from "lucide-react";

export function Nav() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isAdmin = user && user.role === "admin";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to={isAdmin ? "/admin" : "/"} className="flex items-center gap-2 group">
              <div className="bg-brand-600 p-2 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform duration-300">
                <Stethoscope size={24} />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-medical-teal tracking-tight">
                DentalClinic
              </span>
              {isAdmin && (
                <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-100 uppercase tracking-wider ml-2">
                  Admin
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {!isAdmin ? (
              <>
                <Link to="/" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Home</Link>
                <Link to="/services" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Services</Link>
                <a href="/#about" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">About</a>
                <a href="#contact" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Contact</a>
                {user && <Link to="/dashboard" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Dashboard</Link>}
                <Link to="/appointment" className="btn-primary py-2 px-4 flex items-center gap-2 shadow-lg shadow-brand-500/20">
                  <Calendar size={18} />
                  Book Now
                </Link>
              </>
            ) : (
              <Link to="/admin" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Dashboard</Link>
            )}

            <div className="h-6 w-px bg-slate-200"></div>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center text-brand-700">
                    <User size={14} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{user.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-slate-600 hover:text-brand-600 font-medium px-4 py-2">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 hover:text-slate-700 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {!isAdmin ? (
                <>
                  <Link to="/" className="block px-3 py-4 text-slate-700 font-medium border-b border-slate-50">Home</Link>
                  <Link to="/services" className="block px-3 py-4 text-slate-700 font-medium border-b border-slate-50">Services</Link>
                  <a href="/#about" className="block px-3 py-4 text-slate-700 font-medium border-b border-slate-50">About</a>
                  <a href="#contact" className="block px-3 py-4 text-slate-700 font-medium border-b border-slate-50">Contact</a>
                  {user && <Link to="/dashboard" className="block px-3 py-4 text-slate-700 font-medium border-b border-slate-50">Dashboard</Link>}
                  <Link to="/appointment" className="block px-3 py-4 text-brand-600 font-bold border-b border-slate-50">Book Appointment</Link>
                </>
              ) : (
                <Link to="/admin" className="block px-3 py-4 text-slate-700 font-medium border-b border-slate-50">Dashboard</Link>
              )}
              
              {user ? (
                <div className="pt-4 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">{user.name}</span>
                  <button onClick={handleLogout} className="text-red-500 font-medium flex items-center gap-2">
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Link to="/login" className="btn-secondary">Login</Link>
                  <Link to="/signup" className="btn-primary">Sign up</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
