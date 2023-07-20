import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TaskContext } from "src/contexts/TaskContext";
import Input from "src/components/Input/Input";
import Button from "src/components/Button/Button";
import PageHeader from "src/components/PageHeader/PageHeader";
import LevelSelector from "src/components/LevelSelector/LevelSelector";
import Subtask from "src/components/Subtask/Subtask";
import Icon from "src/components/Icon/Icon";
import { uid } from "uid";
import { Main, FlexContainer } from "src/App.styles";

const EditTask = () => {
  const navigate = useNavigate();
  const { tasks, editTask } = useContext(TaskContext);
  const { id } = useParams();
  const task = tasks.find((task) => task.id === id);
  const [isEditing, setIsEditing] = useState("");

  const [editedSubtasks, setEditedSubtasks] = useState([]);
  const [editedInputValue, setEditedInputValue] = useState({
    taskName: task.taskName,
    subtask: "",
    // tags: "",
    dueDate: task.dueDate,
    time: task.time,
  });

  const [editedTaskLevel, setEditedTaskLevel] = useState({
    complexity: task.complexity,
    priority: task.priority,
  });

  const handleIsEditing = (name) => {
    setIsEditing(name);
  };

  const handleChange = ({ target: { name, value } }) => {
    setEditedInputValue((prevState) => ({
      ...prevState,
      [name]: name === "tags" ? value.replace(" ", ",").split(",") : value,
    }));
  };

  const handleSubmit = () => {
    editTask(
      id,
      editedInputValue.taskName,
      editedTaskLevel.complexity,
      editedTaskLevel.priority,
      editedSubtasks,
      editedInputValue.dueDate,
      editedInputValue.time
    );
    setIsEditing("");
    navigate("/");
  };

  const handleTaskLevel =
    (levelType) =>
    ({ target: { innerText } }) => {
      setEditedTaskLevel((prevState) => ({
        ...prevState,
        [levelType]: Number(innerText),
      }));
      handleIsEditing(levelType);
    };

  const handleEditedSubtasks = () => {
    if (editedInputValue.subtask.trim() !== "") {
      const editedSubtask = {
        id: uid(),
        subtask: editedInputValue.subtask,
        complete: false,
      };

      setEditedSubtasks((prevState) => [
        ...prevState,
        ...task.subtasks,
        editedSubtask,
      ]);

      setEditedInputValue((prevState) => ({
        ...prevState,
        subtask: "",
      }));
    }
    console.log(editedSubtasks, task.subtasks);
  };

  const removeSubtask = (subtaskId) => {
    setEditedSubtasks(task.subtasks.filter((task) => task.id !== subtaskId));
  };

  return (
    <Main>
      <form onSubmit={handleSubmit}>
        <PageHeader text="Edit Task" />
        <section>
          <Input
            label="Add Task"
            id="taskName"
            value={
              isEditing === "taskName" || editedInputValue.taskName !== ""
                ? editedInputValue.taskName
                : task.taskName
            }
            placeholder="Task 1..."
            required={true}
            onChange={handleChange}
            onClick={() => handleIsEditing("taskName")}
          />
        </section>

        <section>
          <LevelSelector
            text="Select Complexity Level"
            onClick={handleTaskLevel("complexity")}
            active={
              isEditing === "complexity" || editedTaskLevel.complexity !== 0
                ? editedTaskLevel.complexity
                : task.complexity
            }
          />
          <LevelSelector
            text="Select Priority Level"
            onClick={handleTaskLevel("priority")}
            active={
              isEditing === "priority" || editedTaskLevel.priority !== 0
                ? editedTaskLevel.priority
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
                  isEditing === "dueDate" || editedInputValue.dueDate !== ""
                    ? editedInputValue.dueDate
                    : task.dueDate
                }
                onChange={handleChange}
                onClick={() => handleIsEditing("dueDate")}
              />
            </div>

            <div>
              <Input
                label="Select Time"
                id="time"
                type="time"
                value={
                  isEditing === "time" || editedInputValue.time !== ""
                    ? editedInputValue.time
                    : task.time
                }
                onChange={handleChange}
                onClick={() => handleIsEditing("time")}
              />
            </div>
          </FlexContainer>
        </section>

        <section>
          <label htmlFor="subtask">Add Checklist For Subtasks</label>
          <ul>
            {task.subtasks.map((subtask, index) => (
              <Subtask
                key={subtask.id}
                text={`${index + 1}. ${subtask.subtask}`}
                iconType="cross"
                remove
                onButtonClick={() => removeSubtask(subtask.id)}
              />
            ))}

            {editedSubtasks.map((subtask, index) => (
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
              value={editedInputValue.subtask}
              placeholder="Add New Subtask..."
              onChange={handleChange}
            />
            <Button variant="round" onClick={handleEditedSubtasks}>
              <Icon type="plus" />
            </Button>
          </FlexContainer>
        </section>

        <Button lrg width="50%" type="submit">
          Save Task
        </Button>
      </form>
    </Main>
  );
};

export default EditTask;
