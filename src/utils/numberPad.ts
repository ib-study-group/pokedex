export const numberPad = (num: number, size: number): string => {
  const numberText = num.toString();
  return numberText.padStart(size, '0');
};
