import React from "react";
import StyledSubtask from "./Subtask.styled";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { FlexContainer } from "../../App.styles";

type Props = {
  text: string;
  iconType: string;
  remove: boolean;
  complete: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Subtask: React.FC<Props> = ({
  text,
  iconType,
  remove,
  complete,
  onClick,
}) => {
  return (
    <StyledSubtask complete={complete}>
      <FlexContainer>
        <span>{text}</span>
        <Button variant="round" remove={remove} onClick={onClick}>
          <Icon type={iconType} />
        </Button>
      </FlexContainer>
    </StyledSubtask>
  );
};

export default Subtask;
