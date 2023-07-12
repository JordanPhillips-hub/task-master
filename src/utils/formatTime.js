import moment from "moment";

export const formatTime = (timeValue) => {
  let [hours, minutes] = timeValue.split(":");
  let period = "AM";
  if (hours > 12) {
    hours -= 12;
    period = "PM";
  }
  if (hours < 10) hours = Number(hours);
  timeValue = `${hours}:${minutes} ${period}`;
  return timeValue;
};

export const formatDate = (date) => {
  return moment(date).format('ll');
}