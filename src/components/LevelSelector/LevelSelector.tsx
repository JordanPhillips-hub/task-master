import React from "react";
import { uid } from "uid";
import Header from "../Header/Header";
import Button from "../Button/Button";
import { FlexContainer } from "../../App.styles";

type Props = {
  text: string;
  active: number;
  onClick:
    | (({ target: { innerText } }: { target: { innerText: string } }) => void)
    | undefined;
};

const generateLevelButtons = (
  n: number,
  active: number,
  onClick: Props["onClick"]
) => {
  return Array(n)
    .fill(null)
    .map((_, i) => (
      <Button
        key={uid()}
        variant="round"
        sml
        style={
          i + 1 === active
            ? {
                backgroundColor: "var(--primary-100)",
                color: "var(--neutral-100)",
              }
            : undefined
        }
        onClick={onClick}
      >
        {i + 1}
      </Button>
    ));
};

const LevelSelector: React.FC<Props> = ({ text, active, onClick }) => {
  return (
    <section>
      <Header text={text} />
      <FlexContainer gap="11px">
        {generateLevelButtons(10, active, onClick)}
      </FlexContainer>
    </section>
  );
};

export default LevelSelector;
