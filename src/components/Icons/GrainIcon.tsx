import React from 'react';
import { IconProps } from './types';

export const GrainIcon: React.FC<IconProps> = ({ size = 24, color = '#D4A373', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="12" y1="20" x2="12" y2="8" stroke={color} strokeWidth="2"/>
    <path d="M 12 8 L 9 6" stroke={color} strokeWidth="1.5"/>
    <path d="M 12 8 L 15 6" stroke={color} strokeWidth="1.5"/>
    <path d="M 12 10 L 9 8" stroke={color} strokeWidth="1.5"/>
    <path d="M 12 10 L 15 8" stroke={color} strokeWidth="1.5"/>
    <path d="M 12 12 L 9 10" stroke={color} strokeWidth="1.5"/>
    <path d="M 12 12 L 15 10" stroke={color} strokeWidth="1.5"/>
    <ellipse cx="9" cy="6" rx="1.5" ry="2" fill={color}/>
    <ellipse cx="15" cy="6" rx="1.5" ry="2" fill={color}/>
    <ellipse cx="9" cy="8" rx="1.5" ry="2" fill={color}/>
    <ellipse cx="15" cy="8" rx="1.5" ry="2" fill={color}/>
    <ellipse cx="9" cy="10" rx="1.5" ry="2" fill={color}/>
    <ellipse cx="15" cy="10" rx="1.5" ry="2" fill={color}/>
    <ellipse cx="12" cy="5" rx="1.5" ry="2" fill={color}/>
  </svg>
);
