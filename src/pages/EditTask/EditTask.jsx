import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TaskContext } from "src/contexts/TaskContext";
import Input from "src/components/Input/Input";
import Button from "src/components/Button/Button";
import PageHeader from "src/components/PageHeader/PageHeader";
import LevelSelector from "src/components/LevelSelector/LevelSelector";
import { Main } from "src/App.styles";

const EditTask = () => {
  const navigate = useNavigate();
  const { tasks, editTask } = useContext(TaskContext);
  const { id } = useParams();
  const task = tasks.find((task) => task.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [editedInputValue, setEditedInputVale] = useState({
    taskName: "",
    // subtask: "",
    // tags: "",
    // dueDate: "",
    // time: "",
  });
  const [editedTaskLevel, setEditedTaskLevel] = useState({
    complexity: 0,
    priority: 0,
  });

  const handleIsEditing = () => {
    setIsEditing(true);
  };

  const handleChange = ({ target: { name, value } }) => {
    setEditedInputVale((prevState) => ({
      ...prevState,
      [name]: name === "tags" ? value.replace(" ", ",").split(",") : value,
    }));
  };

  const handleSubmit = () => {
    editTask(
      id,
      editedInputValue.taskName,
      editedTaskLevel.complexity,
      editedTaskLevel.priority
    );
    setIsEditing(false);
    navigate("/");
  };

  const handleTaskLevel =
    (levelType) =>
    ({ target: { innerText } }) => {
      setEditedTaskLevel((prevState) => ({
        ...prevState,
        [levelType]: Number(innerText),
      }));
    };
  console.log(task.taskName);
  return (
    <Main>
      <form onSubmit={handleSubmit}>
        <PageHeader text="Edit Task" />
        <section>
          {!isEditing ? (
            <span onClick={handleIsEditing}>{task.taskName}</span>
          ) : (
            <Input
              label="Add Task"
              id="taskName"
              value={editedInputValue.taskName}
              placeholder="Task 1..."
              required={true}
              onChange={handleChange}
            />
          )}
        </section>

        <section>
          <LevelSelector
            text="Select Complexity Level"
            onClick={handleTaskLevel("complexity")}
            active={task.complexity}
          />
          <LevelSelector
            text="Select Priority Level"
            onClick={handleTaskLevel("priority")}
            active={task.priority}
          />
        </section>
        <Button lrg width="50%" type="submit">
          Save Task
        </Button>
      </form>
    </Main>
  );
};

export default EditTask;
