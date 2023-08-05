export type TaskProviderProps = {
  children: React.ReactNode;
};

export type Task = {
  id: number | string;
  taskName: string;
  complexity: number;
  priority: number;
  subtasks: any[];
  tags: string[];
  dueDate: string;
  time: string;
  isCompleted: boolean;
  createdAt: number;
};

export type TaskContextTypes = {
  tasks: Task[];
  addTask: AddTaskFunction;
  editTask: EditTaskFunction;
  useTask: () => any;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  completeTask: any;
  deleteTask: any;
  deleteSubtask: any;
  completeSubtask: any;
  repeatSubtasks: any;
  handleSortOrder: any;
};

export type Subtask = {
  id: number | string;
  complete: boolean;
};

export type AddTaskFunction = {
  (
    taskName: string,
    complexity: number,
    priority: number,
    subtasks: any[],
    tags: string[],
    dueDate: string,
    time: string
  ): void;
};

export type EditTaskFunction = {
  (
    taskId: number,
    newTaskName: string,
    newComplexity: number,
    newPriority: number,
    newSubtasks: any[],
    newTags: string[],
    newDueDate: string,
    newTime: string
  ): void;
};
