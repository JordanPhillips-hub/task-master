import React from "react";
import StyledTaskDetail from "./TaskDetail.styled";
import Icon from "../../Icon/Icon";
import { setWarningColor } from "../../Task/TaskWarning/TaskWarning.styled";
import { FlexContainer } from "../../../App.styles";

type Props = {
  icon: string;
  title: string;
  value: string | number;
  dueDate?: string;
  warningColor?: string;
};

const TaskDetail: React.FC<Props> = ({ icon, title, value, warningColor }) => {
  return (
    <StyledTaskDetail warningColor={setWarningColor(warningColor ?? "")}>
      <FlexContainer gap="6px" marginBottom="10px">
        <Icon type={icon} fontSize="1.125rem" />
        <p>{title}</p>
        {title === "Priority:" || title === "Complexity:" ? (
          <span>
            {typeof value === "number" ? (
              <>
                {value <= 4 ? "Low" : value <= 7 ? "Medium" : "High"}
                {`(${value}/10)`}
              </>
            ) : (
              value
            )}
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
