import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: ReactNode;
  className?: string;
}

export default function Button({
  variant = 'secondary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'rounded-lg px-4 py-2 flex items-center gap-2';
  
  const variantClasses = {
    primary: 'bg-blue-400 text-white hover:bg-blue-700',
    secondary: 'text-black border border-gray-300 hover:bg-gray-100',
    danger: 'text-red-600 hover:bg-gray-100'
  };
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
} 