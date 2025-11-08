import { useEffect, useState } from 'react';
import styles from '../../styles/dashboard.module.css';

export default function DashboardAdmin() {
  const [datos, setDatos] = useState({
    ventasHoy: 0,
    ingresosHoy: 0,
    reservasPendientes: 0,
  });

  useEffect(() => {
    const guardados = localStorage.getItem('dashboardData');
    if (guardados) {
      try {
        const parsed = JSON.parse(guardados);
        setDatos(parsed);
      } catch (error) {
        console.error("Error al parsear localStorage:", error);
      }
    }
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
          <h3>Reservas pendientes</h3>
          <p>{datos.reservasPendientes}</p>
        </div>
      </div>
    </div>
  );
}
