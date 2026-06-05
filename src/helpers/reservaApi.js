const url = `${import.meta.env.VITE_API_URL}/reservas`;

export const reservasTodasGet = async (limite = 0, pagina = 0) => {
    const token = localStorage.getItem('token');
    try {
        const resp = await fetch(url + '?limite=' + limite + '&desde=' + pagina, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'x-token': token
            }
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log(error);
        throw new Error("No se pudo obtener la info")
    }
};

export const reservaGet = async (id) => {
    const token = localStorage.getItem('token');
    try {
        const resp = await fetch(url + '/' + id, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'x-token': token
            }
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log(error);
        throw new Error("No se pudo obtener la info")
    }
};

export const crearReserva = async (datos) => {
    const token = localStorage.getItem('token');
    try {
        const resp = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'x-token': token
            }
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log(error);
        return { msg: "No se contectó con backend" };
    }
};

export const actualizarReserva = async (id, datos) => {
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
};

export const borrarReserva = async (id) => {
    const token = localStorage.getItem('token');
    try {
        const resp = await fetch(url + '/' + id, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'x-token': token
            }
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log(error);
        return { msg: "No se contectó con backend" };
    }
};

export const obtenerMisReservas = async () => {
    const token = localStorage.getItem('token');
    try {
        const resp = await fetch(url + '/misReservas', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'x-token': token
            }
        });

        const data = await resp.json();

        return data;
    } catch (error) {
        console.log("Hubo un error al obtener las reservas", error);
    }
}