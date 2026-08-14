import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  variant?: 'gold' | 'dark' | 'minimal';
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 34, text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 44, text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 58, text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 76, text: 'text-4xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center select-none ${className}`} id="dcollaberz-brand-logo">
      <img
        src="/logo.jpg"
        alt="Dcollaberz Logo"
        className="object-contain"
        style={{
          height: currentSize.icon * 1.5, // Make it a bit larger since it contains text
          maxWidth: '100%',
          borderRadius: '8px'
        }}
      />
    </div>
  );
};
