<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import MoviePoster from '@/components/MoviePoster.vue'
import { useMovieDetailStore } from '@/stores/movieDetail'

const route = useRoute()
const movieDetailStore = useMovieDetailStore()

const movieId = computed(() => String(route.params.id ?? '1'))

const dateOptions = ['01/02/2022', '02/02/2022', '03/02/2022', '04/02/2022', '05/02/2022']
const timeOptions = ['10 Am', '12:30 PM', '4 PM', '8 PM', '9:30 PM']

onMounted(() => {
  movieDetailStore.fetchMovie(movieId.value)
})

watch(movieId, (id) => {
  movieDetailStore.fetchMovie(id)
})

function handleBookMovie() {
  const booking = movieDetailStore.createBooking()
  console.log({ booking })
}
</script>

<template>
  <main class="min-h-screen bg-slate-100 px-6 py-10 text-slate-900">
    <section class="mx-auto max-w-6xl rounded-3xl bg-white p-6 shadow-xl md:p-8">
      <div class="mb-8 flex flex-col gap-2 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Movie Detail
          </p>
          <h1 class="mt-2 text-3xl font-bold md:text-4xl">
            Book Your Movie
          </h1>
        </div>

        <span class="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
          Vue 3 Remote Page
        </span>
      </div>

      <div v-if="movieDetailStore.loading" class="rounded-2xl bg-slate-50 p-10 text-center text-slate-500">
        Loading movie detail...
      </div>

      <div v-else-if="movieDetailStore.error" class="rounded-2xl bg-red-50 p-10 text-center text-red-600">
        {{ movieDetailStore.error }}
      </div>

      <div v-else-if="movieDetailStore.movie" class="grid gap-8 lg:grid-cols-[320px_1fr]">
        <MoviePoster
          :title="movieDetailStore.movie.name"
          :image-url="movieDetailStore.movie.imageUrl"
        />

        <div class="flex flex-col justify-between gap-8">
          <div>
            <h2 class="text-3xl font-bold text-slate-950">
              {{ movieDetailStore.movie.name }}
            </h2>
            <p class="mt-4 leading-8 text-slate-600">
              {{ movieDetailStore.movie.description }}
            </p>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 class="text-lg font-semibold text-slate-950">
              Booking Information
            </h3>

            <div class="mt-5 grid gap-4 md:grid-cols-2">
              <label class="block">
                <span class="mb-2 block text-sm font-medium text-slate-600">Select Date</span>
                <select
                  v-model="movieDetailStore.selectedDate"
                  class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option v-for="item in dateOptions" :key="item" :value="item">
                    {{ item }}
                  </option>
                </select>
              </label>

              <label class="block">
                <span class="mb-2 block text-sm font-medium text-slate-600">Select Time</span>
                <select
                  v-model="movieDetailStore.selectedTime"
                  class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option v-for="item in timeOptions" :key="item" :value="item">
                    {{ item }}
                  </option>
                </select>
              </label>
            </div>

            <button
              type="button"
              class="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 active:scale-[0.99] md:w-auto"
              @click="handleBookMovie"
            >
              Book Now
            </button>

            <div
              v-if="movieDetailStore.booking"
              class="mt-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700"
            >
              Booking created for
              <strong>{{ movieDetailStore.booking.movieName }}</strong>
              on {{ movieDetailStore.booking.date }} at {{ movieDetailStore.booking.time }}.
            </div>
          </div>
        </div>
      </div>

      <div v-else class="rounded-2xl bg-slate-50 p-10 text-center text-slate-500">
        Movie not found.
      </div>
    </section>
  </main>
</template>
