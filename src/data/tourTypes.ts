export const tourTypes: TourType[] = [
    {
      id: 'ethno',
      title: 'Этнографический',
      description: 'Погружение в культуру и традиции'
    },
    {
      id: 'nature',
      title: 'Природа',
      description: 'Путешествие по природным достопримечательностям'
    },
    {
      id: 'adventure',
      title: 'Приключенческий',
      description: 'Активный отдых и экстремальные развлечения'
    },
    {
      id: 'cultural',
      title: 'Культурный',
      description: 'Посещение исторических и культурных объектов'
    },
    {
      id: 'gastronomy',
      title: 'Гастрономический',
      description: 'Знакомство с национальной кухней'
    }
  ];
  
  export interface TourType {
    id: string;
    title: string;
    description: string;
  }