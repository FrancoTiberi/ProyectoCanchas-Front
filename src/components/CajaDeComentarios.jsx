import { useEffect, useState } from 'react'
import styles from '../styles/cajaDeComentarios.module.css'

export default function CajaDeComentarios() {
    const [comentario, setComentario] = useState('');

    const [usuario, setUsuario] = useState(() => {
        const stored = localStorage.getItem('currentUser');
        return stored ? JSON.parse(stored) : { username: 'Invitado', comentario: '' };
    });

    function guardarComentario(e) {
        setComentario(e.target.value);
    }

    function enviarComentario(e) {
        e.preventDefault();

        const usuarioActualizado = { ...usuario, comentario };

        localStorage.setItem('currentUser', JSON.stringify(usuarioActualizado));

        setUsuario(usuarioActualizado);

        setComentario('');
    }

    return (
        <section className={styles.seccionComentariosContenedor}>
            <h2 className="text-center fs-1">Comentarios</h2>
            <article className={styles.postComentario}>
                <div className={styles.usuarioContenedor}>
                    <div className={styles.usuarioComentario}>
                        <img className={styles.usuarioImagenComentario} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT1_dE9qZfqb02VVXib12uyOodSlsS5BRyPQ&s" alt="foto de perfil" />
                        <div className={styles.usuarioDatos}>
                            <span className="nombre-perfil-comentario"><b>Juan Rodriguez</b></span>
                            <br />
                            <span className={styles.dia}>hace 22 dias</span>
                        </div>
                    </div>
                </div>
                <div className={styles.comentario}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam tempora, temporibus quidem, impedit numquam id, totam quod nam quos sed explicabo maxime eius nemo et dolor porro corporis. Mollitia, nesciunt?
                </div>
            </article>
            <article className={styles.postComentario}>
                <div className={styles.usuarioContenedor}>
                    <div className={styles.usuarioComentario}>
                        <img className={styles.usuarioImagenComentario} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT1_dE9qZfqb02VVXib12uyOodSlsS5BRyPQ&s" alt="foto de perfil" />
                        <div className="usuario-datos">
                            <span className="nombre-perfil-comentario"><b>Roberto</b></span>
                            <br />
                            <span className={styles.dia}>hace 15 dias</span>
                        </div>
                    </div>
                </div>
                <div className={styles.comentario}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam tempora, temporibus quidem, impedit numquam id, totam quod nam quos sed explicabo maxime eius nemo et dolor porro corporis. Mollitia, nesciunt?
                </div>
            </article>
            <article className={styles.postComentario}>
                <div className={styles.usuarioContenedor}>
                    <div className={styles.usuarioComentario}>
                        <img className={styles.usuarioImagenComentario} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT1_dE9qZfqb02VVXib12uyOodSlsS5BRyPQ&s" alt="foto de perfil" />
                        <div className="usuario-datos">
                            <span className="nombre-perfil-comentario"><b>Pepe</b></span>
                            <br />
                            <span className={styles.dia}>hace 10 dias</span>
                        </div>
                    </div>
                </div>
                <div className={styles.comentario}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam tempora, temporibus quidem, impedit numquam id, totam quod nam quos sed explicabo maxime eius nemo et dolor porro corporis. Mollitia, nesciunt?
                </div>
            </article>
            {usuario.comentario && (
                <article className={styles.postComentario}>
                    <div className={styles.usuarioContenedor}>
                        <div className={styles.usuarioComentario}>
                            <img className={styles.usuarioImagenComentario} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT1_dE9qZfqb02VVXib12uyOodSlsS5BRyPQ&s" alt="foto de perfil" />
                            <div className="usuario-datos">
                                <span className="nombre-perfil-comentario"><b>Tú</b></span>
                                <br />
                                <span className={styles.dia}>hace un momento</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.comentario}>
                        {usuario.comentario}
                    </div>
                </article>
            )}
            {!usuario.comentario && (
                <form className={styles.formComentario} onSubmit={enviarComentario}>
                    <div className="usuario-redactor d-flex">
                        <img className={styles.fotoRedactor} src="../Assets/img/fotoPerfil1.jpeg" alt="" />
                        <div className="nombre-redactor"><b>{usuario.username}</b></div>
                    </div>
                    <textarea id="textarea" placeholder="Escribe un comentario" value={comentario} onChange={guardarComentario}></textarea>
                    <button type="submit" className={styles.btnComentar}>Comentar</button>
                </form>
            )}
        </section>
    )
}
