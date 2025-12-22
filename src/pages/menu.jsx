import { useEffect, useState } from "react";
import styles from "../styles/menu.module.css";
import { useAuth } from "../context/AuthProvider";
import LoginModal from "../components/LoginModal";

export const Menu = () => {
  const [comidas, setComidas] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // ✅ estado para modal
  const { user } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchComidas = async () => {
      try {
        const res = await fetch(`${API_URL}/comidas`);
        const data = await res.json();
        const visibles = data.filter((c) => c.estado === true);
        setComidas(visibles);
      } catch (error) {
        console.error("Error al traer comidas:", error);
      }
    };
    fetchComidas();
  }, [API_URL]);

  const agregarAlCarrito = (comida) => {
    if (comida.stock === 0) return;
    setCarrito((prev) => {
      const itemExistente = prev.find((item) => item._id === comida._id);
      if (itemExistente) {
        return prev.map((item) =>
          item._id === comida._id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...comida, cantidad: 1 }];
    });
  };

  const disminuirCantidad = (id) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item._id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item._id !== id));
  };

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const confirmarPedido = () => {
    if (!user) {
      alert("Debes iniciar sesión para confirmar el pedido.");
      setShowLoginModal(true); // ✅ abre el modal
      return;
    }

    const pedido = {
      usuario: user._id,
      nombreUsuario: user.nombre,
      fecha: new Date().toISOString(),
      items: carrito.map((item) => ({
        comida: item._id,
        nombre: item.nombre,
        cantidad: item.cantidad,
        precioUnitario: item.precio,
        subtotal: item.precio * item.cantidad,
      })),
      total,
    };

    const pedidosPrevios = JSON.parse(localStorage.getItem("pedidos")) || [];
    localStorage.setItem("pedidos", JSON.stringify([...pedidosPrevios, pedido]));

    alert(`✅ Pedido confirmado:\n\nTotal: $${total}\n\n¡Gracias por tu compra!`);
    setCarrito([]);
    setMostrarCarrito(false);
  };

  // Agrupar comidas por categoría
  const categoriasMap = new Map();
  comidas.forEach((item) => {
    const cat = item.categoria;
    if (cat && !categoriasMap.has(cat._id)) {
      categoriasMap.set(cat._id, { _id: cat._id, nombre: cat.nombre, items: [] });
    }
    if (cat) {
      categoriasMap.get(cat._id).items.push(item);
    }
  });
  const comidasPorCategoria = Array.from(categoriasMap.values());

  return (
    <main className={styles.main}>
      <h1 className={styles.titulo}>Menú</h1>

      {comidasPorCategoria.map((categoria) => (
        <section key={categoria._id} className={styles.section}>
          <h2 className={styles.sectionTitle}>{categoria.nombre}</h2>
          <div className={styles.itemsContainer}>
            {categoria.items.map((item) => (
              <div key={item._id} className={styles.card}>
                <img
                  src={item.img}
                  alt={item.nombre}
                  className={styles.imagen}
                  onError={(e) => (e.target.src = "/images/fallback.png")}
                />
                <h3>{item.nombre}</h3>
                <p>{item.descripcion}</p>
                <p className={styles.precio}>${item.precio}</p>

                {item.stock > 0 ? (
                  <button
                    onClick={() => agregarAlCarrito(item)}
                    className={`${styles.button} ${styles.agregar}`}
                  >
                    Agregar
                  </button>
                ) : (
                  <span className={styles.agotado}>Agotado</span>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <button
        className={`${styles.button} ${styles.carritoBtn}`}
        onClick={() => setMostrarCarrito((prev) => !prev)}
        aria-label="Abrir carrito"
      >
        🛒
      </button>

      {mostrarCarrito && (
        <div className={styles.carritoContainer}>
          <h3>Carrito</h3>
          {carrito.length === 0 ? (
            <p>Vacío</p>
          ) : (
            carrito.map((item) => (
              <div key={item._id} className={styles.carritoItem}>
                <span>
                  {item.nombre} x {item.cantidad} = ${item.precio * item.cantidad}
                </span>
                <div>
                  <button
                    onClick={() => disminuirCantidad(item._id)}
                    className={styles.button}
                    disabled={item.cantidad === 1}
                  >
                    -
                  </button>
                  <button
                    onClick={() => agregarAlCarrito(item)}
                    className={styles.button}
                  >
                    +
                  </button>
                  <button
                    onClick={() => eliminarDelCarrito(item._id)}
                    className={styles.button}
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ))
          )}
          <p className={styles.total}>Total: ${total}</p>
          <button
            onClick={confirmarPedido}
            className={`${styles.button} ${styles.confirmarBtn}`}
          >
            Confirmar pedido
          </button>
        </div>
      )}
    </main>
  );
};
