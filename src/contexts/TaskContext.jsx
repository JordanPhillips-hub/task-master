/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { uid } from "uid";

export const TaskContext = createContext();
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);

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

  const handleSortOrder = ({ target: { id } }) => {
    switch (id) {
      case "ascending priority":
        setSortOrder("ascending priority");
        break;
      case "descending priority":
        setSortOrder("descending priority");
        break;
      case "ascending complexity":
        setSortOrder("ascending complexity");
        break;
      case "descending complexity":
        setSortOrder("descending complexity");
        break;
    }
  };

  useEffect(() => {
    if (sortOrder) {
      const sortedTasks = [...tasks].sort((a, b) => {
        switch (sortOrder) {
          case "ascending priority":
            return a.priority - b.priority;
          case "descending priority":
            return b.priority - a.priority;
          case "ascending complexity":
            return a.complexity - b.complexity;
          case "descending complexity":
            return b.complexity - a.complexity;
          default:
            return 0;
        }
      });
      setTasks(sortedTasks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder]);

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

  const completeTask = (task) => {
    setTasks((prevState) =>
      prevState.map((t) =>
        t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
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
    handleSortOrder,
  };

  return (
    <TaskContext.Provider value={taskValues}>{children}</TaskContext.Provider>
  );
};
