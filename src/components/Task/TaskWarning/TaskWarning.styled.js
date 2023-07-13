import styled from "styled-components";
import moment from 'moment';

export const setWarningColor = (dueDate) => {
  const currentDate = moment();
  const dueDateMoment = moment(dueDate);
  const daysDiff = dueDateMoment.diff(currentDate, 'days');
  let color;
  if (daysDiff === 0) {
    color = "var(--clr-red-orange)";
  } else if (daysDiff <= 3) {
    color = "var(--clr-bright-orange)";
  } else {
    color = "var(--clr-sky-blue)";
  }
  return color;
};

const TaskWarning = styled.div`
  background-color: ${({ warningColor }) => warningColor};
  width: 18px;
  height: 18px;
  border-radius: 50%;
`
export default TaskWarning;