'use client';

import React from 'react';
import Link from 'next/link';
import { useBooks } from '@/context/BooksProvider';
import { Book } from '@/types/book';

/* Barra de progresso */
function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-gray-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600"
        style={{ width: `${Math.max(0, Math.min(100, value || 0))}%` }}
      />
    </div>
  );
}

/* Card de livro com botões */
function BookCard({ book, onDelete }: { book: Book; onDelete: (id: string) => void }) {
  return (
    <article className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border overflow-hidden flex flex-col">
      {book.cover ? (
        <img src={book.cover} alt={book.title} className="h-40 sm:h-44 w-full object-cover" />
      ) : (
        <div
          className={`h-40 sm:h-44 ${book.coverColor ?? 'from-gray-200 to-gray-400'} bg-gradient-to-br flex items-end p-3`}
        >
          <div className="text-white text-sm bg-black/20 backdrop-blur rounded px-2 py-1">
            {book.status === 'Lendo'
              ? 'Lendo'
              : book.status === 'Para ler'
              ? 'Para ler'
              : 'Finalizado'}
          </div>
        </div>
      )}

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-sm text-gray-500 mt-1">por {book.author}</p>

        <div className="mt-3">
          <ProgressBar value={book.progress ?? 0} />
          <div className="text-xs text-gray-400 mt-1">{book.progress ?? 0}%</div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={`/library/${book.id}`} className="text-sm px-3 py-1 border rounded-md">
            Ver
          </Link>
          <Link href={`/library/${book.id}/edit`} className="text-sm px-3 py-1 border rounded-md">
            Editar
          </Link>
          <button
            onClick={() => onDelete(book.id)}
            className="text-sm px-3 py-1 border rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            Excluir
          </button>
        </div>
      </div>
    </article>
  );
}

export default function LibraryPage() {
  const { books, removeBook } = useBooks();

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
      removeBook(id); // ✅ usa o contexto global (BooksProvider)
    }
  };

  return (
    <main className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8">
      <section className="max-w-6xl mx-auto mt-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Biblioteca</h1>
          <Link
            href="/library/new"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
          >
            + Novo
          </Link>
        </div>

        {books.length === 0 ? (
          <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border text-center text-gray-500">
            Nenhum livro adicionado ainda.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
