import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How often should I visit the dentist?",
      answer: "We recommend visiting the dentist for a checkup and cleaning at least twice a year. However, if you have specific dental issues or a history of gum disease, more frequent visits may be necessary."
    },
    {
      question: "Do you accept dental insurance?",
      answer: "Yes, we accept most major dental insurance plans. Our team will help you verify your coverage and maximize your benefits before any treatment begins."
    },
    {
      question: "What should I do in a dental emergency?",
      answer: "If you experience a dental emergency, such as a knocked-out tooth or severe pain, please call our 24/7 emergency line immediately. We prioritize urgent cases to provide quick relief."
    },
    {
      question: "Are your whitening treatments safe?",
      answer: "Absolutely. We use professional-grade, clinically tested whitening products that are safe for your enamel and gums, providing much better and safer results than over-the-counter options."
    }
  ];

  return (
    <section className="py-28 relative" id="faq">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mint-50/20 to-transparent"></div>
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-tag">
            <HelpCircle size={14} />
            Got Questions?
          </span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know about our clinic and treatments.</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index 
                  ? 'bg-white shadow-float border border-brand-100/50' 
                  : 'bg-white/60 backdrop-blur-sm border border-slate-100/60 hover:bg-white/80 hover:shadow-soft'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left group"
              >
                <span className={`font-semibold transition-colors ${openIndex === index ? 'text-brand-600' : 'text-slate-800'}`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-300 ${
                  openIndex === index ? 'bg-brand-100 text-brand-600 rotate-180' : 'bg-slate-50 text-slate-400'
                }`}>
                  <ChevronDown size={16} />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-slate-500 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
