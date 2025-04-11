import { useState, useEffect, useRef, DragEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import DatePicker from '../../components/UI/DatePicker';
import { apiService } from '../../services/apiService';

interface ItineraryStop {
  id: string;
  location: string;
  description: string;
  duration: string;
}

interface TourImage {
  id: string;
  file?: File;
  preview: string;
}

interface TourStatus {
  id: string;
  title: string;
  description: string;
}

interface TourFormData {
  title: string;
  description: string;
  images: TourImage[];
  existingImages: string[];
  price: number;
  discountPrice?: number;
  startDate: string; 
  endDate: string;
  city: string;
  type: string;
  isActive: boolean;
  services: string[];
  itinerary: ItineraryStop[];
  statuses: string[];
  maxParticipants: number;
}

interface ServiceOption {
  id: string;
  title: string;
  description: string;
}

const serviceOptions: ServiceOption[] = [
  {
    id: 'guide',
    title: 'Экскурсовод',
    description: 'Экскурсовод для каждого направления или объекта включен'
  },
  {
    id: 'food',
    title: 'Питание',
    description: 'Завтрак и обед включены'
  },
  {
    id: 'hotel',
    title: 'Отель',
    description: 'Отель включен в стоимость'
  },
  {
    id: 'transfer',
    title: 'Трансфер',
    description: 'Все необходимые транспортные средства предоставлены'
  },
  {
    id: 'tickets',
    title: 'Билеты',
    description: 'Все необходимые билеты включены'
  }
];

const tourStatuses: TourStatus[] = [
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

const tourTypes: TourType[] = [
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

interface TourType {
  id: string;
  title: string;
  description: string;
}

export default function EditTour() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const cityInputRef = useRef<HTMLDivElement>(null);

  const cities = [
    "Абай", "Акколь", "Аксай", "Аксу", "Актау", "Актобе", "Алатау", "Алга", "Алматы",
    "Алтай", "Арал", "Аркалык", "Арыс", "Астана", "Атбасар", "Атырау", "Аягоз",
    "Байконыр", "Балхаш", "Булаево", "Державинск", "Ерейментау", "Есик", "Есиль",
    "Жанаозен", "Жанатас", "Жаркент", "Жезказган", "Жем", "Жетысай", "Житикара",
    "Зайсан", "Казалинск", "Кандыагаш", "Караганды", "Каражал", "Каратау",
    "Каркаралинск", "Каскелен", "Кентау", "Кокшетау", "Конаев", "Костанай", "Косшы",
    "Кулсары", "Курчатов", "Кызылорда", "Ленгер", "Лисаковск", "Макинск", "Семей",
    "Сергеевка", "Серебрянск", "Степногорск", "Степняк", "Тайынша", "Талгар",
    "Талдыкорган", "Тараз", "Текели", "Темир", "Темиртау", "Тобыл", "Туркестан",
    "Уральск", "Усть-Каменогорск", "Ушарал", "Уштобе", "Форт-Шевченко", "Хромтау",
    "Шалкар", "Шар", "Шардара", "Шахтинск", "Шемонаиха", "Шу", "Шымкент", "Щучинск",
    "Экибастуз", "Эмба"
  ];

  const [formData, setFormData] = useState<TourFormData>({
    title: '',
    description: '',
    images: [],
    existingImages: [],
    price: 0,
    discountPrice: undefined,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    city: '',
    type: '', 
    isActive: true,
    services: [],
    itinerary: [],
    statuses: [],
    maxParticipants: 10
  });

  const [newStop, setNewStop] = useState<ItineraryStop>({
    id: '',
    location: '',
    description: '',
    duration: ''
  });

  // Update form data when dates change
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    }));
  }, [startDate, endDate]);

  useEffect(() => {
    const fetchTourData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Преобразуем id в число для запроса, если это возможно
        const numericId = parseInt(id);
        console.log('Fetching tour with ID:', numericId);
        
        const tourData = await apiService.get(`/tours/${numericId}`);
        
        // Парсим даты
        let startDateObj = new Date();
        let endDateObj = new Date();
        
        if (tourData.startDate) {
          startDateObj = new Date(tourData.startDate);
          setStartDate(startDateObj);
        }
        
        if (tourData.endDate) {
          endDateObj = new Date(tourData.endDate);
          setEndDate(endDateObj);
        }
        
        // Преобразуем данные тура в формат для формы
        const mappedItinerary = tourData.itinerary ? tourData.itinerary.map((stop: any, index: number) => ({
          id: String(index),
          location: stop.location || '',
          description: stop.description || '',
          duration: stop.duration || ''
        })) : [];
        
        // Определяем статус тура
        const statusList = tourData.status ? [tourData.status] : [];
        
        // Получаем список сервисов
        const serviceList = tourData.services ? 
          tourData.services.map((serviceName: string) => {
            const service = serviceOptions.find(s => s.title === serviceName);
            return service ? service.id : serviceName.toLowerCase().replace(/\s/g, '_');
          }) : [];
        
        // Создаем превью для существующих изображений
        const existingImages = tourData.imageUrls || [];
        
        setFormData({
          title: tourData.title || '',
          description: tourData.description || '',
          images: [],
          existingImages: existingImages,
          price: tourData.price || 0,
          discountPrice: tourData.discountPrice,
          startDate: startDateObj.toISOString().split('T')[0],
          endDate: endDateObj.toISOString().split('T')[0],
          city: tourData.city || '',
          type: tourData.type || '',
          isActive: tourData.isActive !== undefined ? tourData.isActive : true,
          services: serviceList,
          itinerary: mappedItinerary,
          statuses: statusList,
          maxParticipants: tourData.maxParticipants || 10
        });
      } catch (err) {
        console.error('Ошибка при загрузке данных тура:', err);
        setError(err instanceof Error ? err.message : 'Ошибка при загрузке данных тура');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTourData();
  }, [id]);

  // Сохраняем форму в localStorage при изменении
  useEffect(() => {
    if (id && formData.title) {
      try {
        // Сохраняем только данные без объектов File
        const dataForSave = {
          ...formData,
          images: [] // Не сохраняем файлы, только существующие изображения
        };
        localStorage.setItem(`tour_edit_backup_${id}`, JSON.stringify(dataForSave));
      } catch (e) {
        console.error('Ошибка при сохранении резервной копии формы:', e);
      }
    }
  }, [formData, id]);

  // Загружаем резервную копию формы, если есть
  useEffect(() => {
    if (id && loading && !formData.title) {
      try {
        const savedData = localStorage.getItem(`tour_edit_backup_${id}`);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          // Проверяем, что это не старые данные
          if (parsedData.title) {
            console.log('Найдена резервная копия данных формы');
            // Предлагаем восстановить только если есть что восстанавливать
            // и form не была уже заполнена из API
            if (window.confirm('Найдена несохраненная версия этого тура. Восстановить данные?')) {
              setFormData(parsedData);
              
              // Восстанавливаем даты
              if (parsedData.startDate) {
                setStartDate(new Date(parsedData.startDate));
              }
              if (parsedData.endDate) {
                setEndDate(new Date(parsedData.endDate));
              }
            } else {
              // Пользователь отказался, удаляем резервную копию
              localStorage.removeItem(`tour_edit_backup_${id}`);
            }
          }
        }
      } catch (e) {
        console.error('Ошибка при загрузке резервной копии формы:', e);
      }
    }
  }, [id, loading, formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      if (name === 'isActive') {
        setFormData({
          ...formData,
          isActive: target.checked
        });
      } else if (name.startsWith('service_')) {
        const serviceId = name.replace('service_', '');
        const updatedServices = target.checked
          ? [...formData.services, serviceId]
          : formData.services.filter(id => id !== serviceId);
        setFormData({
          ...formData,
          services: updatedServices
        });
      }
    } else if (name === 'price' || name === 'discountPrice' || name === 'maxParticipants') {
      setFormData({
        ...formData,
        [name]: value === '' ? 0 : isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });

      // Handle city suggestions
      if (name === 'city') {
        if (value) {
          const filteredSuggestions = cities.filter(city => 
            city.toLowerCase().includes(value.toLowerCase())
          );
          setSuggestions(filteredSuggestions);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      }
    }
  };

  const handleNewStopChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewStop(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addItineraryStop = () => {
    if (newStop.location && newStop.description && newStop.duration) {
      const stopWithId = {
        ...newStop,
        id: Date.now().toString()
      };
      setFormData(prev => ({
        ...prev,
        itinerary: [...prev.itinerary, stopWithId]
      }));
      setNewStop({
        id: '',
        location: '',
        description: '',
        duration: ''
      });
    }
  };

  const removeItineraryStop = (id: string) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter(stop => stop.id !== id)
    }));
  };

  const handleImageUpload = (files: FileList) => {
    const newImages = Array.from(files).map(file => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file)
    }));

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const removeImage = (id: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => {
        if (img.id === id) {
          URL.revokeObjectURL(img.preview); // Cleanup preview URL
          return false;
        }
        return true;
      })
    }));
  };

  const removeExistingImage = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      existingImages: prev.existingImages.filter(url => url !== imageUrl)
    }));
  };

  const handleStatusChange = (statusId: string) => {
    setFormData(prev => ({
      ...prev,
      statuses: prev.statuses.includes(statusId)
        ? prev.statuses.filter(id => id !== statusId)
        : [...prev.statuses, statusId]
    }));
  };

  const handleCitySelect = (city: string) => {
    setFormData({
      ...formData,
      city
    });
    setShowSuggestions(false);
  };

  // Handle city input focus
  const handleCityFocus = () => {
    if (formData.city) {
      const filteredSuggestions = cities.filter(city => 
        city.toLowerCase().includes(formData.city.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions(cities);
    }
    setShowSuggestions(true);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityInputRef.current && !cityInputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Prevent form submission from date picker
  const preventFormSubmission = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id) {
      setError('ID тура не найден');
      return;
    }
    
    try {
      // Валидация перед отправкой формы
      if (formData.title.trim() === '') {
        throw new Error('Название тура не может быть пустым');
      }
      
      if (formData.city.trim() === '') {
        throw new Error('Укажите город');
      }
      
      if (formData.type === '') {
        throw new Error('Выберите тип тура');
      }
      
      if (formData.description.trim() === '') {
        throw new Error('Добавьте описание тура');
      }
      
      if (formData.itinerary.length === 0) {
        throw new Error('Добавьте хотя бы одну точку маршрута');
      }

      // Валидация числовых полей
      if (formData.price === undefined || isNaN(formData.price) || formData.price <= 0) {
        throw new Error('Цена должна быть положительным числом');
      }
      
      if (formData.discountPrice !== undefined && (isNaN(formData.discountPrice) || formData.discountPrice <= 0)) {
        throw new Error('Цена со скидкой должна быть положительным числом');
      }
      
      if (formData.discountPrice !== undefined && formData.discountPrice >= formData.price) {
        throw new Error('Цена со скидкой должна быть меньше обычной цены');
      }

      if (formData.maxParticipants <= 0) {
        throw new Error('Максимальное количество участников должно быть больше 0');
      }

      // After validation, proceed with form submission
      setLoading(false);
      setSaving(true);
      setError(null);

      // Подготовка данных для отправки
      const serviceNames = formData.services.map(serviceId => {
        const service = serviceOptions.find(s => s.id === serviceId);
        return service ? service.title : serviceId;
      });

      // Преобразование итинерария в формат API
      const itineraryForApi = formData.itinerary.map(stop => ({
        location: stop.location,
        description: stop.description,
        duration: stop.duration
      }));

      // Получение статуса тура
      const status = formData.statuses.length > 0 ? formData.statuses[0] : 'seasonal';

      // Преобразуем id в число для запроса, если это возможно
      const numericId = parseInt(id);
      console.log('Отправка данных на API по ID:', numericId);

      try {
        // Подготовка FormData для отправки
        const formDataForSubmit = new FormData();

        // Создаем полную структуру данных для API, идентичную успешному примеру из Postman
        const apiTourData = {
          id: numericId,
          title: formData.title,
          description: formData.description,
          city: formData.city,
          price: formData.price,
          discountPrice: formData.discountPrice,
          type: formData.type,
          status: status,
          startDate: new Date(formData.startDate).toISOString(),
          endDate: new Date(formData.endDate).toISOString(),
          isActive: formData.isActive,
          services: serviceNames,
          itinerary: itineraryForApi,
          maxParticipants: formData.maxParticipants,
          imageUrls: formData.existingImages
        };
        
        console.log('Данные для отправки:', JSON.stringify(apiTourData, null, 2));
        
        // Добавляем данные в FormData с тем же ключом 'data', как в Postman
        formDataForSubmit.append('data', JSON.stringify(apiTourData));
        
        // Добавляем новые изображения точно так же, как в примере Postman - с ключом 'images'
        formData.images.forEach((image, index) => {
          if (image.file) {
            console.log(`Добавление изображения ${index} в FormData с ключом 'images'`);
            formDataForSubmit.append('images', image.file);
          }
        });

        // Логирование всего содержимого formData для отладки
        console.log('FormData entries:');
        for (const pair of formDataForSubmit.entries()) {
          console.log(`${pair[0]}: ${pair[1] instanceof File ? 
            `File: ${pair[1].name} (${pair[1].size} bytes)` : 
            (typeof pair[1] === 'string' && pair[1].length > 100 ? 
              `${pair[1].substring(0, 100)}...` : pair[1])}`);
        }

        // Используем специальный метод для отправки FormData с PATCH
        console.log('Отправка PATCH запроса на сервер с FormData...');
        
        try {
          // Сначала пробуем отправить через FormData (как в примере form-data из Postman)
          const tourResult = await apiService.patchFormData(`/tours/${numericId}`, formDataForSubmit);
          console.log('Тур успешно обновлен (FormData метод):', tourResult);
        } catch (formDataError) {
          console.error('Ошибка при отправке через FormData:', formDataError);
          
          // Если FormData не сработал, пробуем отправить напрямую через JSON (как в примере JSON из Postman)
          console.log('Попытка отправки через JSON...');
          
          // Удаляем из данных все, что относится к файлам
          const jsonData = {
            ...apiTourData,
            // Не отправляем новые изображения через JSON
          };
          
          // Пробуем отправить через JSON
          const jsonResult = await apiService.patchDirectJson(`/tours/${numericId}`, jsonData);
          console.log('Тур успешно обновлен (JSON метод):', jsonResult);
        }
        
        // Очистка превью изображений
        formData.images.forEach(img => {
          URL.revokeObjectURL(img.preview);
        });

        // Очистка кэша для гарантированного отображения обновленных данных
        try {
          // Используем Cache API для очистки кэша, если поддерживается
          if ('caches' in window) {
            const cacheCleaned = await caches.delete('api-cache');
            console.log('Кэш API очищен:', cacheCleaned);
          }
          
          // Также отправляем запрос для обновления тура в localStorage или sessionStorage, если используется
          sessionStorage.removeItem(`tour_${numericId}`);
          localStorage.removeItem(`tour_${numericId}`);
          
          // Удаляем резервную копию формы
          localStorage.removeItem(`tour_edit_backup_${id}`);
          
          // Инвалидация кэша для списка туров
          sessionStorage.removeItem('agency_tours');
          localStorage.removeItem('agency_tours');
          
          console.log('Локальный кэш очищен');
        } catch (cacheError) {
          console.error('Ошибка при очистке кэша:', cacheError);
          // Ошибка очистки кэша не должна останавливать процесс
        }

        // Устанавливаем состояние успеха
        setSuccess(true);
        
        // Устанавливаем флаг обновления в sessionStorage, чтобы страница 
        // со списком туров знала, что нужно обновить данные
        sessionStorage.setItem('tours_updated', 'true');
        sessionStorage.setItem('last_updated_tour_id', numericId.toString());
        
        // Задержка перед перенаправлением для отображения сообщения об успехе
        setTimeout(() => {
          navigate('/agency/my-tours');
        }, 1500);
      } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        setError(error instanceof Error ? error.message : 'Произошла ошибка при обновлении тура. Пожалуйста, попробуйте снова.');
        setSaving(false);
      }
    } catch (error) {
      console.error('Ошибка валидации:', error);
      setError(error instanceof Error ? error.message : 'Произошла ошибка при валидации формы. Пожалуйста, проверьте введенные данные.');
      setSaving(false);
    }
  };

  // Обработчик для сохранения только текстовых данных, без изображений (аварийный вариант)
  const handleSaveJsonOnly = async () => {
    if (!id) {
      setError('ID тура не найден');
      return;
    }
    
    try {
      setSaving(true);
      setError(null);
      
      // Подготовка данных для отправки (только текстовые данные)
      const serviceNames = formData.services.map(serviceId => {
        const service = serviceOptions.find(s => s.id === serviceId);
        return service ? service.title : serviceId;
      });
      
      const itineraryForApi = formData.itinerary.map(stop => ({
        location: stop.location,
        description: stop.description,
        duration: stop.duration
      }));
      
      const status = formData.statuses.length > 0 ? formData.statuses[0] : 'seasonal';
      const numericId = parseInt(id);
      
      // Создаем данные для API
      const jsonData = {
        id: numericId,
        title: formData.title,
        description: formData.description,
        city: formData.city,
        price: formData.price,
        discountPrice: formData.discountPrice,
        type: formData.type,
        status: status,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        isActive: formData.isActive,
        services: serviceNames,
        itinerary: itineraryForApi,
        maxParticipants: formData.maxParticipants,
        imageUrls: formData.existingImages
      };
      
      console.log('Отправка только JSON данных:', JSON.stringify(jsonData, null, 2));
      
      // Отправляем напрямую через JSON
      const result = await apiService.patchDirectJson(`/tours/${numericId}`, jsonData);
      console.log('Тур успешно обновлен (только JSON):', result);
      
      // Очистка кэша и установка флагов для обновления списка
      try {
        if ('caches' in window) {
          await caches.delete('api-cache');
        }
        
        sessionStorage.removeItem(`tour_${numericId}`);
        localStorage.removeItem(`tour_${numericId}`);
        localStorage.removeItem(`tour_edit_backup_${id}`);
        sessionStorage.removeItem('agency_tours');
        localStorage.removeItem('agency_tours');
        sessionStorage.setItem('tours_updated', 'true');
        sessionStorage.setItem('last_updated_tour_id', numericId.toString());
        
        console.log('Локальный кэш очищен');
      } catch (cacheError) {
        console.error('Ошибка при очистке кэша:', cacheError);
      }
      
      // Устанавливаем состояние успеха и перенаправляем
      setSuccess(true);
      setTimeout(() => {
        navigate('/agency/my-tours');
      }, 1500);
    } catch (error) {
      console.error('Ошибка при отправке JSON данных:', error);
      setError(error instanceof Error ? error.message : 'Произошла ошибка при обновлении тура.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <p className="text-center text-gray-600">Загрузка данных тура...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <p className="text-center text-red-500">{error}</p>
          <div className="mt-4 text-center">
            <Button variant="primary" onClick={() => navigate('/agency/my-tours')}>
              Вернуться к списку туров
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link 
                to="/agency/my-tours" 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft size={24} className="text-gray-600" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Редактирование тура</h1>
            </div>
            
            {success && (
              <div className="bg-green-100 text-green-800 py-2 px-4 rounded-lg flex items-center">
                <span className="mr-2">✓</span> Тур успешно сохранен!
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-100 text-red-800 py-3 px-6 border-b border-red-200">
              <div className="flex items-center">
                <span className="mr-2">⚠️</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Info Card */}
                <div className="bg-gray-50 rounded-lg p-6 space-y-6">
                  <div className="space-y-4">
                    <Input
                      id="title"
                      name="title"
                      label="Название тура"
                      placeholder="Например: Тур на Чарынский каньон"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
    
                    <div className="relative" ref={cityInputRef}>
                      <div className="space-y-1">
                        <label htmlFor="city" className="block text-gray-700 mb-1">
                          Город
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          placeholder="Например: Алматы"
                          value={formData.city}
                          onChange={handleInputChange}
                          onFocus={handleCityFocus}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md overflow-auto">
                          <ul className="py-1">
                            {suggestions.map((city, index) => (
                              <li 
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleCitySelect(city)}
                              >
                                {city}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <Input
                      id="description"
                      name="description"
                      label="Описание"
                      placeholder="Подробное описание тура..."
                      type="textarea"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startDate" className="block text-gray-700 mb-1">
                        Дата начала
                      </label>
                      <div 
                        className="w-full p-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
                        onClick={preventFormSubmission}
                      >
                        <DatePicker 
                          selectedDate={startDate} 
                          setSelectedDate={setStartDate} 
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="endDate" className="block text-gray-700 mb-1">
                        Дата окончания
                      </label>
                      <div 
                        className="w-full p-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
                        onClick={preventFormSubmission}
                      >
                        <DatePicker 
                          selectedDate={endDate} 
                          setSelectedDate={setEndDate} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Itinerary Card */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Маршрут</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {formData.itinerary.map((stop) => (
                      <div 
                        key={stop.id} 
                        className="bg-gray-50 rounded-lg p-4 relative hover:shadow-md transition-shadow"
                      >
                        <button
                          type="button"
                          onClick={() => removeItineraryStop(stop.id)}
                          className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <X size={20} className="text-gray-500" />
                        </button>
                        <h4 className="text-sm font-medium text-gray-900 pr-8">{stop.location}</h4>
                        <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{stop.description}</p>
                        <p className="text-sm text-gray-500 mt-1">Длительность: {stop.duration}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <Input
                      id="location"
                      name="location"
                      label="Локация"
                      placeholder="Например: День 1: Алматы"
                      value={newStop.location}
                      onChange={handleNewStopChange}
                    />
                    <Input
                      id="stopDescription"
                      name="description"
                      label="Описание"
                      placeholder="Описание остановки..."
                      type="textarea"
                      value={newStop.description}
                      onChange={handleNewStopChange}
                    />
                    <Input
                      id="duration"
                      name="duration"
                      label="Длительность"
                      placeholder="Например: 1 день"
                      value={newStop.duration}
                      onChange={handleNewStopChange}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={addItineraryStop}
                      className="w-full"
                    >
                      Добавить остановку
                    </Button>
                  </div>
                </div>

                {/* Services Card */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Услуги</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serviceOptions.map((service) => (
                      <div key={service.id} className="flex items-start">
                        <input
                          type="checkbox"
                          id={`service_${service.id}`}
                          name={`service_${service.id}`}
                          checked={formData.services.includes(service.id)}
                          onChange={handleInputChange}
                          className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={`service_${service.id}`} className="ml-3">
                          <span className="block text-sm font-medium text-gray-700">{service.title}</span>
                          <span className="block text-sm text-gray-500">{service.description}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
              
                {/* Images Card */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Фотографии</h3>
                  
                  {/* Existing Images */}
                  {formData.existingImages.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-800 mb-2">Текущие изображения:</h4>
                      <div className="space-y-3">
                        {formData.existingImages.map((imageUrl, index) => (
                          <div key={index} className="relative group rounded-md overflow-hidden">
                            <img
                              src={imageUrl}
                              alt={`Tour ${index}`}
                              className="w-full h-32 object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeExistingImage(imageUrl)}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Upload New Images */}
                  <div
                    className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
                      isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      multiple
                      accept="image/*"
                      onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                    />
                    <Upload className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">Перетащите или выберите новые фотографии</p>
                    <p className="mt-1 text-xs text-gray-500">PNG, JPG, WEBP до 10МБ</p>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="text-sm font-medium text-gray-800 mb-2">Новые изображения:</h4>
                      {formData.images.map((image) => (
                        <div key={image.id} className="relative group rounded-md overflow-hidden">
                          <img
                            src={image.preview}
                            alt="Preview"
                            className="w-full h-32 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(image.id)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pricing & Status Card */}
                <div className="bg-gray-50 rounded-lg p-6 space-y-6">
                  <div className="space-y-4">
                    <Input
                      id="price"
                      name="price"
                      label="Цена (₸)"
                      placeholder="50000"
                      type="number"
                      value={formData.price === 0 ? '' : formData.price.toString()}
                      onChange={handleInputChange}
                    />
                    <Input
                      id="discountPrice"
                      name="discountPrice"
                      label="Цена со скидкой (₸)"
                      placeholder="45000"
                      type="number"
                      value={formData.discountPrice === 0 ? '' : formData.discountPrice?.toString() || ''}
                      onChange={handleInputChange}
                    />
                    <Input
                      id="maxParticipants"
                      name="maxParticipants"
                      label="Максимальное количество участников"
                      placeholder="10"
                      type="number"
                      value={formData.maxParticipants.toString()}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="text-sm text-gray-700">Активный тур</label>
                    </div>

                    <div className="space-y-3">
                      {tourStatuses.map((status) => (
                        <div key={status.id} className="flex items-start">
                          <input
                            type="checkbox"
                            id={`status_${status.id}`}
                            checked={formData.statuses.includes(status.id)}
                            onChange={() => handleStatusChange(status.id)}
                            className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label htmlFor={`status_${status.id}`} className="ml-3">
                            <span className="block text-sm font-medium text-gray-700">{status.title}</span>
                            <span className="block text-sm text-gray-500">{status.description}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                 {/* Tour Type Card */}
                 <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Тип тура</h3>
                  <div className="space-y-3">
                    {tourTypes.map((type) => (
                      <div key={type.id} className="flex items-start">
                        <input
                          type="radio"
                          id={`type_${type.id}`}
                          name="type"
                          checked={formData.type === type.id}
                          onChange={() => setFormData({...formData, type: type.id})}
                          className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded-full focus:ring-blue-500"
                        />
                        <label htmlFor={`type_${type.id}`} className="ml-3">
                          <span className="block text-sm font-medium text-gray-700">{type.title}</span>
                          <span className="block text-sm text-gray-500">{type.description}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-4">
              <Link to="/agency/my-tours">
                <Button variant="neutral" className="px-6">Отмена</Button>
              </Link>
              
              <Button 
                type="button" 
                variant="secondary"
                onClick={handleSaveJsonOnly}
                disabled={saving}
                className="px-6"
                title="Сохранить только текстовые данные (без новых изображений)"
              >
                {saving ? 'Сохранение...' : 'Сохранить только текст'}
              </Button>
              
              <Button 
                type="submit" 
                variant="primary" 
                disabled={loading || saving}
                className="px-6"
              >
                {saving ? 'Сохранение...' : 'Сохранить изменения'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 