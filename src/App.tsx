import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import AddTaskPage from "./Pages/AddTaskPage/AddTaskPage";
import EditTaskPage from "./Pages/EditTaskPage/EditTaskPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/addtask" element={<AddTaskPage />} />
            <Route path="/edittask/:id" element={<EditTaskPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
