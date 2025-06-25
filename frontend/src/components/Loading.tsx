'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  size?: number;
  className?: string;
}

export default function Loading({ size = 24, className = '' }: LoadingProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className="animate-spin text-black" size={size} />
    </div>
  );
}
