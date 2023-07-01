/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";
import StyledAddNewTask from "./AddNewTask.styled";
import Button from "../../components/Button/Button.styled";
import Input from "../../components/Input/Input.styled";
import Header from "../../components/Header/Header";
import TaskLevel from "../../components/TaskLevel/TaskLevel";
import { Main, FlexContainer } from "../../App.styles";

const AddNewTask = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    taskName: "",
    subtask: "",
    tag: "",
    dueDate: "",
    time: "",
  });

  const [taskLevel, setTaskLevel] = useState({
    complexity: 0,
    priority: 0,
  });

  const handleChange = ({ target: { name, value } }) => {
    name === "tag"
      ? setInputValue((prevState) => ({
          ...prevState,
          [name]: value.replace(" ", ",").split(","),
        }))
      : setInputValue((prevState) => ({
          ...prevState,
          [name]: value,
        }));
  };

  const handleTaskLevel =
    (levelType) =>
    ({ target: { innerText } }) => {
      setTaskLevel((prevState) => ({
        ...prevState,
        [levelType]: Number(innerText),
      }));
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
    onSubmit(
      inputValue.taskName,
      taskLevel.complexity,
      taskLevel.priority,
      inputValue.subtask,
      inputValue.tag,
      inputValue.dueDate,
      inputValue.time
    );
  };

  const textInputs = {
    taskName: {
      value: inputValue.taskName,
      label: "Add Task",
      placeHolder: "Task 1...",
    },
    subtask: {
      value: inputValue.subtask,
      label: "Add Checklist For Subtasks",
      placeHolder: "Subtask Item...",
    },
    tag: {
      value: inputValue.tag,
      label: "Add Tags",
      placeHolder: "#Tags...",
    },
  };

  const dateAndTimeInputs = {
    dueDate: { value: inputValue.dueDate, label: "Due Date", type: "date" },
    time: { value: inputValue.time, label: "Select Time", type: "time" },
  };

  return (
    <Main>
      <StyledAddNewTask onSubmit={handleSubmit}>
        <FlexContainer>
          <Link to="/">
            <Button round back light type="button">
              <BsArrowLeftShort fontSize="1.5rem" />
            </Button>
          </Link>

          <Header lrg text="Add New Task" />
        </FlexContainer>

        {Object.entries(textInputs).map(([key, value]) => (
          <React.Fragment key={key}>
            <section>
              <label htmlFor={key}>{value.label}</label>
              <Input
                id={key}
                type="text"
                name={key}
                value={value.value}
                placeholder={value.placeHolder}
                onChange={handleChange}
              />

              {key === "subtask" && (
                <Button round type="button">
                  <AiOutlinePlus fontSize="1.5rem" />
                </Button>
              )}
            </section>

            {key === "taskName" && (
              <>
                <TaskLevel
                  text="Select Complexity Level"
                  onClick={handleTaskLevel("complexity")}
                />
                <TaskLevel
                  text="Select Priority Level"
                  onClick={handleTaskLevel("priority")}
                />
              </>
            )}

            {key !== "taskName" ||
              (key !== "subtask" && (
                <section>
                  <FlexContainer gap="30px">
                    {Object.entries(dateAndTimeInputs).map(([key, value]) => (
                      <div key={key}>
                        <label htmlFor={key}>{value.label}</label>
                        <Input
                          id={key}
                          type={value.type}
                          name={key}
                          value={value.value}
                          onChange={handleChange}
                        />
                      </div>
                    ))}
                  </FlexContainer>
                </section>
              ))}
          </React.Fragment>
        ))}

        <Button dark lrg width="50%" type="submit">
          Add Task
        </Button>
      </StyledAddNewTask>
    </Main>
  );
};

export default AddNewTask;
