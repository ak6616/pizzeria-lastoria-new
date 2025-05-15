import React from 'react';
import { RodoTooltipProps } from '../types';
import { Link } from 'react-router-dom';

export default function RodoTooltip({ children }: RodoTooltipProps) {
  return (
    <Link to="/rodo" className="text-yellow-600 hover:text-yellow-700 cursor-pointer underline">
      {children}
    </Link>
  );
}