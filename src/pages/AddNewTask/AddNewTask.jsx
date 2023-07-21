/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { uid } from "uid";
import StyledAddNewTask from "./AddNewTask.styled";
import { TaskContext } from "src/contexts/TaskContext";
import {
  Input,
  Button,
  Icon,
  PageHeader,
  LevelSelector,
  Subtask,
} from "src/components";
import { Main, FlexContainer } from "src/App.styles";

const AddNewTask = () => {
  const navigate = useNavigate();

  const getInitialInputValue = (value, isLevelType) => {
    if (!task) {
      return isLevelType ? 0 : "";
    } else {
      return value;
    }
  };

  const task = tasks.find((task) => task.id === id);

  const { addTask, tasks, editTask, deleteSubtask } = useContext(TaskContext);
  const { id } = useParams();
  const [subtasks, setSubtasks] = useState([]);
  const [isEditing, setIsEditing] = useState("");
  const [editedSubtasks, setEditedSubtasks] = useState([]);
  const [inputValue, setInputValue] = useState({
    taskName: getInitialInputValue(task.taskName),
    tags: getInitialInputValue(task.tags),
    dueDate: getInitialInputValue(task.dueDate),
    time: getInitialInputValue(task.time),
    subtask: "",
  });

  const [taskLevel, setTaskLevel] = useState({
    complexity: getInitialInputValue(task.complexity, true),
    priority: getInitialInputValue(task.priority, true),
  });

  const handleChange = ({ target: { name, value } }) => {
    setInputValue((prevState) => ({
      ...prevState,
      [name]: name === "tags" ? value.replace(" ", ",").split(",") : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      const combinedSubtasks = [...task.subtasks, ...editedSubtasks];
      editTask(
        id,
        inputValue.taskName,
        taskLevel.complexity,
        taskLevel.priority,
        combinedSubtasks,
        inputValue.tags,
        inputValue.dueDate,
        inputValue.time
      );
      setIsEditing("");
    } else {
      addTask(
        inputValue.taskName,
        taskLevel.complexity,
        taskLevel.priority,
        subtasks,
        inputValue.tags,
        inputValue.dueDate,
        inputValue.time
      );
    }
    navigate("/");
  };

  const handleSubtasks = () => {
    if (inputValue.subtask.trim() !== "") {
      const subtask = {
        id: uid(),
        subtask: inputValue.subtask,
        complete: false,
      };

      setSubtasks((prevState) => [...prevState, subtask]);
      setInputValue((prevState) => ({
        ...prevState,
        subtask: "",
      }));
    }
  };

  const handleEditedSubtasks = () => {
    if (inputValue.subtask.trim() !== "") {
      const newSubtask = {
        id: uid(),
        subtask: inputValue.subtask,
        complete: false,
      };

      setEditedSubtasks((prevState) => [...prevState, newSubtask]);
      setInputValue((prevState) => ({
        ...prevState,
        subtask: "",
      }));
    }
  };

  const removeSubtask = (task) => {
    setSubtasks(subtasks.filter((t) => t !== task));
  };

  const removeEditedSubtask = (task) => {
    setEditedSubtasks(editedSubtasks.filter((t) => t !== task));
  };

  const handleIsEditing = (name) => {
    setIsEditing(name);
  };

  const handleTaskLevel =
    (levelType) =>
    ({ target: { innerText } }) => {
      setTaskLevel((prevState) => ({
        ...prevState,
        [levelType]: Number(innerText),
      }));
      handleIsEditing(levelType);
    };

  const getInputValue = (inputName, levelType) => {
    if (isEditing === inputName || (levelType && taskLevel[levelType] !== 0)) {
      return levelType ? taskLevel[levelType] : inputValue[inputName];
    } else {
      return levelType ? task[levelType] : task[inputName];
    }
  };

  return (
    <Main>
      <StyledAddNewTask onSubmit={handleSubmit}>
        <PageHeader
          text={!task ? "Add New Task" : `Editing ${task.taskName}`}
        />
        <section>
          <Input
            label="Task Name"
            id="taskName"
            value={getInputValue("taskName")}
            placeholder="Task 1..."
            required={true}
            onChange={handleChange}
            onClick={!task ? null : () => handleIsEditing("taskName")}
          />
        </section>

        <section>
          <LevelSelector
            text="Select Complexity Level"
            onClick={handleTaskLevel("complexity")}
            active={getInputValue(null, "complexity")}
          />
          <LevelSelector
            text="Select Priority Level"
            onClick={handleTaskLevel("priority")}
            active={getInputValue(null, "priority")}
          />
        </section>

        <section>
          <FlexContainer gap="30px">
            <div>
              <Input
                label="Due Date"
                id="dueDate"
                type="date"
                value={getInputValue("dueDate")}
                onChange={handleChange}
                onClick={!task ? null : () => handleIsEditing("dueDate")}
              />
            </div>

            <div>
              <Input
                label="Select Time"
                id="time"
                type="time"
                value={getInputValue("time")}
                onChange={handleChange}
                onClick={!task ? null : () => handleIsEditing("time")}
              />
            </div>
          </FlexContainer>
        </section>

        <section>
          <label htmlFor="subtask">Add Checklist For Subtasks</label>
          {!task && (
            <>
              <ul>
                {subtasks.map((subtask, index) => (
                  <Subtask
                    key={subtask.id}
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
                <Button variant="round" onClick={handleSubtasks}>
                  <Icon type="plus" />
                </Button>
              </FlexContainer>
            </>
          )}
          {task && (
            <>
              <ul>
                {task.subtasks.map((subtask) => (
                  <Subtask
                    key={subtask.id}
                    text={subtask.subtask}
                    iconType="cross"
                    remove
                    onButtonClick={() => deleteSubtask(id, subtask.id)}
                  />
                ))}

                {editedSubtasks.map((subtask, index) => (
                  <Subtask
                    key={subtask.id}
                    text={`${index + 1}. ${subtask.subtask}`}
                    iconType="cross"
                    remove
                    onButtonClick={() => removeEditedSubtask(subtask)}
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
                <Button variant="round" onClick={handleEditedSubtasks}>
                  <Icon type="plus" />
                </Button>
              </FlexContainer>
            </>
          )}
        </section>

        <section>
          <Input
            label="Add Tags"
            id="tags"
            value={getInputValue("tags")}
            placeholder="School, Career, Routine"
            onChange={handleChange}
            onClick={!task ? null : () => handleIsEditing("tags")}
          />
        </section>

        <Button type="submit" lrg width="50%">
          {!task ? "Add Task" : "Edit Task"}
        </Button>
      </StyledAddNewTask>
    </Main>
  );
};

export default AddNewTask;
