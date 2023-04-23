export const countCurrrentRating = (rating: number) => `${rating * 20}%`;

export const parseDate = (date: string) => {
  const currentDate = new Date(date);
  const month = currentDate.toLocaleString('default', { month: 'long' });
  return `${month} ${currentDate.getFullYear()}`;
};
