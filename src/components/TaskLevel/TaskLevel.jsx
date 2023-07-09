/* eslint-disable react/prop-types */
import { uid } from "uid";
import Header from "src/components/Header/Header";
import Button from "src/components/Button/Button";
import { FlexContainer } from "src/App.styles";

const generateLevelButtons = (n, active, onClick) => {
  return Array(n)
    .fill()
    .map((_, i) => (
      <Button
        key={uid()}
        variant="round"
        sml
        style={
          i + 1 === active
            ? { backgroundColor: "var(--clr-sky-blue)" }
            : undefined
        }
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
