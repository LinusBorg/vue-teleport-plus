<template>
  <div class="flex mt-0 h-screen">
    <Navigation
      v-if="$route.name !== 'home'"
      class="flex-grow-0 w-50 bg-green-500 text-white px-3 py-10"
    />
    <div class="flex-grow px-10 py-3">
      <h1 class="mt-5 mb-5 text-3xl font-bold font-serif">
        {{ $route.meta.title }}
      </h1>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navigation from './components/Navigation.vue'
</script>

<style lang="postcss">
.router-link-active {
  @apply font-bold;
}
</style>
