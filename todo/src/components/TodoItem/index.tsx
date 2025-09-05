"use client";

import React from "react";
import css from "./styles.module.css";
import { Ellipsis } from "lucide-react";

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  day: string;
  isMenuOpen: boolean;
  toggleMenu: (id: string) => void;
  handleToggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  completed,
  day,
  isMenuOpen,
  toggleMenu,
  handleToggleTodo,
  deleteTodo,
  menuRef,
}) => {
  return (
    <li className={css.todo}>
      <label>
        <input
          className={css.todo__checkbox}
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
      >
        <Ellipsis />
      </button>
      {isMenuOpen && (
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
  );
};

export default TodoItem;
