<script setup lang="ts">
import { Bars3Icon } from "@heroicons/vue/24/outline";
</script>

<template>
  <div class="navbar bg-base-100 shadow-xl rounded-box">
    <div class="flex-none">
      <label for="main-drawer" class="btn btn-square btn-ghost lg:hidden">
        <Bars3Icon class="size-6" />
      </label>
    </div>
    <div class="flex-1">
      <NuxtLink href="/" class="btn btn-ghost text-xl">NanaLook</NuxtLink>
    </div>
    <div class="flex-none gap-x-2"></div>
  </div>
</template>
