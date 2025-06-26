import type { Todo , Status} from "./Todo";

const LOCAL_STORAGE_KEY = "todos";

const TodoService = {
  //Get task list
  getTodo: (): Todo[] => {
    const todoString = localStorage.getItem(LOCAL_STORAGE_KEY);
    return todoString ? JSON.parse(todoString) : [];
  },

  //Add task to list
  addTodo(
    title: string,
    description: string,
    status: Status,
    date: Date
  ): Todo {
    const todos = TodoService.getTodo();
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      status,
      date,
    };
    const updatedTodos = [...todos, newTodo];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    return newTodo;
  },

  //Update task exsiting in the list
  updateTodo: (todo: Todo): Todo => {
    const todos = TodoService.getTodo();
    const updateList = todos.map((task) => (task.id === todo.id ? todo : task)); //Update the task with the provide id.
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateList));
    return todo;
  },

  //Delete the todo
  deleteTodo: (id: number): void => {
    const todos = TodoService.getTodo();
    const updateList = todos.filter((task) => task.id !== id); //filter the list to remove task with provided id
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateList));
  },
};

export default TodoService;
