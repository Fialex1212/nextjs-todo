"use client";

import useTodoStore from "@/store/useTodoStore";
import React, { useEffect, useRef, useState } from "react";
import css from "./styles.module.css";
import TodoItem from "../TodoItem";

const ListTodo = () => {
  const { todos, deleteTodo, updateTodo } = useTodoStore();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = (id: string) => {
    setOpenMenuId((prevId) => (prevId === id ? null : id));
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <ul className={css.todos}>
      {todos.map(({ id, title, completed, day }) => (
        <TodoItem
          key={id}
          id={id}
          title={title}
          completed={completed}
          day={day}
          isMenuOpen={openMenuId === id}
          toggleMenu={toggleMenu}
          handleToggleTodo={handleToggleTodo}
          deleteTodo={deleteTodo}
          menuRef={menuRef}
        />
      ))}
    </ul>
  );
};

export default ListTodo;
