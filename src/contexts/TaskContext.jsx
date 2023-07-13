/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks((prevState) => [...prevState, newTask]);
  };

  const handleCompleteSubtask = (taskId, subtaskId) => {
    setTasks((prevState) =>
      prevState.map((task) => {
        if (task.id === taskId) {
          const updatedSubtasks = task.subtasks.map((subtask) =>
            subtask.id === subtaskId
              ? { ...subtask, complete: !subtask.complete }
              : subtask
          );
          return { ...task, subtasks: updatedSubtasks };
        }
        return task;
      })
    );
  };

  const handleDeleteTask = () => {};

  const taskValues = {
    tasks,
    addTask,
    handleCompleteSubtask,
    handleDeleteTask,
  };

  return (
    <TaskContext.Provider value={taskValues}>{children}</TaskContext.Provider>
  );
};
