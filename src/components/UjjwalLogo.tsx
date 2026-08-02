import React from 'react';

interface LogoProps {
  className?: string;
}

export const UjjwalLogo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <svg
      viewBox="0 0 120 135"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0 drop-shadow-sm`}
    >
      {/* Outer Vastu Frame */}
      {/* Top Yellow Bar */}
      <rect x="10" y="8" width="100" height="7" fill="#EAB308" rx="1" />
      {/* Bottom Yellow Bar */}
      <rect x="10" y="120" width="100" height="7" fill="#EAB308" rx="1" />
      
      {/* Left Green Column */}
      <rect x="10" y="15" width="10" height="105" fill="#16A34A" rx="1" />
      {/* Right Green Column */}
      <rect x="100" y="15" width="10" height="105" fill="#16A34A" rx="1" />

      {/* Top Corners */}
      <rect x="10" y="8" width="10" height="7" fill="#EAB308" />
      <rect x="100" y="8" width="10" height="7" fill="#16A34A" />

      {/* Inner White Space / Logo 'U' Mark */}
      
      {/* Left Red "i" Stem & Dot */}
      <circle cx="43" cy="28" r="6" fill="#DC2626" />
      <rect x="37" y="38" width="12" height="50" rx="3" fill="#DC2626" />

      {/* Right Blue "i" Stem & Dot (Vibrant Bright Blue) */}
      <circle cx="77" cy="28" r="6" fill="#2563EB" />
      <rect x="71" y="38" width="12" height="50" rx="3" fill="#2563EB" />

      {/* Bottom U-Curve Left Half (Green) */}
      <path
        d="M 37 86 C 37 112, 60 112, 60 112 L 60 97 C 49 97, 49 86, 49 86 Z"
        fill="#16A34A"
      />

      {/* Bottom U-Curve Right Half (Yellow/Gold) */}
      <path
        d="M 83 86 C 83 112, 60 112, 60 112 L 60 97 C 71 97, 71 86, 71 86 Z"
        fill="#EAB308"
      />
    </svg>
  );
};
