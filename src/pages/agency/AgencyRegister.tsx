import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SideMenu, { SectionType } from '../../components/agency/SideMenu';
import FormSection from '../../components/agency/FormSection';
import sectionsConfig from '../../components/agency/sectionsConfig';

const AgencyRegister = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('general');
  const [formData, setFormData] = useState({
    general: {
      agencyName: '',
      officialName: '',
      bin: '',
      registrationDate: '',
      ceoName: '',
      description: '',
    },
    contact: {
      city: '',
      phone: '',
      email: '',
      address: '',
    },
    banking: {
      accountNumber: '',
      bankBik: '',
      bankName: '',
    },
    access: {
      username: '',
      loginEmail: '',
      password: '',
      confirmPassword: '',
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [activeSection]: {
        ...prev[activeSection as keyof typeof prev],
        [fieldId]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.access.password !== formData.access.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:3000/api/auth/register/agency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.access.loginEmail,
          password: formData.access.password,
          profile: {
            companyName: formData.general.agencyName,
            officialCompanyName: formData.general.officialName,
            bin: formData.general.bin,
            registrationDate: formData.general.registrationDate,
            directorFullName: formData.general.ceoName,
            city: formData.contact.city,
            contactPerson: formData.access.username,
            phoneNumber: formData.contact.phone,
            contactEmail: formData.contact.email,
            description: formData.general.description,
            legalAddress: formData.contact.address,
            actualAddress: formData.contact.address,
            bankAccount: formData.banking.accountNumber,
            bankBic: formData.banking.bankBik,
            bankName: formData.banking.bankName
          }
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Ошибка при регистрации');
      }
      
      // Сохраняем токен в localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Перенаправляем пользователя в личный кабинет
      navigate('/agency/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при регистрации');
    } finally {
      setLoading(false);
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

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

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
                onNext={activeConfig.id === 'access' ? handleSubmit : () => handleNextSection()}
                buttonText={activeConfig.buttonText}
                showPrivacyPolicy={activeConfig.showPrivacyPolicy}
                onChange={handleInputChange}
                formData={formData[activeConfig.id as keyof typeof formData]}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyRegister; 