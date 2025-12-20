const url = 'http://localhost:4000/api/canchas';

export const usuariosTodosGet = async (limite = 0, desde = 0) => {
    try {
        const resp = await fetch(url + '?limite=' + limite + '&desde=' + desde, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log(error);
        throw new Error("No se pudo obtener la info")
    }
}

export const usuarioGet = async (id) => {
    try {
        const resp = await fetch(url + '/' + id, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log(error);
        throw new Error("No se pudo obtener la info")
    }
}

export const crearUsuario = async (datos) => {
    try {
        const resp = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log(error);
        return { msg: "No se contectó con backend" };
    }
};

export const actualizarUsuario = async (id, datos) => {
    try {
        const resp = await fetch(url + '/' + id, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log(error);
        return { msg: "No se contectó con backend" };
    }
}

export const usuarioDelete = async (id) => {
    try {
        const resp = await fetch(url + '/' + id, {
            method: 'DELETE',
            body: JSON.stringify(datos),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log(error);
        return { msg: "No se contectó con backend" };
    }
}