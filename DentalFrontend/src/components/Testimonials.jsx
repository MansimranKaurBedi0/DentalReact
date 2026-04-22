import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      name: "David Smith",
      text: "The best dental experience I've ever had. The clinic is spotless, and the staff makes you feel so comfortable. Highly recommend!",
      role: "Patient",
    },
    {
      name: "Amanda Lee",
      text: "I was always anxious about visiting the dentist, but Dr. Jenkins changed that. Completely painless procedure and a wonderful team.",
      role: "Patient",
    },
    {
      name: "Robert Fox",
      text: "State-of-the-art facility with incredibly professional staff. They explained everything clearly and the results were fantastic.",
      role: "Patient",
    }
  ];

  return (
    <section className="py-24 bg-brand-600 text-white relative overflow-hidden" id="testimonials">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500 rounded-full filter blur-[100px] opacity-50 mix-blend-screen"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-medical-teal rounded-full filter blur-[100px] opacity-30 mix-blend-screen"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-200 font-bold tracking-widest uppercase text-sm">Testimonials</span>
          <h2 className="text-4xl font-bold mt-4 mb-4">Patient Success Stories</h2>
          <p className="text-brand-100 max-w-2xl mx-auto opacity-90">
            Don't just take our word for it. Hear from some of our amazing patients about their experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl relative"
            >
              <Quote size={40} className="text-brand-300 opacity-50 absolute top-6 right-6" />
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={18} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-brand-50 leading-relaxed mb-6 italic">
                "{review.text}"
              </p>
              <div>
                <h4 className="font-bold text-white text-lg">{review.name}</h4>
                <p className="text-brand-200 text-sm">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
