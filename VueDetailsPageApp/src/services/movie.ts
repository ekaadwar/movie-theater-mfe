import type { Movie } from '@/types/movie'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5555'

export async function getMovieById(id: string | number): Promise<Movie> {
  const response = await fetch(`${API_URL}/movies/${id}`)

  if (!response.ok) {
    throw new Error('Movie not found')
  }

  return response.json() as Promise<Movie>
}

export function getMovieImageUrl(imageUrl: string): string {
  return `${API_URL}/images/${imageUrl}`
}
