/* eslint-disable react/prop-types */
import { useState, useContext, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { uid } from "uid";
import { motion } from "framer-motion";
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
  const [activeSort, setActiveSort] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categoryOrder, setCategoryOrder] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [powerMode, setPowerMode] = useState(false);

  // Filtered Tags
  const tags = tasks.flatMap((task) => task.tags).filter((tag) => tag !== "");

  // Filtered Power Mode
  const completedTasks = tasks.filter((task) => !task.isCompleted);
  const powerModeNumbers = completedTasks.map(
    (task) => task.complexity + task.priority
  );
  const largestPowerModeNumber = Math.max.apply(null, powerModeNumbers);

  // Set Filtered Tasks
  let filteredTasks;
  filteredTasks = tasks.filter((task) => task.taskName.includes(searchValue));
  if (categoryOrder && activeCategory !== null) {
    filteredTasks = tasks.filter((task) => task.tags.includes(categoryOrder));
  }
  if (powerMode) {
    filteredTasks = tasks.filter(
      (task) => task.complexity + task.priority === largestPowerModeNumber
    );
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

  const handlePowerMode = () => {
    setPowerMode((prevState) => !prevState);
  };

  const handleSearchValue = useCallback(({ target: { value } }) => {
    setSearchValue(value);
  }, []);

  const handleSortOptions = useCallback(
    (index, e) => {
      setActiveSort(index);
      handleSortOrder(e);
    },
    [handleSortOrder]
  );

  const handleFilterCategory = useCallback(({ target: { id } }) => {
    setCategoryOrder(id);
  }, []);

  const handleFilterTags = useCallback(
    (index, e) => {
      if (activeCategory === index) {
        setActiveCategory(null);
      } else {
        setActiveCategory(index);
      }
      handleFilterCategory(e);
    },
    [activeCategory, handleFilterCategory]
  );

  useEffect(() => {
    const localStorageTasks = window.localStorage.getItem("tasks");
    if (localStorageTasks) {
      setTasks(JSON.parse(localStorageTasks));
    }
  }, [setTasks]);

  return (
    <Main>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
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
            options={tags}
            isActive={activeCategory}
            onClick={(e, index) => handleFilterTags(index, e)}
          ></Select>
        </GridContainer>

        <Button lrg width="100%" gap="15px" onClick={() => handlePowerMode()}>
          {powerMode ? <Icon type="powerOff" /> : <Icon type="powerOn" />}
          {powerMode ? "Power Mode Off" : "Power Mode On"}
        </Button>

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

            <ProgressBar
              warningColor={task.dueDate}
              round
              total={task.subtasks.length}
              completed={
                task.subtasks.filter((subtask) => subtask.complete).length
              }
            />

            <FlexContainer gap="8px">
              {/* {task.tags.map((tag, index) => (
              <TaskTag key={index}>{tag}</TaskTag>
            ))} */}
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
      </motion.div>
    </Main>
  );
};

export default Home;
