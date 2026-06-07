import { useEffect, useState } from "react";
import styles from "../../styles/dashboard.module.css";
import { obtenerProductos } from "../../helpers/productoApi";
import { reservasTodasGet } from "../../helpers/reservaApi";
import { canchaGet } from "../../helpers/canchaApi";
import { format, parseISO } from 'date-fns';

export default function DashboardAdmin() {
  const [ventasComidas, setVentasComidas] = useState(0);
  const [ingresosComidas, setIngresosComidas] = useState(0);
  const [pedidos, setPedidos] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [reservasActivas, setReservasActivas] = useState(0);
  const [productos, setProductos] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos")) || [];
    let totalComidas = 0;
    let ingresos = 0;

    pedidosGuardados.forEach(pedido => {
      pedido.items.forEach(item => {
        ingresos += item.subtotal;
        if (item.tipo === "comida") {
          totalComidas += item.cantidad;
        }
      });
    });

    setVentasComidas(totalComidas);
    setIngresosComidas(ingresos);
    setPedidos(pedidosGuardados);

    const fetchUsuario = async (id) => {
      const token = localStorage.getItem("token");
      const resp = await fetch(`${API_URL}/api/usuarios/${id}`, {
        headers: { 'x-token': token }
      });
      return await resp.json();
    };

    const fetchReservas = async () => {
      try {
        const data = await reservasTodasGet();
        const reservasData = data.reservas || [];

        const hoyLocalStr = format(new Date(), 'yyyy-MM-dd');
        const reservasDeHoy = reservasData.filter(r =>
          r.fecha && format(parseISO(r.fecha.replace('Z', '')), 'yyyy-MM-dd') === hoyLocalStr
        );

        const reservasConDatos = await Promise.all(
          reservasDeHoy.map(async (reserva) => {
            let usuarioNombre = reserva.usuario;
            let canchaInfo = { cancha: reserva.cancha };

            try {
              const dataUsuario = await fetchUsuario(reserva.usuario);
              usuarioNombre = dataUsuario.usuario?.nombre || reserva.usuario;
            } catch (err) {
              console.error("Error al traer usuario:", err);
            }

            try {
              const dataCancha = await canchaGet(reserva.cancha);
              canchaInfo = {
                cancha: dataCancha.cancha?.cancha || reserva.cancha,
                desde: dataCancha.cancha?.desde,
                hasta: dataCancha.cancha?.hasta,
                precio: dataCancha.cancha?.precio,
                estado: dataCancha.cancha?.estado,
                fechaRegistro: dataCancha.cancha?.fechaRegistro
              };
            } catch (err) {
              console.error("Error al traer cancha:", err);
            }
            return {
              ...reserva,
              usuarioNombre,
              canchaInfo
            };
          })
        );
        const ingresosReservas = reservasConDatos.reduce((acc, r) => acc + (r.canchaInfo.precio || 0), 0);
        setReservas(reservasConDatos);
        setReservasActivas(reservasConDatos.filter(r => r.estado).length);
        setIngresosComidas(prev => prev + ingresosReservas);
      } catch (error) {
        console.error("Error al traer reservas:", error);
      }
    };

    const fetchProductos = async () => {
      try {
        const respProductos = await obtenerProductos();
        setProductos(respProductos);
      } catch (error) {
        console.error("Error al traer productos:", error);
      }
    };

    fetchReservas();
    fetchProductos();
  }, []);

  const pedidosPendientes = pedidos.filter(p => !p.entregado);
  const pedidosEntregados = pedidos.filter(p => p.entregado);

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.titulo}>Dashboard</h2>
      <p className={styles.subtitulo}>Resumen general del sistema</p>
      {/* Resumen */}
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Comidas pendientes (cantidad de productos)</h3>
          <p>{ventasComidas}</p>
        </div>
        <div className={styles.card}>
          <h3>Ingresos aproximados</h3>
          <p>${ingresosComidas}</p>
        </div>
        <div className={styles.card}>
          <h3>Reservas activas (Hoy)</h3>
          <p>{reservasActivas}</p>
        </div>
      </div>
      {/* Pedidos pendientes */}
      <h3 className={styles.sectionTitle}>Pedidos pendientes</h3>
      <div className={styles.pedidosGrid}>
        {pedidosPendientes.length === 0 ? (
          <p>No hay pedidos pendientes</p>
        ) : (
          pedidosPendientes.map((pedido, idx) => (
            <div key={idx} className={styles.pedidoCard}>
              <h4>Propietario: {pedido.nombreUsuario}</h4>
              <p><strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleString()}</p>
              <p><strong>Total:</strong> ${pedido.total}</p>
              <p><strong>Estado:</strong> ⏳ Pendiente</p>
              <ul>
                {pedido.items.map((item, i) => (
                  <li key={i}>
                    {item.nombre} — Cantidad: {item.cantidad} — Subtotal: ${item.subtotal}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
      {/* Pedidos entregados */}
      <h3 className={styles.sectionTitle}>Pedidos entregados</h3>
      <div className={styles.pedidosGrid}>
        {pedidosEntregados.length === 0 ? (
          <p>No hay pedidos entregados</p>
        ) : (
          pedidosEntregados.map((pedido, idx) => (
            <div key={idx} className={styles.pedidoCard}>
              <h4>Propietario: {pedido.nombreUsuario}</h4>
              <p><strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleString()}</p>
              <p><strong>Total:</strong> ${pedido.total}</p>
              <p><strong>Estado:</strong> ✅ Entregado</p>
            </div>
          ))
        )}
      </div>
      {/* Reservas */}
      <h3 className={styles.sectionTitle}>Reservas de Hoy</h3>
      <div className={styles.pedidosGrid}>
        {reservas.length === 0 ? (
          <p>No hay reservas</p>
        ) : (
          reservas.map((reserva, idx) => (
            <div key={idx} className={styles.pedidoCard}>
              <p><strong>Usuario:</strong> {reserva.usuarioNombre}</p>
              <p><strong>Cancha:</strong> {reserva.canchaInfo.cancha}</p>
              <p><strong>Precio:</strong> ${reserva.canchaInfo.precio}</p>
              <p><strong>Desde:</strong> {reserva.canchaInfo.desde}:00</p>
              <p><strong>Hasta:</strong> {reserva.canchaInfo.hasta}:00</p>
              <p><strong>Fecha:</strong> {reserva.fecha ? format(parseISO(reserva.fecha.replace('Z', '')), 'dd/MM/yyyy') : ''}</p>
              <p><strong>Hora:</strong> {reserva.hora}:00</p>
              <p><strong>Registrada:</strong> {new Date(reserva.fechaRegistro).toLocaleString()}</p>
              <p><strong>Estado:</strong> {reserva.estado ? "✅ Activa" : "❌ Cancelada"}</p>
            </div>
          ))
        )}
      </div>
      {/* Productos y Stock */}
      <h3 className={styles.sectionTitle}>Stock de Productos</h3>
      <div className={styles.pedidosGrid}>
        {productos.length === 0 ? (
          <p>No hay productos cargados</p>
        ) : (
          productos.map((producto, idx) => (
            <div key={idx} className={styles.pedidoCard}>
              <p><strong>Producto:</strong> {producto.nombre}</p>
              <p><strong>Categoría:</strong> {producto.categoria}</p>
              <p><strong>Precio:</strong> ${producto.precio}</p>
              <p><strong>Stock:</strong> {producto.stock}</p>
              <p><strong>Estado:</strong> {producto.estado ? "✅ Activo" : "❌ Inactivo"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}