import { useState } from 'react';
import styles from '../styles/registro.module.css';

export const Registrar = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    usuario: '',
    correo: '',
    celular: '',
    domicilio: '',
    cp: '',
    contraseña: '',
    tyc: false
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos registrados:', formData);
  };

  return (
    <div className={styles.body}>
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <h2>Crea una cuenta</h2>

        <input
          type="text"
          id="nombre"
          placeholder="Nombre y Apellido"
          value={formData.nombre}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          id="usuario"
          placeholder="Nombre de Usuario"
          value={formData.usuario}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          id="correo"
          placeholder="Correo Electrónico"
          value={formData.correo}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          id="celular"
          placeholder="Teléfono"
          value={formData.celular}
          onChange={handleChange}
        />

        <input
          type="text"
          id="domicilio"
          placeholder="Domicilio"
          value={formData.domicilio}
          onChange={handleChange}
        />

        <input
          type="text"
          id="cp"
          placeholder="Código Postal"
          value={formData.cp}
          onChange={handleChange}
        />

        <input
          type="password"
          id="contraseña"
          placeholder="Contraseña"
          value={formData.contraseña}
          onChange={handleChange}
          required
        />

        <label>
          <input
            type="checkbox"
            id="tyc"
            checked={formData.tyc}
            onChange={handleChange}
            required
          />
          Aceptar los Términos y Condiciones
        </label>

        <button type="submit" className={styles.registrar}>Registrar</button>
      </form>
    </div>
  );
};

export default Registrar