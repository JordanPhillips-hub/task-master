// /* eslint-disable react/prop-types */
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { uid } from "uid";
import { TaskContext } from "src/contexts/TaskContext";
import TaskCard from "src/components/Task/TaskCard/TaskCard";
import TaskHeader from "src/components/Task/TaskHeader/TaskHeader";
import Header from "src/components/Header/Header";
import TaskDetail from "src/components/Task/TaskDetail/TaskDetail";
import { formatTime } from "src/utils/formatTime";
import { formatDate } from "src/utils/formatDate";
import PageHeader from "src/components/PageHeader/PageHeader";
import Subtask from "src/components/Subtask/Subtask";
import Button from "src/components/Button/Button";
import { Main, GridContainer } from "src/App.styles";

const setDate = (date) => {
  return date ? formatDate(date) : "No Set Date";
};

const setTime = (time) => {
  return time ? formatTime(time) : "";
};

const Details = () => {
  const navigate = useNavigate();
  const { tasks, completeSubtask, deleteTask } = useContext(TaskContext);
  const { id } = useParams();
  const task = tasks.find((task) => task.id === id);
  const subtasks = task.subtasks;
  if (!task) return <div>Task not found</div>;

  return (
    <Main>
      <PageHeader text="Task Details" />

      <section>
        <TaskCard>
          <TaskHeader text={task.taskName} dueDate={task.dueDate} />

          <TaskDetail
            dueDate={task.dueDate}
            icon="calendar"
            title="Due Date:"
            value={`${setDate(task.dueDate)}, ${setTime(task.time)}`}
          />

          <TaskDetail icon="arrowUp" title="Priority:" value={task.priority} />

          <TaskDetail
            icon="arrowMove"
            title="Complexity:"
            value={task.complexity}
          />
        </TaskCard>
      </section>

      <section>
        <Header text="Checklist for subtasks" />
        <ul>
          {subtasks.map((subtask, index) => (
            <Subtask
              key={uid()}
              text={`${index + 1}. ${subtask.subtask}`}
              iconType="check"
              onButtonClick={() => completeSubtask(task.id, subtask.id)}
              complete={subtask.complete ? true : false}
            />
          ))}
        </ul>
      </section>

      <GridContainer>
        <Button variant="transparent" med width="100%">
          Edit Task
        </Button>
        <Button
          variant="transparent"
          med
          remove
          width="100%"
          onClick={() => deleteTask(task, navigate("/"))}
        >
          Delete Task
        </Button>
      </GridContainer>

      <Button lrg width="100%">
        Repeat Tasks
      </Button>
    </Main>
  );
};

export default Details;
