export function formatCurreny(currency) {
    return Intl.NumberFormat('en', {
        style: "currency",
        currency: "EUR",
    }).format(currency)
}

export const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    );

export function formatDate(dateStr) {
    return new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(dateStr))
}


export function calcMinutesLeft(dateStr) {
    const d1 = new Date().getTime();
    const d2 = new Date(dateStr).getTime();
    return Math.round((d2 - d1) / 60000);
}
