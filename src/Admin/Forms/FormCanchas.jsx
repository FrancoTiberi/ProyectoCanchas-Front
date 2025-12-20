import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from '../../styles/FormComida.module.css';
import { crearCancha } from '../../helpers/canchaApi';

export default function FormCanchas({onCanchaCreada}) {
  const [show, setShow] = useState(false);
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');
  const [canchas, setCanchas] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaCancha = {
        canchas,
        desde,
        hasta
    }

    crearCancha(nuevaCancha);

    if (onCanchaCreada) onCanchaCreada(nuevaCancha);

    setCanchas('')
    setDesde('')
    setHasta('')
    handleClose();
  }

  return (
    <>
      <Button className={styles.agregarBtn} onClick={handleShow}>
        Agregar Canchas
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Crear nueva cancha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={styles.formulario} onSubmit={handleSubmit}>
            <input 
            type="number"
            placeholder='Cantidad de Canchas'
            value={canchas}
            onChange={(e)=> setCanchas(e.target.value)}
            required
            />
            <h5>Indique las horas</h5>
            <div className='d-flex gap-1'>
              <input
              type="number"
              placeholder="Desde"
              value={desde}
              onChange={(e)=> setDesde(e.target.value)}
              className='w-50'
              required
            />
            <input
              type="number"
              placeholder="Hasta"
              value={hasta}
              onChange={(e)=> setHasta(e.target.value)}
              className='w-50'
              required
            />
            </div>
            <button type="submit" className={styles.crearBtn}>
              Crear cancha
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}