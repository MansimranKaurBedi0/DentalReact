import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle2, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

export function Appointment() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 3;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("http://localhost:3000/user/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const parsed = await response.json();
      
      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", phone: "", date: "", time: "", message: "" });
        setStep(1);
      } else {
        alert("Failed to book appointment: " + (parsed.errors?.[0]?.msg || "Something went wrong"));
      }
    } catch (error) {
      alert("Error connecting to server");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-slate-50">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-premium p-10 text-center"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Appointment Booked!</h2>
          <p className="text-slate-600 mb-8">Your appointment has been successfully scheduled. We've sent a confirmation to your email.</p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="btn-primary w-full py-4"
          >
            Book Another Appointment
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Book Your Visit</h1>
          <p className="text-slate-600">Quick and easy appointment scheduling.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-premium overflow-hidden"
        >
          {/* Progress Bar */}
          <div className="bg-slate-50 border-b border-slate-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Step {step} of {totalSteps}</span>
              <span className="text-sm font-bold text-brand-600">
                {step === 1 ? "Personal Info" : step === 2 ? "Schedule" : "Confirm"}
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <motion.div 
                className="bg-brand-600 h-full rounded-full"
                initial={{ width: "33%" }}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <form onSubmit={step === totalSteps ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }} className="p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Personal Details</h2>
                  <div className="space-y-4">
                    <div className="relative">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" name="name" required className="input-field pl-10 bg-slate-50 border-slate-200" placeholder="John Doe" onChange={handleChange} value={formData.name} />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="email" name="email" required className="input-field pl-10 bg-slate-50 border-slate-200" placeholder="john@example.com" onChange={handleChange} value={formData.email} />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="tel" name="phone" required className="input-field pl-10 bg-slate-50 border-slate-200" placeholder="+1 234 567 890" onChange={handleChange} value={formData.phone} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Choose Date & Time</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Preferred Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="date" name="date" required className="input-field pl-10 bg-slate-50 border-slate-200" onChange={handleChange} value={formData.date} />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Preferred Time</label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setFormData({ ...formData, time: t })}
                            className={`py-3 text-sm font-semibold rounded-xl border transition-all ${
                              formData.time === t 
                              ? "bg-brand-600 border-brand-600 text-white shadow-md shadow-brand-200 scale-105" 
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:border-brand-300 hover:bg-brand-50"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Final Details</h2>
                  
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6">
                    <h3 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Summary</h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li><strong>Name:</strong> {formData.name}</li>
                      <li><strong>Email:</strong> {formData.email}</li>
                      <li><strong>Date:</strong> {formData.date}</li>
                      <li><strong>Time:</strong> {formData.time || "Not selected"}</li>
                    </ul>
                  </div>

                  <div className="relative">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Additional Message (Optional)</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-4 text-slate-400" size={18} />
                      <textarea name="message" rows="3" className="input-field pl-10 bg-slate-50 border-slate-200 resize-none py-3" placeholder="How can we help you?" onChange={handleChange} value={formData.message}></textarea>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="btn-secondary py-3 px-6 flex items-center gap-2">
                  <ArrowLeft size={18} /> Back
                </button>
              ) : (
                <div></div> // Spacer
              )}

              {step < totalSteps ? (
                <button type="submit" className="btn-primary py-3 px-8 flex items-center gap-2 shadow-brand-500/30">
                  Next Step <ArrowRight size={18} />
                </button>
              ) : (
                <button type="submit" disabled={isSubmitting || !formData.time || !formData.date} className="btn-primary py-3 px-8 flex items-center gap-2 shadow-brand-500/30 disabled:opacity-70">
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Confirm Booking"} <CheckCircle2 size={18} />
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
