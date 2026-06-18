export interface Movie {
  id: number
  name: string
  description: string
  imageUrl: string
}

export interface BookingPayload {
  movieId: number
  movieName: string
  date: string
  time: string
}
