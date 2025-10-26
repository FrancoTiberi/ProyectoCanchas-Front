import React, { useState } from 'react';
import styles from '../styles/menu.module.css';

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
                { id: 4, nombre: "Pepperoni", precio: "350", descripcion: "Picante" },
                { id: 5, nombre: "Pepperonis", precio: "350", descripcion: "Picantes" }
            ]
        }
    ];

    const [carrito, setCarrito] = useState([]);
    const [mostrarCarrito, setMostrarCarrito] = useState(false);

    const AgregarAlCarrito = (comida) => {
        setCarrito(prev => {
            const itemExistente = prev.find(item => item.id === comida.id);
            if (itemExistente) {
                return prev.map(item =>
                    item.id === comida.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            } else {
                return [...prev, { ...comida, cantidad: 1 }];
            }
        });
    };

    const disminuirCantidad = (id) => {
        setCarrito(prev =>
            prev
                .map(item =>
                    item.id === id
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                )
                .filter(item => item.cantidad > 0)
        );
    };

    const EliminarDelCarrito = (id) => {
        setCarrito(prev => prev.filter(item => item.id !== id));
    };

    const total = carrito.reduce(
        (acc, item) => acc + Number(item.precio) * item.cantidad,
        0
    );

    return (
        <main className={styles.main}>
            <h1 className={styles.titulo}>Menú</h1>

            {comidas.map(categoria => (
                <section key={categoria.categoria} className={styles.section}>
                    <h2 className={styles.sectionTitle}>{categoria.categoria}</h2>
                    <div className={styles.itemsContainer}>
                        {categoria.items.map(item => (
                            <div key={item.id} className={styles.card}>
                                <h3>{item.nombre}</h3>
                                <p>Precio: ${item.precio}</p>
                                <p>{item.descripcion}</p>
                                <button onClick={() => AgregarAlCarrito(item)} className={styles.button}>
                                    Agregar
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            ))}

            <button
                className={styles.button}
                onClick={() => setMostrarCarrito(prev => !prev)}
            >
                Carrito
            </button>

            {mostrarCarrito && (
                <div className={styles.carrito}>
                    <h3>Carrito</h3>
                    {carrito.length === 0 ? (
                        <p>Vacío</p>
                    ) : (
                        carrito.map(item => (
                            <div key={item.id} className={styles.carritoItem}>
                                <span>
                                    {item.nombre} x {item.cantidad} = $
                                    {Number(item.precio) * item.cantidad}
                                </span>
                                <div>
                                    <button onClick={() => disminuirCantidad(item.id)} className={styles.button}>
                                        -
                                    </button>
                                    <button onClick={() => AgregarAlCarrito(item)} className={styles.button}>
                                        +
                                    </button>
                                    <button onClick={() => EliminarDelCarrito(item.id)} className={styles.button}>
                                        Quitar
                                    </button>
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