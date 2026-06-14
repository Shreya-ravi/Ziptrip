# API Documentation

## GET /todos

Returns all todos.

Example Response:

```json
[
  {
    "id": 1,
    "title": "Learn React",
    "description": "",
    "completed": false
  }
]
```

---

## GET /todos/:id

Returns a specific todo by ID.

Example:

GET /todos/1

---

## POST /todos

Creates a new todo.

Request Body:

```json
{
  "title": "Learn React",
  "description": "Practice hooks"
}
```

---

## PUT /todos/:id

Updates an existing todo.

Example Request Body:

```json
{
  "title": "Updated Todo",
  "completed": true
}
```

---

## DELETE /todos/:id

Deletes a todo by ID.

Example:

DELETE /todos/1