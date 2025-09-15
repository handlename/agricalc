import React from 'react';
import { IconProps } from './types';

export const ClayRoomIcon: React.FC<IconProps> = ({ size = 24, color = '#BC6C25', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="8" width="18" height="12" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.3"/>
    <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1"/>
    <line x1="3" y1="16" x2="21" y2="16" stroke={color} strokeWidth="1"/>
    <line x1="9" y1="8" x2="9" y2="20" stroke={color} strokeWidth="1"/>
    <line x1="15" y1="8" x2="15" y2="20" stroke={color} strokeWidth="1"/>
    <path d="M 3 8 L 12 4 L 21 8" stroke={color} strokeWidth="2" fill="none"/>
  </svg>
);
