import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TaskContext } from "../../contexts/TaskContext";
import Input from "src/components/Input/Input";
import PageHeader from "src/components/PageHeader/PageHeader";
import { Main } from "src/App.styles";

const EditTask = () => {
  const { tasks } = useContext(TaskContext);
  const { id } = useParams();
  const task = tasks.find((task) => task.id === id);
  return (
    <Main>
      <PageHeader text="Edit Task" />
      <section>
        <Input
          label="Add Task"
          id="taskName"
          value={task.taskName}
          placeholder="Task 1..."
          required={true}
          // onChange={handleChange}
        />
      </section>
    </Main>
  );
};

export default EditTask;
