export interface Book {
  id: string;
  title: string;
  author: string;
  year?: string;
  genre?: string;
  cover?: string;
  synopsis?: string;
  rating?: number;     // Avaliação em estrelas
  progress?: number;   // Percentual de leitura (0–100)
  status?: string;     // Lendo, Lido, Finalizado
  isbn?: string;
  reads?: number;      // Quantas vezes leu
  pages?: number;      // Total de páginas
}
