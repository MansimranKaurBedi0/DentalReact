import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const colorMap = {
  brand: { bg: "bg-brand-50", text: "text-brand-600", border: "border-brand-100" },
  mint: { bg: "bg-mint-50", text: "text-mint-600", border: "border-mint-100" },
  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
  rose: { bg: "bg-rose-50", text: "text-rose-500", border: "border-rose-100" },
  violet: { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-100" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
};

export function ServiceCard({ title, img, desc, icon, color = "brand" }) {
  const c = colorMap[color] || colorMap.brand;

  return (
    <div className="group card-float h-full flex flex-col overflow-hidden">
      <div className="relative h-52 overflow-hidden">
        <img
          src={img}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating icon badge */}
        <div className={`absolute top-4 right-4 ${c.bg} backdrop-blur-md p-3 rounded-2xl shadow-soft border ${c.border} transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400`}>
          <span className={c.text}>{icon}</span>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-brand-600 transition-colors font-heading">
          {title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-grow">
          {desc}
        </p>
        <Link
          to="/appointment"
          className="flex items-center gap-2 text-brand-600 font-semibold text-sm hover:gap-3 transition-all duration-300 group/link"
        >
          Book Appointment <ArrowRight size={15} className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
