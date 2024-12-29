"use client";

import useTodoStore from "@/store/useTodoStore";
import React, { useEffect, useRef, useState } from "react";
import css from "./styles.module.css";
import { Ellipsis } from "lucide-react";

const Todo = () => {
  const [form, setForm] = useState({
    todo: "",
  });
  const { todos, createTodo, deleteTodo, updateTodo } = useTodoStore();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = (id: string) => {
    setOpenMenuId((prevId) => (prevId === id ? null : id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createTodo(form.todo);

    setForm({
      todo: "",
    });
  };

  const handleToggleTodo = (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      updateTodo(id, { completed: !todo.completed });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="container">
      <div className={css.todos__container}>
        <form className={css.form} onSubmit={handleSubmit}>
          <label className={css.input__wrapper}>
            <input
              className={css.input}
              type="text"
              placeholder="Create new task"
              value={form.todo}
              onChange={handleInputChange}
              name="todo"
            />
          </label>
        </form>
        <ul className={css.todos}>
          {todos.map(({ id, title, completed, day }) => (
            <li className={css.todo} key={id}>
              <label>
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={() => handleToggleTodo(id)}
                />
              </label>
              <span
                className={css.todo__title}
                style={{
                  textDecoration: completed ? "line-through" : "none",
                  color: completed ? "#707070" : "#000",
                }}
              >
                {title}
              </span>
              <span>{day}</span>
              <button
                className={css.button__menu}
                onClick={() => toggleMenu(id)}
                style={{ marginLeft: "10px", cursor: "pointer" }}
              >
                <Ellipsis />
              </button>
              {openMenuId === id && (
                <div className={css.todo__menu} ref={menuRef}>
                  <button
                    className={css.menu__delete}
                    onClick={() => deleteTodo(id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
