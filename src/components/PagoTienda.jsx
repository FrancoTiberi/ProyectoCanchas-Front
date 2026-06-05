import logoImg from "../assets/img/logo.png"
import precioImg from "../assets/img/dolar.png"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { mercadoPagoPreferenceTienda } from "../helpers/mercadoPagoApi";
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import LoginModal from '../components/LoginModal.jsx';

export default function PagoTienda() {
    const location = useLocation();
    const { user } = useAuth();
    const { carrito, total, esComida } = location.state || { carrito: [], total: 0 };
    const [preferenceId, setPreferenceId] = useState(null);
    initMercadoPago(import.meta.env.VITE_MP_TOKEN);

    useEffect(() => {
        if (!user) return;
        if (!carrito || carrito.length === 0) return;

        const fetchPreference = async () => {
            const itemsJson = JSON.stringify(carrito.map(item => ({
                productoId: item._id,
                nombre: item.nombre,
                cantidad: item.cantidad,
                precioUnitario: item.precio,
                subtotal: item.precio * item.cantidad
            })));

            const metadata = {
                tipo: esComida ? "comida" : "tienda",
                usuario_id: user._id,
                nombre_usuario: user.nombre,
                items_json: itemsJson,
                total: total
            };

            const respMercadoPago = await mercadoPagoPreferenceTienda(carrito, metadata);
            setPreferenceId(respMercadoPago);
        }

        fetchPreference();
    }, [user])

    if (!user) {
        return (
            <div className='p-5 vh-100 d-flex flex-column justify-content-center align-items-center text-center'>
                <div className="bg-white p-5 rounded-4">
                    <h2 className="mb-4">Debes iniciar sesión para continuar con el pago</h2>
                    <LoginModal className="btn btn-success btn-lg" />
                </div>
            </div>
        );
    }

    if (!carrito || carrito.length === 0) {
        return (
            <div className='p-5 vh-100 d-flex flex-column justify-content-center align-items-center text-center'>
                <div className="bg-white p-5 rounded-4">
                    <h2 className="mb-4">No hay productos en el carrito</h2>
                </div>
            </div>
        );
    }

    return (
        <div className='p-5 vh-100 d-flex justify-content-center align-items-start gap-2'>
            <section className='rounded-3 bg-secondary-subtle w-50 d-flex flex-column overflow-hidden'>
                <div className="p-3">
                    <div className="mb-3">
                        <div className="d-flex justify-content-between">
                            <h1>Golazo Gourmet</h1>
                            <img src={logoImg} alt="logo" width={55} height={50} className="rounded-3" />
                        </div>
                        <span>Resumen del pedido</span>
                    </div>
                    <hr />
                    {carrito.map((item) => (
                        <div key={item._id}>
                            <div className="d-flex p-3 align-items-center">
                                <img src={item.img} alt={item.nombre} width={50} height={50} className="rounded-3 me-3" style={{ objectFit: 'cover' }} />
                                <div className="flex-grow-1">
                                    <span><b>{item.nombre}</b></span>
                                    <br />
                                    <small className="text-muted">x{item.cantidad}</small>
                                </div>
                                <span className="ms-auto">
                                    <b>${item.precio * item.cantidad}</b>
                                </span>
                            </div>
                            <hr />
                        </div>
                    ))}
                    <div className="d-flex p-3">
                        <img src={precioImg} alt="precio" width={25} />
                        <span className="ms-2"><b>Total</b></span>
                        <span className="ms-auto">
                            <b>${total}</b>
                        </span>
                    </div>
                    <hr />
                    <div className="d-flex p-3 align-items-center">
                        <i className="bi bi-shop fs-4 me-2"></i>
                        <span><b>Retiro en local</b></span>
                        <span className="ms-auto text-muted">
                            Av. Juan Domingo Perón 125, Tucumán
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
                    {preferenceId ? (
                        <Wallet initialization={{ preferenceId: preferenceId }} />
                    ) : (
                        <p>Cargando opciones de pago...</p>
                    )}
                </div>
            </section>
        </div>
    )
}
