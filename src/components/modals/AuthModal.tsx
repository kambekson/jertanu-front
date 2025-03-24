import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [view, setView] = useState<'login' | 'signup' | 'forgot' | 'reset' | 'verify'>('login');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {view === 'login' && <LoginForm switchView={setView} />}
        {view === 'signup' && <SignupForm switchView={setView} />}
        {view === 'forgot' && <ForgotPasswordForm switchView={setView} />}
        {view === 'reset' && <ResetPasswordForm switchView={setView} />}
        {view === 'verify' && <SignupForm switchView={setView} />}
        <button className="mt-4 text-red-500" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
}
