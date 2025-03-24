import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';

export default function SignupForm({ switchView }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'signup' | 'email-verification'>('signup');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
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
      <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>
      {error && <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center border rounded p-2">
            <Mail className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center border rounded p-2">
            <Lock className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Пароль"
              className="w-full outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center border rounded p-2">
            <Lock className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Подтвердите пароль"
              className="w-full outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>
          Уже есть аккаунт?{' '}
          <button onClick={() => switchView('login')} className="text-blue-500 hover:underline">
            Войти
          </button>
        </p>
      </div>
    </div>
  ) : (
    <div className="text-center space-y-4">
      <Mail className="w-16 h-16 text-blue-500 mx-auto" />
      <h2 className="text-2xl font-bold">Подтвердите email</h2>
      <p className="text-gray-600">
        Мы отправили письмо с подтверждением на вашу почту. Пожалуйста, проверьте почтовый ящик и
        следуйте инструкциям.
      </p>
      <button onClick={() => switchView('login')} className="text-blue-500 hover:underline">
        Вернуться к входу
      </button>
    </div>
  );
}
