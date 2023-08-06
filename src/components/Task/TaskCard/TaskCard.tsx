import React from "react";
import StyledTaskCard from "./TaskCard.styled";

type Props = {
  children: React.ReactNode;
  complete: boolean;
  style?: React.CSSProperties;
};

const TaskCard: React.FC<Props> = ({ children, complete, ...rest }) => {
  return (
    <StyledTaskCard complete={complete} {...rest}>
      {children}
    </StyledTaskCard>
  );
};

export default TaskCard;
