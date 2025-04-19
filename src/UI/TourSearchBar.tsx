import { useState } from 'react';
import DatePicker from './DatePicker.tsx';
import AutocompleteInput from './AutocompleteInput.tsx';

export default function TourSearchBar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="absolute top-[85%] md:top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-3 md:py-4 px-3 md:px-6 bg-white rounded-xl md:rounded-2xl w-[92%] max-w-[350px] md:max-w-[700px] lg:max-w-[900px] shadow-lg md:shadow-2xl">
      <div className="grid grid-cols-1 gap-3 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
          <AutocompleteInput
            placeholder="Нажмите здесь, чтобы изменить"
            inputlabel="Место назначение"
          />

          <div className="w-full rounded border border-transparent px-2 md:px-3 focus-within:bg-orange-50">
            <span className="text-xs font-medium text-gray-700">Выберите дату</span>
            <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </div>

          <button className="bg-blue-400 hover:bg-blue-500 transition-colors text-white rounded-lg flex items-center justify-center gap-2 font-medium h-10 md:h-12 w-full">
            <p>Поиск</p>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 md:w-6 md:h-6"
            >
              <path
                d="M21.53 20.97L17.689 17.129C18.973 15.606 19.75 13.643 19.75 11.5C19.75 6.675 15.825 2.75 11 2.75C6.175 2.75 2.25 6.675 2.25 11.5C2.25 16.325 6.175 20.25 11 20.25C13.143 20.25 15.106 19.473 16.629 18.189L20.47 22.03C20.616 22.176 20.808 22.25 21 22.25C21.192 22.25 21.384 22.177 21.53 22.03C21.823 21.738 21.823 21.263 21.53 20.97ZM3.75 11.5C3.75 7.502 7.002 4.25 11 4.25C14.998 4.25 18.25 7.502 18.25 11.5C18.25 15.498 14.998 18.75 11 18.75C7.002 18.75 3.75 15.498 3.75 11.5Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
