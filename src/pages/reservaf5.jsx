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

export const Reservaf5 = () => {

    const [abrirDropdown, setAbrirDropdown] = useState(null);
    const [grillas, setGrillas] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date());
    const dropdownRef = useRef(null);

    const BotonDatepicker = forwardRef(({ value, onClick }, ref) => (
        <button
            className={styles.calendario}
            onClick={onClick}
            ref={ref}
        >{value}</button>
    ));

    function generarGrillas(num) {
        let grillasTotales = [];
        for (let i = 0; i <= num; i++) {
            grillasTotales.push({
                id: i,
                numGrilla: i,
                hora: (i + 11)
            })
        }
        return grillasTotales;
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
        setGrillas(generarGrillas(14))

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
                            dateFormat={"dd 'de' MMMM"}
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
                            <Col className={styles.gridItemHora}><b>11</b></Col>
                            <Col className={styles.gridItemHora}><b>12</b></Col>
                            <Col className={styles.gridItemHora}><b>13</b></Col>
                            <Col className={styles.gridItemHora}><b>14</b></Col>
                            <Col className={styles.gridItemHora}><b>15</b></Col>
                            <Col className={styles.gridItemHora}><b>16</b></Col>
                            <Col className={styles.gridItemHora}><b>17</b></Col>
                            <Col className={styles.gridItemHora}><b>18</b></Col>
                            <Col className={styles.gridItemHora}><b>19</b></Col>
                            <Col className={styles.gridItemHora}><b>20</b></Col>
                            <Col className={styles.gridItemHora}><b>21</b></Col>
                            <Col className={styles.gridItemHora}><b>22</b></Col>
                            <Col className={styles.gridItemHora}><b>23</b></Col>
                            <Col className={styles.gridItemHora}><b>24</b></Col>
                            <Col className={styles.gridItemHora}><b>1</b></Col>
                        </Row>

                        <Row>
                            <Col md={1} className={`${styles.gridItem} ${styles.numCancha}`}><b>cancha 1</b></Col>
                            {grillas.map(grilla => (
                                <Col className={`${styles.gridItem} ${styles.colVacia}`} onClick={() => darIndiceCelda(grilla.numGrilla)} ref={dropdownRef} key={grilla.id}>
                                    <div className={`${styles.dropdownReserva} ${abrirDropdown === grilla.numGrilla ? styles.show : ""}`}>
                                        <div className={styles.dropdownContenedor}>
                                            <div className={styles.canchaNumContenedor}>
                                                <div className={styles.infoCanchaHora}>
                                                    <img src={canchadefutbol} width="30px" height="30px" />
                                                    <span className={styles.canchaNum}><b>Cancha 1</b></span>
                                                </div>
                                                <div className={styles.canchaHoraContenedor}>
                                                    <img src={reloj} width="30px" height="30px" />
                                                    <span className="text-black"><b>{grilla.hora === 25 ? (grilla.hora - 24) + ":00" : grilla.hora + ":00"}</b></span>
                                                </div>
                                            </div>
                                            <div className={styles.canchaPXHContenedor}>
                                                <div className={styles.infoPXH}>
                                                    <span className="mx-4"><b>$30.000</b></span>
                                                    <span className="mx-4"><b>60 min</b></span>
                                                </div>
                                            </div>
                                            <a href="https://www.google.com/"><button type="button" className={styles.btnReserva}><b>Reservar</b></button></a>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>

                        <Row>
                            <Col md={1} className={`${styles.gridItem} ${styles.numCancha}`}><b>cancha 2</b></Col>
                            {grillas.map(grilla => (
                                <Col className={`${styles.gridItem} ${styles.colVacia}`} onClick={() => darIndiceCelda(grilla.numGrilla + 15)} ref={dropdownRef} key={grilla.id + 15}>
                                    <div className={`${styles.dropdownReserva} ${abrirDropdown === grilla.numGrilla + 15 ? styles.show : ""}`}>
                                        <div className={styles.dropdownContenedor}>
                                            <div className={styles.canchaNumContenedor}>
                                                <div className={styles.infoCanchaHora}>
                                                    <img src={canchadefutbol} width="30px" height="30px" />
                                                    <span className={styles.canchaNum}><b>Cancha 2</b></span>
                                                </div>
                                                <div className={styles.canchaHoraContenedor}>
                                                    <img src={reloj} width="30px" height="30px" />
                                                    <span className="text-black"><b>{grilla.hora === 25 ? (grilla.hora - 24) + ":00" : grilla.hora + ":00"}</b></span>
                                                </div>
                                            </div>
                                            <div className={styles.canchaPXHContenedor}>
                                                <div className={styles.infoPXH}>
                                                    <span className="mx-4"><b>$30.000</b></span>
                                                    <span className="mx-4"><b>60 min</b></span>
                                                </div>
                                            </div>
                                            <a href="https://www.google.com/"><button type="button" className={styles.btnReserva}><b>Reservar</b></button></a>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>

                        <Row>
                            <Col md={1} className={`${styles.gridItem} ${styles.numCancha}`}><b>cancha 3</b></Col>
                            {grillas.map(grilla => (
                                <Col className={`${styles.gridItem} ${styles.colVacia}`} onClick={() => darIndiceCelda(grilla.numGrilla + 30)} ref={dropdownRef} key={grilla.id + 30}>
                                    <div className={`${styles.dropdownReserva} ${abrirDropdown === grilla.numGrilla + 30 ? styles.show : ""}`}>
                                        <div className={styles.dropdownContenedor}>
                                            <div className={styles.canchaNumContenedor}>
                                                <div className={styles.infoCanchaHora}>
                                                    <img src={canchadefutbol} width="30px" height="30px" />
                                                    <span className={styles.canchaNum}><b>Cancha 3</b></span>
                                                </div>
                                                <div className={styles.canchaHoraContenedor}>
                                                    <img src={reloj} width="30px" height="30px" />
                                                    <span className="text-black"><b>{grilla.hora === 25 ? (grilla.hora - 24) + ":00" : grilla.hora + ":00"}</b></span>
                                                </div>
                                            </div>
                                            <div className={styles.canchaPXHContenedor}>
                                                <div className={styles.infoPXH}>
                                                    <span className="mx-4"><b>$30.000</b></span>
                                                    <span className="mx-4"><b>60 min</b></span>
                                                </div>
                                            </div>
                                            <a href="https://www.google.com/"><button type="button" className={styles.btnReserva}><b>Reservar</b></button></a>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
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
                    <div className={styles.horasContenedor}>
                        <button className={styles.hora}>
                            11:00
                        </button>
                        <button className={styles.hora}>
                            13:00
                        </button>
                        <button className={styles.hora}>
                            15:00
                        </button>
                        <button className={styles.hora}>
                            16:00
                        </button>
                        <button className={styles.hora}>
                            17:00
                        </button>
                    </div>
                    <div className={styles.horasContenedor}>
                        <button className={styles.hora}>
                            19:00
                        </button>
                        <button className={styles.hora}>
                            20:00
                        </button>
                        <button className={styles.hora}>
                            22:00
                        </button>
                        <button className={styles.hora}>
                            23:00
                        </button>
                        <button className={styles.hora}>
                            1:00
                        </button>
                    </div>
                </div>
                <article>
                    <h3 className={styles.tituloCanchaDisp}>Canchas Disponibles</h3>
                    <div className={styles.canchasDisponibles}>
                        <button className="canchas-responsive">
                            Cancha 1
                        </button>
                        <button className="canchas-responsive">
                            Cancha 2
                        </button>
                        <button className="canchas-responsive">
                            Cancha 3
                        </button>
                    </div>
                </article>
                <article className={styles.confirmarContenedor}>
                    <button className={styles.btnConfirmar}><b>CONFIRMAR</b></button>
                </article>
            </section>
        </div>
    )
}
