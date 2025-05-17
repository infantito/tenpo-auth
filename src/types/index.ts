export interface User {
  id: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  loading: boolean;
}

export interface ApiItem {
  id: number;
  name: string;
  description?: string;
  image?: string;
  category?: string;
  [key: string]: any;
}