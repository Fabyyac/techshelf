'use client';
import React, { useState, useEffect } from 'react';
import { useBooks } from '@/context/BooksProvider';
import { useParams, useRouter } from 'next/navigation';

export default function EditBookPage() {
  const { books, setBooks } = useBooks();
  const params = useParams();
  const router = useRouter();

  const book = books.find(b => b.id === params.id);
  if (!book) return <div>Livro não encontrado.</div>;

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [cover, setCover] = useState(book.cover || '');
  const [status, setStatus] = useState(book.status);
  const [progress, setProgress] = useState(book.progress);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = books.map(b => b.id === book.id ? { ...b, title, author, cover, status, progress } : b);
    setBooks(updated);
    router.push('/library');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 bg-white dark:bg-slate-800 p-6 rounded-2xl border shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Editar Livro</h2>

      <input className="mb-3 w-full border rounded px-3 py-2" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
      <input className="mb-3 w-full border rounded px-3 py-2" placeholder="Autor" value={author} onChange={e => setAuthor(e.target.value)} required />
      <input className="mb-3 w-full border rounded px-3 py-2" placeholder="Capa (URL)" value={cover} onChange={e => setCover(e.target.value)} />

      <select className="mb-3 w-full border rounded px-3 py-2" value={status} onChange={e => setStatus(e.target.value as any)}>
        <option value="to-read">Para Ler</option>
        <option value="reading">Lendo</option>
        <option value="finished">Finalizado</option>
      </select>

      <input type="number" min={0} max={100} className="mb-3 w-full border rounded px-3 py-2" placeholder="Progresso %" value={progress} onChange={e => setProgress(Number(e.target.value))} />

      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Salvar</button>
    </form>
  );
}
