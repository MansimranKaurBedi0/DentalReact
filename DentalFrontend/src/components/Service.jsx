import { motion } from "framer-motion";
import { ServiceCard } from "./ServiceCard";
import { Sparkles, Activity, Shield, Heart } from "lucide-react";

export function Service() {
  const services = [
    {
      title: "Braces & Orthodontics",
      desc: "Perfectly align your teeth with our modern metal and ceramic braces options.",
      img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600",
      icon: <Sparkles className="text-brand-600" />
    },
    {
      title: "Dental Fillings",
      desc: "High-quality, tooth-colored fillings to restore and protect your damaged teeth.",
      img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600",
      icon: <Shield className="text-medical-teal" />
    },
    {
      title: "Scaling & Cleaning",
      desc: "Professional cleaning to remove plaque and tartar for a healthier, brighter smile.",
      img: "https://images.unsplash.com/photo-1593054981440-59bbad3095d3?auto=format&fit=crop&q=80&w=600",
      icon: <Activity className="text-blue-600" />
    },
    {
      title: "Smile Designing",
      desc: "Transform your appearance with our comprehensive cosmetic smile makeovers.",
      img: "https://images.unsplash.com/photo-1516564730692-78a71f1143c7?auto=format&fit=crop&q=80&w=600",
      icon: <Heart className="text-red-500" />
    },
    {
      title: "Clear Aligners",
      desc: "Discreetly straighten your teeth with our premium invisible aligner solutions.",
      img: "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?auto=format&fit=crop&q=80&w=600",
      icon: <Sparkles className="text-brand-500" />
    },
    {
      title: "Teeth Extraction",
      desc: "Painless and safe extraction procedures for wisdom teeth and damaged molars.",
      img: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600",
      icon: <Shield className="text-slate-600" />
    }
  ];

  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-brand-600 font-bold tracking-widest uppercase text-sm">Professional Care</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6">Our Specialized Services</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            We provide a comprehensive range of dental treatments using the latest technology and techniques to ensure the best results for our patients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
