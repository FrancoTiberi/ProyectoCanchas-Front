import { useState, useEffect, useRef, forwardRef, useCallback } from "react";
import { es } from "date-fns/locale";
import { format, addDays, parseISO } from "date-fns";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import canchadefutbol from "../assets/img/cancha-de-futbol.png";
import reloj from "../assets/img/reloj.png";
import wifi from "../assets/img/wifi.png";
import pastel from "../assets/img/pastel.png"
import vestuario from "../assets/img/ducha.png"
import torneo from "../assets/img/torneo.png"
import styles from "../styles/reserva.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { obtenerMisReservas } from "../helpers/reservaApi";
import { canchasTodasGet, obtenerDisponibilidadTodas } from "../helpers/canchaApi";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from 'react-router-dom';

export const Reservaf5 = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [abrirDropdown, setAbrirDropdown] = useState(null);
    const [grilla, setGrilla] = useState([]);
    const [horas, setHoras] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [horaReservada, setHoraReservada] = useState(null);
    const [canchaReservada, setCanchaReservada] = useState("");
    const [canchaReservadaID, setCanchaReservadaID] = useState(null);
    const [precioReservado, setPrecioReservado] = useState(0);
    const [show, setShow] = useState(false);
    const [misReservas, setMisReservas] = useState([]);
    const dropdownRef = useRef(null);
    const handleClose = () => setShow(false);

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
    };

    const cargarDatos = useCallback(async () => {
        const fechaParaBackend = format(selectedDate, 'yyyy-MM-dd');
        try {
            const [respObtenerTodasCanchas, resObtenerDisponibilidadTodas] = await Promise.all([
                canchasTodasGet(),
                obtenerDisponibilidadTodas(fechaParaBackend)
            ]);

            if (user) {
                const respMisReservas = await obtenerMisReservas()
                setMisReservas(respMisReservas?.reservas || []);
            }

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
                                                <Link to='/pagos' state={{
                                                    fecha: format(selectedDate, 'yyyy-MM-dd', { locale: es }),
                                                    hora: celda.horaCelda === 0 ? "00:00" : `${celda.horaCelda}:00`,
                                                    cancha: cancha.nombre,
                                                    cancha_id: cancha.canchaID,
                                                    precio: celda.precio
                                                }}>
                                                    <Button className={styles.btnReserva}>
                                                        Reservar
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        ))}
                    </div>
                </div>
                <div className={styles.infoLocalContenedor}>
                    <article className={styles.servicios}>
                        <h4>Servicios</h4>
                        <hr />
                        <div>
                            <div>
                                <img src={wifi} alt="wifi" width="30" height="27" />
                                <span>Wi-Fi</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <img src={pastel} alt="pastel" width="30" height="30" />
                                <span>Cumpleaños</span>
                            </div>
                            <div>
                                <img src={vestuario} alt="vestuario" width="30" height="30" />
                                <span>Vestuario</span>
                            </div>
                            <div>
                                <img src={torneo} alt="torneo" width="30" height="30" />
                                <span>Torneos</span>
                            </div>
                        </div>
                    </article>
                    <article className={styles.direccion}>
                        <h4>Dirección</h4>
                        <hr />
                        <span>Argentina</span>
                        <span>Tucuman</span>
                        <span>Av. Juan Domingo Perón 125</span>
                    </article>
                    <article className={styles.horario}>
                        <h4>Horario</h4>
                        <hr />
                        <span><b>Todos los dias</b></span>
                        <span>de 11:00 a.m a 1:00 p.m</span>
                    </article>
                </div>
            </section>
            <section className={styles.reservaResponsiveContenedor}>
                <h2 className={styles.tituloDias}>Realiza tu reserva</h2>
                <article className={styles.diasReserva}>
                    {[0, 1, 2, 3, 4].map((i) => {
                        const dateObj = addDays(new Date(), i);
                        const isSelected = format(selectedDate, 'yyyy-MM-dd') === format(dateObj, 'yyyy-MM-dd');
                        return (
                            <button
                                key={i}
                                onClick={() => {
                                    setSelectedDate(dateObj);
                                    setHoraReservada(null);
                                    setCanchaReservadaID(null);
                                }}
                                style={{ backgroundColor: isSelected ? '#d1e7dd' : '#fcf9f9', borderColor: isSelected ? '#0f5132' : 'currentColor' }}
                            >
                                <span>{format(dateObj, "E", { locale: es }).toUpperCase()}</span>
                                <span>{format(dateObj, "d", { locale: es })}</span>
                                <span>{format(dateObj, "MMM", { locale: es }).toUpperCase()}</span>
                            </button>
                        );
                    })}
                </article>
                <h2 className={styles.tituloHorarios}>Horarios Disponibles</h2>
                <div className={styles.horariosContenedor}>
                    <div className={styles.horasGridContenedor}>
                        {horas.map((hora, i) => (
                            <button
                                className={styles.hora}
                                key={hora.id + (i + 2)}
                                onClick={() => {
                                    setHoraReservada(hora.horaCelda);
                                    setCanchaReservadaID(null);
                                }}
                                style={{ backgroundColor: horaReservada === hora.horaCelda ? '#d1e7dd' : '#fff', borderColor: horaReservada === hora.horaCelda ? '#0f5132' : '#c0b8b8' }}
                            >
                                {hora.horaCelda === 0 ? "00:00" : `${hora.horaCelda}:00`}
                            </button>
                        ))}
                    </div>
                </div>
                <article>
                    <h3 className={styles.tituloCanchaDisp}>Canchas Disponibles</h3>
                    <div className={styles.canchasDisponibles}>
                        {grilla.map((cancha, i) => {
                            const celdaDisponible = horaReservada !== null ? cancha.celdas.find(c => c.horaCelda === horaReservada && c.disponible) : null;
                            const estaDisponible = !!celdaDisponible;

                            return (
                                <button
                                    key={cancha.canchaID + i}
                                    disabled={!estaDisponible}
                                    onClick={() => {
                                        setCanchaReservadaID(cancha.canchaID);
                                        setCanchaReservada(cancha.nombre);
                                        setPrecioReservado(celdaDisponible.precio);
                                    }}
                                    style={{
                                        opacity: estaDisponible ? 1 : 0.5,
                                        backgroundColor: canchaReservadaID === cancha.canchaID ? '#d1e7dd' : (estaDisponible ? '#fff' : '#f0f0f0'),
                                        borderColor: canchaReservadaID === cancha.canchaID ? '#0f5132' : '#ccc',
                                        cursor: estaDisponible ? 'pointer' : 'not-allowed'
                                    }}
                                >
                                    Cancha {cancha.nombre}
                                </button>
                            );
                        })}
                    </div>
                </article>
                <article className={styles.confirmarContenedor}>
                    <button
                        className={styles.btnConfirmar}
                        onClick={() => {
                            if (!horaReservada || !canchaReservadaID) {
                                alert("Por favor selecciona una fecha, hora y cancha disponibles.");
                                return;
                            }
                            if (!user) {
                                alert("Debes iniciar sesión para realizar una reserva.");
                                return;
                            }
                            navigate('/pagos', {
                                state: {
                                    fecha: format(selectedDate, 'yyyy-MM-dd', { locale: es }),
                                    hora: horaReservada === 0 ? "00:00" : `${horaReservada}:00`,
                                    cancha: canchaReservada,
                                    cancha_id: canchaReservadaID,
                                    precio: precioReservado
                                }
                            });
                        }}
                    >
                        <b>CONFIRMAR</b>
                    </button>
                </article>
            </section>

            {user && (
                <section>
                    <input type="checkbox" id="checkboxPedidos" className={styles.checkboxPedidos} />
                    <label htmlFor="checkboxPedidos">
                        <span className={styles.desplegablePedidos}><i className="bi bi-calendar-check me-2"></i>Mis Reservas</span>
                    </label>

                    <div className={styles.misPedidosContenedor}>
                        <h4 className="border-bottom pb-2 mb-2 fw-bold text-success">Mis Reservas</h4>
                        <p className="small text-muted mb-3" style={{ lineHeight: '1.2' }}>Para cambiar la reserva o anularla comunicarse con el local.</p>
                        {!misReservas || misReservas.length === 0 ? (
                            <p className="text-muted"><b>No tienes ninguna reserva aún.</b></p>
                        ) : (
                            misReservas.map((reserva) => (
                                <div key={reserva._id} className={styles.pedidoCard}>
                                    <span className={`${styles.badgeEstado} ${styles.badgeEntregado}`}>
                                        Confirmada
                                    </span>
                                    <span className="text-muted">Fecha: {reserva.fecha ? format(parseISO(reserva.fecha.replace('Z', '')), 'dd/MM/yyyy', { locale: es }) : ''}</span>
                                    <span className="fw-bold text-success fs-5">Hora: {reserva.hora}:00</span>
                                    <hr className="my-1" />
                                    <div className="d-flex align-items-center mb-1">
                                        <span className="fs-5"><b>Cancha Nº {reserva.cancha?.cancha || ""}</b></span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            )}
        </div>
    );
};
