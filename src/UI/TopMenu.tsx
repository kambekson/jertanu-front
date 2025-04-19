// Tabs.jsx
import { useState } from 'react';

const TopMenu = () => {
  // Состояние для отслеживания активной вкладки
  const [activeTab, setActiveTab] = useState('Длительность');

  // Массив с названиями вкладок
  const tabs = ['Длительность', 'Перелет', 'План путешествия', 'Сервис', 'Расписание', 'Отзывы'];

  return (
    <div className="bg-gray-200 rounded-lg">
      <div className="py-2 px-5 grid grid-cols-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200
                ${
                  activeTab === tab
                    ? ' text-gray-700 font-black bg-gray-100 rounded-lg font-lg'
                    : 'text-gray-600 hover:text-blue-600 font-normal font-lg'
                }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopMenu;
