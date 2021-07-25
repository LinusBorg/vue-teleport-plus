<template>
  <div class="grid grid-cols-3 gap-5">
    <DemoCard title="Single Teleport" to="/single">
      This demonstrates basic Usage with a single Teleport
    </DemoCard>
    <DemoCard title="Multiple Sources" to="/multiple">
      Teleporting content from multiple sources to the same outlet.
    </DemoCard>
    <DemoCard title="Customizing Outlet Elements" to="/custom-outlet">
      Teleports need a wrapper element to mount into. The elements created by
      TeleportOutlet can be customized through a tag prop and a wrapper slot.
    </DemoCard>
    <DemoCard title="Transitioning Portal Content" to="/transitions">
      Teleports need a wrapper element to mount into. The elements created by
      TeleportOutlet can be customized through a tag prop and a wrapper slot.
    </DemoCard>
  </div>
</template>
