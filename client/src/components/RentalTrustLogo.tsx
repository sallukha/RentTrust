import React from 'react';
import { motion } from 'motion/react';

interface RentalTrustLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  showWordmark?: boolean;
  wordmarkClassName?: string;
  themeMode?: 'light' | 'dark' | 'auto';
  animated?: boolean;
  layout?: 'horizontal' | 'vertical';
}

export const RentalTrustLogoMark: React.FC<{
  className?: string;
  size?: number;
  animated?: boolean;
  darkNavyColor?: string;
  greenColor?: string;
}> = ({
  className = '',
  size = 56,
  animated = false,
  darkNavyColor,
  greenColor = '#22C55E',
}) => {
  const navy = darkNavyColor || '#0F172A';
  const green = greenColor || '#22C55E';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`flex-shrink-0 transition-transform ${className}`}
      aria-label="RentalTrust Symbol"
    >
      {/* 1. Left Chimney */}
      <motion.path
        d="M48 62V78"
        stroke={navy}
        strokeWidth="14"
        strokeLinecap="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : false}
        animate={animated ? { pathLength: 1, opacity: 1 } : false}
        transition={{ duration: 0.5, delay: 0.1 }}
      />

      {/* 2. Left Roof Slope & Overhang */}
      <motion.path
        d="M36 94L76 54L94 72"
        stroke={navy}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : false}
        animate={animated ? { pathLength: 1, opacity: 1 } : false}
        transition={{ duration: 0.6, delay: 0.2 }}
      />

      {/* 3. Left Wall and Bottom Base */}
      <motion.path
        d="M50 94V128C50 134.627 55.3726 140 62 140H94"
        stroke={navy}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : false}
        animate={animated ? { pathLength: 1, opacity: 1 } : false}
        transition={{ duration: 0.6, delay: 0.3 }}
      />

      {/* 4. Right Vertical Wall / Corner Accent (Green) */}
      <motion.path
        d="M106 106V128C106 134.627 100.627 140 94 140"
        stroke={green}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animated ? { pathLength: 0, opacity: 0 } : false}
        animate={animated ? { pathLength: 1, opacity: 1 } : false}
        transition={{ duration: 0.5, delay: 0.4 }}
      />

      {/* 5. The Signature Verified Checkmark (Green) */}
      <motion.path
        d="M60 102L76 118L124 70"
        stroke={green}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animated ? { pathLength: 0, opacity: 0, scale: 0.9 } : false}
        animate={animated ? { pathLength: 1, opacity: 1, scale: 1 } : false}
        transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
      />
    </svg>
  );
};

export const RentalTrustLogo: React.FC<RentalTrustLogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
  wordmarkClassName = '',
  themeMode = 'auto',
  animated = false,
  layout = 'horizontal',
}) => {
  const sizeMap: Record<string, { iconSize: number; textClasses: string; gapClasses: string }> = {
    xs: { iconSize: 24, textClasses: 'text-sm tracking-tight', gapClasses: 'gap-1.5' },
    sm: { iconSize: 32, textClasses: 'text-base tracking-tight', gapClasses: 'gap-2' },
    md: { iconSize: 44, textClasses: 'text-xl tracking-tight', gapClasses: 'gap-2.5' },
    lg: { iconSize: 58, textClasses: 'text-2xl sm:text-3xl tracking-tight', gapClasses: 'gap-3' },
    xl: { iconSize: 76, textClasses: 'text-3xl sm:text-4xl tracking-tight', gapClasses: 'gap-3.5' },
    '2xl': { iconSize: 96, textClasses: 'text-4xl sm:text-5xl tracking-tight', gapClasses: 'gap-4' },
    hero: { iconSize: 120, textClasses: 'text-5xl sm:text-6xl tracking-tight', gapClasses: 'gap-5' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const navyColor =
    themeMode === 'light'
      ? '#0F172A'
      : themeMode === 'dark'
      ? '#F8FAFC'
      : undefined; // Defaults to Tailwind/CSS adaptation

  return (
    <div
      className={`inline-flex items-center ${
        layout === 'vertical' ? 'flex-col justify-center text-center' : 'flex-row'
      } ${currentSize.gapClasses} ${className}`}
    >
      <RentalTrustLogoMark
        size={currentSize.iconSize}
        animated={animated}
        darkNavyColor={navyColor}
        greenColor="#22C55E"
      />

      {showWordmark && (
        <motion.div
          initial={animated ? { opacity: 0, x: -8 } : false}
          animate={animated ? { opacity: 1, x: 0 } : false}
          transition={{ duration: 0.4, delay: 0.3 }}
          className={`font-black font-sans leading-none select-none ${currentSize.textClasses} ${wordmarkClassName}`}
        >
          <span className="text-slate-900 dark:text-white">Rental</span>
          <span className="text-[#22C55E] dark:text-[#22C55E]">Trust</span>
        </motion.div>
      )}
    </div>
  );
};
