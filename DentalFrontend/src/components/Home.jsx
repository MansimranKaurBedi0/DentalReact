import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Service } from "./Service";
import { Doctors } from "./Doctors";
import { Testimonials } from "./Testimonials";
import { FAQ } from "./FAQ";
import { ArrowRight, Star, Shield, Clock, Users } from "lucide-react";

export function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-10 pb-20 lg:pt-20 lg:pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:flex lg:items-center lg:gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-sm font-bold mb-6">
                <Star size={16} fill="currentColor" />
                <span>Trusted by 5000+ Happy Patients</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6">
                Crafting <span className="text-brand-600">Confident Smiles</span>
              </h1>
              <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Experience world-class dental care with our state-of-the-art technology and compassionate team. We're dedicated to making your dental visit comfortable and stress-free.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link to="/appointment" className="btn-primary py-4 px-8 text-lg w-full sm:w-auto shadow-brand-500/30">
                  Book Appointment <ArrowRight size={20} />
                </Link>
                <Link to="/services" className="btn-secondary py-4 px-8 text-lg w-full sm:w-auto border-transparent bg-slate-100 hover:bg-slate-200">
                  Explore Services
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-3 gap-6 pt-12 border-t border-slate-100">
                <div>
                  <div className="text-2xl font-bold text-slate-900">15+</div>
                  <div className="text-sm text-slate-500 font-medium">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">20+</div>
                  <div className="text-sm text-slate-500 font-medium">Expert Doctors</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">99%</div>
                  <div className="text-sm text-slate-500 font-medium">Satisfaction</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:w-1/2 mt-16 lg:mt-0 relative"
            >
              <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl shadow-brand-900/10 border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1000" 
                  alt="Modern Dental Clinic" 
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Floating Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-medical-teal rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
              
              <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl shadow-xl z-20 hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-xl text-green-600">
                    <Shield size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">ISO Certified</div>
                    <div className="text-xs text-slate-500 font-medium">Medical Excellence</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Quick View */}
      <section className="py-24 bg-slate-50" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Service />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-premium p-8">
              <div className="bg-brand-100 w-14 h-14 rounded-2xl flex items-center justify-center text-brand-600 mb-6">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">24/7 Care</h3>
              <p className="text-slate-600 leading-relaxed">Round-the-clock dental emergency services to handle pain or trauma when you need it most.</p>
            </div>
            <div className="card-premium p-8">
              <div className="bg-teal-100 w-14 h-14 rounded-2xl flex items-center justify-center text-teal-600 mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Family Dentistry</h3>
              <p className="text-slate-600 leading-relaxed">Gentle care for all ages, from children's first visits to advanced adult procedures.</p>
            </div>
            <div className="card-premium p-8">
              <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Safe & Sterile</h3>
              <p className="text-slate-600 leading-relaxed">Strict adherence to international sterilization protocols for your complete safety.</p>
            </div>
          </div>
        </div>
      </section>

      <Doctors />
      <Testimonials />
      <FAQ />
    </div>
  );
}
