import React from 'react';
import { IconProps } from './types';

export const FamilyIcon: React.FC<IconProps> = ({ size = 24, color = '#2c3e50', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="6" r="2" fill={color}/>
    <path
      d="M 12 9 L 12 15 M 12 11 L 9 13 M 12 11 L 15 13 M 12 15 L 10 20 M 12 15 L 14 20"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);
