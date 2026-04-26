import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User, Calendar, ShieldCheck, Stethoscope, Mail, Lock, Pencil, Settings, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";

export function Nav() {
  const { user, logout, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Edit Profile state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "", currentPassword: "", newPassword: "" });
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    navigate("/login");
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openEditModal = () => {
    setEditForm({ name: user?.name || "", email: user?.email || "", currentPassword: "", newPassword: "" });
    setEditError("");
    setEditSuccess("");
    setShowCurrentPass(false);
    setShowNewPass(false);
    setProfileOpen(false);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditError("");
    setEditSuccess("");

    if (!editForm.currentPassword) {
      setEditError("Current password is required to save changes.");
      return;
    }

    setEditLoading(true);

    try {
      const userId = user?.id || user?._id;
      const res = await fetch(`http://localhost:3000/api/auth/update-profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          name: editForm.name,
          email: editForm.email,
          currentPassword: editForm.currentPassword,
          newPassword: editForm.newPassword || undefined
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setEditError(data.error || "Failed to update profile.");
      } else {
        updateUser(data.user, data.token);
        setEditSuccess("Profile updated successfully!");
        setEditForm(prev => ({ ...prev, currentPassword: "", newPassword: "" }));
        setTimeout(() => setShowEditModal(false), 1500);
      }
    } catch (err) {
      setEditError("Network error. Please try again.");
    } finally {
      setEditLoading(false);
    }
  };

  const isAdmin = user && user.role === "admin";

  return (
    <>
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-white/40 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to={isAdmin ? "/admin" : "/"} className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-brand-500 to-mint-500 p-2.5 rounded-2xl text-white shadow-lg shadow-brand-500/20 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                <Stethoscope size={24} />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-brand-500 to-mint-500 tracking-tight font-heading">
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
                <Link to="/appointment" className="btn-primary py-2.5 px-5 text-sm">
                  <Calendar size={16} />
                  Book Now
                </Link>
              </>
            ) : (
              <>
                <Link to="/admin" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Dashboard</Link>
                <Link to="/admin/completed" className="text-slate-600 hover:text-brand-600 font-medium transition-colors">Completed</Link>
              </>
            )}

            <div className="h-6 w-px bg-slate-200"></div>

            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full border border-slate-100/80 hover:bg-white hover:border-slate-200 hover:shadow-soft transition-all duration-300 cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-100 to-mint-100 flex items-center justify-center text-brand-600">
                    <User size={14} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{user.name}</span>
                  <svg className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-premium border border-white/60 overflow-hidden z-[100]"
                    >
                      {/* Profile Header */}
                      <div className="bg-gradient-to-br from-brand-500 via-brand-600 to-mint-600 px-5 py-5 text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                            <User size={24} />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-sm truncate">{user.name}</p>
                            <p className="text-white/70 text-xs truncate">{user.email}</p>
                          </div>
                        </div>
                        <p className="text-white/50 text-[10px] mt-3 font-medium uppercase tracking-wider">
                          Patient ID: #DC-{user?._id?.slice(-5).toUpperCase() || user?.id?.slice(-5).toUpperCase()}
                        </p>
                      </div>

                      {/* Dropdown Actions */}
                      <div className="p-2">
                        <button
                          onClick={openEditModal}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors text-left"
                        >
                          <Pencil size={16} className="text-brand-600" />
                          Edit Profile
                        </button>
                        <div className="my-1 border-t border-slate-100"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                <>
                  <Link to="/admin" className="block px-3 py-4 text-slate-700 font-medium border-b border-slate-50">Dashboard</Link>
                  <Link to="/admin/completed" className="block px-3 py-4 text-slate-700 font-medium border-b border-slate-50">Completed</Link>
                </>
              )}
              
              {user ? (
                <div className="pt-4 space-y-3">
                  {/* Mobile profile info */}
                  <div className="flex items-center gap-3 px-3">
                    <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700 text-sm">{user.name}</p>
                      <p className="text-slate-400 text-xs">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 px-3">
                    <button
                      onClick={() => { setIsOpen(false); openEditModal(); }}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
                    >
                      <Pencil size={14} /> Edit Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
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

    {/* Edit Profile Modal */}
    <AnimatePresence>
      {showEditModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowEditModal(false)}
          ></div>

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-brand-500 via-brand-600 to-mint-600 px-8 py-6 text-white relative">
              <button
                onClick={() => setShowEditModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X size={18} />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Settings size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Edit Profile</h3>
                  <p className="text-white/70 text-sm">Update your personal information</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleEditSubmit} className="p-8 space-y-5">

              {/* Success Message */}
              {editSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-medium"
                >
                  <CheckCircle2 size={18} />
                  {editSuccess}
                </motion.div>
              )}

              {/* Error Message */}
              {editError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-medium"
                >
                  <XCircle size={18} />
                  {editError}
                </motion.div>
              )}

              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all text-sm"
                    placeholder="Your name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all text-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Security</span>
                </div>
              </div>

              {/* Current Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showCurrentPass ? "text" : "password"}
                    value={editForm.currentPassword}
                    onChange={(e) => setEditForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all text-sm"
                    placeholder="Required to save changes"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showCurrentPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* New Password (Optional) */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  New Password <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showNewPass ? "text" : "password"}
                    value={editForm.newPassword}
                    onChange={(e) => setEditForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all text-sm"
                    placeholder="Leave blank to keep current"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-1.5">Minimum 6 characters</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="flex-1 py-3 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {editLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
