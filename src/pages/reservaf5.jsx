import { useState, useEffect, useRef, forwardRef, useCallback } from "react";
import { es } from "date-fns/locale";
import { format, addDays } from "date-fns";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import canchadefutbol from "../assets/img/cancha-de-futbol.png";
import reloj from "../assets/img/reloj.png";
import styles from "../styles/reserva.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { obtenerMisReservas } from "../helpers/reservaApi";
import { borrarCancha, canchasTodasGet, obtenerDisponibilidadTodas } from "../helpers/canchaApi";
import { crearReserva } from "../helpers/reservaApi";
import { useAuth } from "../context/AuthProvider";

export const Reservaf5 = () => {
    const { user } = useAuth();
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
    const [canchaReservadaID, setCanchaReservadaID] = useState(null);

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
                horaCelda: i >= 24 ? i - 24 : i,
            });
        }
        return horasTotales;
    }

    function generarCanchasyFilas(cancha, horasDisponibles = []) {
        const celdasTotales = generarHoras(parseInt(cancha.desde), parseInt(cancha.hasta));

        return {
            canchaID: cancha._id,
            nombre: cancha.cancha,
            celdas: celdasTotales.map((celda) => ({
                disponible: horasDisponibles.includes(celda.horaCelda),
                celdaId: `${cancha._id}-${celda.horaCelda}`,
                horaCelda: parseInt(celda.horaCelda),
                precio: cancha.precio
            })),
        };
    }

    const darIndiceCelda = (indice, hora, cancha, canchaID) => {
        setAbrirDropdown(abrirDropdown === indice ? null : indice);
        setHoraReservada(hora);
        setCanchaReservada(cancha);
        setCanchaReservadaID(canchaID);
    };

    const eliminarReserva = (id) => {
        borrarCancha(id)
    };

    async function confirmarReserva() {
        if (!user) {
            alert("Debes iniciar sesión para reservar");
            return;
        }
        const guardarReserva = {
            cancha: canchaReservadaID,
            fecha: selectedDate,
            hora: horaReservada,
            usuario: user._id
        }
        try {
            crearReserva(guardarReserva)
            alert("¡Reserva creada con éxito!");
            handleClose();
            await cargarDatos();
        } catch (error) {
            console.log(error)
            throw new Error("Error al hacer la reservar")
        }
    }

    const cargarDatos = useCallback(async () => {
        const fechaParaBackend = format(selectedDate, 'yyyy-MM-dd');
        try {
            const [respMisReservas, respObtenerTodasCanchas, resObtenerDisponibilidadTodas] = await Promise.all([
                obtenerMisReservas(),
                canchasTodasGet(),
                obtenerDisponibilidadTodas(fechaParaBackend)
            ]);

            setMisReservas(respMisReservas?.reservas || []);
            const todasLasCanchasObtenidas = respObtenerTodasCanchas.canchas;

            let desdeMayor = 0;
            let hastaMayor = 0;
            let mayorRango = -1;
            let celdasGrilla = [];

            todasLasCanchasObtenidas.forEach((cancha) => {
                const desde = parseInt(cancha.desde);
                let hasta = parseInt(cancha.hasta);

                if (hasta <= desde) {
                    hasta = hasta + 24;
                }

                const rango = hasta - desde;
                if (rango > mayorRango) {
                    mayorRango = rango;
                    desdeMayor = desde;
                    hastaMayor = hasta;
                }

                const disponibilidadEncontrada = resObtenerDisponibilidadTodas.find(d => d.id === cancha._id);
                const horasDisponibles = disponibilidadEncontrada ? disponibilidadEncontrada.horasDisponibles : [];

                const canchasModificadas = generarCanchasyFilas(cancha, horasDisponibles);
                celdasGrilla = [...celdasGrilla, canchasModificadas];
            });

            const horasGeneradas = generarHoras(desdeMayor, hastaMayor);
            setHoras(horasGeneradas);
            setGrilla(celdasGrilla);
        } catch (error) {
            console.error("Error al cargar reservas:", error);
        }
    }, [selectedDate]);

    useEffect(() => {
        function cerrarDropdown(e) {
            if (abrirDropdown !== null && !e.target.closest(`.${styles.dropdownReserva}`)) {
                setAbrirDropdown(null);
            }
        }

        cargarDatos();

        setFechaReservada(format(selectedDate, "d 'de' MMMM", { locale: es }));

        document.addEventListener("mousedown", cerrarDropdown);

        return () => document.removeEventListener("mousedown", cerrarDropdown);
    }, [selectedDate, abrirDropdown, cargarDatos]);

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
                            minDate={new Date()}
                            maxDate={addDays(new Date(), 7)}
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
                                    <b>{hora.horaCelda === 0 ? "00" : hora.horaCelda}</b>
                                </Col>
                            ))}
                        </Row>
                        {grilla.map((cancha) => (
                            <Row key={cancha.canchaID}>
                                <Col md={1} className={`${styles.gridItem} ${styles.numCancha}`}>
                                    <b>cancha {cancha.nombre}</b>
                                </Col>
                                {cancha.celdas.map((celda) => (
                                    <Col className={`${styles.gridItem} ${celda.disponible ? styles.colVacia : styles.colVaciaReservada}`} onClick={() => { if (celda.disponible) { darIndiceCelda(celda.celdaId, celda.horaCelda, cancha.nombre, cancha.canchaID) } }} ref={dropdownRef} key={celda.celdaId}>
                                        <div className={`${styles.dropdownReserva} ${abrirDropdown === celda.celdaId ? styles.show : ""}`}>
                                            <div className={styles.dropdownContenedor}>
                                                <div className={styles.canchaNumContenedor}>
                                                    <div className={styles.infoCanchaHora}>
                                                        <img src={canchadefutbol} width="30" height="30" />
                                                        <span className={styles.canchaNum}>
                                                            <b>Cancha {cancha.nombre}</b>
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
                                                        <span className="mx-4"><b>{celda.precio}</b></span>
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
                            <span>{format(addDays(selectedDate, i), "E", { locale: es }).toUpperCase()}</span>
                            <span>{format(addDays(selectedDate, i), "d", { locale: es })}</span>
                            <span>{format(addDays(selectedDate, i), "MMM", { locale: es }).toUpperCase()}</span>
                        </button>
                    ))}
                </article>
                <h2 className={styles.tituloHorarios}>Horarios Disponibles</h2>
                <div className={styles.horariosContenedor}>
                    <div className={styles.horasGridContenedor}>
                        {horas.map((hora, i) => (
                            <button className={styles.hora} key={hora.id + (i + 2)}>
                                {hora.horaCelda === 0 ? "00:00" : `${hora.horaCelda}:00`}
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
                    {!misReservas || misReservas.length === 0 ? (
                        <p><b>No tienes ninguna reserva</b></p>
                    ) : (
                        misReservas.map((reserva) => (
                            <div key={reserva._id} className={styles.reservaConfirmada}>
                                <p><b>Fecha:</b> {format(new Date(reserva.fecha), 'dd/MM/yyyy', { locale: es })}</p>
                                <p><b>Hora:</b> {reserva.hora}:00</p>
                                <p><b>Cancha:</b> {reserva.cancha?.nombre || "Cancha"}</p>
                                <button onClick={() => eliminarReserva(reserva._id)} className={styles.btnEliminar}>Eliminar</button>
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
