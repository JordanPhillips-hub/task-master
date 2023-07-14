/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { uid } from "uid";

export const TaskContext = createContext();
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (
    taskName,
    complexity,
    priority,
    subtasks,
    tags,
    dueDate,
    time
  ) => {
    const newTasks = [
      ...tasks,
      {
        id: uid(),
        taskName,
        complexity,
        priority,
        subtasks,
        tags,
        dueDate,
        time,
        isCompleted: false,
      },
    ];
    setTasks(newTasks);
  };

  const completeSubtask = (taskId, subtaskId) => {
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

  const completeTask = () => {
    console.log("clicked");
  };

  const deleteTask = (task) => {
    setTasks(tasks.filter((t) => t !== task));
  };

  const taskValues = {
    tasks,
    addTask,
    setTasks,
    completeSubtask,
    deleteTask,
    completeTask,
  };

  return (
    <TaskContext.Provider value={taskValues}>{children}</TaskContext.Provider>
  );
};
