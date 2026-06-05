import { useEffect, useState } from 'react'
import styles from '../styles/cajaDeComentarios.module.css'
import { comentariosTodosGet, crearComentario, actualizarComentario, borrarComentario } from '../helpers/comentarioApi'
import { useAuth } from '../context/AuthProvider';
import fotoPerfil1 from '../assets/img/fotoPerfil1.jpeg'

export default function CajaDeComentarios() {
    const [comentario, setComentario] = useState('');
    const [show, setShow] = useState(true);
    const [comentariosDB, setComentariosDB] = useState([]);
    const { user } = useAuth();

    function guardarComentario(e) {
        setComentario(e.target.value);
    }

    async function enviarComentario(e) {
        e.preventDefault();

        await crearComentario(comentario, user._id)

        setComentario('');

        setShow(false);
    }

    async function ObtenerComentarios() {
        try {
            const respComentariosTodos = await comentariosTodosGet()
            setComentariosDB(respComentariosTodos.comentariosTotales[1])
        } catch (error) {
            console.error("Error al cargar el comentario:", error)
        }
    }

    useEffect(() => {
        ObtenerComentarios();
    }, [])

    return (
        <section className={styles.seccionComentariosContenedor}>
            <h2 className="text-center fs-1">Comentarios</h2>
            {comentariosDB.map((comentario) => (
                <article className={styles.postComentario} key={comentario._id}>
                    {console.log(comentario)}
                    <div className={styles.usuarioContenedor}>
                        <div className={styles.usuarioComentario}>
                            <img className={styles.usuarioImagenComentario} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT1_dE9qZfqb02VVXib12uyOodSlsS5BRyPQ&s" alt="foto de perfil" />
                            <div className="usuario-datos">
                                <span className="nombre-perfil-comentario"><b>{comentario.usuario.nombre}</b></span>
                                <br />
                                <span className={styles.dia}>hace un momento</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.comentario}>
                        {comentario.contenido}
                    </div>
                </article>
            ))}
            {user && (
                <form className={styles.formComentario} onSubmit={enviarComentario}>
                    <div className="usuario-redactor d-flex">
                        <img className={styles.fotoRedactor} src={fotoPerfil1} alt="" />
                        <div className="nombre-redactor"><b>{user.nombre}</b></div>
                    </div>
                    <textarea id="textarea" placeholder="Escribe un comentario" value={comentario} onChange={guardarComentario}></textarea>
                    <button type="submit" className={styles.btnComentar}>Comentar</button>
                </form>
            )}
        </section>
    )
}
