'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useBooks } from '@/context/BooksProvider';
import { Book } from '@/types/book';

/* ---------------------------
   Componentes auxiliares locais
--------------------------- */
function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-2 flex items-baseline justify-between">
        <div className="text-2xl font-bold">{value}</div>
        {hint && <div className="text-xs text-gray-400">{hint}</div>}
      </div>
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-gray-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}

function getCover(book: Book) {
  // tenta propriedades diferentes que seu app pode ter usado
  return (book as any).coverUrl ?? (book as any).cover ?? '';
}

function normalizeProgress(raw: any) {
  const n = Number(raw);
  return Number.isNaN(n) ? 0 : Math.max(0, Math.min(100, Math.round(n)));
}

function isReadingStatus(status: string | undefined) {
  if (!status) return false;
  const s = String(status).toLowerCase();
  return s === 'reading' || s === 'lendo' || s === 'current' || s === 'in-progress';
}

function isFinishedStatus(status: string | undefined) {
  if (!status) return false;
  const s = String(status).toLowerCase();
  return s === 'finished' || s === 'finalizado' || s === 'lido' || s === 'done';
}

function BookCard({ book }: { book: Book }) {
  const cover = getCover(book);
  const progress = normalizeProgress((book as any).progress);

  return (
    <article className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border overflow-hidden flex flex-col">
      {cover ? (
        <img src={cover} alt={book.title} className="h-40 sm:h-44 w-full object-cover" />
      ) : (
        <div
          className={`h-40 sm:h-44 ${ (book as any).coverColor ?? 'from-gray-200 to-gray-400' } bg-gradient-to-br flex items-end p-3`}
        >
          <div className="text-white text-sm bg-black/20 backdrop-blur rounded px-2 py-1">
            {isReadingStatus((book as any).status)
              ? 'Lendo'
              : isFinishedStatus((book as any).status)
              ? 'Finalizado'
              : 'Para ler'}
          </div>
        </div>
      )}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold leading-tight">{book.title}</h3>
        <p className="text-sm text-gray-500 mt-1">por {book.author}</p>
        <div className="mt-3">
          <ProgressBar value={progress} />
          <div className="text-xs text-gray-400 mt-1">{progress}%</div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Link href={`/library/${book.id}`} className="text-sm px-3 py-1 border rounded-md">
            Ver
          </Link>
          <Link href={`/library/${book.id}/edit`} className="text-sm px-3 py-1 border rounded-md">
            Editar
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ---------------------------
   Página principal (Dashboard)
--------------------------- */
export default function HomePage() {
  const { books } = useBooks(); // usa o estado global do BooksProvider
  const [query, setQuery] = useState<string>('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return books;
    return books.filter(
      (b) =>
        (b.title ?? '').toString().toLowerCase().includes(q) ||
        (b.author ?? '').toString().toLowerCase().includes(q)
    );
  }, [query, books]);

  const total = books.length;
  const reading = books.filter((b) => isReadingStatus((b as any).status)).length;
  const finished = books.filter((b) => isFinishedStatus((b as any).status)).length;

  // destaque: encontra o primeiro com status de leitura
  const highlighted = books.find((b) => isReadingStatus((b as any).status));

  return (
    <main className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8">
      <header className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-sky-500 flex items-center justify-center text-white font-bold">
            📚
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">Techshelf</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Organize, acompanhe e curta suas leituras.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center bg-white dark:bg-slate-800 border rounded-lg px-3 py-2 shadow-sm w-full sm:w-80">
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M21 21l-4.35-4.35"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar título ou autor"
              className="bg-transparent ml-3 outline-none text-sm w-full"
              aria-label="Pesquisar livros"
            />
          </div>
          <Link
            href="/library/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
          >
            + Novo
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto mt-6 grid gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Total de livros" value={total} />
          <StatCard label="Lendo agora" value={reading} hint="Continue onde parou" />
          <StatCard label="Finalizados" value={finished} hint="Parabéns!" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/60 dark:bg-slate-800 rounded-2xl p-6 border shadow-sm">
            <h2 className="text-xl font-semibold">Seu destaque</h2>
            <p className="text-sm text-gray-500 mt-1">
              Comece de onde parou ou escolha um favorito.
            </p>

            <div className="mt-4">
              {highlighted ? (
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <>
                    {getCover(highlighted) ? (
                      <img
                        src={getCover(highlighted)}
                        alt={highlighted.title}
                        className="w-full sm:w-48 h-44 object-cover rounded-lg"
                      />
                    ) : (
                      <div
                        className={`w-full sm:w-48 h-44 rounded-lg ${
                          (highlighted as any).coverColor ?? 'from-gray-200 to-gray-400'
                        } bg-gradient-to-br`}
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">{highlighted.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">por {highlighted.author}</p>
                      <div className="mt-3">
                        <ProgressBar value={normalizeProgress((highlighted as any).progress)} />
                      </div>
                      <div className="mt-4 flex gap-2">
                        
                        <Link href={`/library/${highlighted.id}/edit`} className="px-3 py-1 border rounded-md">
                          Editar
                        </Link>
                      </div>
                    </div>
                  </>
                </div>
              ) : (
                <div className="p-6 bg-white dark:bg-slate-800 border rounded-lg">
                  <p className="text-sm text-gray-500">
                    Nenhum livro em andamento — escolha um para começar!
                  </p>
                </div>
              )}
            </div>

            
          </div>

          <aside className="bg-white dark:bg-slate-800 rounded-2xl p-4 border shadow-sm">
            <h3 className="text-md font-semibold">Leituras recentes</h3>
            <div className="mt-3 space-y-3">
              {books.slice(0, 4).map((b) => (
                <div key={b.id} className="flex items-center gap-3">
                  {getCover(b) ? (
                    <img
                      src={getCover(b)}
                      alt={b.title}
                      className="w-12 h-16 object-cover rounded-md"
                    />
                  ) : (
                    <div
                      className={`w-12 h-16 rounded-md ${
                        (b as any).coverColor ?? 'from-gray-200 to-gray-400'
                      } bg-gradient-to-br`}
                    />
                  )}
                  <div className="flex-1">
                    <div className="text-sm font-medium">{b.title}</div>
                    <div className="text-xs text-gray-400">{b.author}</div>
                  </div>
                  <div className="text-xs text-gray-400">{normalizeProgress((b as any).progress)}%</div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Sua biblioteca</h2>
          {filtered.length === 0 ? (
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border text-center text-gray-500">
              Nenhum livro encontrado.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
