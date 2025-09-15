import React from 'react';
import { IconProps } from './types';

export const PlusIcon: React.FC<IconProps> = ({ size = 24, color = '#22c55e', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1"/>
    <line x1="12" y1="8" x2="12" y2="16" stroke={color} strokeWidth="2"/>
    <line x1="8" y1="12" x2="16" y2="12" stroke={color} strokeWidth="2"/>
  </svg>
);
