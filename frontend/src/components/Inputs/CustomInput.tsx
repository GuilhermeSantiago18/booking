'use client';

import React, { InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputWithTitleProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  titleRight?: string;
  inputClassName?: string;
}

export default function CustomInput({
  label,
  titleRight,
  type = 'text',
  className = '',
  inputClassName = '',
  ...props
}: InputWithTitleProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === 'password';
  const inputType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`relative w-full ${className}`}>
      {label && (
        <label className="block mb-2 flex justify-start items-center">
          <span className="text-sm font-montserrat text-black font-medium">
            {label}
          </span>

          {titleRight && (
            <span className="text-xs leading-5 font-normal font-montserrat text-gray-900 ml-2">
              {titleRight}
            </span>
          )}
        </label>
      )}

      <div className="relative">
        <input
          {...props}
          type={inputType}
          className={`w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black font-montserrat text-sm leading-5 mb-4 ${inputClassName}`}
        />

        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-4.5 text-black hover:text-black mr-2"
            tabIndex={-1}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}
