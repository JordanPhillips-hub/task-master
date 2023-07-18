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
  const [editedTaskName, setEditedTaskName] = useState(task.taskName);
  const [editedTaskLevel, setEditedTaskLevel] = useState({
    complexity: 0,
    priority: 0,
  });

  const handleIsEditing = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditedTaskName(e.target.value);
  };

  const handleSubmit = () => {
    editTask(id, editedTaskName, editedTaskLevel.complexity, editedTaskLevel.priority);
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

  return (
    <Main>
      <form onSubmit={handleSubmit}>
        <PageHeader text="Edit Task" />
        <section>
          {isEditing ? (
            <span onClick={handleIsEditing}>{task.value}</span>
          ) : (
            <Input
              label="Add Task"
              id="taskName"
              value={editedTaskName}
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
