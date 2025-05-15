import React from 'react';
import { RegulationsTooltipProps } from '../types';
import { Link } from 'react-router-dom';

export default function RegulationsTooltip({ children }: RegulationsTooltipProps) {
  return (
    <Link to="/regulamin" className="text-yellow-600 hover:text-yellow-700 cursor-pointer underline">
      {children}
    </Link>
  );
}
