import React from 'react';
import { IconProps } from './types';

export const CardIcon: React.FC<IconProps> = ({ size = 24, color = '#4a5f3a', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="5" y="3" width="14" height="18" rx="2" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1"/>
    <line x1="8" y1="7" x2="16" y2="7" stroke={color} strokeWidth="1.5"/>
    <line x1="8" y1="10" x2="16" y2="10" stroke={color} strokeWidth="1"/>
    <line x1="8" y1="13" x2="16" y2="13" stroke={color} strokeWidth="1"/>
    <line x1="8" y1="16" x2="13" y2="16" stroke={color} strokeWidth="1"/>
  </svg>
);
