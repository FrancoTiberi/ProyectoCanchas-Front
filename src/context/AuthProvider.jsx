import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (correo, password) => {
    try {       
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password })
      });

      const data = await resp.json();

      if (resp.ok) {
        setUser(data.usuario);
        localStorage.setItem("user", JSON.stringify(data.usuario));
        localStorage.setItem("token", data.token);
        return { success: true, user: data.usuario };
      } else {
        return { success: false, message: data.msg || "Error en login" };
      }
    } catch (error) {
      return { success: false, message: "Error de conexión con el servidor" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
