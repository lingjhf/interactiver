<template>
  <div
    ref='interactiveRef'
    class='w-full h-full bg-green-400 '
  >
    <div
      ref='canvasRef'
      class='w-300px h-300px bg-blue-500 origin-top-left'
    >
      <div class='w-10px h-10px bg-black absolute left-10 top-10' />
    </div>
  </div>
</template>

<script setup lang="ts">
import { InteractiveView, Interactive } from '@interactiver/view'

let interactiveView: InteractiveView

const interactiveRef = shallowRef<HTMLDivElement>()
const canvasRef = shallowRef<HTMLDivElement>()

onMounted(() => {
  if (interactiveRef.value && canvasRef.value) {
    interactiveView = new InteractiveView(canvasRef.value, new Interactive(interactiveRef.value)).render()
  }
})

</script>

<style scoped></style>
