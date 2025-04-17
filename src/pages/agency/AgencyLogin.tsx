import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button';
import { apiService } from '../../services/apiService';

const AgencyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const responseText = await response.text();
      const data = responseText ? JSON.parse(responseText) : {};

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Неверный email или пароль. Пожалуйста, проверьте введенные данные.');
        } else {
          throw new Error(data.message || 'Ошибка при входе');
        }
      }
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('agency_login', 'true');

      // Clear any regular user login flag
      localStorage.removeItem('user_type');

      // Получаем данные пользователя и сохраняем их в localStorage
      try {
        console.log('Fetching user data...');
        const userData = await fetch('http://localhost:3000/api/users/me', {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });

        if (userData.ok) {
          const userInfo = await userData.json();
          console.log('User data received:', userInfo);
          localStorage.setItem('user', JSON.stringify(userInfo));
        } else {
          console.error('Failed to fetch user data:', userData.status);
        }
      } catch (userError) {
        console.error('Error fetching user data:', userError);
      }

      console.log('Agency login successful, redirecting to agency profile page');
      window.location.href = '/agency/profile';
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Произошла ошибка при входе');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-blue-50 py-10">
      <div className="bg-white rounded-lg shadow-sm p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2">Вход в личный кабинет агентства</h1>

        <div className="mb-6">
          <p className="text-gray-700">
            У вас еще нет аккаунта?{' '}
            <Link to="/agency/register" className="text-blue-600 hover:text-blue-800">
              Зарегистрироваться
            </Link>
          </p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ваш email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ваш пароль"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="text-right">
            <Link to="/agency/forgot-password" className="text-blue-600 text-sm hover:underline">
              Забыли пароль?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full text-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? 'Загрузка...' : 'Войти'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AgencyLogin;
