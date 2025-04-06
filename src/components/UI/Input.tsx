import React, { ChangeEvent } from 'react';

export interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  className?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  type = 'text',
  className = '',
  value = '',
  onChange,
}) => {
  return (
    <div className={`${className}`}>
      <label htmlFor={id} className="block text-gray-700 mb-1">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Input; 