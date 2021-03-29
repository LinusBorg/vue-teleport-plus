<script lang="ts">
import { defineComponent } from 'vue'
import Sources from './MultipleSources/Sources.vue'
export default defineComponent({
  name: 'MultipleSources',
  components: {
    Sources,
  },
  setup() {},
})
</script>
<template>
  <DemoWrapper>
    <template #left>
      <Sources />
    </template>
    <template #right>
      <div class="min-w-48">
        <h2 class="text-2xl font-bold mb-4">Outlet</h2>
        <hr class="mt-2 mb-4" />
        <TeleportOutlet name="outlet-multiple" />
      </div>
    </template>
  </DemoWrapper>
</template>
<style lang="postcss"></style>
