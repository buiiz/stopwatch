const pad2digits = (value) => String(value).padStart(2, '0');

export const timeFormat = (seconds) => {
  const H = Math.floor(seconds / 3600);
  const M = Math.floor((seconds - H * 3600) / 60);
  const S = seconds % 60;
  return `${pad2digits(H)}:${pad2digits(M)}:${pad2digits(S)}`;
};
