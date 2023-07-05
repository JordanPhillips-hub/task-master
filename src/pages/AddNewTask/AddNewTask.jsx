/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TaskContext } from "../../contexts/TaskContext";
import StyledAddNewTask from "./AddNewTask.styled";
import Icon from "../../components/Icon/Icon";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Header from "../../components/Header/Header";
import TaskLevel from "../../components/TaskLevel/TaskLevel";
import Subtask from "../../components/Subtask/Subtask";
import { Main, FlexContainer } from "../../App.styles";

const AddNewTask = () => {
  const navigate = useNavigate();
  const { addTask } = useContext(TaskContext);
  const [subtasks, setSubtasks] = useState([]);
  const [inputValue, setInputValue] = useState({
    taskName: "",
    subtask: "",
    tags: "",
    dueDate: "",
    time: "",
  });

  const [taskLevel, setTaskLevel] = useState({
    complexity: 0,
    priority: 0,
  });

  const handleChange = ({ target: { name, value } }) => {
    setInputValue((prevState) => ({
      ...prevState,
      [name]: name === "tags" ? value.replace(" ", ",").split(",") : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");

    const task = {
      id: `${Math.random()}`,
      taskName: inputValue.taskName,
      complexity: taskLevel.complexity,
      priority: taskLevel.priority,
      subtasks: subtasks,
      tags: inputValue.tags,
      dueDate: inputValue.dueDate,
      time: inputValue.time,
      completed: false,
    };

    addTask(task);
  };

  const handleSubtasks = () => {
    const subtask = {
      id: Math.random(),
      subtask: inputValue.subtask,
    };

    const subtaskList = [...subtasks, subtask];
    inputValue.subtask !== "" ? setSubtasks(subtaskList) : null;
    setInputValue((prevState) => ({
      ...prevState,
      subtask: "",
    }));
  };

  const handleRemoveSubtask = (subtask) => {
    const index = subtasks.indexOf(subtask);
    const removedTask = subtasks.splice(index, 1);
    const newTaskList = subtasks.filter((task) => task !== removedTask);
    setSubtasks(newTaskList);
  };

  const handleTaskLevel =
    (levelType) =>
    ({ target: { innerText } }) => {
      setTaskLevel((prevState) => ({
        ...prevState,
        [levelType]: Number(innerText),
      }));
    };

  return (
    <Main>
      <StyledAddNewTask onSubmit={handleSubmit}>
        <FlexContainer>
          <Link to="/">
            <Button variant="round" light>
              <Icon type="arrowLeft" />
            </Button>
          </Link>

          <Header lrg text="Add New Task" />
        </FlexContainer>

        <section>
          <Input
            label="Add Task"
            id="taskName"
            value={inputValue.taskName}
            placeholder="Task 1..."
            onChange={handleChange}
          />
        </section>

        <section>
          <TaskLevel
            text="Select Complexity Level"
            onClick={handleTaskLevel("complexity")}
            active={taskLevel.complexity}
          />
          <TaskLevel
            text="Select Priority Level"
            onClick={handleTaskLevel("priority")}
            active={taskLevel.priority}
          />
        </section>

        <section>
          <FlexContainer gap="30px">
            <div>
              <Input
                label="Due Date"
                id="dueDate"
                type="date"
                value={inputValue.dueDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <Input
                label="Select Time"
                id="time"
                type="time"
                value={inputValue.time}
                onChange={handleChange}
              />
            </div>
          </FlexContainer>
        </section>

        <section>
          <label htmlFor="subtask">Add Checklist For Subtasks</label>
          <ul>
            {subtasks.map((subtask, index) => (
              <li key={index}>
                <FlexContainer>
                  <Subtask text={`${index + 1}. ${subtask.subtask}`} />
                  <Button
                    variant="round"
                    remove
                    onClick={() => handleRemoveSubtask(subtask)}
                  >
                    <Icon type="cross" />
                  </Button>
                </FlexContainer>
              </li>
            ))}
          </ul>

          <FlexContainer>
            <Input
              id="subtask"
              value={inputValue.subtask}
              placeholder="Add New Subtask..."
              onChange={handleChange}
            />
            <Button variant="round" onClick={handleSubtasks}>
              <Icon type="plus" />
            </Button>
          </FlexContainer>
        </section>

        <section>
          <Input
            label="Add Tags"
            id="tags"
            value={inputValue.tags}
            placeholder="School, Career, Routine"
            onChange={handleChange}
          />
        </section>

        <Button lrg width="50%" type="submit">
          Add Task
        </Button>
      </StyledAddNewTask>
    </Main>
  );
};

export default AddNewTask;
