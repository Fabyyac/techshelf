'use client';
import React from 'react';
import { useBooks } from '@/context/BooksProvider';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ViewBookPage() {
  const { books, deleteBook } = useBooks();
  const params = useParams();
  const router = useRouter();

  const book = books.find(b => b.id === params.id);
  if (!book) return <div>Livro não encontrado.</div>;

  return (
    <div className="mt-6 bg-white dark:bg-slate-800 p-6 rounded-2xl border shadow-sm">
      <div className="flex gap-6">
        <div className="w-48 h-64 overflow-hidden rounded-lg">
          <img src={book.cover || '/default-cover.png'} alt={book.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{book.title}</h2>
          <p className="text-sm text-gray-500 mt-1">por {book.author}</p>
          <p className="mt-2 text-sm text-gray-400">Progresso: {book.progress}% | Status: {book.status}</p>
          <div className="mt-4 flex gap-2">
            <Link href={`/library/${book.id}/edit`} className="px-3 py-1 border rounded-md text-sm">Editar</Link>
            <button onClick={() => { deleteBook(book.id); router.push('/library'); }} className="px-3 py-1 border rounded-md text-sm text-red-600">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  );
}
