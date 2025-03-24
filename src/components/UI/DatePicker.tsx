import { useState } from 'react';

export default function DatePicker({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Days of week starting with Monday
  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  // Function to get days for a specific month
  const getDaysInMonth = (year: number, month: number) => {
    const days: { date: Date; currentMonth: boolean }[] = [];

    // Get the first day of the month
    const firstDay = new Date(year, month, 1);

    // Get the last day of the previous month
    const lastDayPrevMonth = new Date(year, month, 0).getDate();

    // Get day of week of first day (0 = Sunday, 1 = Monday, etc.)
    let firstDayIndex = firstDay.getDay() - 1; // Adjust to start from Monday
    if (firstDayIndex < 0) firstDayIndex = 6; // Sunday becomes the 7th day

    // Add days from previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      days.push({
        date: new Date(prevYear, prevMonth, lastDayPrevMonth - i),
        currentMonth: false,
      });
    }

    // Add days of current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        currentMonth: true,
      });
    }

    // Add days from next month to complete the grid
    const daysToAdd = 42 - days.length; // 6 rows of 7 days
    for (let i = 1; i <= daysToAdd; i++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      days.push({
        date: new Date(nextYear, nextMonth, i),
        currentMonth: false,
      });
    }

    return days;
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
    }
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1);
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
    }
  };
  // Get month name
  const getMonthName = (month: number) => {
    const monthName = new Date(2000, month, 1).toLocaleString('default', { month: 'long' });
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
  };

  // Get days for current month
  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  // Check if a date is selected
  const isSelected = (date: Date) => {
    return (
      selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };
  // Format date as "DD Month YYYY"
  const formatDate = (date: Date) => {
    if (!date) return '';
    const day = date.getDate();
    const month = getMonthName(date.getMonth()).toLowerCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="relative">
      <label
        htmlFor="calendar"
        className="block overflow-hidden rounded border border-transparent px-3 focus-within:bg-orange-50 w-52"
      >
        <span className="text-xs font-medium text-gray-700">Дата</span>
        <input
          type="text"
          value={selectedDate ? formatDate(selectedDate) : ''}
          placeholder="Выберите дату"
          id="calendar"
          readOnly
          className="w-full border-none p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-base"
          onClick={() => setShowCalendar(!showCalendar)}
        />
      </label>

      {showCalendar && (
        <div className="absolute top-12 left-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <button onClick={prevMonth} className="p-2 text-gray-600 hover:text-gray-900">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18.5L9 12.5L15 6.5"
                  stroke="#3A4B4F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <h2 className="text-lg font-medium">
              {getMonthName(currentMonth)} {currentYear}
            </h2>
            <button onClick={nextMonth} className="p-2 text-gray-600 hover:text-gray-900">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18.5L15 12.5L9 6.5"
                  stroke="#3A4B4F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          <div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day, i) => (
                <div key={i} className="text-center text-xs text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {daysInCurrentMonth.map((dayObj, i) => (
                <div
                  key={i}
                  className={`
                  h-8 w-8 flex items-center justify-center rounded-full text-sm cursor-pointer
                  ${!dayObj.currentMonth ? 'text-gray-400' : 'text-gray-800'}
                  ${isToday(dayObj.date) ? 'bg-gray-200' : ''}
                  ${isSelected(dayObj.date) ? 'bg-blue-500 text-white' : 'hover:bg-orange-200'}
                `}
                  onClick={() => {
                    setSelectedDate(dayObj.date);
                    setShowCalendar(false);
                  }}
                >
                  {dayObj.date.getDate()}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
