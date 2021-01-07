import { useState } from "react";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

function Todo({ todos }) {
  const [todoIn, setTodoIn] = useState("");
  const [todoArr, setTodoArr] = useState(todos);

  const handleNewTodoChange = (e) => {
    e.preventDefault();
    setTodoIn(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ description: todoIn, status: "Open" }),
    });
    const newTodo = await res.json();
    setTodoArr([newTodo, ...todoArr]);
    setTodoIn("");
  };

  const handleStatusChange = async (e) => {
    e.preventDefault();
    console.log("target", e);

    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ description: todoIn, status: "Open" }),
    });
    const newTodo = await res.json();
    setTodoArr([newTodo, ...todoArr]);
  };

  const deleteTodo = (todo) => async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/todos/${todo.id}`, {
      method: "DELETE",
    });
    const index = todoArr.indexOf(todo);
    setTodoArr([
      ...todoArr.slice(0, index),
      ...todoArr.slice(index + 1, todoArr.length),
    ]);
  };

  return (
    <div className="row">
      <h2 className="col-12 list-title is-center">My Todos</h2>

      <form className="col-12">
        <div className="row">
          <span className="col-1 list-desc">Add</span>
          <input
            type="text"
            onBlur={handleNewTodoChange}
            className="col-5"
            onChange={handleNewTodoChange}
            value={todoIn}
          />
          <button className="button col-2" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </form>

      <div className="col-12">
        {todoArr.map((todo, index) => (
          <div className="row" key={index}>
            <div className="col-1 list-desc" name="id">
              {todo.id}
            </div>
            <div className="col-5 list-desc" name="description">
              {todo.description}
            </div>
            <div className="col-4">
              <select
                name="status"
                id=""
                value={todo.status}
                onChange={handleStatusChange}
                onBlur={handleSubmit}>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="col-2 icon">
              <button className="button icon-only" onClick={deleteTodo(todo)}>
                <img
                  src="https://icongr.am/feather/delete.svg?size=16&color=93939a"
                  alt="delete"
                />
              </button>
              <Link href={`/todos/${todo.id}`}>
                <button className="button icon-only">
                  <img
                    src="https://icongr.am/feather/edit-2.svg?size=16&color=93939a"
                    alt="edit"
                  />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      id: "desc",
    },
  });
  console.log("todos: ", todos);

  return {
    props: { todos },
  };
}

export default Todo;
