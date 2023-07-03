/* eslint-disable react/prop-types */
import Header from "../Header/Header";
import Button from "../Button/Button.styled";
import { FlexContainer } from "../../App.styles";

const generateLevelButtons = (n, active, onClick) => {
  return Array(n)
    .fill()
    .map((_, i) => (
      <Button
        key={Math.random()}
        style={
          i + 1 === active
            ? { backgroundColor: "var(--clr-sky-blue)" }
            : undefined
        }
        round
        sml
        type="button"
        onClick={onClick}
      >
        {i + 1}
      </Button>
    ));
};

const TaskLevel = ({ text, active, onClick }) => {
  return (
    <section>
      <Header text={text} />
      <FlexContainer gap="11px">
        {generateLevelButtons(10, active, onClick)}
      </FlexContainer>
    </section>
  );
};

export default TaskLevel;
