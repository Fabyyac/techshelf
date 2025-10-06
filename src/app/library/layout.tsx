'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 overflow-hidden">
            {/* Espaço reservado para ícone ou mini logo se quiser */}
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
