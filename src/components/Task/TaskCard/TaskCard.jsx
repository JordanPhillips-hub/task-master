/* eslint-disable react/prop-types */
import StyledTaskCard from "./TaskCard.styled";

const TaskCard = ({ children, complete }) => {
  return <StyledTaskCard complete={complete}>{children}</StyledTaskCard>;
};

export default TaskCard;
