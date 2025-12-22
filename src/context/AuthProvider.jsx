import { createContext, useContext, useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  const login = async (correo, password) => {
    try {
      const resp = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password })
      });

      const data = await resp.json();

      if (resp.ok) {
        localStorage.setItem("currentUser", JSON.stringify(data.usuario));
        localStorage.setItem("token", data.token);
        setUser(data.usuario);
        setToken(data.token);
        return { success: true, user:data.usuario, token:data.token };
      } else {
        return { success: false, message: data.msg || "Usuario o contraseña incorrectos" };
      }
    } catch (error) {
      return { success: false, message: "Error de conexión con el servidor" };
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    const syncAuth = () => {
      const savedUser = localStorage.getItem("currentUser");
      const savedToken = localStorage.getItem("token");
      setUser(savedUser ? JSON.parse(savedUser) : null);
      setToken(savedToken || null);
    };
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);