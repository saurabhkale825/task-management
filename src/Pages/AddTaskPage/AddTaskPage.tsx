import { useState } from "react";
import "./AddTaskPage.css";
import type { Status } from "../../Todo";

import TodoService from "../../TodoService";
import { useNavigate } from "react-router-dom";

// import Button from "../../Components/Button";
import Header from "../../Components/Header/Header";
import Button from "../../Components/Button/Button";

const AddTaskPage = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();

  const handleAdd = () => {
    if (!title.trim() || !description.trim()) {
      alert("please fill title and description .");
      return;
    }

    const status: Status = {
      title: "Pending",
      color: "grey",
    };

    TodoService.addTodo(title, description, status, new Date());
    setTitle("");
    setDescription("");
    navigate("/");
  };

  return (
    <div className="add-task-page">
      <Header content="Add Task" />

      <div className="add-task-page-container">
        <div className="add-task-page-container-input-container">
          <input
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="add-task-page-title-input"
          />

          <textarea
            placeholder="Enter the description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="add-task-page-description-input"
          />
        </div>

        <div className="add-task-page-container-button">
          <Button
            data="Cancel"
            className="secondary-button"
            onClick={() => navigate("/")}
          />

          <Button data="ADD" className="primary-button" onClick={handleAdd} />
        </div>
      </div>
    </div>
  );
};

export default AddTaskPage;
