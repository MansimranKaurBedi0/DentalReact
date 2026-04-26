import { Link } from "react-router-dom";
import { Stethoscope, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="relative overflow-hidden" id="contact">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/5 rounded-full filter blur-[120px]"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-mint-500/5 rounded-full filter blur-[120px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2.5 text-white group w-fit">
              <div className="bg-gradient-to-br from-brand-500 to-mint-500 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Stethoscope size={22} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight font-heading">DentalClinic</span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm">
              Providing world-class dental care with state-of-the-art technology and a compassionate team dedicated to your perfect smile.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <FaFacebook size={16} />, href: "#" },
                { icon: <FaInstagram size={16} />, href: "#" },
                { icon: <FaLinkedin size={16} />, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-brand-500 hover:border-brand-500 hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3.5 text-sm">
              {[
                { label: "Home", to: "/" },
                { label: "About Us", href: "#about" },
                { label: "Services", to: "/services" },
                { label: "Our Doctors", href: "#doctors" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "FAQ", href: "#faq" },
              ].map((link, i) => (
                <li key={i}>
                  {link.to ? (
                    <Link to={link.to} className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group">
                      <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group">
                      <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Our Services</h3>
            <ul className="space-y-3.5 text-sm">
              {["Teeth Whitening", "Dental Implants", "Orthodontics", "Root Canal", "Pediatric Dentistry"].map((service, i) => (
                <li key={i}>
                  <Link to="/services" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group">
                    <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={14} className="text-brand-400" />
                </div>
                <span className="text-slate-400">123 Dental Avenue, Medical District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={14} className="text-brand-400" />
                </div>
                <span className="text-slate-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-brand-400" />
                </div>
                <span className="text-slate-400">hello@dentalclinic.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} DentalClinic. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
