/* eslint-disable react/prop-types */
import React from "react";
import { CiEdit, CiCalendarDate } from "react-icons/ci";
import { BiCheck } from "react-icons/bi";
import { BsArrowUpShort, BsArrowsMove } from "react-icons/bs";
import StyledTaskCard from "./TaskCard.styled";
import Header from "../Header/Header";
import Button from "../Button/Button";
import { FlexContainer } from "../../App.styles";
import LevelIndicator from "./LevelIndicator.styled";

const TaskCard = ({ taskName, dueDate, priority, complexity, time }) => {
  const taskDetails = [
    {
      icon: <CiCalendarDate />,
      key: "Due Date:",
      value: `${dueDate}, ${time}`,
    },
    {
      icon: <BsArrowUpShort />,
      key: "Priority:",
      value: `Medium ${`(${priority}/10)`}`,
    },
    {
      icon: <BsArrowsMove />,
      key: "Complexity:",
      value: `Medium ${`(${complexity}/10)`}`,
    },
  ];

  const createButton = (icon) => {
    return (
      <Button round>
        {React.cloneElement(icon, { className: "buttonIcon" })}
      </Button>
    );
  };

  return (
    <StyledTaskCard>
      <FlexContainer justify="space-between" marginBottom="10px">
        <FlexContainer gap="10px">
          <LevelIndicator />
          <Header text={taskName} />
        </FlexContainer>

        <FlexContainer gap="15px">
          {createButton(<CiEdit />)}
          {createButton(<BiCheck />)}
        </FlexContainer>
      </FlexContainer>

      {taskDetails.map((detail) => (
        <FlexContainer key={detail.key} gap="6px" marginBottom="10px">
          {React.cloneElement(detail.icon, { className: "detailsIcon" })}
          <p>
            {detail.key} <span>{detail.value}</span>
          </p>
        </FlexContainer>
      ))}
    </StyledTaskCard>
  );
};

export default TaskCard;
