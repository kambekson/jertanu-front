import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TravelerInfo {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  nationality: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  gender: 'male' | 'female' | '';
}

interface BookingProps {
  // Props can be expanded based on requirements
}

const initialTravelerInfo: TravelerInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  nationality: '',
  birthDay: '',
  birthMonth: '',
  birthYear: '',
  gender: '',
};

const Booking: React.FC<BookingProps> = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<number>(2);
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [mainTraveler, setMainTraveler] = useState<TravelerInfo>({ ...initialTravelerInfo });
  const [travelers, setTravelers] = useState<TravelerInfo[]>([]);

  // Price constants
  const adultPrice = 15000;
  const childPrice = 7000;
  const totalPrice = adultCount * adultPrice + childCount * childPrice;
  
  const handleMainTravelerChange = (field: keyof TravelerInfo, value: string) => {
    setMainTraveler(prev => ({ ...prev, [field]: value }));
  };

  const handleTravelerChange = (index: number, field: keyof TravelerInfo, value: string) => {
    const newTravelers = [...travelers];
    newTravelers[index] = { ...newTravelers[index], [field]: value };
    setTravelers(newTravelers);
  };

  const handleAdultCountChange = (increment: boolean) => {
    if (increment && adultCount < 10) {
      setAdultCount(adultCount + 1);
      if (adultCount >= travelers.length + 1) {
        setTravelers([...travelers, { ...initialTravelerInfo }]);
      }
    } else if (!increment && adultCount > 1) {
      setAdultCount(adultCount - 1);
      if (travelers.length > 0 && adultCount <= travelers.length + 1) {
        setTravelers(travelers.slice(0, -1));
      }
    }
  };

  const handleChildCountChange = (increment: boolean) => {
    if (increment && childCount < 10) {
      setChildCount(childCount + 1);
      if (childCount === 0) {
        setTravelers([...travelers, { ...initialTravelerInfo }]);
      }
    } else if (!increment && childCount > 0) {
      setChildCount(childCount - 1);
      if (childCount === 1) {
        const newTravelers = [...travelers];
        if (adultCount <= 1) {
          setTravelers([]);
        } else {
          newTravelers.pop();
          setTravelers(newTravelers);
        }
      }
    }
  };

  const handleProceedToPayment = () => {
    // Navigate to payment page or handle payment logic
    navigate('/payment');
  };

  const handleAddTraveler = () => {
    setTravelers([...travelers, { ...initialTravelerInfo }]);
    setAdultCount(adultCount + 1);
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <div className="container mx-auto px-4 py-6">
        {/* Steps indicator */}
        <div className="flex justify-between items-center mb-10 px-4 sm:px-8">
          <div className="flex flex-col items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${activeStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
              1
            </div>
            <span className="text-xs mt-1">Выбор тура</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${activeStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
              2
            </div>
            <span className="text-xs mt-1">Ввод данных</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${activeStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
              3
            </div>
            <span className="text-xs mt-1">Оплата</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Traveler Count Selector */}
            <div className="bg-white rounded-lg border-2 border-gray-300 p-6 mb-4">
              <h2 className="text-lg font-medium mb-4">Сколько людей путешествуют?</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <p className="text-sm mb-2">Дети (возраст 0-13)</p>
                  <div className="flex items-center border rounded-lg">
                    <button 
                      className="px-4 py-2 text-xl"
                      onClick={() => handleChildCountChange(false)}
                    >
                      −
                    </button>
                    <span className="flex-1 text-center">{childCount}</span>
                    <button 
                      className="px-4 py-2 text-xl"
                      onClick={() => handleChildCountChange(true)}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">{childPrice} ₸</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm mb-2">Взрослые</p>
                  <div className="flex items-center border rounded-lg">
                    <button 
                      className="px-4 py-2 text-xl"
                      onClick={() => handleAdultCountChange(false)}
                    >
                      −
                    </button>
                    <span className="flex-1 text-center">{adultCount}</span>
                    <button 
                      className="px-4 py-2 text-xl"
                      onClick={() => handleAdultCountChange(true)}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">{adultPrice} ₸</p>
                </div>
              </div>
            </div>
            
            {/* Traveler Information Forms */}
            <div className="bg-white rounded-lg border-2 border-gray-300 p-6">
              <div className="mb-4">
                <h2 className="text-lg font-medium mb-2">Добавить информацию о путешественнике</h2>
                <div className="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Пожалуйста, обратите внимание: Данные путешественника должны совпадать с данными в удостоверении личности.</span>
                </div>
              </div>
              
              {/* Main Traveler Form */}
              <div className="mb-8">
                <div className="mb-4">
                  <h3 className="font-medium">Главный путешественник</h3>
                  <p className="text-sm text-gray-600">Этот путешественник будет контактным лицом для бронирования.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm mb-1">Имя</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg"
                      placeholder="Ваше имя"
                      value={mainTraveler.firstName}
                      onChange={(e) => handleMainTravelerChange('firstName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Фамилия</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg"
                      placeholder="Ваша фамилия"
                      value={mainTraveler.lastName}
                      onChange={(e) => handleMainTravelerChange('lastName', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm mb-1">Электронная почта</label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded-lg"
                      placeholder="Ваша почта"
                      value={mainTraveler.email}
                      onChange={(e) => handleMainTravelerChange('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Номер телефона</label>
                    <input
                      type="tel"
                      className="w-full p-2 border rounded-lg"
                      placeholder="Ваш номер телефона"
                      value={mainTraveler.phone}
                      onChange={(e) => handleMainTravelerChange('phone', e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1">Дата рождения</label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      className="p-2 border rounded-lg"
                      value={mainTraveler.birthDay}
                      onChange={(e) => handleMainTravelerChange('birthDay', e.target.value)}
                    >
                      <option value="">День</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                    <select
                      className="p-2 border rounded-lg"
                      value={mainTraveler.birthMonth}
                      onChange={(e) => handleMainTravelerChange('birthMonth', e.target.value)}
                    >
                      <option value="">Месяц</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                    <select
                      className="p-2 border rounded-lg"
                      value={mainTraveler.birthYear}
                      onChange={(e) => handleMainTravelerChange('birthYear', e.target.value)}
                    >
                      <option value="">Год</option>
                      {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">Пол</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender-main"
                        checked={mainTraveler.gender === 'female'}
                        onChange={() => handleMainTravelerChange('gender', 'female')}
                        className="mr-2"
                      />
                      Женский
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender-main"
                        checked={mainTraveler.gender === 'male'}
                        onChange={() => handleMainTravelerChange('gender', 'male')}
                        className="mr-2"
                      />
                      Мужской
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Additional Travelers Forms */}
              {travelers.map((traveler, index) => {
                const isChild = index >= adultCount - 1;
                return (
                  <div key={`traveler-${index}`} className="border-t pt-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-medium">Путешественник {index + 1} {isChild && <span className="text-sm text-gray-500">(возраст 0-17)</span>}</h3>
                        <p className="text-sm text-gray-600">Контакт</p>
                      </div>
                      <button className="text-blue-500 text-sm">Компаньоны</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm mb-1">Имя</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-lg"
                          placeholder="Ваше имя"
                          value={traveler.firstName}
                          onChange={(e) => handleTravelerChange(index, 'firstName', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Фамилия</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-lg"
                          placeholder="Ваша фамилия"
                          value={traveler.lastName}
                          onChange={(e) => handleTravelerChange(index, 'lastName', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm mb-1">Дата рождения</label>
                      <div className="grid grid-cols-3 gap-2">
                        <select
                          className="p-2 border rounded-lg"
                          value={traveler.birthDay}
                          onChange={(e) => handleTravelerChange(index, 'birthDay', e.target.value)}
                        >
                          <option value="">День</option>
                          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </select>
                        <select
                          className="p-2 border rounded-lg"
                          value={traveler.birthMonth}
                          onChange={(e) => handleTravelerChange(index, 'birthMonth', e.target.value)}
                        >
                          <option value="">Месяц</option>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                            <option key={month} value={month}>{month}</option>
                          ))}
                        </select>
                        <select
                          className="p-2 border rounded-lg"
                          value={traveler.birthYear}
                          onChange={(e) => handleTravelerChange(index, 'birthYear', e.target.value)}
                        >
                          <option value="">Год</option>
                          {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Пол</label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`gender-${index}`}
                            checked={traveler.gender === 'female'}
                            onChange={() => handleTravelerChange(index, 'gender', 'female')}
                            className="mr-2"
                          />
                          Женский
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`gender-${index}`}
                            checked={traveler.gender === 'male'}
                            onChange={() => handleTravelerChange(index, 'gender', 'male')}
                            className="mr-2"
                          />
                          Мужской
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              <div className="mt-4">
                <button 
                  className="flex items-center text-blue-500 font-medium"
                  onClick={handleAddTraveler}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Добавить путешественника
                </button>
              </div>
            </div>
          </div>
          
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border-2 border-gray-300 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Актау за 21 день</h3>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              <hr className="my-4" />
              
              <div className="mb-4">
                <h4 className="text-sm text-gray-600 mb-2">Гости и цены:</h4>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <span className="mr-2">{adultCount}</span>
                    <span>Взрослые</span>
                  </div>
                  <span>{adultCount * adultPrice} ₸</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="mr-2">{childCount}</span>
                    <span>Дети</span>
                  </div>
                  <span>{childCount * childPrice} ₸</span>
                </div>
              </div>
              
              <hr className="my-4" />
              
              <div className="flex justify-between items-center font-medium">
                <span>Итоговая цена</span>
                <span>{totalPrice} ₽</span>
              </div>
              
              <button 
                className="w-full bg-blue-100 text-blue-500 rounded-lg py-3 mt-4 font-medium hover:bg-blue-200 transition"
                onClick={handleProceedToPayment}
              >
                Перейти к оплате
              </button>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="bg-white rounded-xl p-6 flex justify-between items-center mt-4">
          <div>
            <p className="font-medium">Есть вопрос? Ознакомьтесь с нашими часто задаваемыми вопросами</p>
            <p className="text-sm text-gray-600">Или свяжитесь с нашими награжденными экспертами по путешествиям.</p>
          </div>
          <button className="text-blue-500 border border-blue-500 rounded-lg px-4 py-2">
            Посмотреть часто задаваемые вопросы
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
