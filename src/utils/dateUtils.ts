export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  
  
export const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
    const lastDigit = diffDays % 10;
    const lastTwoDigits = diffDays % 100;
    
    let dayWord = 'дней';
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      dayWord = 'дней';
    } else if (lastDigit === 1) {
      dayWord = 'день';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      dayWord = 'дня';
    }
    
    return `${diffDays} ${dayWord}`;
  };