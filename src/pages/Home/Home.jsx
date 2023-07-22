/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { uid } from "uid";
import { TaskContext } from "src/contexts/TaskContext";
import { formatTime } from "src/utils/formatTime";
import { formatDate } from "src/utils/formatDate";
import Button from "src/components/Button/Button";
import Icon from "src/components/Icon/Icon";
import SearchBar from "src/components/SearchBar/SearchBar";
import Select from "src/components/Select/Select";
import { sortOptions } from "src/components/Select/sortOptions";
import TaskCard from "src/components/Task/TaskCard/TaskCard";
import TaskHeader from "src/components/Task/TaskHeader/TaskHeader";
import TaskDetail from "src/components/Task/TaskDetail/TaskDetail";
import TaskTag from "src/components/Task/TaskTag/TaskTag.styled";
import ProgressBar from "src/components/ProgressBar/ProgressBar";
import { Main, GridContainer, FlexContainer } from "src/App.styles";

const Home = () => {
  const { tasks, setTasks, completeTask, handleSortOrder } =
    useContext(TaskContext);
  const [activeSort, setActiveSort] = useState(false);
  const [activeCategory, setActiveCategory] = useState(false);
  const [categoryOrder, setCategoryOrder] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const tags = tasks.flatMap((task) => task.tags).filter((tag) => tag !== "");
  const uniqueTags = [...new Set(tags)];

  let filteredTasks;
  filteredTasks = tasks.filter((task) => task.taskName.includes(searchValue));
  if (categoryOrder) {
    filteredTasks = tasks.filter((task) => task.tags.includes(categoryOrder));
  }

  const createHeaderButton = (type, onClick) => {
    return (
      <Button variant="round" onClick={onClick}>
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

  const handleSearchValue = ({ target: { value } }) => {
    setSearchValue(value);
  };

  const handleSortOptions = (index, e) => {
    setActiveSort(index);
    handleSortOrder(e);
  };

  const handleFilterCategory = ({ target: { id } }) => {
    setCategoryOrder(id);
  };

  const handleFilterTags = (index, e) => {
    setActiveCategory(index);
    handleFilterCategory(e);
  };

  useEffect(() => {
    const localStorageTasks = window.localStorage.getItem("tasks");
    if (localStorageTasks) {
      setTasks(JSON.parse(localStorageTasks));
    }
  }, []);

  return (
    <Main>
      <SearchBar value={searchValue} onChange={handleSearchValue} />

      <GridContainer>
        <Select
          name="Sort"
          options={sortOptions}
          isActive={activeSort}
          onClick={(e, index) => handleSortOptions(index, e)}
        />
        <Select
          name="Category"
          options={uniqueTags}
          isActive={activeCategory}
          onClick={(e, index) => handleFilterTags(index, e)}
        ></Select>
      </GridContainer>

      {filteredTasks.map((task) => (
        <TaskCard key={uid()} complete={task.isCompleted ? true : false}>
          <FlexContainer justify="space-between">
            <TaskHeader text={task.taskName} dueDate={task.dueDate} />

            <FlexContainer gap="15px" marginBottom="16px">
              <Link to={`/editTask/${task.id}`}>
                {createHeaderButton("edit")}
              </Link>
              {createHeaderButton("check", () => completeTask(task))}
            </FlexContainer>
          </FlexContainer>

          <TaskDetail
            dueDate={task.dueDate}
            icon="calendar"
            title="Due Date:"
            value={`${setDate(task.dueDate)}, ${setTime(task.time)}`}
          />

          <TaskDetail icon="arrowUp" title="Priority:" value={task.priority} />

          <TaskDetail
            icon="arrowMove"
            title="Complexity:"
            value={task.complexity}
          />

          <ProgressBar
            warningColor={task.dueDate}
            round
            total={task.subtasks.length}
            completed={
              task.subtasks.filter((subtask) => subtask.complete).length
            }
          />

          <FlexContainer gap="8px">
            {task.tags !== "" &&
              task.tags.map((tag, index) => (
                <TaskTag key={index}>{tag}</TaskTag>
              ))}
          </FlexContainer>

          <Link key={uid()} to={`/task/${task.id}`}>
            <small>Task Details</small>
          </Link>
        </TaskCard>
      ))}

      <Link to="/addNewTask">
        <Button lrg width="50%" gap="13px">
          <Icon type="plus" />
          Add New Task
        </Button>
      </Link>
    </Main>
  );
};

export default Home;
