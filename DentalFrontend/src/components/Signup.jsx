import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Loader2, Stethoscope, CheckCircle2 } from 'lucide-react';

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const loginData = await loginResponse.json();
        if(loginResponse.ok) {
            login(loginData.user, loginData.token);
            navigate('/');
        } else {
            navigate('/login');
        }
      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Server unreachable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side: Visual */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex lg:w-1/2 bg-brand-600 relative overflow-hidden items-center justify-center p-12"
      >
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200" 
            alt="Dental Care" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600/90 to-brand-900/90"></div>
        </div>
        
        <div className="relative z-10 text-white max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
              <Stethoscope size={32} />
            </div>
            <span className="text-3xl font-bold tracking-tight">DentalClinic</span>
          </div>
          <h1 className="text-5xl font-bold leading-tight mb-6">Start Your Journey to a Healthy Smile.</h1>
          <p className="text-brand-100 text-lg leading-relaxed mb-8">Create an account to book appointments, view your history, and communicate with our specialists.</p>
          
          <div className="space-y-4">
            {[
              "Personalized Dental Care Plans",
              "Expert Consultations Online",
              "Priority Appointment Booking"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <div className="bg-white/20 p-1.5 rounded-full"><CheckCircle2 size={18} /></div>
                <span className="font-medium text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-brand-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-medical-teal rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
      </motion.div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-slate-900 mb-2">Create Account</h2>
            <p className="text-slate-500">Join our family of happy patients.</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="label-modern"><User size={16} className="inline mr-1 mb-1" /> Full Name</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="John Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>

            <div className="space-y-2">
              <label className="label-modern"><Mail size={16} className="inline mr-1 mb-1" /> Email Address</label>
              <input 
                type="email" 
                className="input-field" 
                placeholder="john@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="space-y-2">
              <label className="label-modern"><Lock size={16} className="inline mr-1 mb-1" /> Password</label>
              <input 
                type="password" 
                className="input-field" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <p className="text-[10px] text-slate-400 mt-1 ml-1">Must be at least 8 characters with a mix of letters and numbers.</p>
            </div>

            <button 
              type="submit" 
              className="btn-primary w-full py-4 text-lg group" 
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>Create Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <p className="text-center mt-10 text-slate-600 font-medium">
            Already have an account? <Link to="/login" className="text-brand-600 font-bold hover:underline underline-offset-4">Log in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
