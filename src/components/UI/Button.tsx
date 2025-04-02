import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'neutral' | 'secondary';
  children: ReactNode;
  className?: string;
}

export default function Button({
  variant = 'neutral',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'rounded-lg px-4 py-2 flex items-center gap-2';

  const variantClasses = {
    primary: 'bg-blue-400 text-white hover:bg-blue-700 font-medium',
    neutral: 'text-black border-2 border-gray-400 hover:border-blue-400 font-medium',
    secondary: 'bg-orange-400 text-white hover:bg-orange-700 font-medium',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
