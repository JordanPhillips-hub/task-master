import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddNewTask from "./pages/AddNewTask/AddNewTask";
import { GlobalStyles } from "./App.styles";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (
    taskName,
    complexity,
    priority,
    subtask,
    tag,
    dueDate,
    time
  ) => {
    const task = {
      id: `${Math.random()}`,
      taskName,
      complexity,
      priority,
      subtask,
      tag,
      dueDate,
      time,
      completed: false,
    };

    const newList = [...tasks, task];
    setTasks(newList);
  };

  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home tasks={tasks} />}></Route>
          <Route
            exact
            path="/AddNewTask"
            element={<AddNewTask onSubmit={handleSubmit} />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
