// src/app/layout.tsx
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import { BooksProvider } from '@/context/BooksProvider'; // 🔹 Importa o contexto global

export const metadata = {
  title: 'BookShelf',
  description: 'Gerenciador pessoal de livros',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-sky-50"> {/* fundo azul clarinho */}
        {/* 🔹 Envolve TODO o app dentro do BooksProvider */}
        <BooksProvider>
          <div className="max-w-6xl mx-auto p-4">
            <header className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                {/* Logo responsiva */}
                <div className="w-48 sm:w-60 md:w-72 lg:w-80">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={488}
                    height={128}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              <nav className="space-x-4 text-sm">
                <Link href="/">Dashboard</Link>
                <Link href="/library">Biblioteca</Link>
                <Link href="/library/new" className="font-semibold">+ Novo</Link>
              </nav>
            </header>

            <main>{children}</main>
          </div>
        </BooksProvider>
      </body>
    </html>
  );
}
