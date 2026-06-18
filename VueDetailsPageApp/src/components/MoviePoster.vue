<script setup lang="ts">
import { computed } from 'vue'
import { getMovieImageUrl } from '@/services/movie'

const props = defineProps<{
  imageUrl: string
  title: string
}>()

const posterUrl = computed(() => getMovieImageUrl(props.imageUrl))
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
    <img
      :src="posterUrl"
      :alt="title"
      class="h-[360px] w-full rounded-xl object-cover shadow-md"
    />
  </div>
</template>
