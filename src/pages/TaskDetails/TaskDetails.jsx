// /* eslint-disable react/prop-types */
import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { TaskContext } from "../../contexts/TaskContext";

const TaskDetails = () => {
  const { tasks } = useContext(TaskContext);
  const { id } = useParams();
  const task = tasks.find((task) => task.id === id);

  return (
    <>
      <Link to="/">
        <h1>Go Home</h1>
      </Link>

      <div>
        <h2>{task.taskName}</h2>
      </div>
    </>
  );
};

export default TaskDetails;
