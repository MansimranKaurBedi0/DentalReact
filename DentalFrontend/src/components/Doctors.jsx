import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function Doctors() {
  const doctors = [
    {
      name: "Dr. Sarah Jenkins",
      specialty: "Chief Orthodontist",
      experience: "15+ Years Experience",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
      rating: 4.9,
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Cosmetic Dentist",
      experience: "12+ Years Experience",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
      rating: 4.8,
    },
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatric Dentist",
      experience: "10+ Years Experience",
      image: "https://images.unsplash.com/photo-1594824436951-7f12bc414843?auto=format&fit=crop&q=80&w=600",
      rating: 5.0,
    }
  ];

  return (
    <section className="py-24 bg-slate-50" id="doctors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-bold tracking-widest uppercase text-sm">Our Specialists</span>
          <h2 className="text-4xl font-bold text-slate-900 mt-4 mb-4">Meet Our Expert Team</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Highly qualified professionals dedicated to providing you with the best possible dental care in a comfortable environment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="card-premium overflow-hidden group"
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{doctor.name}</h3>
                    <p className="text-brand-300 font-medium">{doctor.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-white text-sm font-bold">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    {doctor.rating}
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white flex justify-between items-center">
                <span className="text-slate-500 font-medium">{doctor.experience}</span>
                <button className="text-brand-600 font-bold hover:text-brand-800 transition-colors">View Profile</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
