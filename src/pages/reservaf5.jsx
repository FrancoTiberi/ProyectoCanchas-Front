import canchadefutbol from '../assets/img/cancha-de-futbol.png'
import reloj from '../assets/img/reloj.png'
import { useState, useEffect, useRef } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { addDays } from 'date-fns/fp';
import { es } from 'date-fns/locale';

export const Reservaf5 = () => {

    const [abrirDropdown, setAbrirDropdown] = useState(null);
    const [grillas, setGrillas] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date());
    const dropdownRef = useRef(null);

    const BotonDatepicker = forwardRef(({ value, onClick }, ref) => (
        <button
            className="bg-primary text-light border-1 p-1 rounded calendario"
            onClick={onClick}
            ref={ref}
        >{value}</button>
    ));

    function generarGrillas(num) {
        let grillasTotales = [];
        for (let i = 0; i <= num; i++){
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
        <div className='contenedor-principal'>
            <h1 className="text-center text-light" id="ttl-reserva">Rerserva F5</h1>
            <section id="seccion-reserva">
                <div className="container reserva-contenedor bg-light rounded-4 shadow-lg m-4">
                    <h2 className="fs-3 text-center"><b>Realiza tu Reserva</b></h2>
                    <div className="dia pb-1 d-flex justify-content-center">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            locale={es}
                            dateFormat={"dd 'de' MMMM"}
                            customInput={<BotonDatepicker />}
                            showIcon
                        />
                    </div>
                    <div className="mr-5 d-flex flex-flow-wrap align-items-center">
                        <div id="reservado"></div>
                        <span><b>Reservado</b></span>
                        <div id="disponible"></div>
                        <span><b>Disponible</b></span>
                    </div>
                    <div className="text-center container" id="reserva">
                        <div className="row">
                            <div className="col grid-item-hora col-md-1 border-start-0"></div>
                            <div className="col grid-item-hora"><b>11</b></div>
                            <div className="col grid-item-hora"><b>12</b></div>
                            <div className="col grid-item-hora"><b>13</b></div>
                            <div className="col grid-item-hora"><b>14</b></div>
                            <div className="col grid-item-hora"><b>15</b></div>
                            <div className="col grid-item-hora"><b>16</b></div>
                            <div className="col grid-item-hora"><b>17</b></div>
                            <div className="col grid-item-hora"><b>18</b></div>
                            <div className="col grid-item-hora"><b>19</b></div>
                            <div className="col grid-item-hora"><b>20</b></div>
                            <div className="col grid-item-hora"><b>21</b></div>
                            <div className="col grid-item-hora"><b>22</b></div>
                            <div className="col grid-item-hora"><b>23</b></div>
                            <div className="col grid-item-hora"><b>24</b></div>
                            <div className="col grid-item-hora"><b>1</b></div>
                        </div>


                        <div className="row">
                            <div className="col grid-item col-md-1 bg-black border-start-0"><b>cancha 1</b></div>
                            {grillas.map(grilla=>(
                                <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(grilla.numGrilla)} ref={dropdownRef} key={grilla.id}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === grilla.numGrilla ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 1</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>{grilla.hora === 25 ? (grilla.hora - 24) + ":00" : grilla.hora + ":00"}</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="https://www.google.com/"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>


                        <div className="row">
                            <div className="col grid-item col-md-1 bg-black border-start-0"><b>cancha 2</b></div>
                            {grillas.map(grilla=>(
                                <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(grilla.numGrilla + 15)} ref={dropdownRef} key={grilla.id + 15}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === grilla.numGrilla + 15 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 2</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>{grilla.hora === 25 ? (grilla.hora - 24) + ":00" : grilla.hora + ":00"}</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="https://www.google.com/"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>


                        <div className="row">
                            <div className="col grid-item col-md-1 bg-black border-start-0"><b>cancha 3</b></div>

                            {grillas.map(grilla=>(
                                <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(grilla.numGrilla + 30)} ref={dropdownRef} key={grilla.id + 30}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === grilla.numGrilla + 30 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 3</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>{grilla.hora === 25 ? (grilla.hora - 24) + ":00" : grilla.hora + ":00"}</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="https://www.google.com/"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            ))}

                        </div>
                    </div>
                </div>
            </section>
            <section id="reserva-responsive-section">
                <h2 className="text-center p-2 fs-2 text-success">Realiza tu reserva</h2>
                <div className="shadow-lg py-3">
                    <article className="d-flex gap-1 justify-content-center" id="reserva-dias">
                        <button className="">
                            <span>{format(selectedDate,"E",{locale: es}).toUpperCase()}</span>
                            <span>{format(selectedDate,"d")}</span>
                            <span>{format(selectedDate,"MMM",{locale: es}).toUpperCase()}</span>
                        </button>
                        <button className="">
                            <span>{format(addDays(1,selectedDate),"E",{locale: es}).toUpperCase()}</span>
                            <span>{format(addDays(1,selectedDate),"d",{locale: es})}</span>
                            <span>{format(addDays(1,selectedDate),"MMM",{locale: es}).toUpperCase()}</span>
                        </button>
                        <button className="">
                            <span>{format(addDays(2,selectedDate),"E",{locale: es}).toUpperCase()}</span>
                            <span>{format(addDays(2,selectedDate),"d",{locale: es})}</span>
                            <span>{format(addDays(2,selectedDate),"MMM",{locale: es}).toUpperCase()}</span>
                        </button>
                        <button className="">
                            <span>{format(addDays(3,selectedDate),"E",{locale: es}).toUpperCase()}</span>
                            <span>{format(addDays(3,selectedDate),"d",{locale: es})}</span>
                            <span>{format(addDays(3,selectedDate),"MMM",{locale: es}).toUpperCase()}</span>
                        </button>
                        <button className="">
                            <span>{format(addDays(4,selectedDate),"E",{locale: es}).toUpperCase()}</span>
                            <span>{format(addDays(4,selectedDate),"d",{locale: es})}</span>
                            <span>{format(addDays(4,selectedDate),"MMM",{locale: es}).toUpperCase()}</span>
                        </button>
                    </article>
                    <h2 className="text-center m-3 fs-5 text-primary">Horarios Disponibles</h2>
                    <div className="container text-center gap-3" id="contenedor-grid">
                        <div className="row">
                            <div className="col">
                                11:00
                            </div>
                            <div className="col">
                                13:00
                            </div>
                            <div className="col">
                                15:00
                            </div>
                            <div className="col">
                                16:00
                            </div>
                            <div className="col">
                                17:00
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                19:00
                            </div>
                            <div className="col">
                                20:00
                            </div>
                            <div className="col">
                                22:00
                            </div>
                            <div className="col">
                                23:00
                            </div>
                            <div className="col">
                                1:00
                            </div>
                        </div>
                    </div>
                </div>
                <article>
                    <h3 className="p-2 mt-4 text-success text-center">Selecciona la cancha</h3>
                    <div className="canchas-responsive p-3" id="cancha1-reserva-responsive">
                        <h3>Cancha 1</h3>
                        <div id="cancha1-responsive">
                            <a href="../Pages/404Page.html" className="d-flex flex-column">
                                <span><b>$30000</b></span>
                                <span><b>60 min</b></span>
                            </a>
                        </div>
                    </div>
                    <div className="canchas-responsive p-3" id="cancha2-reserva-responsive">
                        <h3>Cancha 2</h3>
                        <div id="cancha1-responsive">
                            <a href="../Pages/404Page.html" className="d-flex flex-column">
                                <span><b>$30000</b></span>
                                <span><b>60 min</b></span>
                            </a>
                        </div>
                    </div>
                    <div className="canchas-responsive p-3" id="cancha2-reserva-responsive">
                        <h3>Cancha 3</h3>
                        <div id="cancha1-responsive">
                            <a href="../Pages/404Page.html" className="d-flex flex-column">
                                <span><b>$30000</b></span>
                                <span><b>60 min</b></span>
                            </a>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    )
}
