import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';

interface SignupFormProps {
  switchView: (view: 'login' | 'signup' | 'forgot' | 'reset' | 'verify') => void;
}

export default function SignupForm({ switchView }: SignupFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'signup' | 'email-verification'>('signup');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!acceptTerms) {
      setError('Пожалуйста, примите условия использования');
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/register/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          profile: {
            firstName,
            lastName,
          },
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Ошибка при регистрации');

      localStorage.setItem('token', data.token);
      setStep('email-verification');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  return step === 'signup' ? (
    <div>
      <h2 className="text-3xl font-bold mb-4">Создайте аккаунт</h2>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-gray-600">Уже есть аккаунт?</span>
        <button onClick={() => switchView('login')} className="text-blue-600 hover:text-blue-800">
          Войти
        </button>
      </div>

      {error && <div className="mb-3 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
              <div className="relative">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Ваше имя"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Фамилия</label>
              <div className="relative">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Ваша фамилия"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ваш пароль"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Подтвердите пароль
            </label>
            <div className="relative">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Повторите пароль"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">
            Я согласен с{' '}
            <Link
              to="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              условиями использования
            </Link>
          </span>
        </label>

        <Button
          type="submit"
          variant="primary"
          className="w-full text-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
        </Button>
      </form>
    </div>
  ) : (
    <div className="text-center space-y-6">
      <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
        <Mail className="w-8 h-8 text-blue-600" strokeLinejoin="round" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Подтвердите email</h2>
        <p className="mt-2 text-gray-600">
          Мы отправили письмо с подтверждением на вашу почту. Пожалуйста, проверьте почтовый ящик и
          следуйте инструкциям.
        </p>
      </div>
      <button
        onClick={() => switchView('login')}
        className="text-blue-600 font-medium hover:underline"
      >
        Вернуться к входу
      </button>
    </div>
  );
}
