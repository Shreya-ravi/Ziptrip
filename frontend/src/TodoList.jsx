import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const loadTodos = () => {
    fetch("http://localhost:5000/todos")
      .then(res => res.json())
      .then(data => setTodos(data));
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async () => {
    await fetch(
      "http://localhost:5000/todos",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          title,
          description: ""
        })
      }
    );

    setTitle("");
    loadTodos();
  };

  const deleteTodo = async id => {
    await fetch(
      `http://localhost:5000/todos/${id}`,
      {
        method: "DELETE"
      }
    );

    loadTodos();
  };

  return (
    <div>
      <h1>Todo List</h1>

      <input
        value={title}
        onChange={e =>
          setTitle(e.target.value)
        }
        placeholder="Todo title"
      />

      <button onClick={addTodo}>
        Add
      </button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <Link
              to={`/todo/${todo.id}`}
            >
              {todo.title}
            </Link>

            <button
              onClick={() =>
                deleteTodo(todo.id)
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;