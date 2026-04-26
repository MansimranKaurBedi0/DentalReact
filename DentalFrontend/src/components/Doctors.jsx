import { motion } from "framer-motion";
import { Star, Stethoscope } from "lucide-react";

export function Doctors() {
  const doctors = [
    {
      name: "Dr. Sarah Jenkins",
      specialty: "Chief Orthodontist",
      experience: "15+ Years",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
      rating: 4.9,
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Cosmetic Dentist",
      experience: "12+ Years",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
      rating: 4.8,
    },
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatric Dentist",
      experience: "10+ Years",
      image: "https://images.unsplash.com/photo-1594824436951-7f12bc414843?auto=format&fit=crop&q=80&w=600",
      rating: 5.0,
    }
  ];

  return (
    <section className="py-28 relative overflow-hidden" id="doctors">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-50/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-tag">
            <Stethoscope size={14} />
            Our Specialists
          </span>
          <h2 className="section-title">Meet Our Expert Team</h2>
          <p className="section-subtitle">
            Highly qualified professionals dedicated to providing you with the best dental care in a comfortable environment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {doctors.map((doctor, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="card-float overflow-hidden group"
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                
                {/* Rating badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/20 backdrop-blur-xl px-3 py-1.5 rounded-full text-white text-sm font-bold border border-white/20">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  {doctor.rating}
                </div>

                {/* Doctor info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-1 font-heading">{doctor.name}</h3>
                  <p className="text-brand-300 font-medium text-sm">{doctor.specialty}</p>
                </div>
              </div>

              <div className="p-5 bg-white/80 flex justify-between items-center">
                <span className="text-slate-400 font-medium text-sm">{doctor.experience} Experience</span>
                <button className="text-brand-600 font-bold text-sm hover:text-brand-700 transition-colors">
                  View Profile →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
