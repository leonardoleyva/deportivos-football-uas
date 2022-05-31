export const parseDateToMMDDYYYY = (date: Date | string) => {
  const [yyyy, mm, dd] = new Date(date).toISOString().split('T')[0].split('-');
  return `${mm}/${dd}/${yyyy}`;
};

export const parseMMDDYYYYtoDate = (date: string) => new Date(date);
