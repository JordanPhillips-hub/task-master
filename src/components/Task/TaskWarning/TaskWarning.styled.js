import styled from "styled-components";

export const setWarningColor = (priority) => {
  let color =
    priority <= 4
      ? "var(--clr-sky-blue)"
      : priority <= 7
        ? "var(--clr-bright-orange)"
        : "var(--clr-red-orange)";
  return color;
};

const TaskWarning = styled.div`
  background-color: ${({ warningColor }) => warningColor};
  width: 18px;
  height: 18px;
  border-radius: 50%;
`
export default TaskWarning;