import React from "react";
import { useState, useEffect } from "react";
import { FlatProgressBar, RoundProgressBar } from "./ProgressBar.styled";
import Header from "../Header/Header";
import { setWarningColor } from "../Task/TaskWarning/TaskWarning.styled";
import { FlexContainer } from "../../App.styles";

type Props = {
  total: number;
  completed: number;
  round: boolean;
  warningColor: string;
};

const ProgressBar: React.FC<Props> = ({
  total,
  completed,
  round,
  warningColor,
}) => {
  const [progress, setProgress] = useState(0);
  const circleRad = 22;
  const circleCirc = 2 * Math.PI * circleRad;
  const offset = circleCirc - (progress / 100) * circleCirc;

  useEffect(() => {
    const calcProgress = () => {
      if (total === 0) {
        setProgress(0);
      } else {
        const percentage = (completed / total) * 100;
        setProgress(Math.floor(percentage));
      }
    };

    calcProgress();
  }, [total, completed]);

  {
    return round ? (
      <RoundProgressBar warningColor={setWarningColor(warningColor)}>
        <svg width="120" height="120">
          <circle
            className="progress-ring__background"
            strokeWidth="4"
            fill="transparent"
            r={circleRad}
            cx="60"
            cy="60"
          ></circle>
          <circle
            className="progress-ring__circle"
            strokeWidth="4"
            fill="transparent"
            r={circleRad}
            cx="60"
            cy="60"
            style={{
              strokeDasharray: circleCirc,
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
