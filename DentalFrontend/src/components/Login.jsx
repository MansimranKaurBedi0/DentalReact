import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2, Stethoscope, ShieldCheck } from 'lucide-react';

export function Login() {
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
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.token);
        navigate('/'); 
      } else {
        setError(data.error || 'Invalid credentials. Please try again.');
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
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200" 
            alt="Dental Clinic" 
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
          <h1 className="text-5xl font-bold leading-tight mb-6">World Class Dental Care is Just a Click Away.</h1>
          <p className="text-brand-100 text-lg leading-relaxed mb-8">Join thousands of patients who trust us with their smiles. Log in to manage your appointments and records.</p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="bg-white/20 p-2 rounded-xl"><ShieldCheck size={20} /></div>
              <span className="font-medium">100% Secure & Confidential</span>
            </div>
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-400/20 rounded-full blur-3xl"></div>
      </motion.div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-500">Please enter your details to sign in.</p>
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
              <label className="label-modern"><Mail size={16} className="inline mr-1 mb-1" /> Email Address</label>
              <input 
                type="email" 
                className="input-field" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="label-modern"><Lock size={16} className="inline mr-1 mb-1" /> Password</label>
                <Link to="#" className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors">Forgot password?</Link>
              </div>
              <input 
                type="password" 
                className="input-field" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
              <label htmlFor="remember" className="text-sm text-slate-600 font-medium cursor-pointer">Remember me for 30 days</label>
            </div>

            <button 
              type="submit" 
              className="btn-primary w-full py-4 text-lg group" 
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <p className="text-center mt-10 text-slate-600 font-medium">
            Don't have an account? <Link to="/signup" className="text-brand-600 font-bold hover:underline underline-offset-4">Create one now</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
