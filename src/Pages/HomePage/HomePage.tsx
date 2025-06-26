import { useState, useEffect } from "react";
import "./HomePage.css";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { useNavigate } from "react-router-dom";
import TodoService from "../../TodoService";
import type { Todo } from "../../Todo";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Task from "../../Components/Task/Task";

const HomePage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchResult, setSearchResult] = useState<Todo | null | false>(false);
  const [deletingIds, setDeletingIds] = useState<number[]>([]);

  const navigate = useNavigate();

  const handleAddBtn = (): void => {
    navigate("/addtask");
  };
  
  useEffect(() => {
    const savedTodos = TodoService.getTodo();
    setTodos(savedTodos);
  }, []);

  const handleDelete = (id: number): void => {
    // Mark this id as deleting
    setDeletingIds((prev) => [...prev, id]);

    // Wait for animation to complete
    setTimeout(() => {
      TodoService.deleteTodo(id);
      const updatedTodos = TodoService.getTodo();
      setTodos(updatedTodos);
      if (searchResult && searchResult.id === id) {
        setSearchResult(false);
      }
      setDeletingIds((prev) => prev.filter((delId) => delId !== id));
    }, 300);
  };
  
  const handleSearch = (value: string) => {
    if (!value.trim()) {
      setSearchResult(false);
      return;
    }
    const found = todos.find((t) => t.title.toLowerCase() === value.toLowerCase());
    setSearchResult(found || null);
  };
  
  const pendingTodos = todos.filter((t) => t.status.title === "Pending");
  const inProgressTodos = todos.filter((t) => t.status.title === "In Progress");
  const completedTodos = todos.filter((t) => t.status.title === "Completed");

  return (
    <main className="homepage">
      <header className="header">
        <div>TO-DO APP</div>
      </header>

      <SearchBar onSearch={handleSearch} />

      {searchResult ? (
        <Task
          id={searchResult.id}
          title={searchResult.title}
          description={searchResult.description}
          status={searchResult.status}
          date={searchResult.date}
          onDelete={() => handleDelete(searchResult.id)}
          isDeleting={deletingIds.includes(searchResult.id)}
        />
      ) : searchResult === null ? (
        <div style={{textAlign : "center"}}>Not Found !</div>
      ) : (
        <>
          {todos.length > 0 ? (
            <>
              <Dropdown title="Pending" todos={pendingTodos} onDelete={handleDelete} deletingIds={deletingIds} />
              <Dropdown title="In Progress" todos={inProgressTodos} onDelete={handleDelete} deletingIds={deletingIds} />
              <Dropdown title="Completed" todos={completedTodos} onDelete={handleDelete} deletingIds={deletingIds} />
            </>
          ) : (
            <div style={{textAlign : "center"}}>No Todo's Available !</div>
          )}
        </>
      )}

      <button className="add-task-btn" onClick={handleAddBtn}  aria-label="Add new task">
        +
      </button>
    </main>
  );
};

export default HomePage;

