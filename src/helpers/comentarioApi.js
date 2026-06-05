const url = `${import.meta.env.VITE_API_URL}/comentarios`;

export const comentarioGet = async (id) => {
    try {
        const resp = await fetch(url + '/' + id, {
            method: 'GET',
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            }
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log(error)
        throw new Error("No se puedo obtener el comentario")
    }
}

export const comentariosTodosGet = async (limite = 0, pagina = 0) => {
    try {
        const resp = await fetch(url + "?limite" + limite + "&desde" + pagina, {
            method: 'GET',
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            }
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log(error)
        throw new Error("No se pudo obtener los comentarios")
    }
}

export const crearComentario = async (contenido, usuario) => {
    const token = localStorage.getItem('token')
    try {
        const resp = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                contenido: contenido,
                usuario: usuario
            }),
            headers: {
                'content-type': 'application/json; charset=UTF-8',
                'x-token': token
            }
        })

        const data = await resp.json();

        return data
    } catch (error) {
        console.log(error)
        throw new Error("No se pudo crear el comentario")
    }
}

export const actualizarComentario = async (id, datos) => {
    const token = localStorage.getItem('token')
    try {
        const resp = await fetch(url + '/' + id, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                'content-type': 'application/json; charset=UTF-8',
                'x-token': token
            }
        });

        const data = await resp.json();

        return data
    } catch (error) {
        console.log(error)
        throw new Error("No se pudo modificar el comentario")
    }
}

export const borrarComentario = async (id) => {
    const token = localStorage.getItem('token')
    try {
        const resp = await fetch(url + '/' + id, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json; charset=UTF-8',
                'x-token': token
            }
        });

        const data = await resp.json();

        return data
    } catch (error) {
        console.log(error)
        throw new Error("No se pudo borrar el comentario");
    }
}