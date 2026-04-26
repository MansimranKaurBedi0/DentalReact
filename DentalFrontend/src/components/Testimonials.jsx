import { motion } from "framer-motion";
import { Star, Quote, MessageCircle } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      name: "David Smith",
      text: "The best dental experience I've ever had. The clinic is spotless, and the staff makes you feel so comfortable. Highly recommend!",
      role: "Patient since 2022",
      avatar: "DS",
    },
    {
      name: "Amanda Lee",
      text: "I was always anxious about visiting the dentist, but Dr. Jenkins changed that. Completely painless procedure and a wonderful team.",
      role: "Patient since 2021",
      avatar: "AL",
    },
    {
      name: "Robert Fox",
      text: "State-of-the-art facility with incredibly professional staff. They explained everything clearly and the results were fantastic.",
      role: "Patient since 2023",
      avatar: "RF",
    }
  ];

  return (
    <section className="py-28 relative overflow-hidden" id="testimonials">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500 via-brand-600 to-mint-600"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(6,199,178,0.15),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-semibold mb-5">
            <MessageCircle size={14} />
            Patient Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4 font-heading">What Our Patients Say</h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Real stories from real people who trusted us with their smiles.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl hover:bg-white/15 transition-all duration-500 group relative"
            >
              <Quote size={36} className="text-white/10 absolute top-6 right-6" />
              
              <div className="flex gap-1 mb-5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-white/90 leading-relaxed mb-7 text-[15px]">
                "{review.text}"
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{review.name}</h4>
                  <p className="text-white/50 text-xs">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
