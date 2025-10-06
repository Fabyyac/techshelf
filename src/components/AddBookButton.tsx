"use client";

import { Button } from "@/components/ui/button";
import { useBooks } from "@/hooks/useBooks";
import { nanoid } from "nanoid";

export function AddBookButton() {
  const { addBook } = useBooks();

  function handleAdd() {
    const titulo = prompt("Título do livro:");
    const autor = prompt("Autor:");
    const capa = prompt("URL da capa (opcional):") || "";
    const link = prompt("Link da Amazon (opcional):") || "";

    if (!titulo || !autor) return;

    addBook({
      id: nanoid(),
      titulo,
      autor,
      capa,
      link,
    });
  }

  return (
    <Button onClick={handleAdd} className="bg-indigo-600 hover:bg-indigo-700">
      + Novo
    </Button>
  );
}
