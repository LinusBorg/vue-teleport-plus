<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'CustomOutlet',
  setup() {
    return {
      toggle: ref(false),
    }
  },
})
</script>
<template>
  <DemoWrapper>
    <template #left>
      <h2 class="mb-4 text-2xl font-bold">Sources</h2>
      <Button @click="toggle = !toggle">Toggle</Button>
      <div>
        <TeleportSource to="custom-outlet-tag" :disabled="toggle">
          Test 123 I should be in a list element!
        </TeleportSource>
        <br />
        <TeleportSource to="custom-outlet-wrapper" :disabled="toggle">
          Test 123 I should be in a list element!
        </TeleportSource>
      </div>
    </template>
    <template #right>
      <h2 class="mb-4 text-2xl font-bold">Tag Prop</h2>
      <ul class="list-disc list-inside">
        <li>The list element below is created by an TeleportOutlet</li>
        <TeleportOutlet name="custom-outlet-tag" tag="li" />
      </ul>
      <hr class="mt-3 mb-4" />
      <h2 class="mb-4 text-2xl font-bold">Wrapper Slot</h2>
      <p>
        The content below was wrapped in a Card component through the wrapper
        prop.
      </p>
      <ul class="list-disc list-inside">
        <TeleportOutlet name="custom-outlet-wrapper">
          <template #wrapper="props">
            <li
              v-bind="props"
              v-show="props.enabled"
              :data-teleport-plus="props.dataTeleportPlus"
              class=""
            ></li>
          </template>
        </TeleportOutlet>
      </ul>
    </template>
  </DemoWrapper>
</template>
<style lang="postcss"></style>
