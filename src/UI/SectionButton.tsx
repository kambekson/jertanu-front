import React from 'react';

interface SectionButtonProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const SectionButton: React.FC<SectionButtonProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      className={`flex items-center p-3 w-full rounded-lg border ${isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'} text-left`}
      onClick={onClick}
    >
      <span className="flex-shrink-0 mr-3">{icon}</span>
      <span className={`${isActive ? 'text-blue-600' : 'text-gray-700'} font-medium`}>{label}</span>
      {isActive && <span className="ml-auto">›</span>}
    </button>
  );
};

export default SectionButton;
