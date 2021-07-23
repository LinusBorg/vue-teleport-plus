<template>
  <nav>
    <h2 class="text-2xl font-serif mb-5">Demos</h2>
    <ul class="space-y-2">
      <li
        class="
          px-2
          hover:ml-2
          border-b-1 border-transparent
          hover:border-white
          transition-all
        "
      >
        <router-link to="/">Home</router-link>
      </li>
      <li
        class="
          px-2
          hover:ml-2
          border-b-1 border-transparent
          hover:border-white
          transition-all
        "
      >
        <router-link to="/single">Simple Teleport</router-link>
      </li>
      <li
        class="
          px-2
          hover:ml-2
          border-b-1 border-transparent
          hover:border-white
          transition-all
        "
      >
        <router-link to="/multiple">Multiple Teleports</router-link>
      </li>
      <li
        class="
          px-2
          hover:ml-2
          border-b-1 border-transparent
          hover:border-white
          transition-all
        "
      >
        <router-link to="/custom-outlet">Customizing Outlet</router-link>
      </li>
      <li class="px-2">Transition</li>
      <li class="px-2">Transition Group</li>
      <li class="px-2">Re-Ordering Items</li>
    </ul>
  </nav>
</template>
