
const API_KEY = 'https://react-fast-pizza-api.onrender.com/api';

export async function getMenu() {
    const res = await fetch(`${API_KEY}/menu`)
    if (!res.ok) {
        throw new Error("Failed getting menu")
    }
    const { data } = await res.json()
    return data;
}


export async function createOrder(newOrder) {
    try {
        const res = await fetch(`${API_KEY}/order`, {
            method: "POST",
            body: JSON.stringify(newOrder),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!res.ok) {
            throw new Error()
        }

        const { data } = await res.json()
        return data;

    }
    catch {
        throw Error('Failed creating your order');
    }
}


export async function getOrder(id) {
    const res = await fetch(`${API_KEY}/order/${id}`);
    if (!res.ok) throw Error(`Couldn't find order #${id}`);

    const { data } = await res.json();
    return data;
}


export async function updateOrder(id,updatedObj) {
    try {
        const res = await fetch(`${API_KEY}/order/${id}`, {
            method: "PATCH",
            body: JSON.stringify(updatedObj),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!res.ok) {
            throw new Error()
        }
    }
    catch {
        throw Error('Failed updating your order');
    }
}