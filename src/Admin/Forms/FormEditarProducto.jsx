import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
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

export default function FormEditarProducto({ show, onClose, producto, onProductoActualizado }) {
  const [formData, setFormData] = useState(producto || {});
  const [showCategoriaModal, setShowCategoriaModal] = useState(false);
  const [categoriasLocales, setCategoriasLocales] = useState(CATEGORIAS_TIENDA);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setFormData(producto || {});
  }, [producto]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "categoria" && value === "crear") {
      setShowCategoriaModal(true);
      return;
    }
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCrearCategoria = (nuevaCat) => {
    const nombreCat = nuevaCat.nombre;
    if (nombreCat && !categoriasLocales.includes(nombreCat)) {
      setCategoriasLocales([...categoriasLocales, nombreCat]);
    }
    setFormData({ ...formData, categoria: nombreCat });
    setShowCategoriaModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/productos/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'x-token': localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al editar producto");

      const actualizado = await res.json();
      onProductoActualizado(actualizado);
      onClose();
    } catch (error) {
      console.error("Error al editar producto:", error);
      alert("No se pudo editar el producto.");
    }
  };

  return (
    <>
      <Modal show={show} onHide={onClose} centered dialogClassName={styles.modalDialog}>
        <div className={styles.modalContent}>
          <Modal.Header closeButton className={styles.modalHeader}>
            <Modal.Title className={styles.modalTitle}>Editar producto</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            {formData && (
              <form onSubmit={handleSubmit} className={styles.formulario}>
                <input type="text" name="nombre" value={formData.nombre || ""} onChange={handleChange} placeholder="Nombre" required />
                <textarea name="descripcion" value={formData.descripcion || ""} onChange={handleChange} placeholder="Descripción" />
                <input type="number" name="precio" value={formData.precio || ""} onChange={handleChange} placeholder="Precio" required />
                <input type="text" name="img" value={formData.img || ""} onChange={handleChange} placeholder="URL de imagen" />
                <div className={styles.categoriaRow}>
                  <select name="categoria" value={formData.categoria || ""} onChange={handleChange} required>
                    <option value="" disabled>Categoría</option>
                    {categoriasLocales.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="crear">+ Crear categoría</option>
                  </select>
                </div>
                <input type="number" name="stock" value={formData.stock || 0} onChange={handleChange} placeholder="Stock (Ingrese una cantidad)" min="0" />
                <div className={styles.checkboxRow}>
                  <input type="checkbox" name="estado" checked={formData.estado || false} onChange={handleChange} id="estadoProductoEdit" />
                  <label htmlFor="estadoProductoEdit">Activo</label>
                </div>
                <div className={styles.botones}>
                  <button type="submit" className={styles.crearBtn}>
                    Guardar cambios
                  </button>
                  <button type="button" className={styles.cancelarBtn} onClick={onClose}>
                    Cancelar
                  </button>
                </div>
              </form>
            )}
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
