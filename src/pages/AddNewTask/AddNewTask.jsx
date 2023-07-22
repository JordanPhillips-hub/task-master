/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { uid } from "uid";
import StyledAddNewTask from "./AddNewTask.styled";
import { TaskContext } from "src/contexts/TaskContext";
import Input from "src/components/Input/Input";
import Button from "src/components/Button/Button";
import PageHeader from "src/components/PageHeader/PageHeader";
import LevelSelector from "src/components/LevelSelector/LevelSelector";
import Subtask from "src/components/Subtask/Subtask";
import Icon from "src/components/Icon/Icon";
import { Main, FlexContainer } from "src/App.styles";

const AddNewTask = () => {
  const navigate = useNavigate();

  const { addTask, tasks, editTask, deleteSubtask } = useContext(TaskContext);
  const { id } = useParams();
  const task = tasks.find((task) => task.id === id);

  const [subtasks, setSubtasks] = useState([]);
  const [isEditing, setIsEditing] = useState("");
  const [editedSubtasks, setEditedSubtasks] = useState([]);

  const getInputValue = (inputName) => {
    if (!task || isEditing === inputName || inputValue[inputName] !== "") {
      return inputValue[inputName];
    } else {
      return task[inputName];
    }
  };

  const getLevelValue = (levelType) => {
    if (!task || isEditing === levelType || taskLevel[levelType] !== 0) {
      return taskLevel[levelType];
    } else {
      return task[levelType];
    }
  };

  const getInitialInputValue = (value, isLevelType) => {
    if (!task) {
      return isLevelType ? 0 : "";
    } else {
      return task[value];
    }
  };

  const [inputValue, setInputValue] = useState({
    taskName: getInitialInputValue("taskName"),
    tags: getInitialInputValue("tags"),
    dueDate: getInitialInputValue("dueDate"),
    time: getInitialInputValue("time"),
    subtask: "",
  });

  const [taskLevel, setTaskLevel] = useState({
    complexity: getInitialInputValue("complexity", true),
    priority: getInitialInputValue("priority", true),
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

  const handleSubtasks = (isEditing) => {
    if (inputValue.subtask.trim() !== "") {
      const newSubtask = {
        id: uid(),
        subtask: inputValue.subtask,
        complete: false,
      };

      if (isEditing) {
        setEditedSubtasks((prevState) => [...prevState, newSubtask]);
      } else {
        setSubtasks((prevState) => [...prevState, newSubtask]);
      }

      setInputValue((prevState) => ({
        ...prevState,
        subtask: "",
      }));
    }
  };

  const removeSubtask = (task, arr) => {
    const array = arr.filter((t) => t !== task);
    arr === subtasks ? setSubtasks(array) : setEditedSubtasks(array);
  };

  const handleIsEditing = (name) => {
    return !task ? null : () => setIsEditing(name);
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
            onClick={handleIsEditing("taskName", "input")}
          />
        </section>

        <section>
          <LevelSelector
            text="Select Complexity Level"
            onClick={handleTaskLevel("complexity")}
            active={getLevelValue("complexity")}
          />
          <LevelSelector
            text="Select Priority Level"
            onClick={handleTaskLevel("priority")}
            active={getLevelValue("priority")}
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
                onClick={handleIsEditing("dueDate")}
              />
            </div>

            <div>
              <Input
                label="Select Time"
                id="time"
                type="time"
                value={getInputValue("time")}
                onChange={handleChange}
                onClick={handleIsEditing("time")}
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
                    onButtonClick={() => removeSubtask(subtask, subtasks)}
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
                <Button variant="round" onClick={() => handleSubtasks(false)}>
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
                    onButtonClick={() => removeSubtask(subtask, editedSubtasks)}
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
                <Button variant="round" onClick={() => handleSubtasks(true)}>
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
            onClick={handleIsEditing("tags")}
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
