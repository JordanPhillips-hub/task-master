/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { uid } from "uid";
import TaskDetail from "../../components/TaskDetail/TaskDetail";
import TaskHeader from "../../components/Header/TaskHeader";
import moment from "moment/moment";
import { TaskContext } from "src/contexts/TaskContext";
import SearchBar from "src/components/SearchBar/SearchBar";
import Select, { sortOptions } from "src/components/Select/Select";
import TaskCard from "src/components/TaskCard/TaskCard";
import Button from "src/components/Button/Button";
import Icon from "src/components/Icon/Icon";
import Tag from "src/components/TaskCard/Tag.styled";
import { Main, GridContainer, FlexContainer } from "src/App.styles";

const Home = () => {
  const { tasks } = useContext(TaskContext);
  const tags = tasks.flatMap((task) => task.tags).filter((tag) => tag !== "");

  const convertTimeFormat = (timeValue) => {
    let [hours, minutes] = timeValue.split(":");
    let period = "AM";
    if (hours > 12) {
      hours -= 12;
      period = "PM";
    }
    if (hours < 10) hours = Number(hours);
    timeValue = `${hours}:${minutes} ${period}`;
    return timeValue;
  };

  const createButton = (type) => {
    return (
      <Button variant="round">
        <Icon type={type} fontSize="1.3rem" />
      </Button>
    );
  };

  return (
    <Main>
      <SearchBar />

      <GridContainer>
        <Select name="Sort" options={sortOptions} />
        <Select name="Category" options={tags}></Select>
      </GridContainer>

      {tasks.map((task) => (
        <Link key={uid()} to={`/task/${task.id}`}>
          <TaskCard key={uid()}>
            <FlexContainer justify="space-between" marginBottom="10px">
              <TaskHeader text={task.taskName} />

              <FlexContainer gap="15px">
                {createButton("edit")}
                {createButton("check")}
              </FlexContainer>
            </FlexContainer>

            <TaskDetail
              icon="calendar"
              title="Due Date:"
              value={`${
                task.dueDate ? moment(task.dueDate).format("ll") : "No Set Date"
              }, ${task.time ? convertTimeFormat(task.time) : ""}`}
            />

            <TaskDetail
              icon="arrowUp"
              title="Priority:"
              value={task.priority}
            />

            <TaskDetail
              icon="arrowMove"
              title="Complexity:"
              value={task.complexity}
            />
            <FlexContainer gap="8px">
              {task.tags !== "" &&
                task.tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
            </FlexContainer>
          </TaskCard>
        </Link>
      ))}

      <Link to="/AddNewTask">
        <Button lrg width="50%" gap="13px">
          <Icon type="plus" />
          Add New Task
        </Button>
      </Link>
    </Main>
  );
};

export default Home;
