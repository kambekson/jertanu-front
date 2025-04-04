import React from 'react';

interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  type = 'text',
  className = '',
}) => {
  return (
    <div className={`${className}`}>
      <label htmlFor={id} className="block text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default Input; 