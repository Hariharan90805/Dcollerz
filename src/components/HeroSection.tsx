import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  PhoneCall, 
  MapPin, 
  Star, 
  Zap, 
  Target, 
  CheckCircle2,
  Phone
} from 'lucide-react';
import { BRAND_INFO } from '../data';
import { Logo } from './Logo';

interface HeroSectionProps {
  onOpenStrategyModal: () => void;
  onOpenAiAudit: () => void;
  onSelectPricing: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenStrategyModal,
  onOpenAiAudit,
  onSelectPricing,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activePill, setActivePill] = useState(0);

  // Scroll 3D parallax
  const { scrollY } = useScroll();
  const heroRotateX = useTransform(scrollY, [0, 600], [0, 18]);
  const heroTranslateY = useTransform(scrollY, [0, 600], [0, 80]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.94]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.8]);

  const pills = [
    { name: 'Strategy', desc: 'Custom Krishnagiri & regional market roadmap', icon: Target },
    { name: 'Reach', desc: 'Target 2.45M regional population on Google & Meta', icon: Users },
    { name: 'Convert', desc: 'Drive qualified leads directly into WhatsApp', icon: PhoneCall },
    { name: 'Success', desc: 'Scale revenue with live Power BI & SQL reporting', icon: TrendingUp },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePill((prev) => (prev + 1) % pills.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi DCOLLABERZ team! I want to turn attention into measurable growth for my business in Krishnagiri. Let's talk.`
    );
    window.open(`https://wa.me/${BRAND_INFO.whatsappNumber.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${BRAND_INFO.contactPhoneRaw}`;
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 py-16 lg:py-24 border-b border-neutral-800"
      id="hero-3d-section"
      style={{ perspective: 1200 }}
    >
      {/* Background Animated Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-[20%] -left-[10%] w-[150vw] sm:w-[55vw] h-[150vw] sm:h-[55vw] rounded-full bg-emerald-600/10 blur-[130px] transition-transform duration-700"
          style={{
            transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)`,
          }}
        />
        <div 
          className="absolute -bottom-[20%] -right-[10%] w-[150vw] sm:w-[50vw] h-[150vw] sm:h-[50vw] rounded-full bg-amber-500/10 blur-[140px] transition-transform duration-700"
          style={{
            transform: `translate(${mousePos.x * -35}px, ${mousePos.y * -35}px)`,
          }}
        />
        {/* Subtle 3D Grid Canvas overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Headline & Narrative from Slide 1 */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-[0.2em] uppercase shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>DIGITAL GROWTH PARTNER</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08] font-sans"
            >
              Turn Attention Into <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(16,185,129,0.3)]">
                Measurable Growth.
              </span>
            </motion.h1>

            {/* Subheading from Slide 1 & Deck */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg sm:text-xl text-neutral-300 max-w-2xl leading-relaxed font-normal"
            >
              Digital marketing that turns your online presence into measurable business growth. Dominating Google search, high-converting Meta reels, and direct WhatsApp lead systems for businesses in Krishnagiri & Tamil Nadu.
            </motion.p>

            {/* 4 Process Pills from Slide 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-full pt-2"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {pills.map((pill, idx) => {
                  const Icon = pill.icon;
                  const isActive = activePill === idx;
                  return (
                    <button
                      key={pill.name}
                      onClick={() => setActivePill(idx)}
                      className={`relative p-3 rounded-xl border text-left transition-all duration-300 group ${
                        isActive
                          ? 'bg-neutral-900/90 border-amber-400/80 shadow-md shadow-amber-500/10 scale-[1.03]'
                          : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-extrabold tracking-wider uppercase ${
                          isActive ? 'text-amber-300' : 'text-neutral-300 group-hover:text-white'
                        }`}>
                          {pill.name}
                        </span>
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-neutral-500'}`} />
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-tight line-clamp-2">
                        {pill.desc}
                      </p>
                      {isActive && (
                        <div className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-4 w-full"
            >
              {/* Primary Strategy CTA */}
              <button
                onClick={onOpenStrategyModal}
                className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-neutral-950 font-bold text-base shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/35 transform hover:-translate-y-0.5 transition-all duration-200"
                id="btn-hero-strategy"
              >
                <span>BOOK A STRATEGY SESSION</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-neutral-900/90 hover:bg-neutral-850 text-emerald-300 border border-emerald-500/40 font-semibold text-base shadow-lg hover:border-emerald-400/70 transition-all duration-200"
                id="btn-hero-whatsapp"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>WhatsApp: {BRAND_INFO.whatsappDisplay}</span>
              </button>

              {/* Direct Phone Call Button */}
              <button
                onClick={handleCall}
                className="flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-neutral-900/60 hover:bg-neutral-800 text-amber-300 border border-amber-500/30 font-medium text-sm transition-all"
                id="btn-hero-call"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call: {BRAND_INFO.contactPhone}</span>
              </button>

              {/* AI Audit CTA */}
              <button
                onClick={onOpenAiAudit}
                className="flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-neutral-900/60 hover:bg-neutral-800 text-cyan-300 border border-cyan-500/30 font-medium text-sm transition-all"
                id="btn-hero-ai-audit"
              >
                <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Free AI Marketing Audit</span>
              </button>
            </motion.div>

            {/* Trust Markers from Deck */}
            <div className="pt-3 flex flex-wrap items-center gap-6 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Krishnagiri, Hosur & Dharmapuri Focus</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Power BI & SQL Live Dashboards</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Verified +500% Enquiry Growth</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Showcase matching Slide 1 & Slide 12 with Scroll Depth */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              style={{
                rotateX: heroRotateX,
                y: heroTranslateY,
                scale: heroScale,
                opacity: heroOpacity,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-[460px] aspect-square rounded-[36px] bg-gradient-to-b from-neutral-800/60 via-neutral-900/80 to-neutral-950 p-6 border border-neutral-700/60 shadow-2xl shadow-emerald-950/50 backdrop-blur-2xl transition-all duration-300"
            >
              {/* Top and corner labels as seen on Slide 1 */}
              <div className="absolute top-6 left-8 text-xs font-bold uppercase tracking-widest text-neutral-400">
                Reach
              </div>
              <div className="absolute top-6 right-8 text-xs font-bold uppercase tracking-widest text-neutral-400">
                Engage
              </div>
              <div className="absolute bottom-6 left-8 text-xs font-bold uppercase tracking-widest text-neutral-400">
                Convert
              </div>
              <div className="absolute bottom-6 right-8 text-xs font-bold uppercase tracking-widest text-neutral-400">
                Success
              </div>

              {/* Center 3D Luxury Badge Display */}
              <div className="absolute inset-0 m-auto w-full max-w-[240px] h-[240px] flex flex-col items-center justify-center">
                {/* Holographic Glowing Base */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-amber-500/20 via-emerald-500/15 to-transparent blur-xl animate-pulse" />

                {/* Dark Luxury Tile with DCOLLABERZ Emblem */}
                <div 
                  className="relative z-10 w-full h-full rounded-3xl bg-gradient-to-b from-neutral-900 via-black to-neutral-950 border border-amber-400/40 p-6 flex flex-col items-center justify-center shadow-2xl"
                  style={{
                    boxShadow: '0 20px 40px -15px rgba(212, 175, 55, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.25)',
                  }}
                >
                  <Logo size="lg" showTagline={true} />
                  
                  {/* Subtle reflection overlay */}
                  <div className="mt-4 pt-3 border-t border-neutral-800/80 w-full flex items-center justify-between text-[10px] text-neutral-400">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Live Campaigning
                    </span>
                    <span className="font-mono text-amber-300">TN-29 KRISHNAGIRI</span>
                  </div>
                </div>

                {/* Mirror reflection element below the tile (replicating Slide 1) */}
                <div 
                  className="w-full h-12 bg-gradient-to-b from-amber-500/10 to-transparent opacity-40 blur-[1px] transform scale-y-[-1] mt-1 rounded-b-3xl pointer-events-none"
                />
              </div>

              {/* Floating 3D Metric Card 1: +500% Enquiries */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: 'easeInOut',
                }}
                className="absolute -top-4 -left-4 sm:-left-8 bg-neutral-900/90 border border-emerald-500/40 p-3.5 rounded-2xl shadow-xl shadow-black/80 backdrop-blur-md flex items-center gap-3 z-20"
                style={{ transform: 'translateZ(40px)' }}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-base font-extrabold text-emerald-400">+500%</span>
                    <span className="text-[10px] uppercase font-bold text-neutral-400">Growth</span>
                  </div>
                  <p className="text-[11px] text-neutral-300 font-medium">35 → 210 Enquiries/mo</p>
                </div>
              </motion.div>

              {/* Floating 3D Metric Card 2: Live WhatsApp Lead */}
              <motion.div
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4.5,
                  ease: 'easeInOut',
                  delay: 0.8,
                }}
                className="absolute -bottom-4 -right-4 sm:-right-8 bg-neutral-900/90 border border-amber-500/40 p-3.5 rounded-2xl shadow-xl shadow-black/80 backdrop-blur-md flex items-center gap-3 z-20"
                style={{ transform: 'translateZ(50px)' }}
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-white">Live WhatsApp Lead</span>
                  </div>
                  <p className="text-[11px] text-amber-300 font-semibold">New Villa Site Visit (Hosur)</p>
                </div>
              </motion.div>

              {/* Floating 3D Metric Card 3: Google 3-Pack */}
              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: 'easeInOut',
                  delay: 1.5,
                }}
                className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-neutral-900/95 border border-cyan-500/40 px-3 py-2 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-2 z-20 hidden sm:flex"
                style={{ transform: 'translateZ(30px)' }}
              >
                <MapPin className="w-4 h-4 text-cyan-400" />
                <div className="text-[11px]">
                  <span className="font-bold text-white block">Rank #1 Google Maps</span>
                  <span className="text-[10px] text-cyan-300">5,800 Local Views</span>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
