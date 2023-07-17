/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import StyledProgressBar from "./ProgressBar.styled";
import Header from "src/components/Header/Header";
import { FlexContainer } from "src/App.styles";

const ProgressBar = ({ total, completed }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      if (total === 0) {
        setProgress(0);
      } else {
        const percentage = (completed / total) * 100;
        setProgress(Math.floor(percentage));
      }
    };

    calculateProgress();
  }, [total, completed]);

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
