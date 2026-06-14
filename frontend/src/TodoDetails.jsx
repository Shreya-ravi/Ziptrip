import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function TodoDetails() {
  const { id } = useParams();

  const [todo, setTodo] =
    useState(null);

  useEffect(() => {
    fetch(
      `http://localhost:5000/todos/${id}`
    )
      .then(res => res.json())
      .then(data => setTodo(data));
  }, [id]);

  if (!todo) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{todo.title}</h1>

      <p>
        Description:
        {todo.description}
      </p>

      <p>
        Status:
        {todo.completed
          ? "Completed"
          : "Pending"}
      </p>
    </div>
  );
}

export default TodoDetails;