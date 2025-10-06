"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types/book";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  // Carregar livros salvos
  useEffect(() => {
    const saved = localStorage.getItem("books");
    if (saved) {
      try {
        setBooks(JSON.parse(saved));
      } catch {
        setBooks([]);
      }
    }
  }, []);

  // Salvar automaticamente quando alterar
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  function addBook(book: Book) {
    setBooks((prev) => [...prev, book]);
  }

  function removeBook(id: string) {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }

  function updateBook(id: string, data: Partial<Book>) {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...data } : b))
    );
  }

  return { books, addBook, removeBook, updateBook };
}
