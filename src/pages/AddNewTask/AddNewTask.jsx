/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { uid } from "uid";
import StyledAddNewTask from "./AddNewTask.styled";
import { TaskContext } from "src/contexts/TaskContext";
import Input from "src/components/Input/Input";
import Button from "src/components/Button/Button";
import Icon from "src/components/Icon/Icon";
import PageHeader from "src/components/PageHeader/PageHeader";
import LevelSelector from "src/components/LevelSelector/LevelSelector";
import Subtask from "src/components/Subtask/Subtask";
import { Main, FlexContainer, GridContainer } from "src/App.styles";

const AddNewTask = () => {
  const navigate = useNavigate();
  const { addTask, tasks, editTask, deleteSubtask } = useContext(TaskContext);
  const { id } = useParams();
  const task = tasks.find((task) => task.id === id);
  const [subtasks, setSubtasks] = useState([]);
  const [isEditing, setIsEditing] = useState("");
  const [editedSubtasks, setEditedSubtasks] = useState([]);
  const [inputValue, setInputValue] = useState({
    taskName: task ? task.taskName : "",
    subtask: "",
    tags: "",
    dueDate: task ? task.dueDate : "",
    time: task ? task.time : "",
  });

  const [taskLevel, setTaskLevel] = useState({
    complexity: task ? task.complexity : 0,
    priority: task ? task.priority : 0,
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

    console.log(!task ? '' : task.tags)

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
            value={
              !task
                ? inputValue.taskName
                : isEditing === "taskName" || inputValue.taskName !== ""
                ? inputValue.taskName
                : task.taskName
            }
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
            active={
              !task
                ? taskLevel.complexity
                : isEditing === "complexity" || taskLevel.complexity !== 0
                ? taskLevel.complexity
                : task.complexity
            }
          />
          <LevelSelector
            text="Select Priority Level"
            onClick={handleTaskLevel("priority")}
            active={
              !task
                ? taskLevel.priority
                : isEditing === "priority" || taskLevel.priority !== 0
                ? taskLevel.priority
                : task.priority
            }
          />
        </section>

        <section>
          <FlexContainer gap="30px">
            <div>
              <Input
                label="Due Date"
                id="dueDate"
                type="date"
                value={
                  !task
                    ? inputValue.dueDate
                    : isEditing === "dueDate" || inputValue.dueDate !== ""
                    ? inputValue.dueDate
                    : task.dueDate
                }
                onChange={handleChange}
                onClick={!task ? null : () => handleIsEditing("dueDate")}
              />
            </div>

            <div>
              <Input
                label="Select Time"
                id="time"
                type="time"
                value={
                  !task
                    ? inputValue.time
                    : isEditing === "time" || inputValue.time !== ""
                    ? inputValue.time
                    : task.time
                }
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
            value={inputValue.tags}
            placeholder="School, Career, Routine"
            onChange={handleChange}
          />
        </section>

        <GridContainer>
          <Button type="submit" med width="100%">
            {!task ? "Add Task" : "Edit Task"}
          </Button>
        </GridContainer>
      </StyledAddNewTask>
    </Main>
  );
};

export default AddNewTask;
