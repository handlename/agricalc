import React from 'react';
import { IconProps } from './types';

export const BoarIcon: React.FC<IconProps> = ({ size = 24, color = '#8B4513', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="12" cy="13" rx="7" ry="5" fill={color} stroke="#333" strokeWidth="1.5"/>
    <rect x="8" y="16" width="2" height="3" fill="#333" rx="0.5"/>
    <rect x="14" y="16" width="2" height="3" fill="#333" rx="0.5"/>
    <ellipse cx="12" cy="9" rx="3.5" ry="3" fill={color} stroke="#333" strokeWidth="1"/>
    <circle cx="10" cy="9" r="0.6" fill="#333"/>
    <circle cx="14" cy="9" r="0.6" fill="#333"/>
    <ellipse cx="12" cy="10.5" rx="1.5" ry="1" fill="#FFB6C1"/>
    <circle cx="11" cy="10.5" r="0.3" fill="#333"/>
    <circle cx="13" cy="10.5" r="0.3" fill="#333"/>
  </svg>
);
