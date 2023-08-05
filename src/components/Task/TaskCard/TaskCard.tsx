import React from "react";
import StyledTaskCard from "./TaskCard.styled";

type Props = {
  children: React.ReactNode;
  complete: boolean;
};

const TaskCard: React.FC<Props> = ({ children, complete }) => {
  return <StyledTaskCard complete={complete}>{children}</StyledTaskCard>;
};

export default TaskCard;
