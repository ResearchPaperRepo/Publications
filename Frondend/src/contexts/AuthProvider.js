import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);

  return (
    <AuthContext.Provider
      value={{ loggedIn, setLoggedIn, userToken, setUserToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
