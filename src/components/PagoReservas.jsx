import relojImg from "../assets/img/reloj.png"
import canchaImg from "../assets/img/cancha-de-futbol.png"
import calendarioImg from "../assets/img/calendario.png"
import precioImg from "../assets/img/dolar.png"
import logoImg from "../assets/img/logo.png"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { mercadoPagoPreference } from "../helpers/mercadoPagoApi";
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export default function Pagos() {
    const location = useLocation();
    const { fecha, hora, cancha, precio } = location.state;
    const [preferenceId, setPreferenceId] = useState(null);
    initMercadoPago('APP_USR-fa811e0a-a643-4ea1-9028-62668401bb03');

    const product = {
        title: `Reserva de ${cancha} en Golazo Gourmet`,
        unit_price: precio
    };

    useEffect(() => {
        const fetchPreference = async () => {
            const respMercadoPago = await mercadoPagoPreference(product)
            setPreferenceId(respMercadoPago)
        }
        fetchPreference()
    }, [])

    return (
        <div className='p-5 vh-100 d-flex justify-content-center align-items-start gap-2'>
            <section className='rounded-3 bg-secondary-subtle w-50 d-flex flex-column overflow-hidden'>
                <div className="p-3">
                    <div className="mb-3">
                        <div className="d-flex justify-content-between">
                            <h1>Golazo Gourmet</h1>
                            <img src={logoImg} alt="logo" width={55} height={50} className="rounded-3" />
                        </div>
                        <span>Datos de la reserva</span>
                    </div>
                    <hr />
                    <div className="d-flex p-3">
                        <img src={calendarioImg} alt="calendario" width={25} />
                        <span className="ms-2"><b>Fecha</b></span>
                        <span className="ms-auto">
                            <b>
                                {fecha}
                            </b>
                        </span>
                    </div>
                    <hr />
                    <div className="d-flex p-3">
                        <img src={relojImg} alt="reloj" width={25} />
                        <span className="ms-2"><b>Hora</b></span>
                        <span className="ms-auto">
                            <b>
                                {hora}
                            </b>
                        </span>
                    </div>
                    <hr />
                    <div className="d-flex p-3">
                        <img src={canchaImg} alt="cancha" width={25} />
                        <span className="ms-2"><b>Cancha</b></span>
                        <span className="ms-auto">
                            <b>
                                {cancha}
                            </b>
                        </span>
                    </div>
                    <hr />
                    <div className="d-flex p-3">
                        <img src={precioImg} alt="precio" width={25} />
                        <span className="ms-2"><b>Precio</b></span>
                        <span className="ms-auto">
                            <b>
                                {precio}
                            </b>
                        </span>
                    </div>
                </div>
                <div className="bg-success-subtle p-4 w-100 mt-auto">
                </div>
            </section>
            <section className='rounded-3 border p-4 bg-secondary-subtle' >
                <p className="rounded-3 border border-danger bg-danger-subtle text-center text-danger fs-5">
                    Asegúrese de que sean los datos correctos antes de proceder a la sección de pago.
                </p>
                <div style={{ width: '300px' }}>
                    <Wallet initialization={{ preferenceId: preferenceId }} />
                </div>
            </section>
        </div>
    )
}