import { httpRequest } from "@/utils/http-request.ts";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUserProfile } from "@/queries/user-queries.ts";

export type Auth = {
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  status: "loggedIn" | "loggedOut";
  username?: string;
  role?: string;
};

const authInstance: Auth = {
  login: async () => {},
  logout: async () => {},
  status: "loggedOut",
  username: undefined,
  role: undefined,
};

export const AuthContext = createContext<Auth | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<Auth>(authInstance);

  useEffect(() => {
    (async () => {
      // maybe auth status check instead? (/auth/status)
      const profile = await getUserProfile();
      if (!profile) return;
      setAuth((prev) => ({
        ...prev,
        status: "loggedIn",
        username: profile.username,
        role: profile.role,
      }));
    })();
  }, []);

  const login: Auth["login"] = async (username, password) => {
    console.log("login");
    const { data, error } = await httpRequest<string>("auth/login", {
      method: "POST",
      data: { username, password },
    });

    if (error || data !== "Logged in successfully") return;

    setAuth((prev) => ({ ...prev, status: "loggedIn", username }));
    console.log(password);
  };

  const logout: Auth["logout"] = async () => {
    setAuth((prev) => ({
      ...prev,
      status: "loggedOut",
      username: undefined,
    }));
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("useAuth must be used within an AuthProvider");
  return auth;
};
