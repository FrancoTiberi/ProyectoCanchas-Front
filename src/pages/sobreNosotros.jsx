import React from 'react';
import styles from '../styles/sobrenosotros.module.css';

const integrantes = [
    { nombre: 'Hecclem Vargas', img: 'https://cdn-icons-png.flaticon.com/512/8090/8090465.png' },
    { nombre: 'Franco Tiberi', img: 'https://cdn-icons-png.flaticon.com/512/8090/8090465.png' },
    { nombre: 'Jesus Decima', img: 'https://cdn-icons-png.flaticon.com/512/8090/8090465.png' },
    { nombre: 'Franco Agudo', img: 'https://cdn-icons-png.flaticon.com/512/8090/8090465.png' },
];

const SobreNosotros = () => {
    return (
        <section className={styles.contenedornosotros}>
            <div className={styles.contenedor1}>
                <h1 className={styles.titulo1}>Sobre Nosotros</h1>
                <p className={styles.parrafo1}>
                    En Golazo Gourmet, creemos en la importancia de ofrecer un servicio de calidad que combine compromiso,
                    innovación y cercanía. Desde nuestros inicios, nos propusimos crear un espacio donde cada cliente se sienta
                    valorado y cada experiencia supere las expectativas.
                    <br /><br />
                    Somos un equipo apasionado por lo que hacemos. Nos impulsa la mejora constante y la búsqueda de soluciones
                    prácticas que aporten valor real. Nuestra misión es brindar una atención personalizada, cuidando cada detalle
                    para que tu experiencia con nosotros sea siempre positiva.
                    <br /><br />
                    Gracias por confiar en nosotros y formar parte de esta comunidad que no deja de crecer.
                </p>
            </div>

            <div className={styles.contenedor2}>
                {integrantes.map((persona, index) => (
                    <div key={index} className={styles.integrante}>
                        <img className={styles.imagen} src={persona.img} alt={`Foto de ${persona.nombre}`} />
                        <h2 className={styles.nombre}>{persona.nombre}</h2>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SobreNosotros;
