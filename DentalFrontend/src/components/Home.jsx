import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Service } from "./Service";
import { Doctors } from "./Doctors";
import { Testimonials } from "./Testimonials";
import { FAQ } from "./FAQ";
import { ArrowRight, Star, Shield, Clock, Users, Sparkles, Heart, CheckCircle2 } from "lucide-react";

export function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-36 ambient-glow overflow-hidden">
        {/* Ambient blobs */}
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-brand-200/20 rounded-full filter blur-[120px] animate-pulse-soft"></div>
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-mint-200/20 rounded-full filter blur-[100px] animate-pulse-soft" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-100/10 rounded-full filter blur-[150px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:flex lg:items-center lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-brand-100/60 text-brand-600 text-sm font-semibold mb-8 shadow-soft"
              >
                <Star size={14} fill="currentColor" className="text-amber-400" />
                <span>Trusted by 5,000+ Happy Patients</span>
              </motion.div>

              <h1 className="text-5xl lg:text-[4.2rem] font-extrabold text-slate-900 leading-[1.08] mb-7 font-heading">
                Your Smile
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-500 via-brand-600 to-mint-500">
                  Deserves the Best
                </span>
              </h1>

              <p className="text-lg text-slate-500 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Experience gentle, world-class dental care in a space designed for your comfort. Modern technology, compassionate team, stress-free visits.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link to="/appointment" className="btn-primary py-4 px-8 text-base w-full sm:w-auto group">
                  Book Appointment 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/services" className="btn-secondary py-4 px-8 text-base w-full sm:w-auto">
                  Explore Services
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-14 grid grid-cols-3 gap-6 pt-10 border-t border-slate-100/80">
                {[
                  { value: "15+", label: "Years Experience" },
                  { value: "20+", label: "Expert Doctors" },
                  { value: "99%", label: "Satisfaction" },
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <div className="text-2xl lg:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-mint-500 font-heading">{stat.value}</div>
                    <div className="text-sm text-slate-400 font-medium mt-0.5">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="lg:w-1/2 mt-16 lg:mt-0 relative"
            >
              <div className="relative z-10">
                {/* Main Image */}
                <div className="rounded-[2.5rem] overflow-hidden shadow-premium border-[6px] border-white/80">
                  <img 
                    src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1000" 
                    alt="Modern Dental Clinic" 
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Floating Card: ISO Certified */}
                <motion.div 
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-4 sm:-right-8 card-glass p-5 rounded-2xl shadow-float z-20 hidden sm:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-mint-100 to-mint-50 p-3 rounded-xl text-mint-600">
                      <Shield size={22} />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm">ISO Certified</div>
                      <div className="text-[11px] text-slate-400 font-medium">Medical Excellence</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Card: Happy Patients */}
                <motion.div
                  animate={{ y: [4, -4, 4] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -left-4 sm:-left-8 card-glass p-4 rounded-2xl shadow-float z-20 hidden sm:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-brand-100 to-brand-50 p-2.5 rounded-xl text-brand-600">
                      <Heart size={18} />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm">5,000+</div>
                      <div className="text-[11px] text-slate-400 font-medium">Happy Patients</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Gradient Blobs */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-300/30 rounded-full filter blur-3xl animate-pulse-soft"></div>
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-mint-300/30 rounded-full filter blur-3xl animate-pulse-soft" style={{animationDelay: '2s'}}></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-28 bg-white/50" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Service />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-28 relative overflow-hidden" id="about">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/30 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="section-tag">
              <Sparkles size={14} />
              Why Choose Us
            </span>
            <h2 className="section-title">Care That Makes a Difference</h2>
            <p className="section-subtitle">We go beyond treatment — we create experiences that make you feel safe, calm, and truly cared for.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: <Clock size={26} />,
                title: "24/7 Care",
                desc: "Round-the-clock dental emergency services to handle pain or trauma when you need it most.",
                gradient: "from-brand-500 to-brand-600",
                bg: "from-brand-50 to-brand-100/50",
              },
              {
                icon: <Users size={26} />,
                title: "Family Dentistry",
                desc: "Gentle care for all ages, from children's first visits to advanced adult procedures.",
                gradient: "from-mint-500 to-mint-600",
                bg: "from-mint-50 to-mint-100/50",
              },
              {
                icon: <Shield size={26} />,
                title: "Safe & Sterile",
                desc: "Strict adherence to international sterilization protocols for your complete safety.",
                gradient: "from-blue-500 to-indigo-500",
                bg: "from-blue-50 to-indigo-50",
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card-float p-8 group"
              >
                <div className={`bg-gradient-to-br ${item.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent`}>
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 font-heading">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Doctors />
      <Testimonials />

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500 via-brand-600 to-mint-600"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_60%)]"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-heading leading-tight">
              Ready for Your Best Smile?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Schedule your appointment in under 60 seconds. No phone calls, no waiting — just book and we'll take care of the rest.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/appointment" className="bg-white text-brand-600 hover:bg-white/90 px-8 py-4 rounded-2xl font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-[0.97] flex items-center gap-2 group">
                Book Now — It's Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="tel:+15551234567" className="text-white/90 hover:text-white border border-white/30 hover:border-white/60 px-8 py-4 rounded-2xl font-semibold text-base backdrop-blur-sm transition-all duration-300 flex items-center gap-2">
                Or Call Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <FAQ />
    </div>
  );
}
