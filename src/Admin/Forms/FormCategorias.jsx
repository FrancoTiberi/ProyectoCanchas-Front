import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "../../styles/FormComida.module.css";

export default function FormCategoria({ onCategoriaCreada }) {
    const [show, setShow] = useState(false);
    const [nombreCategoria, setNombreCategoria] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`${API_URL}/categorias`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ nombre: nombreCategoria }),
        });

        if (!res.ok) throw new Error("Error al crear categoría");
        const nueva = await res.json();
        if (onCategoriaCreada) onCategoriaCreada(nueva);

        setNombreCategoria("");
        setShow(false);
    };

    return (
        <>
            <Button variant="secondary" onClick={() => setShow(true)}>
                + Crear categoría
            </Button>

            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Nueva Categoría</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className={styles.formulario}>
                        <input
                            type="text"
                            placeholder="Nombre de la categoría"
                            value={nombreCategoria}
                            onChange={(e) => setNombreCategoria(e.target.value)}
                            required
                        />
                        <button type="submit" className={styles.crearBtn}>
                            Crear Categoría
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
