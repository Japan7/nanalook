<template>
  <div class="drawer lg:drawer-open">
    <input id="main-drawer" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content">
      <div class="mt-2 mx-2">
        <Navbar infos="{infos!}" />
      </div>
      <main class="container flex flex-col p-4">
        <slot />
      </main>
    </div>

    <div class="drawer-side z-10">
      <label
        for="main-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      />
      <Sidebar />
    </div>
  </div>
</template>
