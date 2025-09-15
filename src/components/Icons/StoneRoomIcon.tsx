import React from 'react';
import { IconProps } from './types';

export const StoneRoomIcon: React.FC<IconProps> = ({ size = 24, color = '#708090', className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="8" width="18" height="12" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.3"/>
    <rect x="4" y="9" width="5" height="3" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.5"/>
    <rect x="10" y="9" width="4" height="3" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.5"/>
    <rect x="15" y="9" width="5" height="3" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.5"/>
    <rect x="4" y="13" width="4" height="3" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.5"/>
    <rect x="9" y="13" width="6" height="3" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.5"/>
    <rect x="16" y="13" width="4" height="3" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.5"/>
    <rect x="4" y="17" width="5" height="2" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.5"/>
    <rect x="10" y="17" width="4" height="2" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.5"/>
    <rect x="15" y="17" width="5" height="2" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.5"/>
    <path d="M 3 8 L 12 4 L 21 8" stroke={color} strokeWidth="2" fill="none"/>
  </svg>
);
