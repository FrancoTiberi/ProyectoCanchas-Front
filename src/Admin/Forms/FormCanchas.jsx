import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from "../../styles/forms.module.css";
import { crearCancha } from '../../helpers/canchaApi';

export default function FormCanchas({ onCanchaCreada }) {
  const [show, setShow] = useState(false);
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');
  const [canchas, setCanchas] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaCancha = { canchas, desde, hasta };
    crearCancha(nuevaCancha);

    if (onCanchaCreada) onCanchaCreada(nuevaCancha);

    setCanchas('');
    setDesde('');
    setHasta('');
    handleClose();
  };

  return (
    <>
      <button className={styles.agregarBtn} onClick={handleShow}>
        Agregar Canchas
      </button>

      <Modal show={show} onHide={handleClose} centered dialogClassName={styles.modalDialog}>
        <div className={styles.modalContent}>
          <Modal.Header closeButton className={styles.modalHeader}>
            <Modal.Title className={styles.modalTitle}>Crear nueva cancha</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <form className={styles.formulario} onSubmit={handleSubmit}>
              <input type="number" placeholder="Cantidad de Canchas" value={canchas} onChange={(e) => setCanchas(e.target.value)} required />
              <h5>Indique las horas</h5>
              <div className={styles.checkboxRow}>
                <input type="number" placeholder="Desde" value={desde} onChange={(e) => setDesde(e.target.value)} required />
                <input type="number" placeholder="Hasta" value={hasta} onChange={(e) => setHasta(e.target.value)} required />
              </div>
              <div className={styles.botones}>
                <button type="submit" className={styles.crearBtn}>
                  Crear cancha
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
