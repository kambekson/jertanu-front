export interface ServiceOption {
  id: string;
  title: string;
  description: string;
}

export const serviceOptions: ServiceOption[] = [
  {
    id: 'guide',
    title: 'Экскурсовод',
    description: 'Экскурсовод для каждого направления или объекта включен',
  },
  {
    id: 'food',
    title: 'Питание',
    description: 'Завтрак и обед включены',
  },
  {
    id: 'hotel',
    title: 'Отель',
    description: 'Отель включен в стоимость',
  },
  {
    id: 'transfer',
    title: 'Трансфер',
    description: 'Все необходимые транспортные средства предоставлены',
  },
  {
    id: 'tickets',
    title: 'Билеты',
    description: 'Все необходимые билеты включены',
  },
];
