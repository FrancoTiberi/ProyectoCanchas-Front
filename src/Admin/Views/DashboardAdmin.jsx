import { useEffect, useState } from "react";
import styles from "../../styles/dashboard.module.css";

export default function DashboardAdmin() {
  const [ventasComidas, setVentasComidas] = useState(0);
  const [ingresosComidas, setIngresosComidas] = useState(0);
  const [pedidos, setPedidos] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [reservasActivas, setReservasActivas] = useState(0);

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

    const fetchReservas = async () => {
      try {
        const token = localStorage.getItem("token");
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/reservas`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-token": token
          }
        });
        const data = await resp.json();
        const reservasData = data.reservas || [];

        const reservasConDatos = await Promise.all(
          reservasData.map(async (reserva) => {
            let usuarioNombre = reserva.usuario;
            let canchaInfo = { cancha: reserva.cancha };

            try {
              const respUsuario = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/${reserva.usuario}`, {
                headers: { "x-token": token }
              });
              const dataUsuario = await respUsuario.json();
              usuarioNombre = dataUsuario.usuario?.nombre || reserva.usuario;
            } catch (err) {
              console.error("Error al traer usuario:", err);
            }

            try {
              const respCancha = await fetch(`${import.meta.env.VITE_API_URL}/canchas/${reserva.cancha}`, {
                headers: { "x-token": token }
              });
              const dataCancha = await respCancha.json();
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

    fetchReservas();
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
          <h3>Reservas activas</h3>
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
      <h3 className={styles.sectionTitle}>Reservas</h3>
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
              <p><strong>Fecha:</strong> {new Date(reserva.fecha).toLocaleDateString()}</p>
              <p><strong>Hora:</strong> {reserva.hora}:00</p>
              <p><strong>Registrada:</strong> {new Date(reserva.fechaRegistro).toLocaleString()}</p>
              <p><strong>Estado:</strong> {reserva.estado ? "✅ Activa" : "❌ Cancelada"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}