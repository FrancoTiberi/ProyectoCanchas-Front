import styles from '../styles/confirmarCorreo.module.css'
import { useAuth } from "../context/AuthProvider";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConfirmarCorreo() {

  const { forgotPassword } = useAuth();
  const [correo, setCorreo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(correo)
      console.log('correo enviado')
    } catch (error) {
      console.log(error)
      throw new Error('error al enviar correo')
    }
  };

  return (
    <div className={styles.confirmarCorreoContenedor}>
      <div className={styles.contenidoContenedor}>
        <h1 className={styles.titulo}>Cambio de contraseña</h1>
        <p className={styles.texto}>
          Introduce la dirección de correo electrónico verificada de tu cuenta de usuario y te enviaremos un enlace para restablecer la contraseña.
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputCorreo}>
            <label htmlFor="correo">Correo</label>
            <input type="email" id="correo" value={correo} onChange={(e) => { setCorreo(e.target.value) }} />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Enviar al correo
          </button>
          <button type="button" className={styles.submitBtn} onClick={() => { navigate('/') }}>
            volver al inicio
          </button>
        </form>
      </div >
    </div >
  )
}