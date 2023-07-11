// /* eslint-disable react/prop-types */
import { useContext } from "react";
import { useParams } from "react-router-dom";
import moment from "moment/moment";
import { TaskContext } from "src/contexts/TaskContext";
import PageHeader from "src/components/Header/PageHeader";
import TaskCard from "src/components/TaskCard/TaskCard";
import Tag from "src/components/TaskCard/Tag.styled";
import { Main } from "src/App.styles";

const Details = () => {
  const { tasks } = useContext(TaskContext);
  const { id } = useParams();
  const task = tasks.find((task) => task.id === id);

  const convertTimeFormat = (timeValue) => {
    let [hours, minutes] = timeValue.split(":");
    let period = "AM";

    if (hours > 12) {
      hours -= 12;
      period = "PM";
    }

    if (hours < 10) {
      hours = Number(hours);
    }

    timeValue = `${hours}:${minutes} ${period}`;

    return timeValue;
  };

  return (
    <Main>
      <PageHeader text="Task Details" />

      <TaskCard
        taskName={task.taskName}
        dueDate={
          task.dueDate ? moment(task.dueDate).format("ll") : "No Set Date"
        }
        time={task.time ? convertTimeFormat(task.time) : ""}
        priority={task.priority}
        complexity={task.complexity}
        tags={
          task.tags !== "" &&
          task.tags.map(
            (tag, index) => tag !== "" && <Tag key={index}>{tag}</Tag>
          )
        }
      />
    </Main>
  );
};

export default Details;
