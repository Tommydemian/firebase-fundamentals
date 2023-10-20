export const calculateTotal = (array: string[]):number => {
  let total = 0;
  array.map((el) => total += Number(el));
  return total;
};