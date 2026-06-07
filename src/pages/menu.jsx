import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../styles/menu.module.css";
import { useAuth } from "../context/AuthProvider";
import LoginModal from "../components/LoginModal";
import { obtenerMisPedidos } from "../helpers/pedidoApi";

export const Menu = () => {
  const [comidas, setComidas] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [misPedidos, setMisPedidos] = useState([]);

  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
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

  useEffect(() => {
    const fetchPedidos = async () => {
      if (user) {
        const data = await obtenerMisPedidos();
        setMisPedidos(data.pedidos || []);
      }
    };
    fetchPedidos();
  }, [user]);

  useEffect(() => {
    if (searchParams.get('pago') === 'exitoso') {
      alert('¡Pedido Exitoso! Tu pago fue aprobado. Revisa "Mis Pedidos" para ver los detalles.');
      searchParams.delete('pago');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

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
      setShowLoginModal(true);
      return;
    }
    navigate('/pago-tienda', {
      state: {
        carrito,
        total,
        esComida: true
      }
    });
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
          <div className={styles.carritoHeader}>
            <h3 className="m-0">Carrito</h3>
            <button
              className={styles.cerrarCarrito}
              onClick={() => setMostrarCarrito(false)}
            >
              ✕
            </button>
          </div>
          {carrito.length === 0 ? (
            <p className="text-muted text-center my-4">Vacío</p>
          ) : (
            <>
              {carrito.map((item) => (
                <div key={item._id} className={styles.carritoItem}>
                  <img
                    src={item.img}
                    alt={item.nombre}
                    className={styles.carritoItemImg}
                  />
                  <div className={styles.carritoItemInfo}>
                    <span className={styles.carritoItemNombre}>{item.nombre}</span>
                    <span className={styles.carritoItemPrecio}>${item.precio * item.cantidad}</span>
                  </div>
                  <div className={styles.carritoItemAcciones}>
                    <button
                      onClick={() => disminuirCantidad(item._id)}
                      className={styles.btnCantidad}
                    >
                      -
                    </button>
                    <span className={styles.cantidadNum}>{item.cantidad}</span>
                    <button
                      onClick={() => agregarAlCarrito(item)}
                      className={styles.btnCantidad}
                    >
                      +
                    </button>
                    <button
                      onClick={() => eliminarDelCarrito(item._id)}
                      className={styles.btnQuitar}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
              <div className={styles.carritoFooter}>
                <p className={styles.carritoTotal}>Total: ${total}</p>
                <button
                  onClick={confirmarPedido}
                  className={styles.btnPagar}
                >
                  Pagar pedido
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Panel Desplegable de Mis Pedidos */}
      {user && (
        <section>
          <input type="checkbox" id="checkboxPedidosMenu" className={styles.checkboxPedidos} />
          <label htmlFor="checkboxPedidosMenu">
            <span className={styles.desplegablePedidos}><i className="bi bi-bag-check me-2"></i>Mis Pedidos</span>
          </label>

          <div className={styles.misPedidosContenedor}>
            <h4 className="border-bottom pb-2 mb-3 fw-bold text-success">Mis Pedidos</h4>
            {!misPedidos || misPedidos.length === 0 ? (
              <p className="text-muted"><b>No tienes ningún pedido aún.</b></p>
            ) : (
              misPedidos.filter(p => p.items.some(i => i.tipo === 'comida')).map((pedido) => (
                <div key={pedido._id} className={styles.pedidoCard}>
                  <span className={`${styles.badgeEstado} ${pedido.entregado ? styles.badgeEntregado : styles.badgePendiente}`}>
                    {pedido.entregado ? "Entregado" : "En camino"}
                  </span>
                  <span className="text-muted small">Fecha: {new Date(pedido.fecha).toLocaleDateString('es-AR', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  <span className="fw-bold text-success fs-5">Total: ${pedido.total}</span>
                  <hr className="my-1" />
                  {pedido.items.map((item, i) => (
                    <div key={i} className="d-flex align-items-center mb-1">
                      {item.comidaId?.img && (
                        <img src={item.comidaId.img} alt={item.nombre} style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '4px', marginRight: '8px' }} />
                      )}
                      <span className="small"><b>{item.nombre}</b> x{item.cantidad}</span>
                      <span className="small ms-auto fw-bold">${item.subtotal}</span>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </section>
      )}
    </main>
  );
};
