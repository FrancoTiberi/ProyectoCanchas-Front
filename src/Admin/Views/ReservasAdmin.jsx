import { useEffect, useState } from 'react';
import FormCanchas from '../Forms/FormCanchas';
import styles from '../../styles/FormComida.module.css';

export default function ReservasAdmin() {
  const [canchas, setCanchas] = useState([]);

  useEffect(() => {
    const canchasLocales = JSON.parse(localStorage.getItem('reservas')) || [];
    setCanchas(canchasLocales);
  }, []);

  const handleNuevasCanchas = (cancha) => {
    const nuevas = [...canchas, cancha];
    setCanchas(nuevas);
    localStorage.setItem('reservas', JSON.stringify(nuevas));
  };

  const eliminarCancha = (id) => {
    const actualizadas = canchas.filter((c) => c.id !== id);
    setCanchas(actualizadas);
    localStorage.setItem('reservas', JSON.stringify(actualizadas));
  };

  return (
    <div className={styles.adminContainer}>
      <h2 className={styles.titulo}>Gestión de canchas Dinámicas</h2>
      <FormCanchas onCanchaCreada={handleNuevasCanchas} />
      <div className={styles.grid}>
        {canchas.map((cancha) => (
          <div key={cancha.id} className={styles.card}>
            <h3 className={styles.subtitulo}>Canchas Creadas: {cancha.canchas}</h3>
            <h3 className={styles.subtitulo}>Horas Disponibles:</h3>
            <div className={styles.horas}>
              <p><strong>Desde: {cancha.desde <= 12 ? cancha.desde + "am" : cancha.desde + "pm"}</strong></p>
              <p><strong>Hasta: {cancha.hasta <= 12 ? cancha.hasta + "am" : cancha.hasta + "pm"}</strong></p>
            </div>
            <button
              onClick={() => eliminarCancha(cancha.id)}
              className={styles.btndelete}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
