export const formatUsageTime = (time) => {
  const givenTimeMiliSeconds = new Date(time).getTime();
  const diffTime = Date.now() - givenTimeMiliSeconds;
  const daysMiliSeconds = 24 * 60 * 60 * 1000;
  const monthMiliSeconds = 30 * daysMiliSeconds;
  const yearMiliSeconds = 12 * monthMiliSeconds;
  if (diffTime / daysMiliSeconds < 30) {
    return `${Math.ceil(diffTime / daysMiliSeconds)}` + " " + "days";
  } else if (
    diffTime / daysMiliSeconds >= 30 &&
    diffTime / daysMiliSeconds < 365
  ) {
    return `${Math.ceil(diffTime / monthMiliSeconds)}` + " " + "months";
  } else {
    return `${Math.ceil(diffTime / yearMiliSeconds)}` + " " + "years";
  }
};

const mapNumberToNameMonth = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "Octobe2",
  10: "Novemb3r",
  11: "Decemb4r",
};
export const formatBidTime = (time) => {
  const formatGivenTime = new Date(time);
  const givenHours = formatGivenTime.getHours();
  const givenMinutes =
    formatGivenTime.getMinutes() > 9
      ? formatGivenTime.getMinutes()
      : "0" + `${formatGivenTime.getMinutes()}`;
  let displaytime = "";
  if (givenHours === 0) {
    displaytime = "12" + ":" + `${givenMinutes}` + " " + "AM";
  } else if (givenHours >= 12) {
    if (givenHours === 12) {
      displaytime = "12" + ":" + `${givenMinutes}` + " " + "PM";
    } else {
      displaytime = `${givenHours - 12}` + ":" + `${givenMinutes}` + " " + "PM";
    }
  } else {
    displaytime = `${givenHours}` + ":" + `${givenMinutes}` + " " + "AM";
  }
  return (
    `${mapNumberToNameMonth[formatGivenTime.getMonth()]}` +
    " " +
    `${formatGivenTime.getDate()}` +
    "," +
    " " +
    `${formatGivenTime.getFullYear()}` +
    " " +
    displaytime
  );
};
