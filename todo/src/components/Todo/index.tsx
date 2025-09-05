"use client";

import React, { useState } from "react";
import useTodoStore from "@/store/useTodoStore";
import css from "./styles.module.css";
import ListTodo from "@/components/TodoList";

const Todo = () => {
  const [form, setForm] = useState({ todo: "" });
  const { createTodo } = useTodoStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ todo: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo(form.todo);
    setForm({ todo: "" });
  };

  return (
    <div className="container">
      <div className={css.todos__container}>
        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.input}
            type="text"
            placeholder="Create new task"
            value={form.todo}
            onChange={handleInputChange}
            name="todo"
          />
          <button className={css.form__button} type="submit">
            Add task
          </button>
        </form>
        <ListTodo />
      </div>
    </div>
  );
};

export default Todo;
