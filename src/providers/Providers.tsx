'use client';

import React from 'react';
import * as BooksModule from '@/context/BooksProvider';

/**
 * Seleciona o BooksProvider exportado, seja como named export ou default export.
 * Mantém compatibilidade com diferentes formas de exportação.
 */
const ActualBooksProvider =
  (BooksModule as any).BooksProvider ??
  (BooksModule as any).default ??
  null;

export default function Providers({ children }: { children: React.ReactNode }) {
  if (!ActualBooksProvider) {
    console.error("❌ BooksProvider não encontrado em '@/context/BooksProvider'. Verifique o arquivo.");
    return (
      <div style={{ color: 'red', padding: '1rem', textAlign: 'center' }}>
        Erro: BooksProvider não encontrado.
      </div>
    );
  }

  try {
    return <ActualBooksProvider>{children}</ActualBooksProvider>;
  } catch (err) {
    console.error('❌ Erro ao renderizar o BooksProvider:', err);
    return (
      <div style={{ color: 'red', padding: '1rem', textAlign: 'center' }}>
        Erro ao inicializar o contexto dos livros.
      </div>
    );
  }
}
