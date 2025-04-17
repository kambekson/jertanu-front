import { useState, useEffect } from 'react';
import AgencySidebar from '../../components/layout/AgencySidebar';

interface User {
  id: number;
  email: string;
  role: string;
  profile: {
    companyName: string;
    officialCompanyName: string | null;
    bin: string | null;
    registrationDate: string | null;
    directorFullName: string | null;
    city: string | null;
    contactPerson: string | null;
    phoneNumber: string;
    contactEmail: string | null;
    agencyType: string | null;
    description: string;
    legalAddress: string;
    actualAddress: string | null;
    bankAccount: string | null;
    bankBic: string | null;
    bankName: string | null;
    logo: string | null;
  };
}

export default function AboutAgency() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User['profile']>>({});

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setFormData(parsedUser.profile || {});
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Здесь будет запрос на сервер для обновления данных
      // const response = await fetch('/api/agency/profile', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify(formData)
      // });
      // const updatedUser = await response.json();

      // Временное обновление локальных данных
      const updatedUser = {
        ...user,
        profile: {
          ...user?.profile,
          ...formData,
        },
      };

      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating agency profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto py-4 px-2">
        <div className="flex flex-col md:flex-row">
          <AgencySidebar />

          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Информация об агентстве</h2>
                {!isEditing && (
                  <button
                    onClick={handleEditClick}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Редактировать
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {isEditing ? (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Название компании
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Название компании</h3>
                      <p className="mt-1 text-gray-900">
                        {user?.profile?.companyName || 'Не указано'}
                      </p>
                    </div>
                  )}

                  {isEditing ? (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Официальное название
                      </label>
                      <input
                        type="text"
                        name="officialCompanyName"
                        value={formData.officialCompanyName || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Официальное название</h3>
                      <p className="mt-1 text-gray-900">
                        {user?.profile?.officialCompanyName || 'Не указано'}
                      </p>
                    </div>
                  )}

                  {isEditing ? (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-500 mb-1">БИН</label>
                      <input
                        type="text"
                        name="bin"
                        value={formData.bin || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">БИН</h3>
                      <p className="mt-1 text-gray-900">{user?.profile?.bin || 'Не указано'}</p>
                    </div>
                  )}

                  {isEditing ? (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Дата регистрации
                      </label>
                      <input
                        type="date"
                        name="registrationDate"
                        value={formData.registrationDate || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Дата регистрации</h3>
                      <p className="mt-1 text-gray-900">
                        {user?.profile?.registrationDate || 'Не указано'}
                      </p>
                    </div>
                  )}

                  {isEditing ? (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Директор
                      </label>
                      <input
                        type="text"
                        name="directorFullName"
                        value={formData.directorFullName || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Директор</h3>
                      <p className="mt-1 text-gray-900">
                        {user?.profile?.directorFullName || 'Не указано'}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {isEditing ? (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-500 mb-1">Город</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Город</h3>
                      <p className="mt-1 text-gray-900">{user?.profile?.city || 'Не указано'}</p>
                    </div>
                  )}

                  {isEditing ? (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Контактное лицо
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Контактное лицо</h3>
                      <p className="mt-1 text-gray-900">
                        {user?.profile?.contactPerson || 'Не указано'}
                      </p>
                    </div>
                  )}

                  {isEditing ? (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Телефон</h3>
                      <p className="mt-1 text-gray-900">
                        {user?.profile?.phoneNumber || 'Не указано'}
                      </p>
                    </div>
                  )}

                  {isEditing ? (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                      <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p className="mt-1 text-gray-900">
                        {user?.profile?.contactEmail || 'Не указано'}
                      </p>
                    </div>
                  )}

                  {isEditing ? (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Тип агентства
                      </label>
                      <input
                        type="text"
                        name="agencyType"
                        value={formData.agencyType || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Тип агентства</h3>
                      <p className="mt-1 text-gray-900">
                        {user?.profile?.agencyType || 'Не указано'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {isEditing ? (
                <div className="mt-6 mb-4">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Описание</label>
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              ) : (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-500">Описание</h3>
                  <p className="mt-1 text-gray-900">{user?.profile?.description || 'Не указано'}</p>
                </div>
              )}

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {isEditing ? (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Юридический адрес
                    </label>
                    <input
                      type="text"
                      name="legalAddress"
                      value={formData.legalAddress || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                ) : (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Юридический адрес</h3>
                    <p className="mt-1 text-gray-900">
                      {user?.profile?.legalAddress || 'Не указано'}
                    </p>
                  </div>
                )}

                {isEditing ? (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Фактический адрес
                    </label>
                    <input
                      type="text"
                      name="actualAddress"
                      value={formData.actualAddress || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                ) : (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Фактический адрес</h3>
                    <p className="mt-1 text-gray-900">
                      {user?.profile?.actualAddress || 'Не указано'}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {isEditing ? (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Банковский счет
                    </label>
                    <input
                      type="text"
                      name="bankAccount"
                      value={formData.bankAccount || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                ) : (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Банковский счет</h3>
                    <p className="mt-1 text-gray-900">
                      {user?.profile?.bankAccount || 'Не указано'}
                    </p>
                  </div>
                )}

                {isEditing ? (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      БИК банка
                    </label>
                    <input
                      type="text"
                      name="bankBic"
                      value={formData.bankBic || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                ) : (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">БИК банка</h3>
                    <p className="mt-1 text-gray-900">{user?.profile?.bankBic || 'Не указано'}</p>
                  </div>
                )}

                {isEditing ? (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Название банка
                    </label>
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                ) : (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Название банка</h3>
                    <p className="mt-1 text-gray-900">{user?.profile?.bankName || 'Не указано'}</p>
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={handleCancelClick}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Сохранить
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
