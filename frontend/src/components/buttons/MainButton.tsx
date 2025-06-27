'use client';

import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function MainButton({ children, className = '', disabled, ...props }: ButtonProps) {
  const baseClasses = 'w-full py-2 px-4 rounded transition';
  const enabledClasses = 'bg-black text-white hover:bg-gray-900';
  const disabledClasses = 'bg-[#D7D7D7] text-white cursor-not-allowed';

  return (
    <button
      className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses} ${className} cursor-pointer`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
