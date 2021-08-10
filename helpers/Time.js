export const toTime = (time) => {
  if (!time && time !== 0) return "";
  return (
    zeroPad(Math.floor(time / 3600)) +
    " h " +
    zeroPad(Math.floor((time % 3600) / 60)) +
    " min " +
    zeroPad(Math.round(time % 60)) +
    " s"
  );
};

export const extractTime = (time) => {
  const date = new Date(time);
  return `${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())} ${zeroPad(
    date.getDate()
  )}.${zeroPad(date.getMonth())}.${date.getFullYear()}`;
};

const zeroPad = (num) => String(num).padStart(2, "0");
