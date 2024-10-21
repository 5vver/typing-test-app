import { useGetUserProfile } from '@/queries/user-queries.ts';
import { UserProfile } from '@/types/user-types.ts';
import { httpRequest } from '@/utils/http-request.ts';
import {
  createContext,
  type FC,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

export type Auth = {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  register: (
    username: string,
    password: string,
    email: string,
  ) => Promise<boolean>;
  status: 'loggedIn' | 'loggedOut';
  profile?: UserProfile;
};

const authInstance: Auth = {
  login: async () => false,
  logout: async () => false,
  register: async () => false,
  status: 'loggedOut',
};

export const AuthContext = createContext<Auth | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<Auth>(authInstance);

  const { data: profile } = useGetUserProfile(auth.status);

  useEffect(() => {
    if (!profile) {
      return;
    }

    setAuth((prev) => ({
      ...prev,
      status: 'loggedIn',
      profile,
    }));
  }, [profile]);

  const login: Auth['login'] = async (username, password) => {
    const { data, error } = await httpRequest<string>('auth/login', {
      method: 'POST',
      data: { username, password },
      withCredentials: true,
    });

    if (error) throw error;
    if (data !== 'Logged in successfully') return false;

    setAuth((prev) => ({ ...prev, status: 'loggedIn' }));

    return true;
  };

  const logout: Auth['logout'] = async () => {
    if (auth.status === 'loggedOut') {
      return false;
    }

    const { data, error } = await httpRequest<string>('auth/logout', {
      method: 'GET',
      withCredentials: true,
    });

    if (error || data !== 'Logged out successfully') {
      return false;
    }

    setAuth((prev) => ({
      ...prev,
      status: 'loggedOut',
      profile: undefined,
    }));

    return true;
  };

  const register: Auth['register'] = async (username, password, email) => {
    const { data, error } = await httpRequest<string>('auth/register', {
      method: 'POST',
      data: { username, password, email },
      withCredentials: true,
    });

    if (error) {
      throw error;
    }
    if (data !== 'User created successfully') {
      return false;
    }

    console.log(`Registered successfully: ${username}`);
    return true;
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('useAuth must be used within an AuthProvider');
  return auth;
};
