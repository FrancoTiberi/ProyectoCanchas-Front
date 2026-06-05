import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "../../styles/forms.module.css";
import { actualizarCancha } from "../../helpers/canchaApi";

export default function FormEditarCancha({ show, onClose, cancha, onCanchaActualizada }) {
  const [formData, setFormData] = useState(cancha || {});

  useEffect(() => {
    setFormData(cancha || {});
  }, [cancha]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await actualizarCancha(formData._id, {
        cancha: formData.cancha,
        desde: formData.desde,
        hasta: formData.hasta
      });

      if (result && result.msg && !result.cancha) {
        alert("Error al editar cancha: " + result.msg);
        return;
      }

      onCanchaActualizada(result.cancha ? result.cancha : formData);
      onClose();
    } catch (error) {
      console.error("Error al editar cancha:", error);
      alert("No se pudo editar la cancha.");
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered dialogClassName={styles.modalDialog}>
      <div className={styles.modalContent}>
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title className={styles.modalTitle}>Editar Cancha</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          {formData && (
            <form onSubmit={handleSubmit} className={styles.formulario}>
              <input type="text" name="cancha" value={formData.cancha || ""} onChange={handleChange} placeholder="Nombre de la Cancha" required />
              <h5>Indique las horas</h5>
              <div className={styles.checkboxRow}>
                <input type="number" name="desde" placeholder="Desde" value={formData.desde || ""} onChange={handleChange} required />
                <input type="number" name="hasta" placeholder="Hasta" value={formData.hasta || ""} onChange={handleChange} required />
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
