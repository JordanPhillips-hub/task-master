/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FlatProgressBar, RoundProgressBar } from "./ProgressBar.styled";
import Header from "src/components/Header/Header";
import { setWarningColor } from "src/components/Task/TaskWarning/TaskWarning.styled";
import { FlexContainer } from "src/App.styles";

const ProgressBar = ({ total, completed, round, warningColor }) => {
  const [progress, setProgress] = useState(0);
  const circleRadius = 22;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const offset = circleCircumference - (progress / 100) * circleCircumference;

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

  {
    return round ? (
      <RoundProgressBar warningColor={setWarningColor(warningColor)}>
        <svg className="progress-ring" width="120" height="120">
          <circle
            className="progress-ring__background"
            strokeWidth="4"
            fill="transparent"
            r={circleRadius}
            cx="60"
            cy="60"
          ></circle>
          <circle
            className="progress-ring__circle"
            strokeWidth="4"
            fill="transparent"
            r={circleRadius}
            cx="60"
            cy="60"
            style={{
              strokeDasharray: circleCircumference,
              strokeDashoffset: offset,
            }}
          ></circle>
          <text
            className="progress-ring__text"
            x="50%"
            y="50%"
            dy=".3em"
            textAnchor="middle"
          >
            {progress}%
          </text>
        </svg>
      </RoundProgressBar>
    ) : (
      <>
        <FlexContainer justify="space-between">
          <Header text="Task Completed" />
          <div>{progress}%</div>
        </FlexContainer>
        <FlatProgressBar warningColor={setWarningColor(warningColor)}>
          <div style={{ width: `${progress}%` }}></div>
        </FlatProgressBar>
      </>
    );
  }
};

export default ProgressBar;
