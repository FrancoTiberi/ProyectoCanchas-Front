import { useEffect, useState } from "react";
import styles from "../styles/menu.module.css";
import { comidasbc } from "../data/comida";

export const Menu = () => {
  const [comidas, setComidas] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  useEffect(() => {
    const comidasLocales = JSON.parse(localStorage.getItem("comidas")) || [];
    const visiblesLocales = comidasLocales.filter((c) => c.visible);
    const visiblesBase = comidasbc.filter((c) => c.visible);
    setComidas([...visiblesBase, ...visiblesLocales]);

    const usuario = JSON.parse(localStorage.getItem("currentUser"));
    if (usuario && usuario.username) {
      setUsuarioLogueado(usuario);
    }
  }, []);

  const agregarAlCarrito = (comida) => {
    setCarrito((prev) => {
      const itemExistente = prev.find((item) => item.id === comida.id);
      if (itemExistente) {
        return prev.map((item) =>
          item.id === comida.id
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
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const confirmarPedido = () => {
    const ventasActuales = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const ingresosActuales = total;

    const dashboardPrevio = JSON.parse(localStorage.getItem("dashboardData")) || {
      ventasHoy: 0,
      ingresosHoy: 0,
      reservasPendientes: 0,
      productosActivos: 0
    };

    const actualizado = {
      ...dashboardPrevio,
      ventasHoy: dashboardPrevio.ventasHoy + ventasActuales,
      ingresosHoy: dashboardPrevio.ingresosHoy + ingresosActuales
    };

    localStorage.setItem("dashboardData", JSON.stringify(actualizado));

    alert(`✅ Pedido confirmado:\n\nProductos: ${ventasActuales}\nTotal: $${ingresosActuales}\n\n¡Gracias por tu compra!`);
    setCarrito([]);
    setMostrarCarrito(false);
  };

  const categorias = [...new Set(comidas.map((item) => item.categoria))];
  const comidasPorCategoria = categorias.map((categoria) => ({
    categoria,
    items: comidas.filter((item) => item.categoria === categoria),
  }));

  return (
    <main className={styles.main}>
      <h1 className={styles.titulo}>Menú</h1>

      {comidasPorCategoria.map((categoria) => (
        <section key={categoria.categoria} className={styles.section}>
          <h2 className={styles.sectionTitle}>{categoria.categoria}</h2>
          <div className={styles.itemsContainer}>
            {categoria.items.map((item) => (
              <div key={item.id} className={styles.card}>
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className={styles.imagen}
                  onError={(e) => (e.target.src = "/images/fallback.png")}
                />
                <h3>{item.nombre}</h3>
                <p>{item.descripcion}</p>
                <p className={styles.precio}>${item.precio}</p>
                <button
                  onClick={() => agregarAlCarrito(item)}
                  className={`${styles.button} ${styles.agregar}`}
                >
                  Agregar
                </button>
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
              <div key={item.id} className={styles.carritoItem}>
                <span>
                  {item.nombre} x {item.cantidad} = ${item.precio * item.cantidad}
                </span>
                <div>
                  <button
                    onClick={() => disminuirCantidad(item.id)}
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
                    onClick={() => eliminarDelCarrito(item.id)}
                    className={styles.button}
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ))
          )}
          <p className={styles.total}>Total: ${total}</p>

          {usuarioLogueado ? (
            <button
              onClick={confirmarPedido}
              className={`${styles.button} ${styles.confirmarBtn}`}
            >
              Confirmar pedido
            </button>
          ) : (
            <p className={styles.avisoLogin}>
              Iniciá sesión para confirmar tu pedido.
            </p>
          )}
        </div>
      )}
    </main>
  );
};
