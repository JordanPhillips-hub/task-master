/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { uid } from "uid";
import { TaskContext } from "src/contexts/TaskContext";
import { formatTime } from "src/utils/formatTime";
import { formatDate } from "src/utils/formatDate";
import Button from "src/components/Button/Button";
import Icon from "src/components/Icon/Icon";
import SearchBar from "src/components/SearchBar/SearchBar";
import Select from "src/components/Select/Select";
import { selectOptions } from "src/components/Select/selectOptions";
import TaskCard from "src/components/Task/TaskCard/TaskCard";
import TaskHeader from "src/components/Task/TaskHeader/TaskHeader";
import TaskDetail from "src/components/Task/TaskDetail/TaskDetail";
import TaskTag from "src/components/Task/TaskTag/TaskTag.styled";
import { Main, GridContainer, FlexContainer } from "src/App.styles";

const Home = () => {
  const { tasks } = useContext(TaskContext);
  const tags = tasks.flatMap((task) => task.tags).filter((tag) => tag !== "");

  const createHeaderButton = (type) => {
    return (
      <Button variant="round">
        <Icon type={type} fontSize="1.3rem" />
      </Button>
    );
  };

  const setDate = (date) => {
    return date ? formatDate(date) : "No Set Date";
  };

  const setTime = (time) => {
    return time ? formatTime(time) : "";
  };

  return (
    <Main>
      <SearchBar />

      <GridContainer>
        <Select name="Sort" options={selectOptions} />
        <Select name="Category" options={tags}></Select>
      </GridContainer>

      {tasks.map((task) => (
        <Link key={uid()} to={`/task/${task.id}`}>
          <TaskCard key={uid()}>
            <FlexContainer justify="space-between">
              <TaskHeader text={task.taskName} dueDate={task.dueDate} />

              <FlexContainer gap="15px" marginBottom="16px">
                {createHeaderButton("edit")}
                {createHeaderButton("check")}
              </FlexContainer>
            </FlexContainer>

            <TaskDetail
              dueDate={task.dueDate}
              icon="calendar"
              title="Due Date:"
              value={`${setDate(task.dueDate)}, ${setTime(task.time)}`}
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
                task.tags.map((tag, index) => (
                  <TaskTag key={index}>{tag}</TaskTag>
                ))}
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
