/* eslint-disable react/prop-types */
import { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { uid } from "uid";
import { motion } from "framer-motion";
import StyledAddNewTask from "./AddNewTask.styled";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import PageHeader from "../../components/PageHeader/PageHeader";
import LevelSelector from "../../components/LevelSelector/LevelSelector";
import Subtask from "../../components/Subtask/Subtask";
import Icon from "../../components/Icon/Icon";
import { useTask } from "../../contexts/TaskContext/TaskContext";
import { Main, PageContainer, FlexContainer } from "../../App.styles";

const AddNewTask = () => {
  const navigate = useNavigate();
  type Subtask = {
    id: string;
    subtask: string;
    complete: boolean;
  };

  const { addTask, tasks, editTask, deleteSubtask } = useTask();
  const { id } = useParams();
  const task = tasks.find((task: { id: string | undefined }) => task.id === id);

  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [isEditing, setIsEditing] = useState<string>("");
  const [editedSubtasks, setEditedSubtasks] = useState<Subtask[]>([]);

  const handleIsEditing = useCallback(
    (name: string) => {
      return !task ? undefined : () => setIsEditing(name);
    },
    [task]
  );

  const getInitialInputValue = (value: string, isLevelType: boolean) => {
    if (!task) {
      return isLevelType ? 0 : "";
    } else {
      return task[value];
    }
  };

  const getInputValue = (
    name: string,
    state: {
      [x: string]: any;
      taskName?: string;
      tags?: string;
      dueDate?: Date;
      time?: string;
      subtask?: string;
      complexity?: number;
      priority?: number;
    },
    value: string | number
  ) => {
    if (!task || isEditing === name || state[name] !== value) {
      return state[name];
    } else {
      return task[name];
    }
  };

  const [inputValue, setInputValue] = useState({
    taskName: getInitialInputValue("taskName", false),
    tags: getInitialInputValue("tags", false),
    dueDate: getInitialInputValue("dueDate", false),
    time: getInitialInputValue("time", false),
    subtask: "",
  });

  const [taskLevel, setTaskLevel] = useState({
    complexity: getInitialInputValue("complexity", true),
    priority: getInitialInputValue("priority", true),
  });

  const handleChange = useCallback(
    ({
      target: { name, value },
    }: {
      target: { name: string; value: string };
    }) => {
      setInputValue((prevState) => ({
        ...prevState,
        [name]: name === "tags" ? value.split(",") : value,
      }));
    },
    []
  );

  const handleTaskLevel = useCallback(
    (levelType: string) =>
      ({ target: { innerText } }: { target: { innerText: string } }) => {
        setTaskLevel((prevState) => ({
          ...prevState,
          [levelType]: Number(innerText),
        }));
        handleIsEditing(levelType);
      },
    [handleIsEditing]
  );

  const handleSubtasks = useCallback(
    (isEditing: string | boolean) => {
      if (inputValue.subtask.trim() !== "") {
        const newSubtask = {
          id: uid(),
          subtask: inputValue.subtask,
          complete: false,
        };

        if (isEditing) {
          setEditedSubtasks((prevState) => [...prevState, newSubtask]);
        } else {
          setSubtasks((prevState) => [...prevState, newSubtask]);
        }

        setInputValue((prevState) => ({
          ...prevState,
          subtask: "",
        }));
      }
    },
    [inputValue.subtask]
  );

  const removeSubtask = useCallback(
    (task: any, arr: any[]) => {
      const array = arr.filter((t: any) => t !== task);
      arr === subtasks ? setSubtasks(array) : setEditedSubtasks(array);
    },
    [subtasks]
  );

  const handleSubmit = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (task) {
        const combinedSubtasks = [...task.subtasks, ...editedSubtasks];
        editTask(
          id,
          inputValue.taskName,
          taskLevel.complexity,
          taskLevel.priority,
          combinedSubtasks,
          inputValue.tags,
          inputValue.dueDate,
          inputValue.time
        );
        setIsEditing("");
      } else {
        addTask(
          inputValue.taskName,
          taskLevel.complexity,
          taskLevel.priority,
          subtasks,
          inputValue.tags,
          inputValue.dueDate,
          inputValue.time
        );
      }
      navigate("/");
    },
    [
      addTask,
      editTask,
      editedSubtasks,
      id,
      inputValue.dueDate,
      inputValue.tags,
      inputValue.taskName,
      inputValue.time,
      subtasks,
      task,
      taskLevel.complexity,
      taskLevel.priority,
      navigate,
    ]
  );

  return (
    <Main>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        <PageContainer>
          <StyledAddNewTask onSubmit={handleSubmit}>
            <PageHeader
              text={!task ? "Add New Task" : `Editing ${task.taskName}`}
            />
            <section>
              <Input
                label="Task Name"
                id="taskName"
                value={getInputValue("taskName", inputValue, "")}
                placeholder="Task 1..."
                required={true}
                onChange={handleChange}
                onClick={handleIsEditing("taskName")}
              />
            </section>

            <section>
              <LevelSelector
                text="Select Complexity Level"
                onClick={handleTaskLevel("complexity")}
                active={getInputValue("complexity", taskLevel, 0)}
              />
              <LevelSelector
                text="Select Priority Level"
                onClick={handleTaskLevel("priority")}
                active={getInputValue("priority", taskLevel, 0)}
              />
            </section>

            <section>
              <FlexContainer gap="30px">
                <div>
                  <Input
                    label="Due Date"
                    id="dueDate"
                    type="date"
                    value={getInputValue("dueDate", inputValue, "")}
                    onChange={handleChange}
                    onClick={handleIsEditing("dueDate")}
                  />
                </div>

                <div>
                  <Input
                    label="Select Time"
                    id="time"
                    type="time"
                    value={getInputValue("time", inputValue, "")}
                    onChange={handleChange}
                    onClick={handleIsEditing("time")}
                  />
                </div>
              </FlexContainer>
            </section>

            <section>
              <label htmlFor="subtask">Add Checklist For Subtasks</label>
              {task && (
                <>
                  <ul>
                    {task.subtasks
                      .concat(editedSubtasks)
                      .map((subtask: Subtask, index: number) => (
                        <Subtask
                          key={subtask.id}
                          text={`${index + 1}. ${subtask.subtask}`}
                          iconType="cross"
                          complete={false}
                          remove
                          onClick={() =>
                            editedSubtasks.includes(subtask)
                              ? removeSubtask(subtask, editedSubtasks)
                              : deleteSubtask(id, subtask.id)
                          }
                        />
                      ))}
                  </ul>
                </>
              )}

              <ul>
                {subtasks.map((subtask, index) => (
                  <Subtask
                    key={subtask.id}
                    text={`${index + 1}. ${subtask.subtask}`}
                    iconType="cross"
                    complete={false}
                    remove
                    onClick={() => removeSubtask(subtask, subtasks)}
                  />
                ))}
              </ul>

              <FlexContainer>
                <Input
                  id="subtask"
                  value={inputValue.subtask}
                  placeholder="Add New Subtask..."
                  onChange={handleChange}
                />
                <Button
                  variant="round"
                  onClick={() => handleSubtasks(!task ? false : true)}
                >
                  <Icon type="plus" />
                </Button>
              </FlexContainer>
            </section>

            <section>
              <Input
                label="Add Tags"
                id="tags"
                value={getInputValue("tags", inputValue, "")}
                placeholder="School, Career, Routine"
                onChange={handleChange}
                onClick={handleIsEditing("tags")}
              />
            </section>

            <Button type="submit" lrg width="50%">
              {!task ? "Add Task" : "Edit Task"}
            </Button>
          </StyledAddNewTask>
        </PageContainer>
      </motion.div>
    </Main>
  );
};

export default AddNewTask;
