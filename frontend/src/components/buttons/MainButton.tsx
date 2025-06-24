'use client';

import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function MainButton({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-900 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
