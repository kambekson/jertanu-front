// Определяем строковые литералы для типов туров
export type TourTypeId = 'ethno' | 'nature' | 'cultural' | 'adventure' | 'gastronomy' | 'other';

// Интерфейс для информации о типе тура
export interface TourTypeInfo {
  id: TourTypeId;
  title: string;
  description: string;
  label: string; // Добавляем label из tourFilters
}

// Создаём единый объект с информацией о всех типах туров
export const TOUR_TYPES: Record<TourTypeId, TourTypeInfo> = {
  ethno: {
    id: 'ethno',
    title: 'Этнографический',
    description: 'Погружение в культуру и традиции',
    label: 'Этнографические туры',
  },
  nature: {
    id: 'nature',
    title: 'Природа',
    description: 'Путешествие по природным достопримечательностям',
    label: 'Природные туры',
  },
  cultural: {
    id: 'cultural',
    title: 'Культурный',
    description: 'Посещение исторических и культурных объектов',
    label: 'Культурные туры',
  },
  adventure: {
    id: 'adventure',
    title: 'Приключенческий',
    description: 'Активный отдых и экстремальные развлечения',
    label: 'Приключенческие туры',
  },
  gastronomy: {
    id: 'gastronomy',
    title: 'Гастрономический',
    description: 'Знакомство с национальной кухней',
    label: 'Гастрономические туры',
  },
  other: {
    id: 'other',
    title: 'Другое',
    description: 'Прочие типы туров',
    label: 'Другие туры',
  },
};

// Для обратной совместимости создаём функции, возвращающие данные в прежних форматах

// Получить массив tourTypes в прежнем формате
export const getTourTypes = (): TourTypeInfo[] => Object.values(TOUR_TYPES);

// Получить массив tourFilters в прежнем формате
export const getTourFilters = () =>
  Object.values(TOUR_TYPES).map((type) => ({
    id: type.id,
    label: type.label,
  }));

// Для совместимости с enum TourType
export const TourType: Record<string, TourTypeId> = {
  ETHNO: 'ethno',
  NATURE: 'nature',
  CULTURAL: 'cultural',
  ADVENTURE: 'adventure',
  GASTRO: 'gastronomy',
  OTHER: 'other',
};
