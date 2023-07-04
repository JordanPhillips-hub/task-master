/* eslint-disable react/prop-types */
import React from "react";
import StyledTaskCard from "./TaskCard.styled";
import PriorityIndicator from "./PriorityIndicator.styled";
import Header from "../Header/Header";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import { FlexContainer } from "../../App.styles";

const TaskCard = ({ taskName, dueDate, priority, complexity, time, tags }) => {
  const taskDetails = [
    {
      icon: <Icon type="calendar" />,
      key: "Due Date:",
      value: `${dueDate}, ${time}`,
    },
    {
      icon: <Icon type="arrowUp" />,
      key: "Priority:",
      value: `${
        priority <= 4 ? "Low" : priority <= 7 ? "Medium" : "High"
      } ${`(${priority}/10)`}`,
    },
    {
      icon: <Icon type="arrowMove" />,
      key: "Complexity:",
      value: `${
        complexity <= 4 ? "Low" : complexity <= 7 ? "Medium" : "High"
      } ${`(${complexity}/10)`}`,
    },
  ];

  const createButton = (icon) => {
    return (
      <Button variant="round">
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
          {createButton(<Icon type="edit" />)}
          {createButton(<Icon type="check" />)}
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
      <FlexContainer gap="8px">{tags}</FlexContainer>
    </StyledTaskCard>
  );
};

export default TaskCard;
