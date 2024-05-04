<template>
  <div>
    <div
      v-for='item in treeNodes'
      :key='item.id'
      class=' absolute bg-blue-400'
      :style='{width:`${item.width}px`,height:`${item.height}px`,left:`${item.x}px`,top:`${item.y}px`}'
    />
    <div />
  </div>
</template>

<script setup lang="ts">
import { Container, D3Tree } from '@interactiver/view'

let interactive: Container
let content: Container

const interactiveRef = shallowRef<HTMLDivElement>()
const canvasRef = shallowRef<HTMLDivElement>()
const treeNodes = ref<Node[]>([])

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

<style scoped>

</style>
