import { useState, useRef, DragEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, X, Upload } from 'lucide-react';
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
  color: string;
  description: string;
}

interface TourFormData {
  title: string;
  description: string;
  images: TourImage[];
  price: number;
  discountPrice?: number;
  dates: string;
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
    color: 'bg-orange-100 text-orange-800',
    description: 'Тур доступен только в определенный сезон'
  },
  {
    id: 'hot',
    title: 'Горячий тур',
    color: 'bg-red-100 text-red-800',
    description: 'Специальное предложение с ограниченным временем'
  },
  {
    id: 'new_destination',
    title: 'Новое направление',
    color: 'bg-green-100 text-green-800',
    description: 'Недавно добавленный маршрут'
  },
];

const defaultItinerary: ItineraryStop[] = [
  {
    id: '1',
    location: 'День 1: Алматы',
    description: 'Посещение основных достопримечательностей города:\n- Парк 28 панфиловцев\n- Музей\n- Кок-Тобе\n- Горный парк (Алматинский ботанический сад)',
    duration: '1 день'
  },
  {
    id: '2',
    location: 'День 2: Алматы – Большое Алматинское озеро',
    description: 'Большое Алматинское озеро – это одно из самых красивых природных мест в Алматинской области, окруженное величественными горами.\n- Пикник или отдых в зоне, оборудованной для туристов',
    duration: '1 день'
  },
  {
    id: '3',
    location: 'День 3: Алматы – Чарынский каньон',
    description: 'Прогулка по Чарынскому каньону. Самая известная часть каньона – "Долина замков", где высечены удивительные скалы, напоминающие замки, башни и другие архитектурные формы',
    duration: '1 день'
  },
  {
    id: '4',
    location: 'День 4: Алматы – Тургень',
    description: 'Прогулка по Тургеньскому ущелью и посещение Тургенских водопадов.\n- Легкий поход\n- Наслаждение природой\n- Фотосессия',
    duration: '1 день'
  },
  {
    id: '5',
    location: 'День 5: Алматы – Национальный парк "Алтын Эмель"',
    description: '- Посещение Барханa Көльөй (песчаная дюна высотой до 150 метров)\n- Исследование исторических и археологических памятников\n- Осмотр петроглифов',
    duration: '1 день'
  },
  {
    id: '6',
    location: 'День 6: Алматы – Капчагайское водохранилище',
    description: '- Отдых на пляжах Капчагайского водохранилища\n- Возможность заняться водными видами спорта (каякинг, катание на водных мотоциклах)\n- Рыбалка',
    duration: '1 день'
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
    dates: '',
    isActive: true,
    services: [],
    itinerary: defaultItinerary,
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
      // Here you would typically:
      // 1. Upload images to your server
      // 2. Get back the URLs
      // 3. Submit the form data with image URLs
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Cleanup preview URLs
      formData.images.forEach(img => {
        URL.revokeObjectURL(img.preview);
      });

      navigate('/agency/my-tours');
    } catch (error) {
      console.error('Error submitting form:', error);
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
                    label="Название тура"
                    placeholder="Например: Тур на Чарынский каньон"
                    value={formData.title}
                    onChange={handleInputChange}
                  />

                  <Input
                    id="dates"
                    label="Даты проведения"
                    placeholder="Например: 12 - 14 апреля"
                    value={formData.dates}
                    onChange={handleInputChange}
                  />

                  <Input
                    id="description"
                    label="Описание"
                    placeholder="Подробное описание тура..."
                    type="textarea"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
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
                      label=""
                      placeholder="Например: День 1: Алматы"
                      value={newStop.location}
                      onChange={handleNewStopChange}
                    />

                    <Input
                      id="stopDescription"
                      label=""
                      placeholder="Описание остановки..."
                      type="textarea"
                      value={newStop.description}
                      onChange={handleNewStopChange}
                    />

                    <Input
                      id="duration"
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
                    label="Цена (₸)"
                    placeholder="50000"
                    type="number"
                    value={formData.price.toString()}
                    onChange={handleInputChange}
                  />

                  <Input
                    id="discountPrice"
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
