import { useEffect, useState } from 'react';
import styles from "../../styles/View.module.css";
import { reservasTodasGet, borrarReserva } from '../../helpers/reservaApi';
import { canchaGet } from '../../helpers/canchaApi';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import FormReserva from '../Forms/FormReserva';

export default function ReservasAdmin() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchUsuario = async (id) => {
    const token = localStorage.getItem("token");
    const resp = await fetch(`${API_URL}/usuarios/${id}`, {
      headers: { 'x-token': token }
    });
    return await resp.json();
  };

  const obtenerReservas = async () => {
    setLoading(true);
    try {
      const data = await reservasTodasGet();
      const reservasData = data.reservas || [];

      const reservasConDatos = await Promise.all(
        reservasData.map(async (reserva) => {
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
      setReservas(reservasConDatos);
    } catch (error) {
      console.error("Error al obtener las reservas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerReservas();
  }, []);

  const handleCancelarReserva = async (id) => {
    const confirm = window.confirm("¿Seguro que quieres cancelar esta reserva?");
    if (!confirm) return;

    try {
      await borrarReserva(id);
      setReservas(reservas.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Error al cancelar reserva:", error);
      alert("No se pudo cancelar la reserva.");
    }
  };

  const reservasAgrupadas = reservas.reduce((acc, reserva) => {
    const fechaStr = reserva.fecha ? format(parseISO(reserva.fecha.replace('Z', '')), 'yyyy-MM-dd') : '1970-01-01';
    const canchaNombre = reserva.canchaInfo?.cancha || "Cancha Desconocida";

    if (!acc[fechaStr]) {
      acc[fechaStr] = {};
    }
    if (!acc[fechaStr][canchaNombre]) {
      acc[fechaStr][canchaNombre] = [];
    }
    acc[fechaStr][canchaNombre].push(reserva);
    return acc;
  }, {});

  const fechasOrdenadas = Object.keys(reservasAgrupadas).sort((a, b) => new Date(a) - new Date(b));

  return (
    <div className={styles.adminContainer}>
      <h2 className={styles.titulo}>Gestión de Reservas de Clientes</h2>

      <FormReserva onReservaCreada={obtenerReservas} />

      {loading ? (
        <p>Cargando reservas...</p>
      ) : fechasOrdenadas.length === 0 ? (
        <p>No hay reservas en el sistema.</p>
      ) : (
        fechasOrdenadas.map((fechaStr) => {
          const fechaFormateada = format(parseISO(fechaStr), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });
          const fechaFinal = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);

          const canchasDelDia = reservasAgrupadas[fechaStr];
          const canchasOrdenadas = Object.keys(canchasDelDia).sort();

          return (
            <div key={fechaStr} style={{ marginBottom: '50px' }}>
              <h3 className={styles.categoriaTitulo} style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
                <i className="bi bi-calendar-event"></i> {fechaFinal}
              </h3>
              {canchasOrdenadas.map((canchaNombre) => (
                <div key={canchaNombre} style={{ marginLeft: '20px', marginBottom: '30px' }}>
                  <h4 className={styles.subtitulo} style={{ color: '#666', marginBottom: '15px' }}>
                    <i className="bi bi-tags-fill"></i> Cancha: {canchaNombre}
                  </h4>
                  <div className={styles.grid}>
                    {canchasDelDia[canchaNombre]
                      .sort((a, b) => a.hora - b.hora)
                      .map((reserva) => (
                        <div key={reserva._id} className={styles.card}>
                          <h5 className={styles.cardTitle}>
                            <i className="bi bi-person-circle"></i> {reserva.usuarioNombre}
                          </h5>
                          <p className={styles.cardText}>
                            <strong><i className="bi bi-clock"></i> Hora:</strong> {reserva.hora}:00hs
                          </p>
                          <p className={styles.cardText}>
                            <strong><i className="bi bi-currency-dollar"></i> Precio:</strong> ${reserva.canchaInfo?.precio}
                          </p>
                          <p className={styles.cardText}>
                            <strong>Estado:</strong> {reserva.estado ? "✅ Confirmada" : "❌ Cancelada"}
                          </p>
                          <div className={styles.cardFooter}>
                            <button onClick={() => handleCancelarReserva(reserva._id)} className={styles.btndelete} style={{ width: '100%', marginTop: '10px' }}>
                              <i className="bi bi-x-circle"></i> Cancelar Reserva
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })
      )}
    </div>
  );
}
