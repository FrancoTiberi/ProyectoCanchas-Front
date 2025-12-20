const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (correo, password) => {
  try {
    const resp = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, password })
    });

    const data = await resp.json();

    if (resp.ok) {
      // Guardar usuario y token en localStorage
      localStorage.setItem('currentUser', JSON.stringify(data.usuario));
      localStorage.setItem('token', data.token);

      return { success: true, user: data.usuario, token: data.token };
    } else {
      return { success: false, message: data.msg || "Usuario o contraseña incorrectos" };
    }
  } catch (error) {
    return { success: false, message: "Error de conexión con el servidor" };
  }
};

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
};
