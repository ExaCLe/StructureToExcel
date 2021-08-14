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
export const toTimeShort = (time) => {
  console.log(time);
  if (!time && time !== 0) return "";
  return (
    zeroPad(Math.floor(time / 60)) +
    " h " +
    zeroPad(Math.floor(time % 60)) +
    " min "
  );
};

export const extractTime = (time) => {
  const date = new Date(time);
  return `${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())} ${zeroPad(
    date.getDate()
  )}.${zeroPad(date.getMonth() + 1)}.${date.getFullYear()}`;
};

export const extractTimeAndDateDetailed = (time) => {
  const date = new Date(time);
  return `${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())}:${zeroPad(
    date.getSeconds()
  )} Uhr ${zeroPad(date.getDate())}.${zeroPad(
    date.getMonth() + 1
  )}.${date.getFullYear()}`;
};

export const extractDate = (time) => {
  const date = new Date(time);
  return `${zeroPad(date.getDate())}.${zeroPad(
    date.getMonth() + 1
  )}.${date.getFullYear()}`;
};

export const extractTimeDetailed = (time) => {
  const date = new Date(time);
  return `${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())}:${zeroPad(
    date.getSeconds()
  )} Uhr`;
};

const daysOfTheWeek = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

export const extractDateWithDayOfWeek = (time) => {
  const date = new Date(time);
  const day = date.getDay();
  return `${daysOfTheWeek[day]}. ${zeroPad(date.getDate())}.${zeroPad(
    date.getMonth() + 1
  )}`;
};

const zeroPad = (num) => String(num).padStart(2, "0");
