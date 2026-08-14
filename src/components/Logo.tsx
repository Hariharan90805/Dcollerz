import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  variant?: 'gold' | 'dark' | 'minimal';
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
  variant = 'gold',
}) => {
  const sizeMap = {
    sm: { icon: 34, text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 44, text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 58, text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 76, text: 'text-4xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`} id="dcollaberz-brand-logo">
      {/* 3D Gold Emblem Badge */}
      <div
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 via-neutral-900 to-black p-1 shadow-lg shadow-amber-500/10 border border-amber-400/30 transition-transform duration-300 hover:scale-105"
        style={{
          width: currentSize.icon,
          height: currentSize.icon,
          boxShadow: '0 8px 20px -4px rgba(212, 175, 55, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
        }}
      >
        {/* Glowing Background Radial */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-amber-600/20 via-transparent to-yellow-300/20 opacity-70 pointer-events-none" />

        {/* Precision SVG Vector Emblem */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF1B8" />
              <stop offset="30%" stopColor="#E6CA65" />
              <stop offset="70%" stopColor="#C59B27" />
              <stop offset="100%" stopColor="#8E6508" />
            </linearGradient>
            <linearGradient id="goldAccent" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#DFB743" />
              <stop offset="100%" stopColor="#997012" />
            </linearGradient>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#f59e0b" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Outer Stylized 'D' Shape */}
          <path
            d="M22 20 H48 C66 20, 78 32, 78 50 C78 68, 66 80, 48 80 H22 V20 Z"
            stroke="url(#goldGradient)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Inner Stylized 'C' with Concentric Rings */}
          <path
            d="M54 36 C46 36, 38 42, 38 50 C38 58, 46 64, 54 64"
            stroke="url(#goldAccent)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Key & Aperture / Camera & Growth Symbol */}
          <rect
            x="64"
            y="26"
            width="18"
            height="10"
            rx="3"
            stroke="url(#goldGradient)"
            strokeWidth="3"
            fill="#121820"
          />
          {/* Key Teeth / Aperture lines */}
          <path
            d="M74 36 V48 M78 40 H82 M78 45 H81"
            stroke="url(#goldGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Center Play / Growth Vector Triangle */}
          <polygon
            points="50,45 58,50 50,55"
            fill="url(#goldAccent)"
          />
        </svg>
      </div>

      {/* Brand Text Typography */}
      <div className="flex flex-col">
        <div className="flex items-center tracking-wider">
          <span className={`font-black uppercase tracking-[0.2em] font-sans ${currentSize.text} ${
            variant === 'gold'
              ? 'bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'
              : 'text-white'
          }`}>
            DCOLLABERZ
          </span>
        </div>
        {showTagline && (
          <span className={`font-medium tracking-[0.25em] text-neutral-400 uppercase ${currentSize.sub}`}>
            Connect <span className="text-amber-400/80">•</span> Create <span className="text-emerald-400/80">•</span> Grow
          </span>
        )}
      </div>
    </div>
  );
};
