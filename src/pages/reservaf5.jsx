import { addDays } from 'date-fns/fp';
import canchadefutbol from '../assets/img/cancha-de-futbol.png'
import reloj from '../assets/img/reloj.png'
import { useState, useEffect, useRef, forwardRef } from "react";
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import { Row, Col } from 'react-bootstrap';
import { format } from 'date-fns';
import styles from '../styles/reserva.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { reservaEjemplo } from '../data/reserva';

export const Reservaf5 = () => {

    const [abrirDropdown, setAbrirDropdown] = useState(null);
    const [grilla, setGrilla] = useState([]);
    const [horas, setHoras] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const dropdownRef = useRef(null);

    const BotonDatepicker = forwardRef(({ value, onClick }, ref) => (
        <button
            className={styles.calendario}
            onClick={onClick}
            ref={ref}
        >{value}</button>
    ));

    function generarHoras(desde, hasta) {
        let horasTotales = [];
        let rango = hasta < desde ? hasta + 24 : hasta;

        for (let i = desde; i <= rango; i++) {
            horasTotales.push({
                id: Date.now() + i,
                cantHoras: i >= 24 ? i - 24 : i
            })
        }
        return horasTotales;
    }

    function generarCanchasyFilas(obj) {
        let canchasTotales = [];
        let limite = parseInt(obj.canchas)
        let celdasTotales = generarHoras(parseInt(obj.desde), parseInt(obj.hasta))
        for (let i = 0; i < limite; i++) {
            canchasTotales.push({
                canchaID: i + 1,
                celdas: celdasTotales.map(celda => ({
                    disponible: true,
                    celdaId: `${i + 1}-${celda.cantHoras}`,
                    horaCelda: parseInt(celda.cantHoras)
                }))
            })
        }
        return canchasTotales;
    }

    const darIndiceCelda = (indice) => {
        setAbrirDropdown(abrirDropdown === indice ? null : indice);
    };

    useEffect(() => {
    const cerrarDropdown = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setAbrirDropdown(null);
        }
    };

    document.addEventListener("mousedown", cerrarDropdown);

    const reservasLS = JSON.parse(localStorage.getItem("reservas")) || [];

    const reservasTotales = [reservaEjemplo, ...reservasLS];

    let canchasAcumuladas = [];
    let horasGeneradas = [];

    reservasTotales.forEach((reserva) => {
        const nuevasCanchas = generarCanchasyFilas(reserva);
        horasGeneradas = generarHoras(parseInt(reserva.desde), parseInt(reserva.hasta));
        canchasAcumuladas = [...canchasAcumuladas, ...nuevasCanchas];
    });

    setHoras(horasGeneradas);
    setGrilla(canchasAcumuladas);

    return () => {
        document.removeEventListener("mousedown", cerrarDropdown);
    };
}, []);

    return (
        <div className={styles.contenedorPrincipal}>
            <h1 className={styles.tituloPag}>Rerserva F5</h1>
            <section className='p-3'>
                <div className={styles.reservaContenedor}>
                    <h2 className="text-center"><b>Realiza tu Reserva</b></h2>
                    <div className={styles.calendarioContenedor}>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            locale={es}
                            dateFormat={"d 'de' MMMM"}
                            customInput={<BotonDatepicker />}
                            showIcon
                        />
                    </div>
                    <div className={styles.estado}>
                        <div className={styles.reservado}></div>
                        <span><b>Reservado</b></span>
                        <div className={styles.disponible}></div>
                        <span><b>Disponible</b></span>
                    </div>
                    <div>
                        <Row>
                            <Col md={1} className={styles.gridItemHora}></Col>
                            {horas.map(hora => (
                                <Col className={styles.gridItemHora} key={hora.id}>
                                    <b>{hora.cantHoras == 0 ? hora.cantHoras + "0" : hora.cantHoras}</b>
                                </Col>
                            ))}
                        </Row>
                        {grilla.map((cancha,i) => (
                            <Row key={cancha.canchaID + i}>
                                <Col md={1} className={`${styles.gridItem} ${styles.numCancha}`}>
                                    <b>cancha {cancha.canchaID}</b>
                                </Col>
                                {cancha.celdas.map((celda) => (
                                    <Col className={`${styles.gridItem} ${styles.colVacia}`} onClick={() => darIndiceCelda(celda.celdaId)} ref={dropdownRef} key={celda.celdaId}>
                                        <div className={`${styles.dropdownReserva} ${abrirDropdown === celda.celdaId ? styles.show : ""}`}>
                                            <div className={styles.dropdownContenedor}>
                                                <div className={styles.canchaNumContenedor}>
                                                    <div className={styles.infoCanchaHora}>
                                                        <img src={canchadefutbol} width="30px" height="30px" />
                                                        <span className={styles.canchaNum}>
                                                            <b>Cancha {cancha.canchaID}</b>
                                                        </span>
                                                    </div>
                                                    <div className={styles.canchaHoraContenedor}>
                                                        <img src={reloj} width="30px" height="30px" />
                                                        <span className="text-black">
                                                            <b> {celda.horaCelda == 0 ? celda.horaCelda + "0" : celda.horaCelda}:00</b>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className={styles.canchaPXHContenedor}>
                                                    <div className={styles.infoPXH}>
                                                        <span className="mx-4"><b>$30.000</b></span>
                                                        <span className="mx-4"><b>60 min</b></span>
                                                    </div>
                                                </div>
                                                <a href="https://www.google.com/">
                                                    <button type="button" className={styles.btnReserva}><b>Reservar</b></button>
                                                </a>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        ))}
                    </div>
                </div>
            </section>
            <section className={styles.reservaResponsiveContenedor}>
                <h2 className={styles.tituloDias}>Realiza tu reserva</h2>
                <article className={styles.diasReserva}>
                    <button>
                        <span>{format(selectedDate, "E", { locale: es }).toUpperCase()}</span>
                        <span>{format(selectedDate, "d")}</span>
                        <span>{format(selectedDate, "MMM", { locale: es }).toUpperCase()}</span>
                    </button>
                    <button>
                        <span>{format(addDays(1, selectedDate), "E", { locale: es }).toUpperCase()}</span>
                        <span>{format(addDays(1, selectedDate), "d", { locale: es })}</span>
                        <span>{format(addDays(1, selectedDate), "MMM", { locale: es }).toUpperCase()}</span>
                    </button>
                    <button>
                        <span>{format(addDays(2, selectedDate), "E", { locale: es }).toUpperCase()}</span>
                        <span>{format(addDays(2, selectedDate), "d", { locale: es })}</span>
                        <span>{format(addDays(2, selectedDate), "MMM", { locale: es }).toUpperCase()}</span>
                    </button>
                    <button>
                        <span>{format(addDays(3, selectedDate), "E", { locale: es }).toUpperCase()}</span>
                        <span>{format(addDays(3, selectedDate), "d", { locale: es })}</span>
                        <span>{format(addDays(3, selectedDate), "MMM", { locale: es }).toUpperCase()}</span>
                    </button>
                    <button>
                        <span>{format(addDays(4, selectedDate), "E", { locale: es }).toUpperCase()}</span>
                        <span>{format(addDays(4, selectedDate), "d", { locale: es })}</span>
                        <span>{format(addDays(4, selectedDate), "MMM", { locale: es }).toUpperCase()}</span>
                    </button>
                </article>
                <h2 className={styles.tituloHorarios}>Horarios Disponibles</h2>
                <div className={styles.horariosContenedor}>
                    <div className={styles.horasGridContenedor}>
                        {horas.map((hora, i) => (
                            <button className={styles.hora} key={hora.id + (i + 2)}>
                                {hora.cantHoras == 0 ? hora.cantHoras + "0:00" : hora.cantHoras + ":00"}
                            </button>
                        ))}
                    </div>
                </div>
                <article>
                    <h3 className={styles.tituloCanchaDisp}>Canchas Disponibles</h3>
                    <div className={styles.canchasDisponibles}>
                        {grilla.map((cancha,i) => (
                            <button key={cancha.canchaID + i}>
                                Cancha {cancha.canchaID}
                            </button>
                        ))}
                    </div>
                </article>
                <article className={styles.confirmarContenedor}>
                    <button className={styles.btnConfirmar}><b>CONFIRMAR</b></button>
                </article>
            </section>
        </div>
    )
}
