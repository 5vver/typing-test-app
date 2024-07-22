export type Auth = {
  login: (username: string, password: string) => void;
  logout: () => void;
  status: "loggedIn" | "loggedOut";
  username?: string;
};

const login = (username: string, password: string) => {
  auth.status = "loggedIn";
  auth.username = username;
  console.log(password);
};

const logout = () => {
  auth.status = "loggedOut";
  auth.username = undefined;
};

export const auth: Auth = {
  status: "loggedOut",
  username: undefined,
  login,
  logout,
};
