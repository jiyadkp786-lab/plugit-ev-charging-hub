import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Send, CheckCircle, HelpCircle } from 'lucide-react';

interface FAQ {
  q: string;
  a: string;
}

export const Contact: React.FC = () => {
  const faqs: FAQ[] = [
    {
      q: 'What EV chargers does Plug It provide?',
      a: 'We offer AC and DC fast charging solutions for homes, businesses, apartments, and commercial EV stations.',
    },
    {
      q: 'Do you provide EV charger installation services?',
      a: 'Yes, Plug It provides complete charger installation and technical support services.',
    },
    {
      q: 'Which vehicles are compatible with Plug It chargers?',
      a: 'Our chargers support most electric vehicles with standard CCS2 and Type 2 connectors.',
    },
    {
      q: 'Can businesses partner with Plug It?',
      a: 'Yes, we offer dealership, franchise, and commercial partnership opportunities across India.',
    },
    {
      q: 'Do you provide after-sales support?',
      a: 'Yes, our support team provides maintenance, troubleshooting, and technical assistance.',
    },
  ];

  // FAQ state
  const [openFAQIdx, setOpenFAQIdx] = useState<number | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) return;

    setIsSubmitting(true);

    const subject = encodeURIComponent(`Plug It EV Inquiry - ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n\n` +
      `Inquiry Message:\n${message}`
    );

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Open native mail app draft
      window.location.href = `mailto:addusindia@gmail.com?subject=${subject}&body=${body}`;

      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16 px-6">
      {/* Intro Header */}
      <div className="max-w-7xl mx-auto text-center mt-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.25em] text-white/50 uppercase font-semibold">
            GET IN TOUCH
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-[0.1em] uppercase text-white mt-2">
            CONNECT WITH PLUG IT
          </h1>
          <p className="max-w-2xl mx-auto text-sm text-white/60 tracking-wider font-light mt-4">
            Have questions about EV charging stations, installation, pricing, or dealership partnerships?<br />
            Reach out to the Plug It team at <a href="mailto:addusindia@gmail.com" className="text-white underline hover:text-white/80 transition-colors">addusindia@gmail.com</a> and we’ll help you power your electric journey.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Column: Glassmorphic Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl shadow-xl flex flex-col justify-between"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <h2 className="text-xl font-bold tracking-wider mb-2">Send Message</h2>

            {/* Name Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-[10px] uppercase font-bold tracking-widest text-white/40">
                FULL NAME
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all duration-300"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[10px] uppercase font-bold tracking-widest text-white/40">
                EMAIL ADDRESS
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all duration-300"
              />
            </div>

            {/* Phone Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-[10px] uppercase font-bold tracking-widest text-white/40">
                PHONE NUMBER
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your mobile number"
                className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all duration-300"
              />
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-[10px] uppercase font-bold tracking-widest text-white/40">
                MESSAGE CONTENT
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your EV charging requirement, dealership inquiry, or support request."
                className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all duration-300 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-glow mt-4 py-4 rounded-xl text-xs font-semibold tracking-wider bg-white text-black hover:bg-white/95 active:scale-98 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" />
                  Send Inquiry
                </>
              )}
            </button>
          </form>

          {/* Success Dialog */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-6 p-4 bg-emerald-950/30 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-400 text-xs font-medium"
              >
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-400" />
                <div>
                  <p className="font-bold">Inquiry sent successfully.</p>
                  <p className="font-light mt-0.5 text-emerald-400/80">
                    A tech specialist will review and respond via email within 24 business hours.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right Column: FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="h-5 w-5 text-white/60" />
            <h2 className="text-xl font-bold tracking-wider">Frequently Asked Questions</h2>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFAQIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFAQIdx(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none cursor-pointer group"
                  >
                    <span className="text-sm font-semibold tracking-wide text-white group-hover:text-white transition-colors duration-300">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-white/40 group-hover:text-white transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-white/50 font-light leading-relaxed border-t border-white/5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
