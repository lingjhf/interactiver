<template>
  <foreignObject
    height='200'
    width='200'
    :x='position.x'
    :y='position.y'
    @pointerdown.stop='onPointerdown'
  >
    <div class='bg-blue-400'>
      <Button>+</Button>
    </div>
  </foreignObject>
</template>

<script setup lang="ts">
import { Draggable, Point } from '@interactiver/core'

const draggable = new Draggable()

const position = ref({ x: 0, y: 0 })

function onPointerdown(event: PointerEvent) {
  draggable.position.set(position.value)
  draggable.start(new Point({ x: event.offsetX, y: event.offsetY }))
  window.addEventListener('pointermove', onPointermove)
  window.addEventListener('pointerup', onPointerup)
}

function onPointermove(event: PointerEvent) {
  draggable.move(new Point({ x: event.offsetX, y: event.offsetY }))
  position.value = { x: draggable.position.x, y: draggable.position.y }
  console.log(position.value)
}

function onPointerup() {
  window.removeEventListener('pointermove', onPointermove)
  window.removeEventListener('pointerup', onPointerup)
}

</script>

<style scoped>

</style>
