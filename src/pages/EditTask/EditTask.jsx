import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TaskContext } from "../../contexts/TaskContext";
import Input from "src/components/Input/Input";
import PageHeader from "src/components/PageHeader/PageHeader";
import Button from "src/components/Button/Button";
import { Main } from "src/App.styles";

const EditTask = () => {
  const navigate = useNavigate();
  const { tasks, editTask } = useContext(TaskContext);
  const { id } = useParams();
  const task = tasks.find((task) => task.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(task.taskName);

  const handleIsEditing = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditedTaskName(e.target.value);
  };

  const handleSaveChanges = () => {
    editTask(id, editedTaskName);
    setIsEditing(false);
    navigate("/");
  };

  return (
    <Main>
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
      <Button onClick={handleSaveChanges}>Save Changes</Button>
    </Main>
  );
};

export default EditTask;
