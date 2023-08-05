import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./contexts/TaskContext/TaskContext";
import Home from "./pages/Home/Home";
import AddNewTask from "./pages/AddNewTask/AddNewTask";
import Details from "./pages/Details/Details";
import { GlobalStyles } from "./App.styles";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/addNewTask" element={<AddNewTask />}></Route>
            <Route path="/task/:id" element={<Details />}></Route>
            <Route path="/editTask/:id" element={<AddNewTask />}></Route>
          </Routes>
        </Router>
      </TaskProvider>
    </>
  );
};

export default App;
