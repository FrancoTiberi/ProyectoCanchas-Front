import React, { useState } from 'react';
import '../styles/menu.css'

export const Menu = () => {
    const comidas = [
        {
            categoria: "Hamburguesas",
            items: [
                { id: 1, nombre: "Simple", precio: "200", descripcion: "Es buena" },
                { id: 2, nombre: "Doble", precio: "300", descripcion: "Es mejor" }
            ]
        },
        {
            categoria: "Pizzas",
            items: [
                { id: 3, nombre: "Margarita", precio: "250", descripcion: "Deliciosa" },
                { id: 4, nombre: "Pepperoni", precio: "350", descripcion: "Picante" }
            ]
        }
    ];

    const [carrito, setCarrito] = useState([]);
    const [mostrarCarrito, setMostrarCarrito] = useState(false);

    const AgregarAlCarrito = (comida) => {
        setCarrito(prev => {
            const itemExistente = prev.find(item => item.id === comida.id);
            if (itemExistente) {
                return prev.map(item => item.id === comida.id ? { ...item, cantidad: item.cantidad + 1 } : item);
            } else {
                return [...prev, { ...comida, cantidad: 1 }];
            }
        });
    };

    const disminuirCantidad = (id) => {
        setCarrito(prev =>
            prev.map(item =>
                item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
            ).filter(item => item.cantidad > 0)
        );
    };

    const EliminarDelCarrito = (id) => {
        setCarrito(prev => prev.filter(item => item.id !== id));
    };

    const total = carrito.reduce((acc, item) => acc + Number(item.precio) * item.cantidad, 0);

    return (
        <main>
            {comidas.map(categoria => (
                <section key={categoria.categoria}>
                    <h2>{categoria.categoria}</h2>
                    {categoria.items.map(item => (
                        <div key={item.id}>
                            <h3>{item.nombre}</h3>
                            <p>{item.descripcion}</p>
                            <p>Precio: ${item.precio}</p>
                            <button onClick={() => AgregarAlCarrito(item)}>Agregar</button>
                        </div>
                    ))}
                </section>
            ))}

            <button onClick={() => setMostrarCarrito(prev => !prev)}>Carrito</button>

            {mostrarCarrito && (
                <div>
                    <h3>Carrito</h3>
                    {carrito.length === 0 ? (
                        <p>Vacío</p>
                    ) : (
                        carrito.map(item => (
                            <div key={item.id}>
                                <span>{item.nombre} x {item.cantidad} = ${Number(item.precio) * item.cantidad}</span>
                                <div>
                                    <button onClick={() => disminuirCantidad(item.id)}> - </button>
                                    <button onClick={() => AgregarAlCarrito(item)}> + </button>
                                    <button onClick={() => EliminarDelCarrito(item.id)}> Quitar </button>
                                </div>
                            </div>
                        ))
                    )}
                    <p>Total: ${total}</p>
                </div>
            )}
        </main>
    );
};
