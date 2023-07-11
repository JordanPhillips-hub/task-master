/* eslint-disable react/prop-types */
import StyledTaskHeader from "./StyledTaskHeader";
import Header from "./Header";
import PriorityIndicator from "../TaskCard/PriorityIndicator.styled";
import { FlexContainer } from "../../App.styles";

// const setPriorityColor = (priority) => {
//   let color =
//     priority <= 4
//       ? "var(--clr-sky-blue)"
//       : priority <= 7
//       ? "var(--clr-bright-orange)"
//       : "var(--clr-red-orange)";
//   return color;
// };

const TaskHeader = ({ text }) => {
  return (
    <StyledTaskHeader>
      <FlexContainer gap="10px">
        <PriorityIndicator />
        <Header text={text} />
      </FlexContainer>
    </StyledTaskHeader>
  );
};

export default TaskHeader;
