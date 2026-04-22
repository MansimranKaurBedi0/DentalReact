import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function ServiceCard({ title, img, desc, icon }) {
  return (
    <div className="group card-premium h-full flex flex-col overflow-hidden">
      <div className="relative h-56 overflow-hidden">
        <img
          src={img}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {icon}
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
          {desc}
        </p>
        <Link
          to="/appointment"
          className="flex items-center gap-2 text-brand-600 font-bold text-sm hover:gap-3 transition-all"
        >
          Book Appointment <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
