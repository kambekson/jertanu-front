import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import Button from '../UI/Button';

interface LoginFormProps {
  switchView: (view: 'forgot' | 'signup') => void;
}

export default function LoginForm({ switchView }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('Attempting login with:', { email }); // Don't log password

      // Simplified request matching exactly what works in Postman
      const response = await fetch('http://localhost:3000/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        // Removed credentials: 'include' as it might interfere with the request
      });

      console.log('Login response status:', response.status);

      // Log the raw response text for debugging
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      // Parse the JSON manually after logging the raw text
      const data = responseText ? JSON.parse(responseText) : {};
      console.log('Login response data:', data);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Неверный email или пароль. Пожалуйста, проверьте введенные данные.');
        } else {
          throw new Error(data.message || 'Ошибка при входе');
        }
      }

      // Store tokens consistently across the application
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      // Also store as 'token' for backward compatibility with Profile page
      localStorage.setItem('token', data.access_token);

      // Mark this as a regular user login and clear any agency login flag
      localStorage.setItem('user_type', 'user');
      localStorage.removeItem('agency_login');

      console.log('Login successful, redirecting to home page');
      window.location.href = '/';
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Произошла ошибка при входе');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Добро пожаловать</h2>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-gray-600">У вас нет аккаунта?</span>
        <button onClick={() => switchView('signup')} className="text-blue-600 hover:text-blue-800">
          Зарегистрироваться
        </button>
      </div>

      {error && <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <input
              type="password"
              placeholder="Ваш пароль"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
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
      <div className="mt-4 space-y-2">
        <button onClick={() => switchView('forgot')} className="text-blue-500 hover:underline">
          Забыли пароль?
        </button>
      </div>
    </div>
  );
}
