import React from "react";
import StyledTaskHeader from "./StyledTaskHeader";
import Header from "../../Header/Header";
import TaskWarning, {
  setWarningColor,
} from "../../Task/TaskWarning/TaskWarning.styled";
import { FlexContainer } from "../../../App.styles";

type Props = {
  text?: string;
  dueDate: string;
  warningColor: string;
};

const TaskHeader: React.FC<Props> = ({ text, warningColor }) => {
  return (
    <StyledTaskHeader>
      <FlexContainer gap="10px">
        <TaskWarning warningColor={setWarningColor(warningColor)} />
        <Header text={text} />
      </FlexContainer>
    </StyledTaskHeader>
  );
};

export default TaskHeader;
