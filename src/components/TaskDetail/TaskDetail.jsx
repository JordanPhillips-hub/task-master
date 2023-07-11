/* eslint-disable react/prop-types */
import Icon from "src/components/Icon/Icon";
import StyledTaskDetail from "./TaskDetail.styled";
import { FlexContainer } from "src/App.styles";

const TaskDetail = ({ icon, title, value }) => {
  return (
    <StyledTaskDetail>
      <FlexContainer gap="6px" marginBottom="10px">
        <Icon type={icon} fontSize="1.125rem" />
        <p>{title}</p>
        {title === "Priority:" || title === "Complexity:" ? (
          <span>
            {value <= 4 ? "Low" : value <= 7 ? "Medium" : "High"}
            {`(${value}/10)`}
          </span>
        ) : (
          <span>{value}</span>
        )}
      </FlexContainer>
    </StyledTaskDetail>
  );
};

export default TaskDetail;
