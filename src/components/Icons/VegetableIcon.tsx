import React from 'react';
import { IconProps } from './types';

export const VegetableIcon: React.FC<IconProps> = ({ size = 24, color = '#FF7F50', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 12 20 L 9 8 Q 12 6 15 8 L 12 20 Z"
      fill={color}
      stroke="#333"
      strokeWidth="1.5"
    />
    <path
      d="M 12 8 Q 10 4 8 5 Q 10 6 12 8"
      fill="#4CAF50"
      stroke="#2E7D32"
      strokeWidth="1"
    />
    <path
      d="M 12 8 Q 14 4 16 5 Q 14 6 12 8"
      fill="#4CAF50"
      stroke="#2E7D32"
      strokeWidth="1"
    />
  </svg>
);
