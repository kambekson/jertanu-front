import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';

interface TourFormData {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  discountPrice?: number;
  dates: string;
  isActive: boolean;
}

export default function EditTour() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<TourFormData>({
    title: '',
    description: '',
    imageUrl: '',
    price: 0,
    discountPrice: undefined,
    dates: '',
    isActive: true
  });

  useEffect(() => {
    // Имитация загрузки данных тура с сервера
    setTimeout(() => {
      // В реальном приложении здесь будет API-запрос
      const mockTourData = {
        title: 'Чарынский каньон',
        description: 'Живописный тур по Чарынскому каньону с опытным гидом. Вы увидите невероятные пейзажи и уникальные геологические формации.',
        imageUrl: 'https://images.unsplash.com/photo-1594059487253-28077a2170c4?q=80&w=1000',
        price: 20900,
        discountPrice: 18900,
        dates: '12 - 14 апреля',
        isActive: true
      };
      
      setFormData(mockTourData);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked
      });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Отправка формы:', formData);
    
    // Имитация отправки данных на сервер
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Переход на страницу "Мои туры" после успешного сохранения
      navigate('/agency/my-tours');
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <p className="text-center text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto py-4 px-2">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-6">
            <Link to="/agency/my-tours" className="text-gray-600 hover:text-gray-800 mr-4">
              <ArrowLeft size={20} />
            </Link>
            <h2 className="text-xl font-bold">Редактирование тура</h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input
                  id="title"
                  label="Название тура"
                  placeholder="Введите название тура"
                  value={formData.title}
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    handleInputChange({
                      ...e,
                      target: { ...target, name: "title", value: target.value }
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
                />
                
                <Input
                  id="description"
                  label="Описание"
                  placeholder="Введите описание тура"
                  type="textarea"
                  value={formData.description}
                  onChange={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    handleInputChange({
                      ...e,
                      target: { ...target, name: "description", value: target.value }
                    } as React.ChangeEvent<HTMLTextAreaElement>);
                  }}
                />
                
                <Input
                  id="dates"
                  label="Даты проведения"
                  placeholder="Например: 12 - 14 апреля"
                  value={formData.dates}
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    handleInputChange({
                      ...e,
                      target: { ...target, name: "dates", value: target.value }
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
                />
              </div>
              
              <div className="space-y-4">
                <Input
                  id="imageUrl"
                  label="URL изображения"
                  placeholder="Введите URL изображения"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    handleInputChange({
                      ...e,
                      target: { ...target, name: "imageUrl", value: target.value }
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
                />
                
                {formData.imageUrl && (
                  <div className="mt-2 h-32 rounded-md overflow-hidden relative">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                
                <Input
                  id="price"
                  label="Цена (₸)"
                  placeholder="Введите цену"
                  type="number"
                  value={formData.price.toString()}
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    handleInputChange({
                      ...e,
                      target: { ...target, name: "price", value: target.value }
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
                />
                
                <Input
                  id="discountPrice"
                  label="Цена со скидкой (₸, опционально)"
                  placeholder="Введите цену со скидкой"
                  type="number"
                  value={formData.discountPrice?.toString() || ''}
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    handleInputChange({
                      ...e,
                      target: { ...target, name: "discountPrice", value: target.value }
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
                />
                
                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                    Активный тур
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Link to="/agency/my-tours" className="mr-4">
                <Button variant="neutral">
                  Отмена
                </Button>
              </Link>
              <Button type="submit" variant="primary">
                <Save size={16} className="mr-2" />
                Сохранить изменения
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 