/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import StyledProgressBar from "./ProgressBar.styled";
import Header from "src/components/Header/Header";
import { FlexContainer } from "src/App.styles";

const ProgressBar = ({ subtasks, subtasksComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      if (subtasks.length === 0) {
        setProgress(0);
      } else {
        const percentage = (subtasksComplete / subtasks.length) * 100;
        setProgress(Math.floor(percentage));
      }
    };

    calculateProgress();
  }, [subtasks, subtasksComplete]);

  console.log(typeof subtasksComplete);

  return (
    <>
      <FlexContainer justify="space-between">
        <Header text="Task Completed" />
        <div>{progress}%</div>
      </FlexContainer>
      <StyledProgressBar>
        <div style={{ width: `${progress}%` }}></div>
      </StyledProgressBar>
    </>
  );
};

export default ProgressBar;
