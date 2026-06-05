const url = `${import.meta.env.VITE_API_URL}/productos`;

export const obtenerProductos = async () => {
    try {
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        const data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error("No se pudo obtener los productos");
    }
};

export const borrarProducto = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const resp = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'x-token': token
            }
        });

        const data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error("No se pudo eliminar el producto");
    }
};
