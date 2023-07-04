/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks((prevState) => [...prevState, newTask]);
  };

  const taskValues = { tasks, addTask };

  return (
    <TaskContext.Provider value={taskValues}>{children}</TaskContext.Provider>
  );
};
