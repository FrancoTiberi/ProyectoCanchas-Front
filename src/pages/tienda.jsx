import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { obtenerProductos } from '../helpers/productoApi';
import { obtenerMisPedidos } from '../helpers/pedidoApi';
import { useAuth } from '../context/AuthProvider';
import { useSearchParams } from 'react-router-dom';
import styles from '../styles/tienda.module.css';

export const Tienda = () => {
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const [misPedidos, setMisPedidos] = useState([]);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { user } = useAuth();

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const data = await obtenerProductos();
                const visibles = data.filter((p) => p.estado === true);
                setProductos(visibles);
            } catch (error) {
                console.error("Error al traer productos:", error);
            }
        };
        fetchProductos();
    }, []);

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
            alert('¡Compra Exitosa! Tu pago fue aprobado. Revisa "Mis Compras" para ver los detalles.');
            searchParams.delete('pago');
            setSearchParams(searchParams, { replace: true });
        }
    }, [searchParams, setSearchParams]);

    const categoriasMap = new Map();
    productos.forEach((prod) => {
        if (!categoriasMap.has(prod.categoria)) {
            categoriasMap.set(prod.categoria, []);
        }
        categoriasMap.get(prod.categoria).push(prod);
    });

    const categorias = Array.from(categoriasMap.entries()).map(([nombre, items]) => ({
        nombre,
        items,
        imagen: items[0]?.img || null,
        descripcion: `Productos de ${nombre}`
    }));

    const agregarAlCarrito = (producto) => {
        if (producto.stock === 0) return;
        setCarrito((prev) => {
            const itemExistente = prev.find((item) => item._id === producto._id);
            if (itemExistente) {
                if (itemExistente.cantidad >= producto.stock) return prev;
                return prev.map((item) =>
                    item._id === producto._id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }
            return [...prev, { ...producto, cantidad: 1 }];
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

    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    const irAPagar = () => {
        navigate('/pago-tienda', {
            state: {
                carrito,
                total
            }
        });
    };

    return (
        <Container className={`p-4 my-3 rounded-4 bg-white ${styles.container}`}>
            <div className="mt-4 mb-4 text-center rounded-4">
                <h1 className="fw-bold">Tienda Golazo Gourmet</h1>
                <p className="text-muted fs-5">
                    Equipate con lo mejor. Comprá online y retirá en nuestro local.
                </p>
                <hr className="w-50 mx-auto border-success border-2 opacity-50" />
            </div>
            {!categoriaSeleccionada ? (
                <Row className="g-4">
                    {categorias.map(cat => (
                        <Col key={cat.nombre} xs={12} sm={6} md={4}>
                            <Card className={styles.cardCategoria} onClick={() => setCategoriaSeleccionada(cat.nombre)}>
                                <Card.Img variant="top" src={cat.imagen || null} className={styles.imgCategoria} alt={cat.nombre} />
                                <Card.Body className="d-flex flex-column bg-secondary-subtle">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <Card.Title className="fw-bold mb-0 fs-5">{cat.nombre}</Card.Title>
                                    </div>
                                    <Card.Text className="text-muted flex-grow-1">
                                        {cat.descripcion}
                                    </Card.Text>
                                    <div className="mt-2 text-success fw-bold text-end">
                                        Ver productos <i className="bi bi-arrow-right"></i>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    {categorias.length === 0 && (
                        <Col xs={12}>
                            <p className="text-muted text-center fs-5 my-5">No hay productos disponibles por el momento.</p>
                        </Col>
                    )}
                </Row>
            ) : (
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="fw-bold mb-0">Productos de {categoriaSeleccionada}</h3>
                        <button className="btn btn-outline-danger" onClick={() => setCategoriaSeleccionada(null)}>
                            <i className="bi bi-arrow-left me-2"></i> Volver a Categorías
                        </button>
                    </div>
                    <Row className="g-4">
                        {categoriasMap.get(categoriaSeleccionada)?.map(producto => (
                            <Col key={producto._id} xs={12} sm={6} md={3}>
                                <Card className={`h-100 border-0 rounded-4 overflow-hidden ${styles.cardProducto}`}>
                                    <Card.Img variant="top" src={producto.img || null} className={styles.imgProducto} alt={producto.nombre} />
                                    <Card.Body className="d-flex flex-column bg-secondary-subtle">
                                        <Card.Title className="fw-bold fs-6">{producto.nombre}</Card.Title>
                                        {producto.descripcion && (
                                            <Card.Text className="text-muted small flex-grow-1">
                                                {producto.descripcion}
                                            </Card.Text>
                                        )}
                                        <Badge bg="success" className="align-self-start fs-6 mt-auto mb-2">
                                            ${producto.precio}
                                        </Badge>
                                        {producto.stock > 0 ? (
                                            <button onClick={() => agregarAlCarrito(producto)} className={styles.btnAgregar}>
                                                <i className="bi bi-cart-plus me-1"></i> Agregar
                                            </button>
                                        ) : (
                                            <span className={styles.agotado}>Agotado</span>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                        {(!categoriasMap.get(categoriaSeleccionada) || categoriasMap.get(categoriaSeleccionada).length === 0) && (
                            <Col xs={12}>
                                <p className="text-muted text-center fs-5 my-5">No hay productos en esta categoría por el momento.</p>
                            </Col>
                        )}
                    </Row>
                </div>
            )}
            <hr className="w-25 mx-auto border-success border-2 opacity-50 mt-4" />

            <button className={styles.carritoBtn} onClick={() => setMostrarCarrito((prev) => !prev)} aria-label="Abrir carrito">
                🛒
                {totalItems > 0 && (
                    <span className={styles.carritoBadge}>{totalItems}</span>
                )}
            </button>

            {mostrarCarrito && (
                <div className={styles.carritoContainer}>
                    <div className={styles.carritoHeader}>
                        <h3 className="m-0">Carrito</h3>
                        <button className={styles.cerrarCarrito} onClick={() => setMostrarCarrito(false)}>
                            ✕
                        </button>
                    </div>
                    {carrito.length === 0 ? (
                        <p className="text-muted text-center my-4">Tu carrito está vacío</p>
                    ) : (
                        <>
                            {carrito.map((item) => (
                                <div key={item._id} className={styles.carritoItem}>
                                    <img src={item.img} alt={item.nombre} className={styles.carritoItemImg} />
                                    <div className={styles.carritoItemInfo}>
                                        <span className={styles.carritoItemNombre}>{item.nombre}</span>
                                        <span className={styles.carritoItemPrecio}>${item.precio * item.cantidad}</span>
                                    </div>
                                    <div className={styles.carritoItemAcciones}>
                                        <button onClick={() => disminuirCantidad(item._id)} className={styles.btnCantidad}>
                                            -
                                        </button>
                                        <span className={styles.cantidadNum}>{item.cantidad}</span>
                                        <button onClick={() => agregarAlCarrito(item)} className={styles.btnCantidad}>
                                            +
                                        </button>
                                        <button onClick={() => eliminarDelCarrito(item._id)} className={styles.btnQuitar}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className={styles.carritoFooter}>
                                <p className={styles.carritoTotal}>Total: ${total}</p>
                                <button onClick={irAPagar} className={styles.btnPagar}>
                                    Ir a pagar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}

            {user && (
                <section>
                    <input type="checkbox" id="checkboxPedidos" className={styles.checkboxPedidos} />
                    <label htmlFor="checkboxPedidos">
                        <span className={styles.desplegablePedidos}><i className="bi bi-bag-check me-2"></i>Mis Compras</span>
                    </label>

                    <div className={styles.misPedidosContenedor}>
                        <h4 className="border-bottom pb-2 mb-3 fw-bold text-success">Mis Compras</h4>
                        {!misPedidos || misPedidos.length === 0 ? (
                            <p className="text-muted"><b>No tienes ninguna compra aún.</b></p>
                        ) : (
                            misPedidos.filter(p => p.items.some(i => i.tipo === 'tienda' || i.tipo === 'producto')).map((pedido) => (
                                <div key={pedido._id} className={styles.pedidoCard}>
                                    <span className={`${styles.badgeEstado} ${pedido.entregado ? styles.badgeEntregado : styles.badgePendiente}`}>
                                        {pedido.entregado ? "Entregado" : "Pendiente de Retiro"}
                                    </span>
                                    <span className="text-muted small">Fecha: {new Date(pedido.fecha).toLocaleDateString('es-AR', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                    <span className="fw-bold text-success fs-5">Total: ${pedido.total}</span>
                                    <hr className="my-1" />
                                    {pedido.items.map((item, i) => (
                                        <div key={i} className="d-flex align-items-center mb-1">
                                            {item.productoId?.img && (
                                                <img src={item.productoId.img} alt={item.nombre} style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '4px', marginRight: '8px' }} />
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
        </Container>
    );
};