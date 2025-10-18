const USD_TO_INR_RATE = 88.78;

export const convertToINR = (usdPrice: number): string => {
  const inrPrice = usdPrice * USD_TO_INR_RATE;
  return inrPrice.toFixed(2);
};

export const formatINR = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};
