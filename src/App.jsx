import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./contexts/TaskContext";
import Home from "./pages/Home/Home";
import AddNewTask from "./pages/AddNewTask/AddNewTask";
import { GlobalStyles } from "./App.styles";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <TaskProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/AddNewTask" element={<AddNewTask />}></Route>
          </Routes>
        </Router>
      </TaskProvider>
    </>
  );
};

export default App;
