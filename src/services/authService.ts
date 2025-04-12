interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

const API_URL = 'http://localhost:3000/api';

export const authService = {
  async signIn(credentials: SignInCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error('Authentication failed:', response.status, responseText);

      const data = responseText ? JSON.parse(responseText) : {};
      throw new Error(data.message || 'Authentication failed');
    }

    const data = await response.json();

    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('token', data.access_token);

    return data;
  },

  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error('Token refresh failed:', response.status, responseText);

      const data = responseText ? JSON.parse(responseText) : {};
      throw new Error(data.message || 'Token refresh failed');
    }

    const data = await response.json();

    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('token', data.access_token);

    return data;
  },

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token');
    localStorage.removeItem('user_type');
    localStorage.removeItem('agency_login');
    localStorage.removeItem('user');
  },

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  },

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  },
};
