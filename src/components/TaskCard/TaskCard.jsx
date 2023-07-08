/* eslint-disable react/prop-types */
import { uid } from "uid";
import StyledTaskCard from "./TaskCard.styled";
import PriorityIndicator from "./PriorityIndicator.styled";
import Header from "src/components/Header/Header";
import Icon from "src/components/Icon/Icon";
import Button from "src/components/Button/Button";
import { FlexContainer } from "src/App.styles";

const TaskCard = ({ taskName, dueDate, priority, complexity, time, tags }) => {
  const taskDetails = [
    {
      icon: "calendar",
      key: "Due Date:",
      value: `${dueDate}, ${time}`,
    },
    {
      icon: "arrowUp",
      key: "Priority:",
      value: `${
        priority <= 4 ? "Low" : priority <= 7 ? "Medium" : "High"
      } ${`(${priority}/10)`}`,
    },
    {
      icon: "arrowMove",
      key: "Complexity:",
      value: `${
        complexity <= 4 ? "Low" : complexity <= 7 ? "Medium" : "High"
      } ${`(${complexity}/10)`}`,
    },
  ];

  const createButton = (type) => {
    return (
      <Button variant="round">
        <Icon type={type} fontSize="1.3rem" />
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
          {createButton("edit")}
          {createButton("check")}
        </FlexContainer>
      </FlexContainer>

      {taskDetails.map((detail) => (
        <FlexContainer key={uid()} gap="6px" marginBottom="10px">
          <Icon type={detail.icon} fontSize="1.125rem" />
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
