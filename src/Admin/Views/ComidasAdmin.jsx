import { useEffect, useState } from 'react';
import FormComida from '../Forms/FormComida';
import styles from '../../styles/FormComida.module.css';

export default function ComidasAdmin() {
  const [comidas, setComidas] = useState([]);

  useEffect(() => {
    const comidasLocales = JSON.parse(localStorage.getItem('comidas')) || [];
    setComidas(comidasLocales);
  }, []);

  const handleNuevaComida = (comida) => {
    const nuevas = [...comidas, comida];
    setComidas(nuevas);
    localStorage.setItem('comidas', JSON.stringify(nuevas));
  };

  const eliminarComida = (id) => {
    const actualizadas = comidas.filter((c) => c.id !== id);
    setComidas(actualizadas);
    localStorage.setItem('comidas', JSON.stringify(actualizadas));
  };

  return (
    <div className={styles.adminContainer}>
      <h2 className={styles.titulo}>Gestión de Comidas Dinámicas</h2>
      <FormComida onComidaCreada={handleNuevaComida} />
      <div className={styles.grid}>
        {comidas.map((comida) =>
          comida.visible && (
            <div key={comida.id} className={styles.card}>
              <img
                src={comida.imagen || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd8LWlb8l34MXvr3BonwEYsd11lw1QKQVEiQ&s'}
                alt={comida.nombre}
                className={styles.imagen}
                onError={(e) => (e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd8LWlb8l34MXvr3BonwEYsd11lw1QKQVEiQ&s')}
              />
              <p><strong>{comida.categoria}</strong></p>
              <h3>{comida.nombre}</h3>
              <p>{comida.descripcion}</p>
              <p><strong>${comida.precio}</strong></p>
              <button
                onClick={() => eliminarComida(comida.id)}
                className={styles.btndelete}
              >
                Eliminar
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
