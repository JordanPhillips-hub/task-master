/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import StyledAddNewTask from "./AddNewTask.styled";
import { TaskContext } from "src/contexts/TaskContext";
import Input from "src/components/Input/Input";
import Button from "src/components/Button/Button";
import Icon from "src/components/Icon/Icon";
import PageHeader from "src/components/PageHeader/PageHeader";
import LevelSelector from "src/components/LevelSelector/LevelSelector";
import Subtask from "src/components/Subtask/Subtask";
import { Main, FlexContainer } from "src/App.styles";

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
    addTask(
      inputValue.taskName,
      taskLevel.complexity,
      taskLevel.priority,
      subtasks,
      inputValue.tags,
      inputValue.dueDate,
      inputValue.time
    );
  };

  const handleSubtasks = () => {
    const subtask = {
      id: uid(),
      subtask: inputValue.subtask,
      complete: false,
    };

    const subtaskList = [...subtasks, subtask];
    inputValue.subtask !== "" ? setSubtasks(subtaskList) : null;
    setInputValue((prevState) => ({
      ...prevState,
      subtask: "",
    }));
  };

  const removeSubtask = (task) => {
    setSubtasks(subtasks.filter((t) => t !== task));
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
        <PageHeader text="Add New Task" />
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
          <LevelSelector
            text="Select Complexity Level"
            onClick={handleTaskLevel("complexity")}
            active={taskLevel.complexity}
          />
          <LevelSelector
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
              <Subtask
                key={uid()}
                text={`${index + 1}. ${subtask.subtask}`}
                iconType="cross"
                remove
                onButtonClick={() => removeSubtask(subtask)}
              />
            ))}
          </ul>

          <FlexContainer>
            <Input
              id="subtask"
              value={inputValue.subtask}
              placeholder="Add New Subtask..."
              onChange={handleChange}
            />
            <Button
              variant="round"
              onClick={inputValue.subtask !== "" ? handleSubtasks : null}
            >
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
