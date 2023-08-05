export const formatTime = (timeValue: string) => {
  let [hours, minutes] = timeValue.split(":");
  let period = "AM";
  let hoursAsNumber = parseInt(hours, 10);

  if (hoursAsNumber > 12) {
    hoursAsNumber -= 12;
    period = "PM";
  }

  if (hoursAsNumber < 10) {
    hours = `${hoursAsNumber}`;
  } else {
    hours = hoursAsNumber.toString();
  }

  timeValue = `${hours}:${minutes} ${period}`;
  return timeValue;
};
