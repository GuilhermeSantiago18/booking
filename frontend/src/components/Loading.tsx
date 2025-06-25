'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  size?: number;
  className?: string;
}

export default function Loading({ size = 28, className = '' }: LoadingProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-xs ${className}`}
    >
      <Loader2 className="animate-spin text-black" size={size} />
    </div>
  );
}
