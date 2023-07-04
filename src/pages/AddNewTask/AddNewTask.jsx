/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { TaskContext } from "../../TaskContext";
import StyledAddNewTask from "./AddNewTask.styled";
import Button from "../../components/Button/Button.styled";
import Input from "../../components/Input/Input.styled";
import Header from "../../components/Header/Header";
import TaskLevel from "../../components/TaskLevel/TaskLevel";
import { Main, FlexContainer, InputContainer } from "../../App.styles";

const AddNewTask = () => {
  const navigate = useNavigate();
  const { addTask } = useContext(TaskContext);
  const [subtasks, setSubtasks] = useState([]);
  const [activeComplexityButton, setActiveComplexityButton] = useState(null);
  const [activePriorityButton, setActivePriorityButton] = useState(null);
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
      subtask: inputValue.subtask,
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

      if (levelType === "complexity") {
        setActiveComplexityButton(Number(innerText));
      }

      if (levelType === "priority") {
        setActivePriorityButton(Number(innerText));
      }
    };

  return (
    <Main>
      <StyledAddNewTask onSubmit={handleSubmit}>
        <FlexContainer>
          <Link to="/">
            <Button round back light type="button">
              <BsArrowLeftShort fontSize="1.5rem" />
            </Button>
          </Link>

          <Header lrg text="Add New Task" />
        </FlexContainer>

        <section>
          <label htmlFor="taskName">Add Task</label>
          <Input
            id="taskName"
            type="text"
            name="taskName"
            value={inputValue.taskName}
            placeholder="Task 1..."
            onChange={handleChange}
          />
        </section>

        <section>
          <TaskLevel
            text="Select Complexity Level"
            onClick={handleTaskLevel("complexity")}
            active={activeComplexityButton}
          />
          <TaskLevel
            text="Select Priority Level"
            onClick={handleTaskLevel("priority")}
            active={activePriorityButton}
          />
        </section>

        <section>
          <FlexContainer gap="30px">
            <div>
              <label htmlFor="dueDate">Due Date</label>
              <Input
                id="dueDate"
                type="date"
                name="dueDate"
                value={inputValue.dueDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="time">Select Time</label>
              <Input
                id="time"
                type="time"
                name="time"
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
                <InputContainer>
                  <Input
                    id={index}
                    type="text"
                    value={`${index + 1}. ${subtask.subtask}`}
                    disabled
                  />
                  <Button
                    round
                    remove
                    type="button"
                    onClick={() => handleRemoveSubtask(subtask)}
                  >
                    <RxCross2 fontSize="1.5rem" />
                  </Button>
                </InputContainer>
              </li>
            ))}
          </ul>

          <InputContainer>
            <Input
              id="subtask"
              type="text"
              name="subtask"
              value={inputValue.subtask}
              placeholder="Add New Subtask..."
              onChange={handleChange}
            />
            <Button round type="button" onClick={handleSubtasks}>
              <AiOutlinePlus fontSize="1.5rem" />
            </Button>
          </InputContainer>
        </section>

        <section>
          <label htmlFor="tags">Add Tags</label>
          <Input
            id="tags"
            type="text"
            name="tags"
            value={inputValue.tags}
            placeholder="School, Career, Routine"
            onChange={handleChange}
          />
        </section>

        <Button dark lrg width="50%" type="submit">
          Add Task
        </Button>
      </StyledAddNewTask>
    </Main>
  );
};

export default AddNewTask;
