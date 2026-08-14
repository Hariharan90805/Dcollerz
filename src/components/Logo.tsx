import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean; // keep to avoid type errors in other files
  variant?: 'gold' | 'dark' | 'minimal'; // keep to avoid type errors in other files
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 34 },
    md: { icon: 44 },
    lg: { icon: 58 },
    xl: { icon: 76 },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center select-none ${className}`} id="dcollaberz-brand-logo">
      <img
        src="/logo.jpg"
        alt="Dcollaberz Logo"
        className="object-contain mix-blend-screen"
        style={{
          height: currentSize.icon * 1.5,
          maxWidth: '100%',
        }}
      />
    </div>
  );
};
