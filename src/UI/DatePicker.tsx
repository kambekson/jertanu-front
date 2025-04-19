import { useState, useEffect, useRef } from 'react';

export default function DatePicker({
  selectedDate,
  setSelectedDate,
  className = '',
}: {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  className?: string;
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const calendarRef = useRef<HTMLDivElement>(null);

  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const getDaysInMonth = (year: number, month: number) => {
    const days: { date: Date; currentMonth: boolean }[] = [];
    const firstDay = new Date(year, month, 1);
    const lastDayPrevMonth = new Date(year, month, 0).getDate();
    let firstDayIndex = firstDay.getDay() - 1;
    if (firstDayIndex < 0) firstDayIndex = 6;

    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      days.push({
        date: new Date(prevYear, prevMonth, lastDayPrevMonth - i),
        currentMonth: false,
      });
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        currentMonth: true,
      });
    }

    const daysToAdd = 42 - days.length;
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

  const prevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
    }
  };

  const nextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1);
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
    }
  };
  const getMonthName = (month: number) => {
    const monthName = new Date(2000, month, 1).toLocaleString('default', { month: 'long' });
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
  };

  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  const isSelected = (date: Date) => {
    return (
      selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };
  const formatDate = (date: Date) => {
    if (!date) return '';
    const day = date.getDate();
    const month = getMonthName(date.getMonth()).toLowerCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDateClick = (date: Date, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedDate(date);
    setShowCalendar(false);
  };

  return (
    <div className={`relative ${className}`} ref={calendarRef}>
      <input
        type="text"
        value={selectedDate ? formatDate(selectedDate) : ''}
        placeholder="Выберите дату"
        readOnly
        className="w-full bg-transparent border-none p-0 focus:border-transparent focus:ring-0 focus:outline-none text-sm"
        onClick={(e) => {
          e.preventDefault();
          setShowCalendar(!showCalendar);
        }}
      />

      {showCalendar && (
        <div
          className="absolute top-10 left-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 w-64"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevMonth}
              className="p-2 text-gray-600 hover:text-gray-900"
              type="button"
            >
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <h2 className="text-lg font-medium">
              {getMonthName(currentMonth)} {currentYear}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 text-gray-600 hover:text-gray-900"
              type="button"
            >
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                  onClick={(e) => handleDateClick(dayObj.date, e)}
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
