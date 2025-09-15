import React from 'react';
import { IconProps } from './types';

export const SheepIcon: React.FC<IconProps> = ({ size = 24, color = '#f0f0f0', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="12" cy="12" rx="8" ry="6" fill={color} stroke="#333" strokeWidth="1.5"/>
    <circle cx="9" cy="11" r="0.8" fill="#333"/>
    <circle cx="15" cy="11" r="0.8" fill="#333"/>
    <rect x="8" y="16" width="2" height="4" fill="#333" rx="0.5"/>
    <rect x="14" y="16" width="2" height="4" fill="#333" rx="0.5"/>
    <ellipse cx="12" cy="7" rx="3" ry="2.5" fill={color} stroke="#333" strokeWidth="1"/>
  </svg>
);
