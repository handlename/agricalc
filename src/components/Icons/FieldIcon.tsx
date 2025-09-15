import React from 'react';
import { IconProps } from './types';

export const FieldIcon: React.FC<IconProps> = ({ size = 24, color = '#8B4513', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="2" width="20" height="20" stroke={color} strokeWidth="2"/>
    <line x1="8" y1="2" x2="8" y2="22" stroke={color} strokeWidth="1"/>
    <line x1="16" y1="2" x2="16" y2="22" stroke={color} strokeWidth="1"/>
    <line x1="2" y1="8" x2="22" y2="8" stroke={color} strokeWidth="1"/>
    <line x1="2" y1="16" x2="22" y2="16" stroke={color} strokeWidth="1"/>
  </svg>
);
