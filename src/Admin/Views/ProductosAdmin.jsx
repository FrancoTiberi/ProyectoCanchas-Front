import { useState, useEffect } from "react";
import FormProducto from "../Forms/FormProducto";
import FormEditarProducto from "../Forms/FormEditarProducto";
import styles from "../../styles/View.module.css";
import { obtenerProductos, borrarProducto } from "../../helpers/productoApi";

export default function ProductosAdmin() {
  const [productos, setProductos] = useState([]);
  const [editShow, setEditShow] = useState(false);
  const [productoEdit, setProductoEdit] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    fetchProductos();
  }, []);

  const handleEliminar = async (id) => {
    const confirm = window.confirm("¿Seguro que quieres eliminar este producto?");
    if (!confirm) return;

    try {
      await borrarProducto(id);
      setProductos(productos.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("No se pudo eliminar el producto.");
    }
  };

  const handleEditar = (producto) => {
    setProductoEdit(producto);
    setEditShow(true);
  };

  const categoriasMap = new Map();
  productos.forEach((prod) => {
    if (!categoriasMap.has(prod.categoria)) {
      categoriasMap.set(prod.categoria, []);
    }
    categoriasMap.get(prod.categoria).push(prod);
  });
  const categorias = Array.from(categoriasMap.entries());

  return (
    <div className={styles.adminContainer}>
      <h3 className={styles.titulo}>
        <i className="bi bi-shop"></i> Listado de productos
      </h3>

      <FormProducto
        onProductoCreado={(nuevo) => setProductos([...productos, nuevo])}
      />

      {categorias
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([catNombre, productosDeCategoria]) => (
          <div key={catNombre}>
            <h4 className={styles.categoriaTitulo}>
              <i className="bi bi-tags"></i> {catNombre}
            </h4>

            <div className={styles.grid}>
              {productosDeCategoria.length === 0 ? (
                <p><i className="bi bi-exclamation-circle"></i> No hay productos en esta categoría.</p>
              ) : (
                productosDeCategoria.map((p) => (
                  <div key={p._id} className={styles.card}>
                    {p.img && (
                      <img src={p.img} alt={p.nombre} className={styles.imagen} />
                    )}
                    <div className={styles.cardBody}>
                      <h5 className={styles.cardTitle}>
                        {p.nombre}
                      </h5>
                      <p className={styles.cardText}>{p.descripcion}</p>
                      <p><i className="bi bi-currency-dollar"></i><strong>{p.precio}</strong></p>
                      <p><i className="bi bi-box-seam"></i> Stock: {p.stock}</p>
                      <p>
                        {p.estado ? (
                          <span><i className="bi bi-check-circle-fill text-success"></i> Activo</span>
                        ) : (
                          <span><i className="bi bi-x-circle-fill text-danger"></i> Inactivo</span>
                        )}
                      </p>
                    </div>
                    <div className={styles.cardFooter}>
                      <button className={styles.btnedit} onClick={() => handleEditar(p)}>
                        <i className="bi bi-pencil-square"></i> Editar
                      </button>
                      <button className={styles.btndelete} onClick={() => handleEliminar(p._id)}>
                        <i className="bi bi-trash"></i> Eliminar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}

      <FormEditarProducto
        show={editShow}
        onClose={() => setEditShow(false)}
        producto={productoEdit}
        onProductoActualizado={(actualizado) =>
          setProductos(
            productos.map((p) => (p._id === actualizado._id ? actualizado : p))
          )
        }
      />
    </div>
  );
}
