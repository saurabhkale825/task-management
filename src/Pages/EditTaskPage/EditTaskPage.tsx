import { useState, useEffect } from "react";
import "./EditTaskPage.css";
import Header from "../../Components/Header/Header";
import Button from "../../Components/Button/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useNavigate, useParams } from "react-router-dom";
import TodoService from "../../TodoService";
import type { Status, Todo } from "../../Todo";

const EditTaskPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<Status>({ title: "Pending", color: "grey" });
  const [date, setDate] = useState<Date>(new Date());

  const statuses = [
    { title: "Pending", color: "grey" },
    { title: "In Progress", color: "yellow" },
    { title: "Completed", color: "green" },
  ];
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState<boolean>(false);
  const [existingTodo, setExistingTodo] = useState<Todo | null>(null);

useEffect(() => {
  if (!id) return;

  const todos = TodoService.getTodo();
  const existing = todos.find((t) => t.id === Number(id));
  console.log("Existing Todo:", existing);
  if (existing) {
    setExistingTodo(existing);
    setTitle(existing.title);
    setDescription(existing.description);
    setStatus(existing.status);
    setDate(new Date(existing.date));
  } else {
    console.warn("Todo not found for id:", id);
  }
}, [id]);

  // Save the updated task
  const handleUpdate = () => {
    if (!existingTodo) {
      console.log("No task is found!");
      return;
    };

    const updatedTodo: Todo = {
      ...existingTodo,
      title: title.trim() || existingTodo.title,
      description: description.trim() || existingTodo.description,
      status,
      date,
    };
    TodoService.updateTodo(updatedTodo);
    navigate("/"); // Redirect after save
  };
  
  return (
    <div className="edit-task-page">
      <Header content="Edit Task" />
      <div className="edit-task-page-container">
        <div className="edit-task-page-input-container">
          <input
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="add-task-page-title-input"
          />
          <textarea
            placeholder="Enter the description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="add-task-page-description-input"
          />
          
          <div className="edit-task-status-dropdown">
            <div
              onClick={() => setIsStatusDropdownOpen((prev) => !prev)}
              className="edit-task-status-dropdown-header"
            >
              <div className="edit-task-status-dropdown-header-content">
                <p
                  className="edit-task-status-indicator"
                  style={{ backgroundColor: status.color }}
                />
                <p>{status.title}</p>
              </div>
              <div>{isStatusDropdownOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</div>
            </div>

            <div
              className="edit-task-status-option"
              style={{ display: isStatusDropdownOpen ? "block" : "none" }}
            >
              {statuses.map((stat) => (
                <div
                  key={stat.title}
                  className="edit-task-status-dropdown-header-content"
                  onClick={() => setStatus(stat)}
                >
                  <p
                    className="edit-task-status-indicator"
                    style={{ backgroundColor: stat.color }}
                  />
                  <p>{stat.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="add-task-page-container-button">
          <Button data="Cancel" className="secondary-button" onClick={() => navigate("/")} />
          <Button data="Update" className="primary-button" onClick={handleUpdate} />
        </div>
      </div>
    </div>
  );
};

export default EditTaskPage;
