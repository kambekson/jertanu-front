import React, { useState } from 'react';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import {useLogin} from "../../hooks/useLogin.tsx";

interface LoginFormProps{
  switchView: (view: 'forgot' | 'signup') => void;
}

export default function LoginForm({ switchView }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, error, isLoading} = useLogin();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password)
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
            <Input
              id='email'
              label="Email"
              type="email"
              placeholder="Ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Input
              id='password'
              label="Пароль"
              type="password"
              placeholder="Ваш пароль"
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
