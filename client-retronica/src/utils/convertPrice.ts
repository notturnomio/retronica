export const convertPriceUsd = (price: number) => {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

export const convertPriceEuro = (price: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(price);
};
