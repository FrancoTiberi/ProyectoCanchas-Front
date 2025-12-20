import { useEffect, useState } from 'react';
import FormCanchas from '../Forms/FormCanchas';
import { canchasTodasGet, borrarCancha, crearCancha } from '../../helpers/canchaApi';

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
    <div>
      <h2>Gestión de canchas Dinámicas</h2>
      <FormCanchas onCanchaCreada={handleNuevasCanchas} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '24px' }}>
        {canchas.map((cancha) => (
            <div key={cancha._id} style={{ border: '1px solid #ccc', padding: '12px', borderRadius: '8px', width: '240px' }}>
              <h3 className='fs-5'>Canchas Creadas: {cancha.canchas}</h3>
              <h3 className='fs-5'>Horas Disponibles:</h3>
              <div className='d-flex gap-3'>
                <p><strong>Desde: {cancha.desde <= 12 ? cancha.desde + "am" : cancha.desde + "pm"}</strong></p>
                <p><strong>Hasta: {cancha.hasta <= 12 ? cancha.hasta + "am" : cancha.hasta + "pm"}</strong></p>
              </div>
              <button
                onClick={() => eliminarCancha(cancha._id)}
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
