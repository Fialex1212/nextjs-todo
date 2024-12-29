"use client";

import { create } from "zustand";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  day: string;
}

interface TodoStore {
  todos: Todo[];
  createTodo: (title: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updatedFields: Partial<Todo>) => void;
}

const generateId = (): string => Math.random().toString(36).substr(2, 9);

const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  createTodo: (title: string) =>{
    if (!title.trim()) {
      throw new Error("Todo title cannot be empty.");
    }
    set((state) => ({
      todos: [
        ...state.todos,
        { id: generateId(), title, completed: false, day: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }), },
      ],
    }))
  },
  deleteTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  updateTodo: (id: string, updatedFields: Partial<Todo>) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedFields } : todo
      ),
    })),
}));

export default useTodoStore;
