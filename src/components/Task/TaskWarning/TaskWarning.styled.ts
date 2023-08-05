import styled from "styled-components";
import moment from "moment";

type Props = {
  warningColor: string;
};

export const setWarningColor = (dueDate: string) => {
  const currentDate = moment();
  const dueDateMoment = moment(dueDate);
  const daysDiff = dueDateMoment.diff(currentDate, "days");
  let color;
  if (daysDiff === 0) {
    color = "var(--primary-300)";
  } else if (daysDiff <= 3) {
    color = "var(--primary-200)";
  } else {
    color = "var(--primary-100)";
  }
  return color;
};

const TaskWarning = styled.div<Props>`
  background-color: ${({ warningColor }) => warningColor};
  width: 18px;
  height: 18px;
  border-radius: 50%;
`;
export default TaskWarning;
