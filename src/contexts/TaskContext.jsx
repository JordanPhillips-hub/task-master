/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { uid } from "uid";

export const TaskContext = createContext();
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);

  const setStorage = (list) => {
    window.localStorage.setItem("tasks", JSON.stringify(list));
  };

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
    setStorage(newTasks);
  };

  const editTask = (
    taskId,
    newTaskName,
    newComplexity,
    newPriority,
    newSubtasks,
    newTags,
    newDueDate,
    newTime
  ) => {
    const newTasks = [...tasks].map((task) =>
      task.id === taskId
        ? {
            ...task,
            taskName: newTaskName,
            complexity: newComplexity,
            priority: newPriority,
            subtasks: newSubtasks,
            tags: newTags,
            dueDate: newDueDate,
            time: newTime,
          }
        : task
    );
    setTasks(newTasks);
    setStorage(newTasks);
  };

  const handleSortOrder = ({ target: { id } }) => {
    switch (id) {
      case "Ascending Priority":
        setSortOrder("Ascending Priority");
        break;
      case "Descending Priority":
        setSortOrder("Descending Priority");
        break;
      case "Ascending Complexity":
        setSortOrder("Ascending Complexity");
        break;
      case "Descending Complexity":
        setSortOrder("Descending Complexity");
        break;
      case "Ascending Date":
        setSortOrder("Ascending Date");
        break;
      case "Descending Date":
        setSortOrder("Descending Date");
        break;
    }
  };

  useEffect(() => {
    if (sortOrder) {
      const newTasks = [...tasks].sort((a, b) => {
        switch (sortOrder) {
          case "Ascending Priority":
            return a.priority - b.priority;
          case "Descending Priority":
            return b.priority - a.priority;
          case "Ascending Complexity":
            return a.complexity - b.complexity;
          case "Descending Complexity":
            return b.complexity - a.complexity;
          case "Ascending Date":
            return new Date(a.dueDate) - new Date(b.dueDate);
          case "Descending Date":
            return new Date(b.dueDate) - new Date(a.dueDate);
          default:
            return 0;
        }
      });
      setTasks(newTasks);
      setStorage(newTasks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder]);

  const completeSubtask = (taskId, subtaskId) => {
    const newTasks = [...tasks].map((task) => {
      if (task.id === taskId) {
        const updatedSubtasks = task.subtasks.map((subtask) =>
          subtask.id === subtaskId
            ? { ...subtask, complete: !subtask.complete }
            : subtask
        );
        return { ...task, subtasks: updatedSubtasks };
      }
      return task;
    });
    setTasks(newTasks);
    setStorage(newTasks);
  };

  const deleteSubtask = (taskId, subtaskId) => {
    const newTasks = [...tasks].map((task) => {
      if (task.id === taskId) {
        const updatedSubtasks = task.subtasks.filter(
          (subtask) => subtask.id !== subtaskId
        );
        return { ...task, subtasks: updatedSubtasks };
      }
      return task;
    });
    setTasks(newTasks);
    setStorage(newTasks);
  };

  const completeTask = (task) => {
    const newTasks = [...tasks].map((t) =>
      t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTasks(newTasks);
    setStorage(newTasks);
  };

  const deleteTask = (task) => {
    const newTasks = tasks.filter((t) => t !== task);
    setTasks(newTasks);
    setStorage(newTasks);
  };

  const taskValues = {
    tasks,
    addTask,
    setTasks,
    completeSubtask,
    deleteTask,
    completeTask,
    handleSortOrder,
    editTask,
    deleteSubtask,
  };

  return (
    <TaskContext.Provider value={taskValues}>{children}</TaskContext.Provider>
  );
};
