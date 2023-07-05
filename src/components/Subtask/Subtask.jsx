/* eslint-disable react/prop-types */
import StyledSubtask from "./Subtask.styled";

const Subtask = ({ text }) => {
  return (
    <StyledSubtask>
      <span>{text}</span>
    </StyledSubtask>
  );
};

export default Subtask;
