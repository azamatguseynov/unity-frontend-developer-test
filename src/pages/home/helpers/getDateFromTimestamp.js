export const getDateFromTimestamp = (timestamp) => new Date(timestamp).toISOString().substring(0, 10);
