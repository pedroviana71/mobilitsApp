export const priceMask = (value: string) => {
  let newPrice = value;

  if (newPrice.length === 1) {
    newPrice = '0' + newPrice;
  }

  newPrice = parseFloat(
    newPrice.replace(/[^\d]/g, '').replace(/(\d\d?)$/, '.$1'),
  ).toFixed(2);

  return newPrice;
};
