import { useState, useRef, DragEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, X, Upload } from 'lucide-react';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';

interface ItineraryStop {
  id: string;
  location: string;
  description: string;
  duration: string;
}

interface TourImage {
  id: string;
  file: File;
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
    id: 'room_service',
    title: 'Услуги в номере',
    description: 'Уборка в номере, прачечная, услуги в номере и т.д.'
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

interface TourType {
  id: string;
  title: string;
  description: string;
}

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


export default function AddTour() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<TourFormData>({
    title: '',
    description: '',
    images: [],
    price: 0,
    discountPrice: undefined,
    startDate: '',
    endDate: '',
    city: '',
    type: '', 
    isActive: true,
    services: [],
    itinerary: [],
    statuses: []
  });

  const [newStop, setNewStop] = useState<ItineraryStop>({
    id: '',
    location: '',
    description: '',
    duration: ''
  });

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
    } else if (name === 'price' || name === 'discountPrice') {
      setFormData({
        ...formData,
        [name]: value === '' ? undefined : parseInt(value, 10)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
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

  const handleStatusChange = (statusId: string) => {
    setFormData(prev => ({
      ...prev,
      statuses: prev.statuses.includes(statusId)
        ? prev.statuses.filter(id => id !== statusId)
        : [...prev.statuses, statusId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Валидация числовых полей
      if (isNaN(formData.price) || formData.price <= 0) {
        throw new Error('Цена должна быть положительным числом');
      }
      if (formData.discountPrice && (isNaN(formData.discountPrice) || formData.discountPrice <= 0)) {
        throw new Error('Цена со скидкой должна быть положительным числом');
      }
      if (formData.discountPrice && formData.discountPrice >= formData.price) {
        throw new Error('Цена со скидкой должна быть меньше обычной цены');
      }

      // Получаем токен из localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Не авторизован');
      }

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

      // Загрузка изображений и получение URL
      // В реальном приложении здесь будет загрузка файлов на сервер
      // и получение URL для каждого изображения
      const imageUrls = formData.images.length > 0 
        ? ['https://example.com/placeholder-image.jpg'] 
        : [''];

      // Создание объекта данных для API
      const tourData = {
        title: formData.title,
        description: formData.description,
        city: formData.city,
        price: formData.price,
        discountPrice: formData.discountPrice,
        type: formData.type,
        status: status,
        startDate: formData.startDate,
        endDate: formData.endDate,
        isActive: formData.isActive,
        services: serviceNames,
        itinerary: itineraryForApi,
        images: imageUrls
      };

      console.log('Отправка данных на API:', tourData);

      // Отправка данных на сервер
      const response = await fetch('http://localhost:3000/api/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tourData)
      });

      if (!response.ok) {
        throw new Error(`Ошибка при создании тура: ${response.status}`);
      }

      const result = await response.json();
      console.log('Тур успешно создан:', result);
      
      // Очистка превью изображений
      formData.images.forEach(img => {
        URL.revokeObjectURL(img.preview);
      });

      navigate('/agency/my-tours');
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      alert('Произошла ошибка при создании тура. Пожалуйста, попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Link to="/agency/my-tours" className="mr-4 text-gray-600 hover:text-gray-800">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Добавление нового тура</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Text Fields */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-4">
                  <Input
                    id="title"
                    name="title"
                    label="Название тура"
                    placeholder="Например: Тур на Чарынский каньон"
                    value={formData.title}
                    onChange={handleInputChange}
                  />

                  <Input
                    id="city"
                    name="city"
                    label="Город"
                    placeholder="Например: Алматы"
                    value={formData.city}
                    onChange={handleInputChange}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      id="startDate"
                      name="startDate"
                      label="Дата начала"
                      placeholder="ГГГГ-ММ-ДД"
                      type="date"
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />

                    <Input
                      id="endDate"
                      name="endDate"
                      label="Дата окончания"
                      placeholder="ГГГГ-ММ-ДД"
                      type="date"
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
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

                {/* Tour Type */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Тип тура</h3>
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

                {/* Statuses */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Статус тура</h3>
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

                {/* Services */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Включенные услуги</h3>
                  <div className="space-y-3">
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

                {/* Itinerary */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">План путешествия</h3>
                  {formData.itinerary.map((stop) => (
                    <div key={stop.id} className="bg-gray-50 p-4 rounded-lg shadow-sm relative">
                      <button
                        type="button"
                        onClick={() => removeItineraryStop(stop.id)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                      >
                        <X size={20} />
                      </button>
                      <h4 className="text-sm font-medium text-gray-900">{stop.location}</h4>
                      <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{stop.description}</p>
                      <p className="text-sm text-gray-500 mt-1">Длительность: {stop.duration}</p>
                    </div>
                  ))}

                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-3">
                    <Input
                      id="location"
                      name="location"
                      label=""
                      placeholder="Например: День 1: Алматы"
                      value={newStop.location}
                      onChange={handleNewStopChange}
                    />

                    <Input
                      id="stopDescription"
                      name="description"
                      label=""
                      placeholder="Описание остановки..."
                      type="textarea"
                      value={newStop.description}
                      onChange={handleNewStopChange}
                    />

                    <Input
                      id="duration"
                      name="duration"
                      label=""
                      placeholder="Например: 1 день"
                      value={newStop.duration}
                      onChange={handleNewStopChange}
                    />

                    <Button
                      type="button"
                      variant="secondary"
                      onClick={addItineraryStop}
                    >
                      Добавить остановку
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Image Upload */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Фотографии тура</h3>
                  <div
                    className={`border-2 border-dashed rounded-md p-6 text-center ${
                      isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
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
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Перетащите фотографии сюда или нажмите для выбора
                    </p>
                    <p className="mt-1 text-xs text-gray-500">PNG, JPG, WEBP до 10МБ</p>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {formData.images.map((image) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.preview}
                            alt="Preview"
                            className="w-full h-40 object-cover rounded-md shadow-sm"
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

                {/* Pricing */}
                <div className="space-y-4">
                  <Input
                    id="price"
                    name="price"
                    label="Цена (₸)"
                    placeholder="50000"
                    type="number"
                    value={formData.price.toString()}
                    onChange={handleInputChange}
                  />

                  <Input
                    id="discountPrice"
                    name="discountPrice"
                    label="Цена со скидкой (₸, необязательно)"
                    placeholder="45000"
                    type="number"
                    value={formData.discountPrice?.toString() || ''}
                    onChange={handleInputChange}
                  />

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">Активный тур</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <Link to="/agency/my-tours">
                <Button variant="neutral">Отмена</Button>
              </Link>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? (
                  'Сохранение...'
                ) : (
                  <span>
                    Создать тур
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
