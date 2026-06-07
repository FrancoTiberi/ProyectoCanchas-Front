import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";

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
        return { success: true, user: data.usuario, token: data.token };
      } else {
        return { success: false, message: data.msg || "Usuario o contraseña incorrectos" };
      }
    } catch (error) {
      return { success: false, message: "Error de conexión con el servidor" };
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  }, []);

  const forgotPassword = async (correo) => {
    try {
      const resp = await fetch(`${API_URL}/auth/recuperarContrasenia`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ correo })
      })

      const data = await resp.json();

      return data;
    } catch (error) {
      console.log(error)
      throw new Error('Error de conexión del servido | forgot password')
    }
  };

  const resetPassword = async (id, token, password) => {
    try {
      const resp = await fetch(`${API_URL}/auth/cambiarContrasenia/${id}/${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await resp.json();

      return data;
    } catch (error) {
      console.log(error)
      throw new Error('Error al cambiar la contraseña');
    }
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

  useEffect(() => {
    let temporizador;

    if (token) {
      try {
        const tokenDeCode = jwtDecode(token);
        const tiempoExp = tokenDeCode.exp * 1000;
        const tiempoActual = Date.now();
        const tiempoRestante = tiempoExp - tiempoActual;

        if (tiempoRestante <= 0) {
          alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
          logout();
        } else {
          temporizador = setTimeout(() => {
            alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
            logout();
          }, tiempoRestante);
        }
      } catch (error) {
        console.error("Token inválido", error);
        logout();
      }
    }
    return () => {
      if (temporizador) clearTimeout(temporizador);
    };
  }, [token, logout]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, forgotPassword, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);