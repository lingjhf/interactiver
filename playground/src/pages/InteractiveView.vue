<template>
  <div
    ref='interactiveRef'
    class='w-full h-full '
  >
    <div
      ref='canvasRef'
      class='w-300px h-300px bg-blue-500 origin-top-left relative'
    >
      <div class='w-10px h-10px bg-black absolute left-10 top-10' />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Container } from '@interactiver/view'

let interactive: Container
let content: Container

const interactiveRef = shallowRef<HTMLDivElement>()
const canvasRef = shallowRef<HTMLDivElement>()

onMounted(() => {
  if (interactiveRef.value && canvasRef.value) {
    interactive = new Container(interactiveRef.value, { draggable: true, wheelZoom: true })
    content = new Container(canvasRef.value)
    interactive.on('drag', () => {
      renderCanvas()
    })
    interactive.on('zoom', () => {
      renderCanvas()
    })
  }
})

function renderCanvas() {
  content.position.set(interactive.position)
  content.zoom.set(interactive.zoom)
  content.render()
}

</script>

<style scoped></style>
