# Vue Teleport Plus

> Giving super powers to Vue 3's `<teleport>` component

## What problem does this library solve?

## Installation

```js
import { createApp } from 'vue'
import TeleportPlus from '@linusborg/vue-teleport-plus'
import App from './App.vue'
import './index.css'

const app = createApp(App)

app.use(TeleportPlus, /* option see below */)
app.mount('#app')
```

## Basic Usage example

<!-- markdownlint-disable-next-line MD036 -->
**Source**

```html
<script>
  import { defineComponent } from 'vue'
  import VideoPlayer from './VideoPlayer.vue'
  export default defineComponent({
    name: 'MiniPlayer',
    components: {
      VideoPlayer,
    },
    data: () => ({
      active: false,
    })
  })
</script>
<template>
  <button>{{ active ? 'minimize' : 'maximize' }}</button>
  <TeleportSource to="videoOutlet" :disabled="!active">
    <VideoPlayer />
  </TeleportSource>
</template>
```

<!-- markdownlint-disable-next-line MD036 -->
**Outlet**

```html
<script>
  import { defineComponent } from 'vue'
  import VideoPlayer from './VideoPlayer.vue'
  export default defineComponent({
    name: 'MaximizedPlayer'
  })
</script>
<template>
  <div class="maximized-video">
    <TeleportOutlet name="videoOutlet">
  </div>
</template>
```

## Plugin Options

## `TeleportSource`

## `TeleportOutlet`
