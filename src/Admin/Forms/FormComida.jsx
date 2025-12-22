import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormCategoria from "../Forms/FormCategorias";
import styles from "../../styles/forms.module.css";

export default function FormComida({ categorias, onComidaCreada, onCategoriaCreada }) {
  const [show, setShow] = useState(false);
  const [showCategoriaModal, setShowCategoriaModal] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [destacado, setDestacado] = useState(false);
  const [stock, setStock] = useState(0);
  const [estado, setEstado] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const nuevaComida = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio: parseFloat(precio),
      img: imagen?.trim(),
      destacado,
      stock: parseInt(stock),
      estado,
      categoria: categoriaSeleccionada,
      usuario: JSON.parse(localStorage.getItem("user"))?._id,
    };

    try {
      const res = await fetch(`${API_URL}/comidas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(nuevaComida),
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Error al crear comida");
      }

      const creada = await res.json();
      if (onComidaCreada) onComidaCreada(creada);

      // reset
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setImagen("");
      setCategoriaSeleccionada("");
      setDestacado(false);
      setStock(0);
      setEstado(true);
      setShow(false);
    } catch {
      setErrorMsg("No se pudo crear la comida. Verifica los datos ingresados.");
    }
  };

  const handleCategoriaChange = (e) => {
    const value = e.target.value;
    if (value === "crear") {
      setShowCategoriaModal(true);
    } else {
      setCategoriaSeleccionada(value);
    }
  };

  return (
    <>
      <Button className={styles.agregarBtn} onClick={() => setShow(true)}>
        <i className="bi bi-plus-circle"></i> Agregar comida
      </Button>

      {/* Modal de comida */}
      <Modal show={show} onHide={() => setShow(false)} centered dialogClassName={styles.modalDialog}>
        <div className={styles.modalContent}>
          <Modal.Header closeButton className={styles.modalHeader}>
            <Modal.Title className={styles.modalTitle}>Crear nueva comida</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
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
                placeholder="Precio (Ingrese una cantidad)"
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

              <div className={styles.categoriaRow}>
                <select value={categoriaSeleccionada} onChange={handleCategoriaChange} required>
                  <option value="" disabled>
                    Categoría
                  </option>
                  {categorias
                    .slice()
                    .sort((a, b) => a.nombre.localeCompare(b.nombre))
                    .map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.nombre}
                      </option>
                    ))}
                  <option value="crear">+ Crear categoría</option>
                </select>
              </div>
               <input
                type="number"
                placeholder="Stock (Ingrese una cantidad)"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                min="0"
              />

              <div className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  id="destacado"
                  checked={destacado}
                  onChange={(e) => setDestacado(e.target.checked)}
                />
                <label htmlFor="destacado">Destacado</label>
              </div>

              <div className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  id="estado"
                  checked={estado}
                  onChange={(e) => setEstado(e.target.checked)}
                />
                <label htmlFor="estado">Activo</label>
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

      {/* Modal de categoría */}
      <Modal show={showCategoriaModal} onHide={() => setShowCategoriaModal(false)} centered dialogClassName={styles.modalDialog}>
        <div className={styles.modalContent}>
          <Modal.Header closeButton className={styles.modalHeader}>
            <Modal.Title className={styles.modalTitle}>Crear nueva categoría</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <FormCategoria
              onCategoriaCreada={(nueva) => {
                onCategoriaCreada(nueva);
                setShowCategoriaModal(false);
              }}
            />
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
