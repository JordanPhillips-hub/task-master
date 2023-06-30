/* eslint-disable react/prop-types */
import React from "react";
import { CiEdit, CiCalendarDate } from "react-icons/ci";
import { BiCheck } from "react-icons/bi";
import { BsArrowUpShort, BsArrowsMove } from "react-icons/bs";
import StyledTaskCard from "./TaskCard.styled";
import PriorityIndicator from "./PriorityIndicator.styled";
import Header from "../Header/Header";
import Button from "../Button/Button.styled";
import { FlexContainer } from "../../App.styles";

const TaskCard = ({ taskName, dueDate, priority, complexity, time, tags }) => {
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

  const setPriorityColor = (priority) => {
    let color =
      priority <= 4
        ? "var(--clr-sky-blue)"
        : priority <= 7
        ? "var(--clr-bright-orange)"
        : "var(--clr-red-orange)";
    return color;
  };

  return (
    <StyledTaskCard priorityColor={setPriorityColor(priority)}>
      <FlexContainer justify="space-between" marginBottom="10px">
        <FlexContainer gap="10px">
          <PriorityIndicator priorityColor={setPriorityColor(priority)} />
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
            {detail.key}{" "}
            <span className={detail.key === "Due Date:" ? "dueDate" : ""}>
              {detail.value}
            </span>
          </p>
        </FlexContainer>
      ))}
      <div>{tags}</div>
    </StyledTaskCard>
  );
};

export default TaskCard;
