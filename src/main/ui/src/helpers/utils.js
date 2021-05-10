export const formatNumber = number => {
    return new Intl.NumberFormat('es-EU', { style: 'currency', currency: 'EUR' }).format(number);
}