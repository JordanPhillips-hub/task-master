/* eslint-disable react/prop-types */
import StyledSubtask from "./Subtask.styled";
import Button from "src/components/Button/Button";
import Icon from "src/components/Icon/Icon";
import { FlexContainer } from "src/App.styles";

const Subtask = ({ text, iconType, remove, onButtonClick }) => {
  return (
    <StyledSubtask>
      <FlexContainer>
        <span>{text}</span>
        <Button variant="round" remove={remove} onClick={onButtonClick}>
          <Icon type={iconType} />
        </Button>
      </FlexContainer>
    </StyledSubtask>
  );
};

export default Subtask;
