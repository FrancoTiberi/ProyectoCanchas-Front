import { useState } from "react";
import styles from "../../styles/forms.module.css";

export default function FormCategoria({ onCategoriaCreada }) {
    const [nombreCategoria, setNombreCategoria] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`${API_URL}/categorias`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'x-token': localStorage.getItem("token"),
            },
            body: JSON.stringify({ nombre: nombreCategoria }),
        });

        if (!res.ok) throw new Error("Error al crear categoría");
        const nueva = await res.json();
        if (onCategoriaCreada) onCategoriaCreada(nueva);

        setNombreCategoria("");
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formulario}>
            <input
                type="text"
                placeholder="Nombre de la categoría"
                value={nombreCategoria}
                onChange={(e) => setNombreCategoria(e.target.value)}
                required
            />
            <div className={styles.botones}>
                <button type="submit" className={styles.crearBtn}>
                    Crear Categoría
                </button>
            </div>
        </form>
    );
}
