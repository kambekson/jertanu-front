export interface TourStatus {
    id: string;
    title: string;
    description: string;
  }


export const tourStatuses: TourStatus[] = [
    {
      id: 'seasonal',
      title: 'Сезонный тур',
      description: 'Тур доступен только в определенный сезон'
    },
    {
      id: 'hot',
      title: 'Горячий тур',
      description: 'Специальное предложение с ограниченным временем'
    },
    {
      id: 'new_destination',
      title: 'Новое направление',
      description: 'Недавно добавленный маршрут'
    },
  ];