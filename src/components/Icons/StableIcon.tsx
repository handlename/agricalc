import React from 'react';
import { IconProps } from './types';

export const StableIcon: React.FC<IconProps> = ({ size = 24, color = '#8B4513', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="5" y="10" width="14" height="10" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.2"/>
    <path d="M 5 10 L 12 6 L 19 10" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
    <rect x="10" y="14" width="4" height="6" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.4"/>
    <line x1="2" y1="20" x2="5" y2="20" stroke={color} strokeWidth="1.5"/>
    <line x1="19" y1="20" x2="22" y2="20" stroke={color} strokeWidth="1.5"/>
    <line x1="2" y1="16" x2="5" y2="16" stroke={color} strokeWidth="1.5"/>
    <line x1="19" y1="16" x2="22" y2="16" stroke={color} strokeWidth="1.5"/>
    <line x1="2" y1="16" x2="2" y2="20" stroke={color} strokeWidth="1.5"/>
    <line x1="22" y1="16" x2="22" y2="20" stroke={color} strokeWidth="1.5"/>
  </svg>
);
