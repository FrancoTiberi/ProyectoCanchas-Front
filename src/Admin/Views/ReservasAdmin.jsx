import { useEffect, useState } from 'react';
import FormCanchas from '../Forms/FormCanchas';
import styles from "../../styles/View.module.css";

export default function ReservasAdmin() {
  const [canchas, setCanchas] = useState([]);

  const obtenerCanchas = async () => {
    try {
      const resp = await canchasTodasGet()

      setCanchas(resp.canchas)
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo obtener las canchas")
    }
  }

  useEffect(() => {
    obtenerCanchas();
  }, []);


  const handleNuevasCanchas = async (cancha) => {
    const resul = await crearCancha(cancha);

    if (resul.msg) {
      alert("Error al crear la cancha: " + resul.msg);
      return;
    }

    obtenerCanchas();
  }

  const eliminarCancha = async (id) => {
    await borrarCancha(id)
    const actualizadas = canchas.filter((c) => c._id !== id);
    setCanchas(actualizadas);
  }

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
