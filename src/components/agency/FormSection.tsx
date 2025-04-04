import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Input from '../UI/Input';
import Button from '../UI/Button';

export interface FormField {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
}

export interface FormSectionProps {
  fields: FormField[];
  onNext?: () => void;
  buttonText?: string;
  showPrivacyPolicy?: boolean;
}

const FormSection: React.FC<FormSectionProps> = ({
  fields,
  onNext,
  buttonText = 'Далее',
  showPrivacyPolicy = false,
}) => {
  return (
    <form className="space-y-6 h-[500px] min-h-[500px] flex flex-col">
      <div className="flex-grow">
        {fields.map((field, index) => (
          <Input
            key={field.id}
            id={field.id}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type || 'text'}
            className={index === 0 ? 'mb-6' : 'mt-6'}
          />
        ))}
        
        {showPrivacyPolicy && (
          <div className="flex items-center mt-6">
            <input
              type="checkbox"
              id="privacyPolicy"
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="privacyPolicy" className="ml-2 text-gray-700">
              Я принимаю <Link to="/terms" className="text-blue-600 hover:underline">политику конфиденциальности</Link>
            </label>
          </div>
        )}
      </div>
      
      <div>
        <Button 
          variant="primary" 
          onClick={onNext} 
          className="w-full py-3"
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default FormSection; 