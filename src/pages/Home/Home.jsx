/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { TaskContext } from "../../contexts/TaskContext";
import SearchBar from "../../components/SearchBar/SearchBar";
import Select from "../../components/Select/Select";
import Icon from "../../components/Icon/Icon";
import Button from "../../components/Button/Button";
import { sortOptions, categoryOptions } from "../../components/Select/Select";
import TaskCard from "../../components/TaskCard/TaskCard";
import Tag from "../../components/Tag/Tag.styled";
import { Main, GridContainer } from "../../App.styles";

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

  return (
    <Main>
      <div>
        <SearchBar />

        <GridContainer>
          <Select name="Sort" options={sortOptions} />
          <Select name="Category" options={categoryOptions} />
        </GridContainer>

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
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
      </div>
    </Main>
  );
};

export default Home;
