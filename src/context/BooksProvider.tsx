'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book } from '@/types/book';

interface BooksContextValue {
  books: Book[];
  addBook: (book: Book) => void;
  updateBook: (book: Book) => void;
  removeBook: (id: string) => void;
}

const BooksContext = createContext<BooksContextValue | undefined>(undefined);

export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoaded, setIsLoaded] = useState(false); // ✅ controla carregamento inicial

  // 🔹 Carrega livros salvos no localStorage ao iniciar
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('books');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setBooks(parsed);
          } else {
            console.warn('Formato inválido no localStorage, redefinindo biblioteca.');
            localStorage.removeItem('books');
            setBooks([]);
          }
        }
      }
    } catch (err) {
      console.error('Erro ao carregar livros do localStorage:', err);
      setBooks([]);
    } finally {
      setIsLoaded(true); // ✅ evita sobrescrever antes de carregar
    }
  }, []);

  // 🔹 Salva livros no localStorage sempre que houver mudança
  useEffect(() => {
    if (!isLoaded) return; // evita salvar antes de carregar
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('books', JSON.stringify(books));
      }
    } catch (err) {
      console.error('Erro ao salvar livros no localStorage:', err);
    }
  }, [books, isLoaded]);

  // 🔹 Sincroniza entre abas/janelas do navegador
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'books' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setBooks(parsed);
          }
        } catch (err) {
          console.error('Erro ao sincronizar livros entre abas:', err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 🔹 Adiciona um novo livro (sem duplicar)
  const addBook = (book: Book) => {
    setBooks((prev) => {
      const exists = prev.some((b) => b.id === book.id);
      if (exists) return prev;
      const updated = [...prev, book];
      localStorage.setItem('books', JSON.stringify(updated)); // ✅ salva imediatamente
      return updated;
    });
  };

  // 🔹 Atualiza um livro existente
  const updateBook = (book: Book) => {
    setBooks((prev) => {
      const updated = prev.map((b) => (b.id === book.id ? book : b));
      localStorage.setItem('books', JSON.stringify(updated)); // ✅ salva imediatamente
      return updated;
    });
  };

  // 🔹 Remove um livro
  const removeBook = (id: string) => {
    setBooks((prev) => {
      const updated = prev.filter((b) => b.id !== id);
      localStorage.setItem('books', JSON.stringify(updated)); // ✅ salva imediatamente
      return updated;
    });
  };

  // 🔒 Evita renderizar antes do carregamento inicial
  if (!isLoaded) {
    return null;
  }

  return (
    <BooksContext.Provider value={{ books, addBook, updateBook, removeBook }}>
      {children}
    </BooksContext.Provider>
  );
};

// Hook para acessar o contexto
export const useBooks = (): BooksContextValue => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useBooks deve ser usado dentro de um BooksProvider');
  }
  return context;
};
