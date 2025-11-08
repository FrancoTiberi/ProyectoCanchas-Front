import { useState, useEffect, useRef, forwardRef } from "react";
import { addDays } from "date-fns/fp";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";

import canchadefutbol from "../assets/img/cancha-de-futbol.png";
import reloj from "../assets/img/reloj.png";
import styles from "../styles/reserva.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { reservaEjemplo } from "../data/reserva";

export const Reservaf5 = () => {
    const [abrirDropdown, setAbrirDropdown] = useState(null);
    const [grilla, setGrilla] = useState([]);
    const [horas, setHoras] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [fechaReservada, setFechaReservada] = useState("");
    const [horaReservada, setHoraReservada] = useState("");
    const [canchaReservada, setCanchaReservada] = useState("");
    const [show, setShow] = useState(false);
    const [misReservas, setMisReservas] = useState([]);
    const dropdownRef = useRef(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const BotonDatepicker = forwardRef(({ value, onClick }, ref) => (
        <button className={styles.calendario} onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    function generarHoras(desde, hasta) {
        const horasTotales = [];
        const rango = hasta < desde ? hasta + 24 : hasta;

        for (let i = desde; i <= rango; i++) {
            horasTotales.push({
                id: Date.now() + i,
                cantHoras: i >= 24 ? i - 24 : i,
            });
        }
        return horasTotales;
    }

    function generarCanchasyFilas(obj, indice) {
        const canchasTotales = [];
        const limite = parseInt(obj.canchas);
        const celdasTotales = generarHoras(parseInt(obj.desde), parseInt(obj.hasta));

        for (let i = 0; i < limite; i++) {
            canchasTotales.push({
                canchaID: i + 1,
                celdas: celdasTotales.map((celda) => ({
                    disponible: true,
                    celdaId: `${indice}-${i + 1}-${celda.cantHoras}`,
                    horaCelda: parseInt(celda.cantHoras),
                })),
            });
        }
        return canchasTotales;
    }

    const darIndiceCelda = (indice, hora, cancha) => {
        setAbrirDropdown(abrirDropdown === indice ? null : indice);
        setHoraReservada(hora);
        setCanchaReservada(cancha);
    };

    function confirmarReserva() {
        const nuevaReserva = {
            id: Date.now(),
            fecha: fechaReservada,
            hora: horaReservada === 0 ? `${horaReservada}0:00` : `${horaReservada}:00`,
            cancha: canchaReservada,
        };

        const actualizadas = [...misReservas, nuevaReserva];
        setMisReservas(actualizadas);
        localStorage.setItem("misReservas", JSON.stringify(actualizadas));
        handleClose();
    }

    const eliminarReserva = (id) => {
        const actualizar = misReservas.filter((r) => r.id !== id);
        setMisReservas(actualizar);
        localStorage.setItem("misReservas", JSON.stringify(actualizar));
    };

    useEffect(() => {
        function cerrarDropdown(e) {
            if (abrirDropdown !== null && !e.target.closest(`.${styles.dropdownReserva}`)) {
                setAbrirDropdown(null);
            }
        }
        
        const reservasLS = JSON.parse(localStorage.getItem("reservas")) || [];
        const reservasTotales = [reservaEjemplo, ...reservasLS];

        let desdeMayor = 0;
        let hastaMayor = 0;
        let mayorRango = -1;

        reservasTotales.forEach((reserva) => {
            const desde = parseInt(reserva.desde);
            let hasta = parseInt(reserva.hasta);

            if (hasta <= desde) {
                hasta = hasta + 24;
            }

            const rango = hasta - desde;
            if (rango > mayorRango) {
                mayorRango = rango;
                desdeMayor = desde;
                hastaMayor = hasta;
            }
        });

        const horasGeneradas = generarHoras(desdeMayor, hastaMayor);

        let canchasAcumuladas = [];
        let contadorCanchas = 1;

        reservasTotales.forEach((reserva, i) => {
            const nuevasCanchas = generarCanchasyFilas(reserva, i);
            nuevasCanchas.forEach((cancha) => {
                cancha.canchaID = contadorCanchas++;
            });
            canchasAcumuladas = [...canchasAcumuladas, ...nuevasCanchas];
        });

        const reservasGuardadasUsuario = JSON.parse(localStorage.getItem("misReservas")) || [];

        setMisReservas(reservasGuardadasUsuario);
        setHoras(horasGeneradas);
        setGrilla(canchasAcumuladas);
        setFechaReservada(format(selectedDate, "d 'de' MMMM", { locale: es }));

        document.addEventListener("mousedown", cerrarDropdown);

        return () => document.removeEventListener("mousedown", cerrarDropdown);
    }, [selectedDate, abrirDropdown]);

    return (
        <div className={styles.contenedorPrincipal}>
            <h1 className={styles.tituloPag}>Reserva F5</h1>
            <section className="p-3">
                <div className={styles.reservaContenedor}>
                    <h2 className="text-center">
                        <b>Realiza tu Reserva</b>
                    </h2>
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
                            <Col md={1} className={styles.numCancha}></Col>
                            {horas.map((hora) => (
                                <Col className={styles.gridItemHora} key={hora.id}>
                                    <b>{hora.cantHoras === 0 ? "00" : hora.cantHoras}</b>
                                </Col>
                            ))}
                        </Row>
                        {grilla.map((cancha, i) => (
                            <Row key={cancha.canchaID + i}>
                                <Col md={1} className={`${styles.gridItem} ${styles.numCancha}`}>
                                    <b>cancha {cancha.canchaID}</b>
                                </Col>
                                {cancha.celdas.map((celda) => (
                                    <Col className={`${styles.gridItem} ${styles.colVacia}`} onClick={() => darIndiceCelda(celda.celdaId, celda.horaCelda, cancha.canchaID)} ref={dropdownRef} key={celda.celdaId}>
                                        <div className={`${styles.dropdownReserva} ${abrirDropdown === celda.celdaId ? styles.show : ""}`}>
                                            <div className={styles.dropdownContenedor}>
                                                <div className={styles.canchaNumContenedor}>
                                                    <div className={styles.infoCanchaHora}>
                                                        <img src={canchadefutbol} width="30" height="30" />
                                                        <span className={styles.canchaNum}>
                                                            <b>Cancha {cancha.canchaID}</b>
                                                        </span>
                                                    </div>
                                                    <div className={styles.canchaHoraContenedor}>
                                                        <img src={reloj} width="30" height="30" />
                                                        <span className="text-black">
                                                            <b>{celda.horaCelda === 0 ? "00:00" : `${celda.horaCelda}:00`}</b>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className={styles.canchaPXHContenedor}>
                                                    <div className={styles.infoPXH}>
                                                        <span className="mx-4"><b>$30.000</b></span>
                                                        <span className="mx-4"><b>60 min</b></span>
                                                    </div>
                                                </div>
                                                <Button className={styles.btnReserva} onClick={handleShow}>
                                                    Reservar
                                                </Button>
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
                    {[0, 1, 2, 3, 4].map((i) => (
                        <button key={i}>
                            <span>{format(addDays(i, selectedDate), "E", { locale: es }).toUpperCase()}</span>
                            <span>{format(addDays(i, selectedDate), "d", { locale: es })}</span>
                            <span>{format(addDays(i, selectedDate), "MMM", { locale: es }).toUpperCase()}</span>
                        </button>
                    ))}
                </article>
                <h2 className={styles.tituloHorarios}>Horarios Disponibles</h2>
                <div className={styles.horariosContenedor}>
                    <div className={styles.horasGridContenedor}>
                        {horas.map((hora, i) => (
                            <button className={styles.hora} key={hora.id + (i + 2)}>
                                {hora.cantHoras === 0 ? "00:00" : `${hora.cantHoras}:00`}
                            </button>
                        ))}
                    </div>
                </div>
                <article>
                    <h3 className={styles.tituloCanchaDisp}>Canchas Disponibles</h3>
                    <div className={styles.canchasDisponibles}>
                        {grilla.map((cancha, i) => (
                            <button key={cancha.canchaID + i}>Cancha {cancha.canchaID}</button>
                        ))}
                    </div>
                </article>
                <article className={styles.confirmarContenedor}>
                    <button className={styles.btnConfirmar}><b>CONFIRMAR</b></button>
                </article>
            </section>
            <section>
                <input type="checkbox" id="checkbox" className={styles.checkbox} />
                <label htmlFor="checkbox">
                    <span className={styles.desplegable}>Mis Reservas</span>
                </label>

                <div className={styles.misReservas}>
                    {misReservas.length === 0 ? (
                        <p><b>No tienes ninguna reserva</b></p>
                    ) : (
                        misReservas.map((reserva) => (
                            <div key={reserva.id} className={styles.reservaConfirmada}>
                                <p><b>Fecha:</b> {reserva.fecha}</p>
                                <p><b>Hora:</b> {reserva.hora}</p>
                                <p><b>Cancha:</b> {reserva.cancha}</p>
                                <button onClick={() => eliminarReserva(reserva.id)} className={styles.btnEliminar}>Eliminar</button>
                            </div>
                        ))
                    )}
                </div>
            </section>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header>
                    <Modal.Title>Reserva Realizada</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Fecha: {fechaReservada} <br />
                    Hora: {horaReservada === 0 ? "00:00" : `${horaReservada}:00`} <br />
                    Cancha: {canchaReservada}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={confirmarReserva}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
