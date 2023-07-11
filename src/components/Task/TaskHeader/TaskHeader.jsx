/* eslint-disable react/prop-types */
import StyledTaskHeader from "./StyledTaskHeader";
import Header from "src/components/Header/Header";
import TaskWarning from "src/components/Task/TaskWarning/TaskWarning.styled";
import { FlexContainer } from "src/App.styles";

const setPriorityColor = (priority) => {
  let color =
    priority <= 4
      ? "var(--clr-sky-blue)"
      : priority <= 7
      ? "var(--clr-bright-orange)"
      : "var(--clr-red-orange)";
  return color;
};

const TaskHeader = ({ text, priority }) => {
  return (
    <StyledTaskHeader>
      <FlexContainer gap="10px">
        <TaskWarning priorityColor={setPriorityColor(priority)} />
        <Header text={text} />
      </FlexContainer>
    </StyledTaskHeader>
  );
};

export default TaskHeader;
