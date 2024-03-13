import React, { useState, useEffect } from "react";
import axios from "axios";

const Firscomp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (id, title) => {
    setEditMode(id);
    setNewTodo(title);
  };

  const handleSaveEdit = (id) => {
    axios
      .put(`http://localhost:3000/todos/${id}`, { title: newTodo })
      .then(() => {
        setEditMode(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddTodo = () => {
    axios
      .post("http://localhost:3000/todos", { title: newTodo })
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo("");
      })
      .catch((error) => {
        console.log(error);
      });
     
  };

  return (
    <div className="container mt-4">
      <h1>Todo List</h1>
      <div className="input-group mb-3">
        <input
          id="inputt"
          type="text"
          className="form-control"
          placeholder="Enter new todo"
         
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={handleAddTodo}>
            Add Todo
          </button>
        </div>
      </div>
      <ul className="list-group">
        {todos.map((todo) => (
          <li className="list-group-item" key={todo.id}>
            {editMode === todo.id ? (
              <>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                />
                <button
                  className="btn btn-success mr-2"
                  onClick={() => handleSaveEdit(todo.id)}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditMode(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div className="infoo d-flex justify-content: between">
                  <span className="me-auto">{todo.title}</span>
                  <div className="d-flex">
                    <div className="btns">
                      <button
                        className="btn btn-warning mr-2"
                        onClick={() => handleEdit(todo.id, todo.title)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => handleDelete(todo.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Firscomp;
