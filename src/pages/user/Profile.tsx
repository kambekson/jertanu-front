import React, { useState, useEffect } from 'react';
import '../../styles/Profile.scss';
import avatarPlaceholder from '../../assets/avatar-placeholder.svg';
import Button from '../../components/UI/Button';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api';

interface UserData {
  id: number;
  email: string;
  role: string;
  profile: {
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    birthday: string | null;
  };
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    day: '',
    month: '',
    year: '',
    phone: '',
    email: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Функция для проверки, аутентифицирован ли пользователь
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/login'); // Перенаправление на страницу входа
        return false;
      }
      return true;
    } catch (err) {
      console.error('Authentication check failed:', err);
      return false;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) return;

      try {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Если пользователь не аутентифицирован, перенаправляем на страницу входа
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('token');
            navigate('/login');
            throw new Error('Вы не авторизованы. Пожалуйста, войдите в систему.');
          }
          throw new Error('Failed to fetch user data');
        }

        const userData: UserData = await response.json();

        // Parse birthday if it exists
        let day = '';
        let month = '';
        let year = '';

        if (userData.profile.birthday) {
          const date = new Date(userData.profile.birthday);
          day = String(date.getDate()).padStart(2, '0');
          month = String(date.getMonth() + 1).padStart(2, '0');
          year = String(date.getFullYear());
        }

        setFormData({
          firstName: userData.profile.firstName || '',
          lastName: userData.profile.lastName || '',
          day,
          month,
          year,
          phone: userData.profile.phoneNumber || '',
          email: userData.email || '',
        });

        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = async () => {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('token');
          navigate('/login');
          throw new Error('Вы не авторизованы. Пожалуйста, войдите в систему.');
        }
        throw new Error('Failed to fetch user data');
      }

      const userData: UserData = await response.json();

      // Parse birthday if it exists
      let day = '';
      let month = '';
      let year = '';

      if (userData.profile.birthday) {
        const date = new Date(userData.profile.birthday);
        day = String(date.getDate()).padStart(2, '0');
        month = String(date.getMonth() + 1).padStart(2, '0');
        year = String(date.getFullYear());
      }

      setFormData({
        firstName: userData.profile.firstName || '',
        lastName: userData.profile.lastName || '',
        day,
        month,
        year,
        phone: userData.profile.phoneNumber || '',
        email: userData.email || '',
      });

      setLoading(false);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Failed to load user data. Please try again later.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) return;

    // Format birthday if all date parts are provided
    let birthday = null;
    if (formData.day && formData.month && formData.year) {
      birthday = `${formData.year}-${formData.month}-${formData.day}`;
    }

    const userData = {
      profile: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phone,
        birthday,
      },
      email: formData.email,
    };

    try {
      console.log('Sending data to server:', JSON.stringify(userData));
      setSuccessMessage(null);
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_URL}/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('token');
          navigate('/login');
          throw new Error('Вы не авторизованы. Пожалуйста, войдите в систему.');
        }

        // Get more detailed error information from the server
        const errorData = await response
          .json()
          .catch(() => ({ message: 'Ошибка при обработке ответа сервера' }));
        console.error('Server response:', response.status, errorData);

        if (response.status === 400) {
          // This is likely a validation error
          throw new Error(errorData?.message || 'Ошибка валидации данных');
        }

        throw new Error(errorData?.message || 'Failed to update user data');
      }

      setSuccessMessage('Профиль успешно обновлен');
      console.log('Profile updated successfully');
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(`Ошибка при обновлении профиля: ${err.message || 'Неизвестная ошибка'}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Новые пароли не совпадают');
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_URL}/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordForm.oldPassword,
          password: passwordForm.newPassword,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('token');
          navigate('/login');
          throw new Error('Вы не авторизованы. Пожалуйста, войдите в систему.');
        }

        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при смене пароля');
      }

      setSuccessMessage('Пароль успешно изменен');
      setShowPasswordChange(false);
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      setPasswordError(err.message || 'Ошибка при смене пароля');
    }
  };

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const years = Array.from({ length: 100 }, (_, i) => String(2024 - i));

  // Add this function to handle menu item clicks
  const handleMenuClick = (section: string) => {
    if (section === 'personal') {
      setShowPasswordChange(false);
    } else if (section === 'settings') {
      setShowPasswordChange(true);
    }
  };

  if (loading) {
    return (
      <div className="profile-page-container">
        <div className="loading-container">
          <div className="loading">Загрузка данных пользователя...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page-container">
        <div className="error-container">
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page-container">
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-avatar-section">
            <img src={avatarPlaceholder} alt="Аватар пользователя" className="profile-avatar" />
            <h2>
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="profile-email">{formData.email}</p>
          </div>

          <ul className="profile-menu">
            <li
              className={`profile-menu-item ${!showPasswordChange ? 'active' : ''}`}
              onClick={() => handleMenuClick('personal')}
            >
              <i className="profile-icon user-icon"></i>
              Личная информация
            </li>
            <li className="profile-menu-item">
              <i className="profile-icon history-icon"></i>
              Брони
            </li>
            <li className="profile-menu-item">
              <i className="profile-icon favorites-icon"></i>
              Избранное
            </li>
            <li className="profile-menu-item">
              <i className="profile-icon help-icon"></i>
              Помощь
            </li>
            <li
              className={`profile-menu-item ${showPasswordChange ? 'active' : ''}`}
              onClick={() => handleMenuClick('settings')}
            >
              <i className="profile-icon settings-icon"></i>
              Настройки
            </li>
          </ul>

          <button className="logout-button" onClick={handleLogout}>
            <i className="logout-icon"></i>
            Выйти
          </button>
        </div>

        <div className="profile-content">
          {successMessage && <div className="success-message">{successMessage}</div>}

          {showPasswordChange ? (
            // Password change form
            <form onSubmit={handlePasswordChange}>
              <div className="profile-section">
                <h2>Изменение пароля</h2>
                {passwordError && <div className="error-message">{passwordError}</div>}
                <div className="form-group">
                  <label htmlFor="oldPassword">Текущий пароль</label>
                  <input
                    type="password"
                    id="oldPassword"
                    value={passwordForm.oldPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        oldPassword: e.target.value,
                      }))
                    }
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">Новый пароль</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Подтвердите новый пароль</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-buttons">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowPasswordChange(false)}
                  >
                    Отмена
                  </Button>
                  <Button type="submit" variant="primary">
                    Сохранить
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            // Main profile form
            <form onSubmit={handleSubmit}>
              <div className="profile-section">
                <h2>Личная информация</h2>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">Имя</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Введите имя"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Фамилия</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Введите фамилию"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group birth-date">
                    <label>Дата рождения</label>
                    <div className="date-select-group">
                      <select
                        name="day"
                        value={formData.day}
                        onChange={handleChange}
                        className="date-select"
                      >
                        <option value="">День</option>
                        {days.map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>

                      <select
                        name="month"
                        value={formData.month}
                        onChange={handleChange}
                        className="date-select"
                      >
                        <option value="">Месяц</option>
                        {months.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>

                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="date-select"
                      >
                        <option value="">Год</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Сотовый номер</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Введите номер телефона"
                    />
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h2>Контактная информация</h2>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Введите email"
                    />
                  </div>
                </div>
              </div>

              <div className="form-buttons">
                <Button type="button" variant="secondary" onClick={handleReset}>
                  Сбросить
                </Button>
                <Button type="submit" variant="primary">
                  Сохранить
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
