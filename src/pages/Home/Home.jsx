/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { uid } from "uid";
import moment from "moment/moment";
import { TaskContext } from "src/contexts/TaskContext";
import SearchBar from "src/components/SearchBar/SearchBar";
import Select, { sortOptions } from "src/components/Select/Select";
import TaskCard from "src/components/TaskCard/TaskCard";
import Button from "src/components/Button/Button";
import Icon from "src/components/Icon/Icon";
import Tag from "src/components/TaskCard/Tag.styled";
import { Main, GridContainer } from "src/App.styles";

const Home = () => {
  const { tasks } = useContext(TaskContext);

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

  const tag = tasks.flatMap((task) => task.tags);

  return (
    <Main>
      <SearchBar />

      <GridContainer>
        <Select name="Sort" options={sortOptions} />
        <Select name="Category" options={tag}></Select>
      </GridContainer>

      {tasks.map((task) => (
        <TaskCard
          key={uid()}
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
      ))}

      <Link to="/AddNewTask">
        <Button lrg width="50%" gap="13px">
          <Icon type="plus" />
          Add New Task
        </Button>
      </Link>
    </Main>
  );
};

export default Home;
