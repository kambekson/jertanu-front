import {useState} from "react";
import {storeTokens} from "../utils/authUtils.ts";

export const useLogin = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const login = async (email: string, password: string) => {
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/auth/sign-in', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage =
                    response.status === 401
                        ? 'Неверный email или пароль. Пожалуйста, проверьте введенные данные.'
                        : data.message || 'Ошибка при входе';
                throw new Error(errorMessage);
            }
            storeTokens(data.access_token, data.refresh_token);
            window.location.href = '/';
        } catch (err) {
            console.error('Login error:', err);
            setError(err instanceof Error ? err.message : 'Произошла ошибка при входе');
        } finally {
            setIsLoading(false);
        }
    }
    return {login, error, isLoading}
}