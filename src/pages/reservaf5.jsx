import canchadefutbol from '../assets/img/cancha-de-futbol.png'
import reloj from '../assets/img/reloj.png'
import { useState, useEffect, useRef } from "react";
import '../styles/reserva.css'

export const Reservaf5 = () => {

    const [abrirDropdown, setAbrirDropdown] = useState(null);
    const dropdownRef = useRef(null);

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
                        <label><b className="fs-6">Selecciona un dia:</b>
                            <input type="date" name="" id="cal" className='form-control bg-primary' />
                        </label>
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
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(1)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 1 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 1</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>11:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(2)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 2 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 1</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>12:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(3)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 3 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 1</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>13:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(4)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 4 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 1</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>14:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(5)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 5 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 1</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>15:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(6)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 6 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 1</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>16:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(7)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 7 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 1</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>17:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(8)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 8 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 1</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>18:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(9)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 9 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 1</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>19:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(10)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 10 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 1</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>20:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(11)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 11 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 1</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>21:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(12)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 12 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 1</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>22:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(13)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 13 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 1</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>23:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(14)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 14 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 1</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>24:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(15)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 15 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 1</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>01:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row"> 
                            <div className="col grid-item col-md-1 bg-black border-start-0"><b>cancha 2</b></div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(16)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 16 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 2</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>11:00</b></span>
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
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(17)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 17 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 2</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>12:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(18)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 18 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 2</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>13:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(19)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 19 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 2</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>14:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(20)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 20 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 2</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>15:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(21)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 21 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 2</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>16:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(22)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 22 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 2</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>17:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(23)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 23 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 2</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>18:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(24)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 24 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 2</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>19:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(25)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 25 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 2</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>20:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(26)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 26 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 2</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>21:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(27)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 27 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 2</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>22:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(28)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 28 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 2</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>23:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(29)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 29 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 2</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>24:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(30)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 30 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 2</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>01:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col grid-item col-md-1 bg-black border-start-0"><b>cancha 3</b></div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(31)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 31 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 3</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>11:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(32)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 32 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 3</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>12:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(33)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 33 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 3</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>13:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(34)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 34 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 3</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>14:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(35)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 35 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 3</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>15:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(36)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 36 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 3</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>16:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(37)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 37 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 3</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>17:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(38)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 38 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 3</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>18:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(39)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 39 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 3</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>19:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(40)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 40 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 3</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>20:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(41)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 41 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 3</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>21:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(42)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 42 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 3</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>22:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(43)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 43 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 3</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>23:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(44)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 44 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 3</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>24:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col grid-item col-vacia" onClick={() => darIndiceCelda(45)} ref={dropdownRef}>
                                <div className={`dropdown-reserva bg-light rounded-4 ${abrirDropdown === 45 ? "show" : ""}`}>
                                    <div className="d-flex flex-column align-items-center">
                                        <div className="d-flex flex-flow-wrap mt-3 border-bottom border-black info-dd-1">
                                            <div className="mx-4 d-flex flex-column justify-content-center align-items-center">
                                                <img src={canchadefutbol} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>Cancha 1</b></span>
                                            </div>
                                            <div className="mx-4 d-flex flex-column align-items-center justify-content-center">
                                                <img src={reloj} width="30px" height="30px" />
                                                <span className="dpdn-span text-black"><b>01:00</b></span>
                                            </div>
                                        </div>
                                        <div className="border-bottom border-black contenedor-info-dd-2">
                                            <div className="my-3 py-1 border border-success rounded-4 bg-opacity-50 bg-success">
                                                <span className="mx-4">$30.000</span>
                                                <span className="mx-4">60 min</span>
                                            </div>
                                        </div>
                                        <a href="./404Page.html"><button type="button" className="m-2 btn-reserva">Reserva</button></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>  
            <section id="reserva-responsive-section">
                <h2 className="text-center p-2 fs-2 text-success">Realiza tu reserva</h2>
                <div className="shadow-lg py-3">
                    <article className="d-flex gap-1 justify-content-center" id="reserva-dias">
                        <button className="">
                            <span>LUN</span>
                            <span>30</span>
                            <span>Junio</span>
                        </button>
                        <button className="">
                            <span>MAR</span>
                            <span>1</span>
                            <span>JUL</span>
                        </button>
                        <button className="">
                            <span>MIE</span>
                            <span>2</span>
                            <span>JUL</span>
                        </button>
                        <button className="">
                            <span>JUE</span>
                            <span>3</span>
                            <span>JUL</span>
                        </button>
                        <button className="">
                            <span>VIE</span>
                            <span>4</span>
                            <span>JUL</span>
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
                </article>
            </section>
        </div>
    )
}
