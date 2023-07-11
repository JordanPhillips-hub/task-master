/* eslint-disable react/prop-types */
import StyledTaskCard from "./TaskCard.styled";

const TaskCard = ({ children }) => {
  return <StyledTaskCard>{children}</StyledTaskCard>;
};

export default TaskCard;
