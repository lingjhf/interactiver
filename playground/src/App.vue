<template>
  <div class='w-screen h-screen flex'>
    <div class='w-250px flex-shrink-0 bg-[rgba(var(--v-theme-surface))]'>
      <Sidebar />
    </div>
    <v-divider
      vertical
    />
    <div class='w-full'>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
