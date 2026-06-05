import { useEffect, useState } from 'react';
import FormCanchas from '../Forms/FormCanchas';
import FormEditarCancha from '../Forms/FormEditarCancha';
import styles from "../../styles/View.module.css";
import { canchasTodasGet, crearCancha, borrarCancha } from '../../helpers/canchaApi';

export default function CanchasAdmin() {
  const [canchas, setCanchas] = useState([]);
  const [editShow, setEditShow] = useState(false);
  const [canchaEdit, setCanchaEdit] = useState(null);

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

  const handleEditar = (cancha) => {
    setCanchaEdit(cancha);
    setEditShow(true);
  };

  return (
    <div className={styles.adminContainer}>
      <h2 className={styles.titulo}>Gestión de canchas Dinámicas</h2>
      <FormCanchas onCanchaCreada={handleNuevasCanchas} />
      <h4 className={styles.categoriaTitulo}>
        <i className="bi bi-tags"></i> Canchas
      </h4>
      <div className={styles.grid}>
        {canchas.map((cancha) => (
          <div key={cancha._id} className={styles.card}>
            <h3 className={styles.subtitulo}>Cancha: {cancha.cancha}</h3>
            <h3 className={styles.subtitulo}>Horario:</h3>
            <div className={styles.horas}>
              <p><strong>Desde:</strong> {cancha.desde <= 12 ? cancha.desde + "am" : cancha.desde + "pm"}</p>
              <p><strong>Hasta:</strong> {cancha.hasta <= 12 ? cancha.hasta + "am" : cancha.hasta + "pm"}</p>
            </div>
            <div className={styles.cardFooter}>
              <button
                onClick={() => handleEditar(cancha)}
                className={styles.btnedit}>
                <i className="bi bi-pencil-square"></i> Editar
              </button>
              <button
                onClick={() => eliminarCancha(cancha._id)}
                className={styles.btndelete}>
                <i className="bi bi-trash"></i> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <FormEditarCancha
        show={editShow}
        onClose={() => setEditShow(false)}
        cancha={canchaEdit}
        onCanchaActualizada={(actualizada) =>
          setCanchas(
            canchas.map((c) => (c._id === actualizada._id ? actualizada : c))
          )
        }
      />
    </div>
  );
}
