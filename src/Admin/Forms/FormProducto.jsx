import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormCategoria from "./FormCategorias";
import styles from "../../styles/forms.module.css";

const CATEGORIAS_TIENDA = [
  "Botines",
  "Pelotas",
  "Proteccion",
  "Accesorios",
  "Indumentaria",
  "Camisetas"
];

export default function FormProducto({ onProductoCreado }) {
  const [show, setShow] = useState(false);
  const [showCategoriaModal, setShowCategoriaModal] = useState(false);
  const [categoriasLocales, setCategoriasLocales] = useState(CATEGORIAS_TIENDA);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [stock, setStock] = useState(0);
  const [estado, setEstado] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleCategoriaChange = (e) => {
    const value = e.target.value;
    if (value === "crear") {
      setShowCategoriaModal(true);
    } else {
      setCategoriaSeleccionada(value);
    }
  };

  const handleCrearCategoria = (nuevaCat) => {
    const nombreCat = nuevaCat.nombre;
    if (nombreCat && !categoriasLocales.includes(nombreCat)) {
      setCategoriasLocales([...categoriasLocales, nombreCat]);
    }
    setCategoriaSeleccionada(nombreCat);
    setShowCategoriaModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const nuevoProducto = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio: parseFloat(precio),
      img: imagen?.trim(),
      stock: parseInt(stock),
      estado,
      categoria: categoriaSeleccionada,
      usuario: JSON.parse(localStorage.getItem("currentUser"))?._id,
    };

    try {
      const res = await fetch(`${API_URL}/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'x-token': localStorage.getItem("token"),
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Error al crear producto");
      }

      const creado = await res.json();
      if (onProductoCreado) onProductoCreado(creado);

      setNombre("");
      setDescripcion("");
      setPrecio("");
      setImagen("");
      setCategoriaSeleccionada("");
      setStock(0);
      setEstado(true);
      setShow(false);
    } catch {
      setErrorMsg("No se pudo crear el producto. Verifica los datos ingresados.");
    }
  };

  return (
    <>
      <Button className={styles.agregarBtn} onClick={() => setShow(true)}>
        <i className="bi bi-plus-circle"></i> Agregar producto
      </Button>

      <Modal show={show} onHide={() => setShow(false)} centered dialogClassName={styles.modalDialog}>
        <div className={styles.modalContent}>
          <Modal.Header closeButton className={styles.modalHeader}>
            <Modal.Title className={styles.modalTitle}>Crear nuevo producto</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <form onSubmit={handleSubmit} className={styles.formulario}>
              <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
              <textarea placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
              <input type="number" placeholder="Precio (Ingrese una cantidad)" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
              <input type="text" placeholder="URL de imagen (opcional)" value={imagen} onChange={(e) => setImagen(e.target.value)} />
              <div className={styles.categoriaRow}>
                <select value={categoriaSeleccionada} onChange={handleCategoriaChange} required>
                  <option value="" disabled>
                    Categoría
                  </option>
                  {categoriasLocales.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="crear">+ Crear categoría</option>
                </select>
              </div>
              <input type="number" placeholder="Stock (Ingrese una cantidad)" value={stock} onChange={(e) => setStock(e.target.value)} min="0" />
              <div className={styles.checkboxRow}>
                <input type="checkbox" id="estadoProducto" checked={estado} onChange={(e) => setEstado(e.target.checked)} />
                <label htmlFor="estadoProducto">Activo</label>
              </div>
              {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
              <div className={styles.botones}>
                <button type="submit" className={styles.crearBtn}>
                  <i className="bi bi-save"></i> Crear
                </button>
                <button type="button" className={styles.cancelarBtn} onClick={() => setShow(false)}>
                  <i className="bi bi-x-circle"></i> Cancelar
                </button>
              </div>
            </form>
          </Modal.Body>
        </div>
      </Modal>
      <Modal show={showCategoriaModal} onHide={() => setShowCategoriaModal(false)} centered dialogClassName={styles.modalDialog}>
        <div className={styles.modalContent}>
          <Modal.Header closeButton className={styles.modalHeader}>
            <Modal.Title className={styles.modalTitle}>Crear nueva categoría</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <FormCategoria onCategoriaCreada={handleCrearCategoria} />
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
