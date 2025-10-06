"use client";

import { Book } from "@/types/book";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BookListProps {
  books: Book[];
  onRemove: (id: string) => void;
}

export function BookList({ books, onRemove }: BookListProps) {
  if (books.length === 0) {
    return (
      <div className="text-center text-gray-500 p-6">
        Nenhum livro encontrado.
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <Card key={book.id} className="flex flex-col items-center p-4">
          <CardContent className="flex flex-col items-center text-center">
            <img
              src={book.capa || "/placeholder.jpg"}
              alt={book.titulo}
              className="w-24 h-32 object-cover rounded-md mb-2"
            />
            <h3 className="font-semibold text-lg">{book.titulo}</h3>
            <p className="text-sm text-gray-500">{book.autor}</p>
            <a
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm mt-1"
            >
              Ver na Amazon
            </a>
            <Button
              variant="destructive"
              size="sm"
              className="mt-3"
              onClick={() => onRemove(book.id)}
            >
              Remover
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
