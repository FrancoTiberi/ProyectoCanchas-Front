import { useState } from 'react';
import styles from '../styles/registro.module.css';
import { useAuth } from '../context/AuthProvider';

export const Registrar = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    tyc: false
  });

  const { setUser } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tyc) {
      alert("⚠️ Debes aceptar los Términos y Condiciones.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          correo: formData.correo,
          password: formData.password,
          rol: "USER_ROLE" // por defecto
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`❌ Error en el registro: ${errorData.msg || res.statusText}`);
        return;
      }

      const newUser = await res.json();
      setUser(newUser);

      alert(`✅ Registro exitoso. Bienvenido/a, ${newUser.nombre} ${newUser.apellido}!`);

      setFormData({
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        tyc: false
      });
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("❌ No se pudo registrar el usuario.");
    }
  };

  const isComplete =
    formData.nombre &&
    formData.apellido &&
    formData.correo &&
    formData.password &&
    formData.tyc;

  return (
    <div className={styles.body}>
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <h2>Crea una cuenta</h2>

        <div className={styles.inputGroup}>
          <i className="bi bi-person-fill"></i>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <i className="bi bi-person-fill"></i>
          <input
            type="text"
            id="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <i className="bi bi-envelope-fill"></i>
          <input
            type="email"
            id="correo"
            placeholder="Correo Electrónico"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <i className="bi bi-lock-fill"></i>
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="checkboxContainer">
          <input type="checkbox" id="tyc" checked={formData.tyc} onChange={handleChange} />
          <label htmlFor="tyc">Aceptar los Términos y Condiciones</label>
        </div>

        <button
          type="submit"
          className={`${styles.registrar} ${isComplete ? styles.activo : ''}`}
        >
          <i className="bi bi-person-plus-fill"></i> Registrar
        </button>
      </form>
    </div>
  );
};

export default Registrar;
