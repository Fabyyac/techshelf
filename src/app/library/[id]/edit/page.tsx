'use client';

import { useParams, useRouter } from "next/navigation";
import { useBooks } from "@/context/BooksProvider";
import { useState, useEffect } from "react";

export default function EditBookPage() {
  const { id } = useParams();
  const { books, updateBook } = useBooks(); // ✅ usamos updateBook do Provider
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    genre: "Programação",
    cover: "",
    synopsis: "",
    rating: 0,
    progress: "",
    status: "Lendo",
    isbn: "",
    reads: "",
    pages: "",
  });

  useEffect(() => {
    const storedBooks = books;
    const book = storedBooks.find((b: any) => String(b.id) === String(id));
    if (book) setFormData(book);
  }, [books, id]);

  const bookExists = books.some((b) => String(b.id) === String(id));
  if (!bookExists) return <p>Livro não encontrado.</p>;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (value: number) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Atualiza o livro via Provider
    updateBook({ ...formData, id });

    // ✅ Redireciona para a biblioteca
    router.push("/library");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Editar Livro</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
          placeholder="Título do livro"
        />
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
          placeholder="Autor"
        />
        <input
          name="year"
          type="number"
          value={formData.year}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Ano"
        />
        <input
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="ISBN"
        />
        <input
          name="pages"
          type="number"
          value={formData.pages}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Páginas"
        />
        <input
          name="reads"
          type="number"
          value={formData.reads}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Leituras"
        />
        <select
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option>Programação</option>
          <option>Informática</option>
          <option>Engenharia de Software</option>
          <option>Banco de Dados</option>
          <option>Rede de Computadores</option>
          <option>Outros</option>
        </select>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option>Lendo</option>
          <option>Ler</option>
          <option>Finalizado</option>
        </select>
        <input
          name="progress"
          type="number"
          min="0"
          max="100"
          value={formData.progress}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Progresso (%)"
        />
        <input
          name="cover"
          value={formData.cover}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="URL da capa"
        />
        <textarea
          name="synopsis"
          value={formData.synopsis}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={4}
          placeholder="Sinopse"
        />
        <div>
          <p className="font-medium">Avaliação:</p>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRating(star)}
                className={`cursor-pointer text-2xl ${
                  formData.rating >= star ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
