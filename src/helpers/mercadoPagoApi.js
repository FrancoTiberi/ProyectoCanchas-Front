const url = `${import.meta.env.VITE_API_URL}/create-preference`;

export const mercadoPagoPreference = async (product) => {
    try {
        let id;
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: [{
                    title: product.title,
                    quantity: 1,
                    unit_price: product.unit_price,
                }]
            }),
        })
        if (resp.ok) {
            const data = await resp.json();
            id = data.preference_id;
            console.log(data);
        }
        return id;
    } catch (error) {
        console.log(error);
        throw new Error("No se pudo obtener la info de la preferencia")
    }
}