const url = `${import.meta.env.VITE_API_URL}/pedidos`;

export const pedidosTodosGet = async (limite = 0, pagina = 0) => {
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
        throw new Error("No se pudo obtener los pedidos");
    }
};

export const pedidoGet = async (id) => {
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
        throw new Error("No se pudo obtener el pedido");
    }
};

export const crearPedido = async (datos) => {
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
        return { msg: "No se conectó con backend" };
    }
};

export const actualizarPedido = async (id, datos) => {
    const token = localStorage.getItem('token');
    try {
        const resp = await fetch(url + '/' + id, {
            method: 'PUT',
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
        return { msg: "No se conectó con backend" };
    }
};

export const obtenerMisPedidos = async () => {
    const token = localStorage.getItem('token');
    try {
        const resp = await fetch(url + '/misPedidos', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'x-token': token
            }
        });

        const data = await resp.json();
        return data;
    } catch (error) {
        console.log("Hubo un error al obtener los pedidos", error);
    }
};

export const borrarPedido = async (id) => {
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
        return { msg: "No se conectó con backend" };
    }
};
