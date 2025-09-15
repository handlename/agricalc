import React from 'react';
import { IconProps } from './types';

export const PastureIcon: React.FC<IconProps> = ({ size = 24, color = '#4a5f3a', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      stroke={color}
      strokeWidth="2"
      strokeDasharray="3 2"
    />
    <path
      d="M 7 22 Q 12 16 17 22"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);
