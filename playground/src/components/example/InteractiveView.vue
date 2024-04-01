<template>
  <div
    :ref='initInteractiveView'
    class='w-full h-full'
  />
</template>

<script setup lang="ts">
import { InteractiveView } from '@interactiver/view'
import { ComponentPublicInstance } from 'vue'
let interactiveView: InteractiveView

function initInteractiveView(el: Element | ComponentPublicInstance | null) {
  interactiveView = new InteractiveView(el as HTMLElement)
}

</script>

<style scoped></style>
