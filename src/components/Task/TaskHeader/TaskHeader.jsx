/* eslint-disable react/prop-types */
import StyledTaskHeader from "./StyledTaskHeader";
import Header from "src/components/Header/Header";
import TaskWarning, {
  setWarningColor,
} from "src/components/Task/TaskWarning/TaskWarning.styled";
import { FlexContainer } from "src/App.styles";

const TaskHeader = ({ text, dueDate }) => {
  return (
    <StyledTaskHeader>
      <FlexContainer gap="10px">
        <TaskWarning warningColor={setWarningColor(dueDate)} />
        <Header text={text} />
      </FlexContainer>
    </StyledTaskHeader>
  );
};

export default TaskHeader;