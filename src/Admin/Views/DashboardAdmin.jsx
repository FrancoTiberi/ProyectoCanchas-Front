import { useEffect, useState } from 'react';
import styles from '../../styles/dashboard.module.css';

export default function DashboardAdmin() {
  const [datos, setDatos] = useState({
    ventasHoy: 0,
    ingresosHoy: 0,
    reservasPendientes: 0,
  });

  const [reservasActivasUsuario, setReservasActivasUsuario] = useState(0);

  useEffect(() => {
    // Cargar métricas generales
    const guardados = localStorage.getItem('dashboardData');
    if (guardados) {
      try {
        const parsed = JSON.parse(guardados);
        setDatos(parsed);
      } catch (error) {
        console.error("Error al parsear dashboardData:", error);
      }
    }

    // Cargar reservas activas del usuario
    const reservasUsuario = JSON.parse(localStorage.getItem("misReservas")) || [];
    setReservasActivasUsuario(reservasUsuario.length);
  }, []);

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.titulo}>Dashboard</h2>
      <p className={styles.subtitulo}>Resumen general del sistema</p>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Ventas hoy</h3>
          <p>{datos.ventasHoy}</p>
        </div>
        <div className={styles.card}>
          <h3>Ingresos estimados</h3>
          <p>${datos.ingresosHoy}</p>
        </div>
        <div className={styles.card}>
          <h3>Reservas activas</h3>
          <p>{reservasActivasUsuario}</p>
        </div>
      </div>
    </div>
  );
}
