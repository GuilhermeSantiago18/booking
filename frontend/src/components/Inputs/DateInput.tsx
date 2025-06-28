'use client';

import React, { InputHTMLAttributes } from 'react';

interface DateInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function DateInput({ label, className = '', ...props }: DateInputProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block mb-2 text-sm font-medium font-montserrat text-black">
          {label}
        </label>
      )}
      <input
        type="date"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black font-montserrat text-sm mb-4"
        {...props}
      />
    </div>
  );
}
