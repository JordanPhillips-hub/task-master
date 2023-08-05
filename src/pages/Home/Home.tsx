import { useState, useEffect, useCallback, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { uid } from "uid";
import { motion } from "framer-motion";
import { useTask } from "../../contexts/TaskContext/TaskContext";
import { Task } from "../../contexts/TaskContext/Types";
import { formatTime } from "../../utils/formatTime";
import { formatDate } from "../../utils/formatDate";
import Button from "../../components/Button/Button";
import Icon from "../../components/Icon/Icon";
import SearchBar from "../../components/SearchBar/SearchBar";
import Select from "../../components/Select/Select";
import { sortOptions } from "../../components/Select/sortOptions";
import TaskCard from "../../components/Task/TaskCard/TaskCard";
import TaskHeader from "../../components/Task/TaskHeader/TaskHeader";
import TaskDetail from "../../components/Task/TaskDetail/TaskDetail";
import TaskTag from "../../components/Task/TaskTag/TaskTag.styled";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { Main, GridContainer, FlexContainer } from "../../App.styles";

const Home = () => {
  const { tasks, setTasks, completeTask, handleSortOrder } = useTask();
  const [searchValue, setSearchValue] = useState<string>("");
  const [activeSort, setActiveSort] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [categoryOrder, setCategoryOrder] = useState<string | null>(null);
  const [powerMode, setPowerMode] = useState<boolean>(false);

  // Filtered Tags
  const tags = tasks
    .flatMap((task: { tags: string[] }) => task.tags)
    .filter((tag: string) => tag !== "");

  // Filtered Power Mode
  const completedTasks = tasks.filter(
    (task: { isCompleted: boolean }) => !task.isCompleted
  );
  const powerModeNumbers = completedTasks.map(
    (task: { complexity: number; priority: number }) =>
      task.complexity + task.priority
  );
  const largestPowerModeNumber = Math.max.apply(null, powerModeNumbers);

  // Set Filtered Tasks
  let filteredTasks;
  filteredTasks = tasks.filter((task: { taskName: string }) =>
    task.taskName.includes(searchValue)
  );
  if (categoryOrder && activeCategory !== null) {
    filteredTasks = tasks.filter((task: { tags: string[] }) =>
      task.tags.includes(categoryOrder)
    );
  }
  if (powerMode) {
    filteredTasks = tasks.filter(
      (task: { complexity: number; priority: number }) =>
        task.complexity + task.priority === largestPowerModeNumber
    );
  }

  const createTaskHeaderButton = (type: string, onClick: () => void) => {
    return (
      <Button variant="round" onClick={onClick}>
        <Icon type={type} fontSize="1.3rem" />
      </Button>
    );
  };

  const setDate = (date: string) => {
    return date ? formatDate(date) : "No Set Date";
  };

  const setTime = (time: string) => {
    return time ? formatTime(time) : "";
  };

  const handlePowerMode = () => {
    setPowerMode((prevState) => !prevState);
  };

  const handleSearchValue = useCallback(
    ({ target: { value } }: { target: { value: string } }) => {
      setSearchValue(value);
    },
    []
  );

  const handleSortOptions = useCallback(
    (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
      setActiveSort(index);
      handleSortOrder(e);
    },
    [handleSortOrder]
  );

  const handleFilterCategory = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setCategoryOrder(e.currentTarget.id);
    },
    []
  );

  const handleFilterTags = useCallback(
    (
      index: SetStateAction<number | null>,
      e: React.MouseEvent<HTMLButtonElement>
    ) => {
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

        <Button lrg width="100%" gap="15px" onClick={handlePowerMode}>
          {powerMode ? <Icon type="powerOff" /> : <Icon type="powerOn" />}
          {powerMode ? "Power Mode Off" : "Power Mode On"}
        </Button>

        {filteredTasks.map((task: Task) => (
          <TaskCard key={task.id} complete={task.isCompleted ? true : false}>
            <FlexContainer justify="space-between">
              <TaskHeader
                text={task.taskName}
                dueDate={task.dueDate}
                warningColor={task.dueDate}
              />

              <FlexContainer gap="15px" marginBottom="16px">
                <Link to={`/editTask/${task.id}`}>
                  {createTaskHeaderButton("edit", () => null)}
                </Link>
                {createTaskHeaderButton("check", () => completeTask(task))}
              </FlexContainer>
            </FlexContainer>

            <TaskDetail
              dueDate={task.dueDate}
              icon="calendar"
              title="Due Date:"
              value={`${setDate(task.dueDate)}, ${setTime(task.time)}`}
              warningColor={task.dueDate}
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
              round
              total={task.subtasks.length}
              warningColor={task.dueDate ?? ""}
              completed={
                task.subtasks.filter((subtask) => subtask.complete).length
              }
            />

            <FlexContainer gap="8px">
              {task.tags.length > 0
                ? task.tags.map((tag, index) => (
                    <TaskTag key={index}>{tag}</TaskTag>
                  ))
                : null}
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
