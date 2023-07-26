/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { uid } from "uid";

export const TaskContext = createContext();
export const useTask = () => {
  const value = useContext(TaskContext);
  return value;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);

  const setStorage = (list) => {
    window.localStorage.setItem("tasks", JSON.stringify(list));
  };

  const addTask = useCallback(
    (taskName, complexity, priority, subtasks, tags, dueDate, time) => {
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
          createdAt: Date.now(),
        },
      ];
      setTasks(newTasks);
      setStorage(newTasks);
    },
    [tasks]
  );

  const editTask = useCallback(
    (
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
    },
    [tasks]
  );

  const completeTask = useCallback(
    (task) => {
      const newTasks = [...tasks].map((t) =>
        t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
      );
      setTasks(newTasks);
      setStorage(newTasks);
    },
    [tasks]
  );

  const deleteTask = useCallback(
    (task, callback) => {
      const newTasks = tasks.filter((t) => t !== task);
      setTasks(newTasks);
      setStorage(newTasks);
      callback();
    },
    [tasks]
  );

  const updateSubtasks = useCallback(
    (taskId, callback) => {
      const newTasks = [...tasks].map((task) => {
        if (task.id === taskId) {
          const updatedSubtasks = task.subtasks.map(callback);
          return { ...task, subtasks: updatedSubtasks };
        }
        return task;
      });
      setTasks(newTasks);
      setStorage(newTasks);
    },
    [tasks]
  );

  const completeSubtask = useCallback(
    (taskId, subtaskId) => {
      updateSubtasks(taskId, (subtask) => {
        if (subtask.id === subtaskId) {
          return { ...subtask, complete: !subtask.complete };
        }
        return subtask;
      });
    },
    [updateSubtasks]
  );

  const repeatSubtasks = useCallback(
    (taskId) => {
      updateSubtasks(taskId, (subtask) => ({
        ...subtask,
        complete: false,
      }));
    },
    [updateSubtasks]
  );

  const deleteSubtask = useCallback(
    (taskId, subtaskId) => {
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
    },
    [tasks]
  );

  const handleSortOrder = useCallback(({ target: { id } }) => {
    switch (id) {
      case "Default":
        setSortOrder("Default");
        break;
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
  }, []);

  useEffect(() => {
    if (sortOrder) {
      const newTasks = [...tasks].sort((a, b) => {
        switch (sortOrder) {
          case "Default":
            return a.createdAt - b.createdAt;
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
            return a.createdAt - b.createdAt;
        }
      });
      setTasks(newTasks);
      setStorage(newTasks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder]);

  const taskValues = {
    tasks,
    useTask,
    addTask,
    editTask,
    setTasks,
    completeTask,
    deleteTask,
    deleteSubtask,
    completeSubtask,
    repeatSubtasks,
    handleSortOrder,
  };

  return (
    <TaskContext.Provider value={taskValues}>{children}</TaskContext.Provider>
  );
};
