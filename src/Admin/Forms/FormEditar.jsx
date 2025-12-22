import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "../../styles/forms.module.css";

export default function EditComidaModal({ show, onClose, comida, categorias, onComidaActualizada }) {
  const [formData, setFormData] = useState(comida || {});

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setFormData(comida || {});
  }, [comida]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/comidas/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al editar comida");

      const actualizada = await res.json();
      onComidaActualizada(actualizada);
      onClose();
    } catch (error) {
      console.error("Error al editar comida:", error);
      alert("No se pudo editar la comida.");
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered dialogClassName={styles.modalDialog}>
      <div className={styles.modalContent}>
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title className={styles.modalTitle}>Editar comida</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          {formData && (
            <form onSubmit={handleSubmit} className={styles.formulario}>
              <input
                type="text"
                name="nombre"
                value={formData.nombre || ""}
                onChange={handleChange}
                placeholder="Nombre"
                required
              />
              <textarea
                name="descripcion"
                value={formData.descripcion || ""}
                onChange={handleChange}
                placeholder="Descripción"
                required
              />
              <input
                type="number"
                name="precio"
                value={formData.precio || ""}
                onChange={handleChange}
                placeholder="Precio"
                required
              />
              <input
                type="text"
                name="img"
                value={formData.img || ""}
                onChange={handleChange}
                placeholder="URL de imagen"
              />
              <select
                name="categoria"
                value={formData.categoria?._id || formData.categoria || ""}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Categoría
                </option>
                {categorias.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="stock"
                value={formData.stock || 0}
                onChange={handleChange}
                placeholder="Stock"
                min="0"
              />

              <div className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  name="destacado"
                  checked={formData.destacado || false}
                  onChange={handleChange}
                  id="destacado"
                />
                <label htmlFor="destacado">Destacado</label>
              </div>

              <div className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  name="estado"
                  checked={formData.estado || false}
                  onChange={handleChange}
                  id="estado"
                />
                <label htmlFor="estado">Activo</label>
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
  );
}
