export const TOKEN_KEY = "@nicollas-Token";
export const USER_KEY = "@nicollas-User";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
export const userSave = user => {
  localStorage.setItem(USER_KEY, user.name );
};
export const userGet = () => localStorage.getItem(USER_KEY);
