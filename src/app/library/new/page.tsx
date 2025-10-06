"use client";

import { useState } from "react";
import { useBooks } from "@/context/BooksProvider";
import { useRouter } from "next/navigation";

export default function NewBookPage() {
  const { addBook } = useBooks();
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

    // Cria ID único para o novo livro
    const newBook = {
      id: Date.now().toString(),
      ...formData,
    };

    // Adiciona o livro no contexto (BooksProvider cuidará da persistência)
    addBook(newBook);

    // Aguarda o salvamento automático do contexto e redireciona
    setTimeout(() => {
      router.push("/library");
    }, 200);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">+ Novo Livro</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="author"
          placeholder="Autor"
          value={formData.author}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="year"
          type="number"
          placeholder="Ano de Publicação"
          value={formData.year}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="isbn"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="pages"
          type="number"
          placeholder="Quantidade de páginas"
          value={formData.pages}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="reads"
          type="number"
          placeholder="Quantidade de leituras"
          value={formData.reads}
          onChange={handleChange}
          className="w-full border p-2 rounded"
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

        <label className="block">
          Progresso (%):
          <input
            name="progress"
            type="number"
            min="0"
            max="100"
            value={formData.progress}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </label>

        <input
          name="cover"
          placeholder="URL da capa"
          value={formData.cover}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="synopsis"
          placeholder="Sinopse"
          value={formData.synopsis}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={4}
        />

        {/* Avaliação em estrelas */}
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

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Salvar
        </button>
      </form>
    </div>
  );
}
