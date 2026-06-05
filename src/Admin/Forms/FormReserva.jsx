import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from "../../styles/forms.module.css";
import { crearReserva } from '../../helpers/reservaApi';
import { canchasTodasGet } from '../../helpers/canchaApi';

export default function FormReserva({ onReservaCreada }) {
  const [show, setShow] = useState(false);
  const [canchasDisponibles, setCanchasDisponibles] = useState([]);
  const [usuariosDisponibles, setUsuariosDisponibles] = useState([]);
  const [usuario, setUsuario] = useState('');
  const [cancha, setCancha] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => {
    cargarDatos();
    setShow(true);
  };

  const API_URL = import.meta.env.VITE_API_URL;

  const cargarDatos = async () => {
    try {
      const resCanchas = await canchasTodasGet();
      setCanchasDisponibles(resCanchas.canchas || []);
      const resUsuarios = await fetch(`${API_URL}/usuarios?limite=1000`, {
        headers: { 'x-token': localStorage.getItem('token') }
      });
      const dataUsuarios = await resUsuarios.json();
      setUsuariosDisponibles(dataUsuarios.usuarios || []);
    } catch (error) {
      console.error("Error al cargar datos para el formulario:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaReserva = {
      usuario,
      cancha,
      fecha: new Date(fecha).toISOString(),
      hora: Number(hora)
    };

    await crearReserva(nuevaReserva);

    if (onReservaCreada) {
      onReservaCreada();
    }

    setUsuario('');
    setCancha('');
    setFecha('');
    setHora('');
    handleClose();
  };

  return (
    <>
      <button className={styles.agregarBtn} onClick={handleShow} style={{ marginBottom: '20px' }}>
        Agregar Reserva
      </button>
      <Modal show={show} onHide={handleClose} centered dialogClassName={styles.modalDialog}>
        <div className={styles.modalContent}>
          <Modal.Header closeButton className={styles.modalHeader}>
            <Modal.Title className={styles.modalTitle}>Crear nueva reserva</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <form className={styles.formulario} onSubmit={handleSubmit}>
              <h5>Usuario</h5>
              <select value={usuario} onChange={(e) => setUsuario(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none' }}>
                <option value="">Seleccione un usuario...</option>
                {usuariosDisponibles.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.nombre} {u.apellido} ({u.correo})
                  </option>
                ))}
              </select>
              <h5>Cancha</h5>
              <select value={cancha} onChange={(e) => setCancha(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '10px', border: '1px solid #ccc', outline: 'none' }}>
                <option value="">Seleccione una cancha...</option>
                {canchasDisponibles.map((c) => (
                  <option key={c._id} value={c._id}>
                    Cancha {c.cancha} - ${c.precio} (De {c.desde}hs a {c.hasta}hs)
                  </option>
                ))}
              </select>
              <h5>Fecha y Hora</h5>
              <div className={styles.checkboxRow}>
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
                <input type="number" placeholder="Hora (ej: 18)" value={hora} onChange={(e) => setHora(e.target.value)} min="0" max="23" required />
              </div>
              <div className={styles.botones}>
                <button type="submit" className={styles.crearBtn}>
                  Crear Reserva
                </button>
                <button type="button" className={styles.cancelarBtn} onClick={handleClose}>
                  Cancelar
                </button>
              </div>
            </form>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
