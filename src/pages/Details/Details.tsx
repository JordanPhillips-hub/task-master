import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTask } from "../../contexts/TaskContext/TaskContext";
import { Task } from "../../contexts/TaskContext/Types";
import { formatTime } from "../../utils/formatTime";
import { formatDate } from "../../utils/formatDate";
import Icon from "../../components/Icon/Icon";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import PageHeader from "../../components/PageHeader/PageHeader";
import TaskCard from "../../components/Task/TaskCard/TaskCard";
import TaskHeader from "../../components/Task/TaskHeader/TaskHeader";
import TaskDetail from "../../components/Task/TaskDetail/TaskDetail";
import Subtask from "../../components/Subtask/Subtask";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { Main, PageContainer, GridContainer } from "../../App.styles";

const setDate = (date: string) => {
  return date ? formatDate(date) : "No Set Date";
};

const setTime = (time: string) => {
  return time ? formatTime(time) : "";
};

const Details = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const { tasks, completeSubtask, deleteTask, repeatSubtasks } = useTask();
  const { id } = useParams();

  useEffect(() => {
    const foundTask = tasks.find(
      (task: { id: string | undefined }) => task.id === id
    );
    foundTask ? setTask(foundTask) : navigate("/");
  }, [id, navigate, tasks]);

  return (
    <Main>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        <PageContainer>
          <PageHeader text="Task Details" />
          <section>
            <TaskCard complete={false} style={{ width: "100%" }}>
              <TaskHeader
                text={task?.taskName}
                dueDate={task?.dueDate ?? ""}
                warningColor={task?.dueDate ?? ""}
              />

              <TaskDetail
                warningColor={task?.dueDate}
                icon="calendar"
                title="Due Date:"
                value={`${setDate(task?.dueDate ?? "")}, ${setTime(
                  task?.time ?? ""
                )}`}
              />

              <TaskDetail
                icon="arrowUp"
                title="Priority:"
                value={task?.priority ?? 0}
              />

              <TaskDetail
                icon="arrowMove"
                title="Complexity:"
                value={task?.complexity ?? 0}
              />

              <ProgressBar
                total={task?.subtasks.length ?? 0}
                round={false}
                completed={
                  task?.subtasks.filter((task) => task.complete === true)
                    .length ?? 0
                }
                warningColor={task?.dueDate ?? ""}
              />
            </TaskCard>
          </section>

          <section>
            <Header text="Checklist for subtasks" />
            <div>
              {task?.subtasks.map((subtask, index) => (
                <Subtask
                  key={subtask.id}
                  text={`${index + 1}. ${subtask.subtask}`}
                  iconType="check"
                  onClick={() => completeSubtask(id, subtask.id)}
                  complete={subtask.complete ? true : false}
                  remove={false}
                />
              ))}
            </div>
          </section>

          <GridContainer>
            <Link to={`/editTask/${id}`}>
              <Button variant="transparent" med width="100%">
                Edit Task
              </Button>
            </Link>

            <Button
              variant="transparent"
              med
              remove
              width="100%"
              onClick={() => deleteTask(task, () => navigate("/"))}
            >
              Delete Task
            </Button>
          </GridContainer>

          <Button
            lrg
            width="100%"
            gap="13px"
            onClick={() => repeatSubtasks(id)}
          >
            <Icon type="repeat" />
            Repeat Tasks
          </Button>
        </PageContainer>
      </motion.div>
    </Main>
  );
};

export default Details;
