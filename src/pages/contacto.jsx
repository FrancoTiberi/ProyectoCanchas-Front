import React, { useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import styles from '../styles/contacto.module.css';
import CajaDeComentarios from '../components/CajaDeComentarios';


const Contacto = () => {
    const [state, handleSubmit] = useForm('mzzklgav');
    const formRef = useRef(null);

    useEffect(() => {
        if (state.succeeded) {
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
            formRef.current?.reset();
        }
    }, [state.succeeded]);

    return (
        <>
        <main className={styles.main}>
            <section className={styles.cajaPrincipal}>
                <h1 className={styles.titulo}>Ponete en contacto con nuestro equipo</h1>

                <div className={styles.contenedorbtns}>
                    {/* Formulario */}
                    <article className={`${styles.caja} ${styles.caja1}`}>
                        <h2 className={styles.tituloCaja1}>¿Necesitás ayuda?</h2>
                        <form onSubmit={handleSubmit} ref={formRef}>
                            <div className="mb-1">
                                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="1234@ejemplo.com"
                                    required
                                />
                                <ValidationError prefix="Email" field="email" errors={state.errors} />
                            </div>

                            <div className="mb-1">
                                <label htmlFor="message" className={styles.formLabel2}>Consulta</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="form-control"
                                    rows="3"
                                    placeholder="¿En que puedo ayudarte?"
                                    required
                                />
                                <ValidationError prefix="Message" field="message" errors={state.errors} />
                            </div>

                            <button type="submit" className={`btn btn-primary ${styles.boton}`} disabled={state.submitting}>
                                Enviar
                            </button>
                        </form>
                    </article>

                    {/* Mapa */}
                    <article className={`${styles.caja} ${styles.caja2}`}>
                        <h2 className={styles.mapaH2}>
                            <i className="bi bi-geo-alt"></i> San Miguel de Tucumán - Argentina
                        </h2>
                        <div className={styles.cajaMapa}>
                            <iframe
                                className={styles.mapa}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.0536597605933!2d-65.2647294248388!3d-26.806419988770546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d21e9df306f%3A0x11cb676224291c1f!2sAv.%20Juan%20Domingo%20Per%C3%B3n%20125%2C%20T4000%20Yerba%20Buena%2C%20Tucum%C3%A1n!5e0!3m2!1ses!2sar!4v1750460196587!5m2!1ses!2sar"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ubicación Golazo Gourmet"
                            ></iframe>
                        </div>
                    </article>
                </div>
            </section>
            
        </main>
        <CajaDeComentarios/>
        </>
    );
};

export default Contacto;
