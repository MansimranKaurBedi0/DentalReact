import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
    <section className="py-24 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-bold tracking-widest uppercase text-sm">Got Questions?</span>
          <h2 className="text-4xl font-bold text-slate-900 mt-4 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-600">Everything you need to know about our clinic and treatments.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-slate-200 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 bg-white hover:bg-slate-50 transition-colors text-left"
              >
                <span className="font-bold text-slate-900">{faq.question}</span>
                <ChevronDown 
                  className={`text-brand-600 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  size={20} 
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-slate-600 leading-relaxed bg-white">
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
