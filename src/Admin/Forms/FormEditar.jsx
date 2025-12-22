import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "../../styles/FormComida.module.css";

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
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar comida</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            <input
              type="number"
              name="stock"
              value={formData.stock || 0}
              onChange={handleChange}
              placeholder="Stock"
              min="0"
            />
            <label>
              <input
                type="checkbox"
                name="destacado"
                checked={formData.destacado || false}
                onChange={handleChange}
              />
              Destacado
            </label>
            <label>
              <input
                type="checkbox"
                name="estado"
                checked={formData.estado || false}
                onChange={handleChange}
              />
              Activo
            </label>
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

            <Button type="submit" className={styles.btnedit}>
              Guardar cambios
            </Button>
          </form>
        )}
      </Modal.Body>
    </Modal>
  );
}
