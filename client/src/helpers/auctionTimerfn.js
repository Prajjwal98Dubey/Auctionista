export const timeLeftForAuction = (time) => {
  const givenTime = new Date(time).getTime();
  const currTime = Date.now();
  const miliSecondsInDay = 24 * 60 * 60 * 1000;
  if (givenTime - currTime < 0) return "Ended";
  else if (givenTime - currTime > 0) {
    if (givenTime - currTime <= miliSecondsInDay) {
      return "Coming Soon";
    }
    return "Scheduled";
  } else return "Ongoing";
};
