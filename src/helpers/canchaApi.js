const url = `${import.meta.env.VITE_API_URL}/canchas`;

export const canchasTodasGet = async (limite = 0, desde = 0) => {
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
};

export const canchaGet = async (id) => {
    try {
        const resp = await fetch(url + '/' + id, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log(error);
        throw new Error("No se pudo obtener la info");
    }
};

export const crearCancha = async (datos) => {
    try {
        const resp = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            }
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log(error);
        return { msg: "No se contectó con backend" };
    }
};

export const actualizarCancha = async (id, datos) => {
    try {
        const resp = await fetch(url + '/' + id, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            }
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log(error)
        return { msg: "No se conectó con backend" };
    }
};

export const borrarCancha = async (id) => {
    try {
        const resp = await fetch(url + '/' + id, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            }
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log(error);
        return { msg: 'No se conectó con backend' };
    }
};

export const obtenerHorasDisponibles = async (id, fecha) => {
    try {
        const resp = await fetch(url + '/' + id + '?fecha=' + fecha, {
            method: 'GET',
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            }
        });

        const data = await resp.json();

        return data.horasDisponibles;
    } catch (error) {
        console.log(error);
        throw new Error("No se pudo obtener la info");
    }
}

export const obtenerDisponibilidadTodas = async (fecha) => {
    try {
        const resp = await fetch(url + '/disponibilidadTodas?fecha=' + fecha, {
            method: 'GET',
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            }
        });

        const data = await resp.json();

        return data.canchas
    } catch (error) {
        console.log(error)
        throw new Error("Fallo al obtener las horas");
    }
}