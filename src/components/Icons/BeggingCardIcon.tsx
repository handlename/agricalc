import React from 'react';
import { IconProps } from './types';

export const BeggingCardIcon: React.FC<IconProps> = ({ size = 24, color = '#8b4513', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="5" y="3" width="14" height="18" rx="2" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1"/>
    <circle cx="12" cy="8" r="2" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M9 12 C9 12, 10 11, 12 11 C14 11, 15 12, 15 12" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="8" cy="16" r="1" fill={color}/>
    <circle cx="12" cy="17" r="1" fill={color}/>
    <circle cx="16" cy="16" r="1" fill={color}/>
  </svg>
);
