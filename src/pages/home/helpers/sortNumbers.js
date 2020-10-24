const isAsc = (order) => order === 'asc';

export const sortNumbers = (a, b, order) => isAsc(order) ? a - b : b - a;
