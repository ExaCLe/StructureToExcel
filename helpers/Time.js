export const toTime = (time) => {
  if (!time && time !== 0) return "";
  return (
    Math.floor(time / 3600) +
    " h " +
    Math.floor((time % 3600) / 60) +
    " min " +
    Math.round(time % 60) +
    " s"
  );
};
