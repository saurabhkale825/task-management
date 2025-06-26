import React, { useState } from "react";
import "./Dropdown.css";
import Task from "../Task/Task";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import type { Todo } from "../../Todo";

interface DropdownProps {
  title: string;
  todos: Todo[];
  onDelete: (id: number) => void;
  deletingIds?: number[];
}

const Dropdown: React.FC<DropdownProps> = ({ title, todos, onDelete, deletingIds }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleIsOpenToggle = (): void => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={handleIsOpenToggle}>
        <div className="dropdown-header-title">
          <p>{title}</p>
          <p>{`(${todos.length})`}</p>
        </div>
        <p>{isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</p>
      </div>
      <div
        className="dropdown-task-container"
        style={{ display: isOpen ? "block" : "none" }}
      >
        {todos.map((todo) => (
          <Task
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            status={todo.status}
            date={todo.date}
            onDelete={() => onDelete(todo.id)}
            isDeleting={deletingIds?.includes(todo.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
