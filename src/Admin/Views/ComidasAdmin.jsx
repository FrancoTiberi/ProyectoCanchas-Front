import { useState, useEffect } from "react";
import FormComida from "../Forms/FormComida";
import EditComidaModal from "../Forms/FormEditar";
import styles from "../../styles/View.module.css";

export default function ComidaAdmin() {
  const [categorias, setCategorias] = useState([]);
  const [comidas, setComidas] = useState([]);
  const [editShow, setEditShow] = useState(false);
  const [comidaEdit, setComidaEdit] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCategorias = async () => {
      const res = await fetch(`${API_URL}/categorias`);
      const data = await res.json();
      setCategorias(data);
    };
    fetchCategorias();

    const fetchComidas = async () => {
      const res = await fetch(`${API_URL}/comidas`);
      const data = await res.json();
      setComidas(data);
    };
    fetchComidas();
  }, [API_URL]);

  const handleEliminar = async (id) => {
    const confirm = window.confirm("¿Seguro que quieres eliminar esta comida?");
    if (!confirm) return;

    try {
      const res = await fetch(`${API_URL}/comidas/${id}`, {
        method: "DELETE",
        headers: {
          'x-token': localStorage.getItem("token"),
        },
      });

      if (!res.ok) throw new Error("Error al eliminar comida");

      setComidas(comidas.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error al eliminar comida:", error);
      alert("No se pudo eliminar la comida.");
    }
  };

  const handleEditar = (comida) => {
    setComidaEdit(comida);
    setEditShow(true);
  };

  return (
    <div className={styles.adminContainer}>
      <h3 className={styles.titulo}>
        <i className="bi bi-list-ul"></i> Listado de comidas
      </h3>

      <FormComida
        categorias={categorias}
        onComidaCreada={(nueva) => setComidas([...comidas, nueva])}
        onCategoriaCreada={(nueva) => setCategorias([...categorias, nueva])}
      />

      {categorias
        .slice()
        .sort((a, b) => a.nombre.localeCompare(b.nombre))
        .map((cat) => {
          const comidasDeCategoria = comidas.filter(
            (c) => c.categoria?._id === cat._id
          );

          return (
            <div key={cat._id}>
              <h4 className={styles.categoriaTitulo}>
                <i className="bi bi-tags"></i> {cat.nombre}
              </h4>

              <div className={styles.grid}>
                {comidasDeCategoria.length === 0 ? (
                  <p><i className="bi bi-exclamation-circle"></i> No hay comidas en esta categoría.</p>
                ) : (
                  comidasDeCategoria.map((c) => (
                    <div key={c._id} className={styles.card}>
                      {c.img && (
                        <img
                          src={c.img}
                          alt={c.nombre}
                          className={styles.imagen}
                        />
                      )}
                      <div className={styles.cardBody}>
                        <h5 className={styles.cardTitle}>
                          <i className="bi bi-egg-fried"></i> {c.nombre}
                        </h5>
                        <p className={styles.cardText}>{c.descripcion}</p>
                        <p><i className="bi bi-currency-dollar"></i> <strong>{c.precio}</strong></p>
                        <p><i className="bi bi-box-seam"></i> Stock: {c.stock}</p>
                        <p>
                          {c.estado ? (
                            <span><i className="bi bi-check-circle-fill text-success"></i> Activo</span>
                          ) : (
                            <span><i className="bi bi-x-circle-fill text-danger"></i> Inactivo</span>
                          )}
                        </p>
                        <p>
                          {c.destacado ? (
                            <span><i className="bi bi-star-fill text-warning"></i> Destacado</span>
                          ) : (
                            <span><i className="bi bi-star"></i> Normal</span>
                          )}
                        </p>
                      </div>
                      <div className={styles.cardFooter}>
                        <button
                          className={styles.btnedit}
                          onClick={() => handleEditar(c)}
                        >
                          <i className="bi bi-pencil-square"></i> Editar
                        </button>
                        <button
                          className={styles.btndelete}
                          onClick={() => handleEliminar(c._id)}
                        >
                          <i className="bi bi-trash"></i> Eliminar
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}

      <EditComidaModal
        show={editShow}
        onClose={() => setEditShow(false)}
        comida={comidaEdit}
        categorias={categorias}
        onComidaActualizada={(actualizada) =>
          setComidas(
            comidas.map((c) => (c._id === actualizada._id ? actualizada : c))
          )
        }
      />
    </div>
  );
}
