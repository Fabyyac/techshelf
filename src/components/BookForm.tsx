'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Book } from '../types/book';

type BookFormValues = {
  title: string;
  author: string;
  status: Book['status'];
  progress: number;
  notes?: string;
};

export default function BookForm({
  initial,
  onSubmit,
}: {
  initial?: Partial<BookFormValues>;
  onSubmit: (values: BookFormValues) => void;
}) {
  // useForm gerencia estado do formulário
  const { register, handleSubmit, setValue } = useForm<BookFormValues>({
    defaultValues: {
      title: '',
      author: '',
      status: 'to-read',
      progress: 0,
      notes: '',
      ...initial,
    },
  });

  // se initial mudar, atualiza os campos
  useEffect(() => {
    if (initial) {
      Object.entries(initial).forEach(([k, v]) => setValue(k as any, v as any));
    }
  }, [initial, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="block text-sm">Título</label>
        <input {...register('title', { required: true })} className="w-full border rounded px-2 py-1" />
      </div>

      <div>
        <label className="block text-sm">Autor</label>
        <input {...register('author', { required: true })} className="w-full border rounded px-2 py-1" />
      </div>

      <div className="flex gap-2">
        <div>
          <label className="block text-sm">Status</label>
          <select {...register('status')} className="border rounded px-2 py-1">
            <option value="to-read">Para Ler</option>
            <option value="reading">Lendo</option>
            <option value="finished">Finalizado</option>
          </select>
        </div>

        <div>
          <label className="block text-sm">Progresso</label>
          <input type="number" {...register('progress', { valueAsNumber: true, min: 0, max: 100 })} className="w-24 border rounded px-2 py-1" />
        </div>
      </div>

      <div>
        <label className="block text-sm">Notas</label>
        <textarea {...register('notes')} className="w-full border rounded px-2 py-1" />
      </div>

      <div>
        <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded">Salvar</button>
      </div>
    </form>
  );
}
