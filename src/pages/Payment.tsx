import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';

interface PaymentProps {
  // Props can be expanded based on requirements
}

const Payment: React.FC<PaymentProps> = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<number>(3);
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [agreed, setAgreed] = useState<boolean>(false);

  // Sample data (would come from previous pages/context in a real app)
  const adultCount = 4;
  const childCount = 1;
  const adultPrice = 7500;
  const childPrice = 15000;
  const totalPrice = adultCount * adultPrice + childCount * childPrice;

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(e.target.checked);
  };

  const handleSubmitPayment = () => {
    // Handle payment processing
    console.log('Processing payment...');
    // navigate('/confirmation');
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <div className="container mx-auto px-4 py-6">
        {/* Steps indicator */}
        <div className="flex justify-between items-center mb-10 px-4 sm:px-8">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-blue-500 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-xs mt-1">Выбор тура</span>
          </div>
          <div className="flex-1 h-0.5 bg-blue-500 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-blue-500 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-xs mt-1">Ввод данных</span>
          </div>
          <div className="flex-1 h-0.5 bg-blue-500 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 border-2 border-blue-500 rounded-full flex items-center justify-center bg-white text-blue-500">
              3
            </div>
            <span className="text-xs mt-1">Оплата</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Payment method selection */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <h2 className="text-lg font-medium mb-4">Выберите способ оплаты?</h2>

              {/* Card Payment Option */}
              <div
                className="border rounded-lg p-4 mb-3 cursor-pointer"
                onClick={() => handlePaymentMethodChange('card')}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">Оплата картой</span>
                  <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                    {paymentMethod === 'card' && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>

              {/* Split Payment Option */}
              <div
                className="border rounded-lg p-4 cursor-pointer"
                onClick={() => handlePaymentMethodChange('split')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">Оплатите часть сейчас, часть позже</span>
                    <div className="text-sm text-blue-500 cursor-pointer">Посмотреть детали</div>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                    {paymentMethod === 'split' && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment form for card */}
            {paymentMethod === 'card' && (
              <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
                <h2 className="text-lg font-medium mb-4">Оплатить с помощью</h2>
                <div className="flex gap-2 mb-4">
                  <div className="p-1 border rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <div className="p-1 border rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div className="p-1 border rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1">Кредитная или дебетовая карта</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg"
                      placeholder="Input"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1">Номер карты</label>
                  <input type="text" className="w-full p-2 border rounded-lg" placeholder="Input" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm mb-1">Срок действия</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg"
                      placeholder="Input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">CVV</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg"
                      placeholder="Input"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Invoice option */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <h2 className="text-lg font-medium mb-4">Выставить счет</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm mb-1">Кредитная или дебетовая карта</label>
                  <input type="text" className="w-full p-2 border rounded-lg" placeholder="" />
                </div>
                <div>
                  <label className="block text-sm mb-1">адрес улицы</label>
                  <input type="text" className="w-full p-2 border rounded-lg" placeholder="" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm mb-1">Номер квартиры</label>
                  <input type="text" className="w-full p-2 border rounded-lg" placeholder="" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Город</label>
                  <input type="text" className="w-full p-2 border rounded-lg" placeholder="" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm mb-1">Состояние</label>
                  <input type="text" className="w-full p-2 border rounded-lg" placeholder="" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Почтовый индекс</label>
                  <input type="text" className="w-full p-2 border rounded-lg" placeholder="" />
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <h2 className="text-lg font-medium mb-3">Политика отмены</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  Этот тариф не подлежит возврату. Если вы измените или отмените бронирование, вы не
                  получите возврат или кредит на оплату будущего проживания.
                </li>
                <li>Возврат денежных средств за поздний заезд или ранний выезд не производится.</li>
                <li>Для продления срока пребывания требуется новое бронирование.</li>
              </ul>
            </div>

            {/* Privacy Policy */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium mb-3">Политика конфиденциальности</h2>
              <div className="flex items-start mb-4">
                <input
                  type="checkbox"
                  className="mt-1 mr-2"
                  checked={agreed}
                  onChange={handleAgreementChange}
                />
                <div>
                  <span className="text-sm">Я принимаю </span>
                  <a href="#" className="text-sm text-blue-600">
                    Условия и положения
                  </a>
                  <span className="text-sm"> и </span>
                  <a href="#" className="text-sm text-blue-600">
                    Политика конфиденциальности ЖерТану
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Tour"
                    className="w-12 h-12 rounded-lg object-cover mr-3"
                  />
                  <h3 className="font-medium">Актау за 21 день</h3>
                </div>
                <button className="text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              <div className="border-t my-4"></div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Гости и цены</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Янв, 05.2025, время 05:00</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span>5 Отель</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span>1 главная, 2 маленькие комнаты</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Транспорт включен</span>
                  </div>
                </div>
              </div>

              <div className="border-t my-4"></div>

              <div>
                <h4 className="font-medium mb-2">Гости и цены</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div>4 Взрослые</div>
                    <div>30.000</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>1 Дети</div>
                    <div>15.000</div>
                  </div>
                  <div className="flex justify-between font-medium pt-3">
                    <div>Итоговая цена</div>
                    <div className="text-blue-600">45 000</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  variant="primary"
                  className="w-full py-3"
                  disabled={!agreed}
                  onClick={handleSubmitPayment}
                >
                  Оплатить
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
