/* eslint-disable react/prop-types */
import StyledTaskDetail from "./TaskDetail.styled";
import Icon from "src/components/Icon/Icon";
import { setWarningColor } from "src/components/Task/TaskWarning/TaskWarning.styled";
import { FlexContainer } from "src/App.styles";

const TaskDetail = ({ icon, title, value, dueDate }) => {
  return (
    <StyledTaskDetail warningColor={setWarningColor(dueDate)}>
      <FlexContainer gap="6px" marginBottom="10px">
        <Icon type={icon} fontSize="1.125rem" />
        <p>{title}</p>
        {title === "Priority:" || title === "Complexity:" ? (
          <span>
            {value <= 4 ? "Low" : value <= 7 ? "Medium" : "High"}
            {`(${value}/10)`}
          </span>
        ) : (
          <span className={title === "Due Date:" ? "dueDate" : ""}>
            {value}
          </span>
        )}
      </FlexContainer>
    </StyledTaskDetail>
  );
};

export default TaskDetail;
