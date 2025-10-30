import { useEffect, useState } from 'react';
import FormComida from '../Forms/FormComida';

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
    <div>
      <h2>Gestión de Comidas Dinámicas</h2>
      <FormComida onComidaCreada={handleNuevaComida} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '24px' }}>
        {comidas.map((comida) =>
          comida.visible && (
            <div key={comida.id} style={{ border: '1px solid #ccc', padding: '12px', borderRadius: '8px', width: '240px' }}>
              <img
                src={comida.imagen || '/images/fallback.png'}
                alt={comida.nombre}
                style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '6px' }}
                onError={(e) => (e.target.src = '/images/fallback.png')}
              />
              <h3>{comida.nombre}</h3>
              <p>{comida.descripcion}</p>
              <p><strong>${comida.precio}</strong></p>
              <button
                onClick={() => eliminarComida(comida.id)}
                style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginTop: '8px'
                }}
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
