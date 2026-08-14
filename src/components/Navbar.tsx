import React, { useState } from 'react';
import { Logo } from './Logo';
import { BRAND_INFO } from '../data';
import { 
  MessageCircle, 
  Sparkles, 
  Menu, 
  X, 
  BellRing, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';

interface NavbarProps {
  onOpenStrategyModal: () => void;
  onOpenNotificationCenter: () => void;
  notificationCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenStrategyModal,
  onOpenNotificationCenter,
  notificationCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Why Digital Marketing', href: '#why-marketing' },
    { label: 'Services', href: '#services' },
    { label: '30-Day Growth', href: '#growth-metrics' },
    { label: '4-Tier Funnel', href: '#funnel' },
    { label: 'Packages', href: '#pricing' },
    { label: 'Client Reviews', href: '#reviews' },
    { label: 'AI Growth Audit', href: '#ai-audit' },
  ];

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      `Hello DCOLLABERZ! I saw your website and I want to scale my business in ${BRAND_INFO.serviceAreas[0]} with digital marketing. Please guide me.`
    );
    window.open(`https://wa.me/${BRAND_INFO.whatsappNumber.replace(/\D/g, '')}?text=${text}`, '_blank');
    
    // Log WhatsApp event
    fetch('/api/notify-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'Navbar WhatsApp Button' }),
    }).catch(() => {});
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/85 backdrop-blur-xl transition-all duration-300">
      {/* Top Notification Bar */}
      <div className="w-full bg-gradient-to-r from-emerald-950/70 via-amber-950/60 to-emerald-950/70 py-1 px-4 text-xs border-b border-amber-500/20 text-neutral-300 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] sm:text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-neutral-300">
              <strong className="text-amber-300 font-semibold">Krishnagiri & Hosur Growth Partner:</strong> Average +500% WhatsApp enquiries in 30 days
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenNotificationCenter}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-amber-300 transition-colors bg-neutral-900/60 px-2.5 py-0.5 rounded-full border border-neutral-700/60 text-[11px]"
              title="Live Visitor Notification Engine alerting hariharanrobo123@gmail.com"
            >
              <BellRing className="w-3 h-3 text-amber-400" />
              <span>Email Alerts: <strong className="text-emerald-400">Live Active</strong></span>
              {notificationCount > 0 && (
                <span className="bg-amber-500 text-neutral-950 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                  {notificationCount}
                </span>
              )}
            </button>

            <span className="text-neutral-500">|</span>
            <button 
              onClick={handleWhatsAppClick} 
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Direct WhatsApp Hotline: {BRAND_INFO.whatsappDisplay}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
          {/* Brand Logo */}
          <a href="#" className="flex-shrink-0 focus:outline-none -ml-2 sm:-ml-4 transition-transform hover:scale-105">
            <Logo size="lg" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-6 ml-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-neutral-300 hover:text-amber-300 transition-colors py-1 relative group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-emerald-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Live Notification Indicator Button */}
            <button
              onClick={onOpenNotificationCenter}
              className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-amber-300 hover:border-amber-500/40 transition-all relative"
              title="View Realtime Notification Dispatcher"
              id="btn-nav-notifications"
            >
              <BellRing className="w-4 h-4 text-amber-400" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-black text-[10px] font-extrabold rounded-full flex items-center justify-center animate-pulse">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* WhatsApp Chat Button */}
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-500/40 text-sm font-semibold shadow-sm shadow-emerald-950 transition-all"
              id="btn-nav-whatsapp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </button>

            {/* Strategy Session CTA */}
            <button
              onClick={onOpenStrategyModal}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 text-sm font-bold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-200"
              id="btn-nav-strategy"
            >
              <span>Book Strategy Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenNotificationCenter}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400"
            >
              <BellRing className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-neutral-800 bg-neutral-950 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-neutral-300 hover:text-amber-300 hover:bg-neutral-900 rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppClick();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-sm font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp ({BRAND_INFO.whatsappDisplay})</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStrategyModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 text-sm font-bold shadow-md shadow-amber-500/20"
            >
              <span>Book Strategy Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
