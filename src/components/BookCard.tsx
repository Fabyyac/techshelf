'use client';
import React from 'react';
import { Book } from '../types/book';
import Link from 'next/link';

export default function BookCard({ book, onDelete }: { book: Book; onDelete: (id: string)=>void }) {
  return (
    <article className="p-4 bg-white rounded shadow flex flex-col">
      <h3 className="text-lg font-semibold">{book.title}</h3>
      <p className="text-sm text-gray-600">por {book.author}</p>

      <div className="mt-2 flex items-center justify-between">
        <div className="text-xs px-2 py-1 bg-gray-100 rounded">{book.status}</div>
        <div className="text-sm">{book.progress}%</div>
      </div>

      <div className="mt-4 flex gap-2">
        <Link href={`/library/${book.id}`} className="text-sm px-3 py-1 border rounded">Ver</Link>
        <Link href={`/library/${book.id}/edit`} className="text-sm px-3 py-1 border rounded">Editar</Link>
        <button onClick={()=>onDelete(book.id)} className="text-sm px-3 py-1 border rounded text-red-600">Excluir</button>
      </div>
    </article>
  );
}
