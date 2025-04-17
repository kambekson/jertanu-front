import React from 'react';
import SectionButton from '../UI/SectionButton';
import sectionsConfig from './sectionsConfig';

export type SectionType = 'general' | 'contact' | 'banking' | 'access';

interface SideMenuProps {
  activeSection: SectionType;
  onSectionChange: (section: SectionType) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ activeSection, onSectionChange }) => {
  return (
    <div className="space-y-2">
      {sectionsConfig.map((section) => (
        <SectionButton
          key={section.id}
          icon={section.icon}
          label={section.label}
          isActive={activeSection === section.id}
          onClick={() => onSectionChange(section.id)}
        />
      ))}
    </div>
  );
};

export default SideMenu;
