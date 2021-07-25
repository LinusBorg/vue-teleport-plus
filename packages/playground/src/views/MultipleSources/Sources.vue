<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  name: 'SourcesForMultipleDemo',
  setup() {
    const sources = reactive({
      source1: true,
      source2: false,
      source3: true,
    })
    return {
      sources,
    }
  },
})
</script>
<template>
  <h3 class="text-xl font-bold mb-4" data-test="source-h1">Sources</h3>
  <p class="mb-2">
    Below you find 3 different TeleportSources that all teleport content to the
    right, into the same one TeleportOutlet.
  </p>
  <p class="mb-2">
    You can switch them on and off with the provided checkboxes. When a box is
    unchecked, the content will render below. When it's checked, the content
    will be moved to the right.
  </p>
  <p class="mb-2">
    Note that the items are ordered differently on the right: 2,3,1. That's
    achieved through the 'order' prop.
  </p>
  <div data-name="controls" class="flex justify-around">
    <label for="source1-cb">
      <input
        v-model="sources.source1"
        type="checkbox"
        name="source1"
        id="source1-cb"
      />
      Source #1
    </label>
    <label for="source2-cb">
      <input
        v-model="sources.source2"
        type="checkbox"
        name="source2"
        id="source2-cb"
      />
      Source #2
    </label>
    <label for="source3-cb">
      <input
        v-model="sources.source3"
        type="checkbox"
        name="source3"
        id="source3-cb"
      />
      Source #3
    </label>
  </div>
  <hr class="mt-2 mb-4" />
  <div class="grid grid-cols-1 gap-3">
    <TeleportSource
      to="outlet-multiple"
      name="mSource1"
      :disabled="!sources.source1"
      :order="3"
    >
      <p>Content from Source 1</p>
    </TeleportSource>
    <TeleportSource
      to="outlet-multiple"
      name="mSource2"
      :disabled="!sources.source2"
      :order="1"
    >
      <p>Content from Source 2</p>
    </TeleportSource>
    <TeleportSource
      to="outlet-multiple"
      name="mSource3"
      :disabled="!sources.source3"
      :order="2"
    >
      <p>Content from Source 3</p>
    </TeleportSource>
  </div>
</template>
<style lang="postcss"></style>
