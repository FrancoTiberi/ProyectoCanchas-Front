import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from '../../styles/FormComida.module.css';

export default function FormComida({ onComidaCreada }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');
  const [categoria, setCategoria] = useState('Pizzas');
  const [categoriaPersonalizada, setCategoriaPersonalizada] = useState('');

  const categoriasBase = [
    "Pizzas",
    "Hamburguesas",
    "Sándwiches",
    "Nueva categoría"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoriaFinal = categoria === "Nueva categoría"
      ? categoriaPersonalizada.trim()
      : categoria?.trim();

    if (!categoriaFinal || categoriaFinal.length < 2) {
      alert("Debes ingresar una categoría válida.");
      return;
    }


    const nuevaComida = {
      id: Date.now(),
      nombre,
      descripcion,
      precio: parseFloat(precio),
      imagen: imagen?.trim() || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd7S5iS77v4PL22VL4m7St-gcwzcg7o1DE2Q&s", visible: true,
      categoria: categoriaFinal
    };

    const comidasGuardadas = JSON.parse(localStorage.getItem('comidas')) || [];
    comidasGuardadas.push(nuevaComida);
    localStorage.setItem('comidas', JSON.stringify(comidasGuardadas));

    if (onComidaCreada) onComidaCreada(nuevaComida);

    // Limpiar y cerrar
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setImagen('');
    setCategoria('Pizzas');
    setCategoriaPersonalizada('');
    handleClose();
  };

  return (
    <>
      <Button className={styles.agregarBtn} onClick={handleShow}>
        Agregar comida
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Crear nueva comida</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className={styles.formulario}>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <textarea
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="URL de imagen (opcional)"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
            />
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              {categoriasBase.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {categoria === "Nueva categoría" && (
              <input
                type="text"
                placeholder="Escribí la nueva categoría"
                value={categoriaPersonalizada}
                onChange={(e) => setCategoriaPersonalizada(e.target.value)}
                required
              />
            )}
            <button type="submit" className={styles.crearBtn}>
              Crear comida
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
