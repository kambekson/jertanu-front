import { useState } from 'react';
import { Link } from 'react-router-dom';
import SideMenu, { SectionType } from '../../components/agency/SideMenu';
import FormSection from '../../components/agency/FormSection';
import sectionsConfig from '../../components/agency/sectionsConfig';

const AgencyRegister = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('general');

  const handleSectionChange = (section: SectionType) => {
    setActiveSection(section);
  };

  const handleNextSection = () => {
    const sectionIds = sectionsConfig.map(section => section.id);
    const currentIndex = sectionIds.indexOf(activeSection);
    if (currentIndex < sectionIds.length - 1) {
      setActiveSection(sectionIds[currentIndex + 1]);
    }
  };

  // Находим активную конфигурацию секции
  const activeConfig = sectionsConfig.find(section => section.id === activeSection);

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 p-4">
      <div className="bg-white rounded-lg shadow-sm p-8 w-full container mx-auto min-h-[720px]">
        <h1 className="text-3xl font-bold mb-2">Регистрация</h1>
        
        <div className="mb-6">
          <p className="text-gray-700">
            У вас уже есть аккаунт?{' '}
            <Link to="/agency/login" className="text-blue-600 hover:text-blue-800">
              Войти
            </Link>
          </p>
        </div>

        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/4 px-2 mb-6">
            <SideMenu 
              activeSection={activeSection} 
              onSectionChange={handleSectionChange}
            />
          </div>
          
          <div className="w-full md:w-3/4 px-2">
            {activeConfig && (
              <FormSection
                fields={activeConfig.fields}
                onNext={activeConfig.id === 'access' ? undefined : handleNextSection}
                buttonText={activeConfig.buttonText}
                showPrivacyPolicy={activeConfig.showPrivacyPolicy}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyRegister; 