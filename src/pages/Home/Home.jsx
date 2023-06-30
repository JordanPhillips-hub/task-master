/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { AiOutlinePlus } from "react-icons/ai";
import SearchBar from "../../components/SearchBar/SearchBar";
import Select from "../../components/Select/Select";
import Button from "../../components/Button/Button.styled";
import { sortOptions, categoryOptions } from "../../components/Select/Select";
import TaskCard from "../../components/TaskCard/TaskCard";
import { Main, GridContainer } from "../../App.styles";

const Home = ({ tasks }) => {
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
            dueDate={task.dueDate ? moment(task.dueDate).format("ll") : ""}
            time={task.time ? convertTimeFormat(task.time) : ""}
            priority={task.priority}
            complexity={task.complexity}
          />
        ))}

        <Link to="/AddNewTask">
          <Button dark lrg width="50%" type="button">
            <AiOutlinePlus style={{ marginRight: "13px" }} />
            Add New Task
          </Button>
        </Link>
      </div>
    </Main>
  );
};

export default Home;
