<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'DemoCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  setup() {},
})
</script>
<template>
  <div data-name="card" class="border-1 border-gray-300 round-sm shadow-md p-3">
    <h2 class="text-2xl mt-2 mb-4">{{ title }}</h2>
    <p class="mb-4">
      <slot />
    </p>
    <router-link
      class="
        mb-4
        text-blue-500
        font-bold
        underline
        hover:-translate-y-0.5
        transform
        transition
        inline-block
      "
      :to="to"
    >
      Check out
    </router-link>
  </div>
</template>
<style lang="postcss"></style>
