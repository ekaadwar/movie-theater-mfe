import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getMovieById } from '@/services/movie'
import type { BookingPayload, Movie } from '@/types/movie'

export const useMovieDetailStore = defineStore('movie-detail', () => {
  const movie = ref<Movie | null>(null)
  const loading = ref(false)
  const error = ref('')
  const selectedDate = ref('01/02/2022')
  const selectedTime = ref('10 Am')
  const booking = ref<BookingPayload | null>(null)

  const isMovieAvailable = computed(() => movie.value !== null)

  async function fetchMovie(id: string | number) {
    try {
      loading.value = true
      error.value = ''
      movie.value = await getMovieById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch movie detail'
      movie.value = null
    } finally {
      loading.value = false
    }
  }

  function setSelectedDate(value: string) {
    selectedDate.value = value
  }

  function setSelectedTime(value: string) {
    selectedTime.value = value
  }

  function createBooking() {
    if (!movie.value) return null

    booking.value = {
      movieId: movie.value.id,
      movieName: movie.value.name,
      date: selectedDate.value,
      time: selectedTime.value
    }

    return booking.value
  }

  function resetBooking() {
    booking.value = null
  }

  return {
    movie,
    loading,
    error,
    selectedDate,
    selectedTime,
    booking,
    isMovieAvailable,
    fetchMovie,
    setSelectedDate,
    setSelectedTime,
    createBooking,
    resetBooking
  }
})
