import { motion } from "framer-motion";
import { ServiceCard } from "./ServiceCard";
import { Sparkles, Activity, Shield, Heart, Smile, Zap } from "lucide-react";

export function Service() {
  const services = [
    {
      title: "Braces & Orthodontics",
      desc: "Perfectly align your teeth with our modern metal and ceramic braces options.",
      img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600",
      icon: <Sparkles size={20} />,
      color: "brand",
    },
    {
      title: "Dental Fillings",
      desc: "High-quality, tooth-colored fillings to restore and protect your damaged teeth.",
      img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600",
      icon: <Shield size={20} />,
      color: "mint",
    },
    {
      title: "Scaling & Cleaning",
      desc: "Professional cleaning to remove plaque and tartar for a healthier, brighter smile.",
      img: "https://images.unsplash.com/photo-1593054981440-59bbad3095d3?auto=format&fit=crop&q=80&w=600",
      icon: <Activity size={20} />,
      color: "blue",
    },
    {
      title: "Smile Designing",
      desc: "Transform your appearance with our comprehensive cosmetic smile makeovers.",
      img: "https://images.unsplash.com/photo-1516564730692-78a71f1143c7?auto=format&fit=crop&q=80&w=600",
      icon: <Smile size={20} />,
      color: "rose",
    },
    {
      title: "Clear Aligners",
      desc: "Discreetly straighten your teeth with our premium invisible aligner solutions.",
      img: "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?auto=format&fit=crop&q=80&w=600",
      icon: <Zap size={20} />,
      color: "violet",
    },
    {
      title: "Teeth Extraction",
      desc: "Painless and safe extraction procedures for wisdom teeth and damaged molars.",
      img: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600",
      icon: <Heart size={20} />,
      color: "amber",
    }
  ];

  return (
    <div className="py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="section-tag">
          <Sparkles size={14} />
          Professional Care
        </span>
        <h2 className="section-title">Our Specialized Services</h2>
        <p className="section-subtitle">
          A comprehensive range of dental treatments using the latest technology to ensure the best results.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <ServiceCard {...service} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
