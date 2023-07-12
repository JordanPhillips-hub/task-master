// /* eslint-disable react/prop-types */
import { useContext } from "react";
import { useParams } from "react-router-dom";
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
import { Main } from "src/App.styles";

const setDate = (date) => {
  return date ? formatDate(date) : "No Set Date";
};

const setTime = (time) => {
  return time ? formatTime(time) : "";
};

const Details = () => {
  const { tasks } = useContext(TaskContext);
  const { id } = useParams();
  const task = tasks.find((task) => task.id === id);
  const subtasks = Object.values(task)[4];

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
            />
          ))}
        </ul>
      </section>
    </Main>
  );
};

export default Details;
