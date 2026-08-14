import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, PhoneCall, CheckCheck } from 'lucide-react';
import { BRAND_INFO } from '../data';

export const FloatingWhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickPrompts = [
    'I want +500% more leads in Krishnagiri',
    'I want to know about Gold Plan (₹50,000)',
    'Need Google Maps #1 Ranking for my shop',
    'Book a free 30-min strategy audit',
  ];

  const handleSendPrompt = (promptText: string) => {
    const text = encodeURIComponent(
      `Hello DCOLLABERZ!\n${promptText}\nMy business is located in ${BRAND_INFO.serviceAreas[0]}. Please guide me on next steps.`
    );
    window.open(`https://wa.me/${BRAND_INFO.whatsappNumber.replace(/\D/g, '')}?text=${text}`, '_blank');
    setIsOpen(false);

    // Notify backend
    fetch('/api/notify-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'Floating Widget', packageInterest: promptText }),
    }).catch(() => {});
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    handleSendPrompt(customMsg.trim());
    setCustomMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Expanded Quick Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-3 w-[calc(100vw-2rem)] sm:w-96 rounded-3xl bg-neutral-900 border border-emerald-500/40 shadow-2xl overflow-hidden text-white"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-emerald-950 via-neutral-900 to-emerald-950 border-b border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-neutral-950 font-black">
                    <MessageCircle className="w-5 h-5 fill-neutral-950 text-neutral-950" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-neutral-900 rounded-full" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    <span>DCOLLABERZ Growth Team</span>
                  </h4>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <CheckCheck className="w-3 h-3" />
                    <span>Online | Typically replies in 2 mins</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 space-y-3 bg-neutral-950/70">
              <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-200 space-y-1">
                <p className="font-semibold text-amber-300">👋 Vanakkam / Hello!</p>
                <p className="leading-relaxed">
                  How can we help scale your business in Krishnagiri & Tamil Nadu today? Choose a quick question below or type your custom message:
                </p>
              </div>

              {/* Quick Prompts */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                  Quick Inquiries:
                </span>
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendPrompt(prompt)}
                    className="w-full text-left p-2.5 rounded-xl bg-neutral-900 hover:bg-emerald-950/70 text-neutral-200 hover:text-emerald-300 border border-neutral-800 hover:border-emerald-500/40 text-xs transition-all flex items-center justify-between group"
                  >
                    <span>{prompt}</span>
                    <Send className="w-3 h-3 text-neutral-500 group-hover:text-emerald-400 transition-colors" />
                  </button>
                ))}
              </div>

              {/* Custom Message Input */}
              <form onSubmit={handleSendCustom} className="pt-2 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-emerald-400"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 text-neutral-950 font-black shadow-2xl shadow-emerald-500/40 border-2 border-emerald-300 transition-all"
        id="btn-floating-whatsapp"
      >
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-950 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-neutral-950"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-neutral-950 text-neutral-950" />
        <span className="text-xs tracking-wide">WhatsApp Us</span>
      </motion.button>

    </div>
  );
};
