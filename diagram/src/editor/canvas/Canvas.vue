<template>
  <svg
    class='touch-none'
    xmlns='http://www.w3.org/2000/svg'
    @pointerdown='onPointerdown'
    @wheel='onWheel'
  >
    <g :transform='`translate(${groupPosition.x},${groupPosition.y}) scale(${groupScale})`'>
      <slot />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { Draggable, Point, Scale } from '@interactiver/core'

const draggable = new Draggable()
const scale = new Scale()

const groupPosition = ref({ x: 0, y: 0 })
const groupScale = ref(1)

function onPointerdown(event: PointerEvent) {
  draggable.position.set(groupPosition.value)
  draggable.start(new Point({ x: event.offsetX, y: event.offsetY }))
  window.addEventListener('pointermove', onPointermove)
  window.addEventListener('pointerup', onPointerup)
}

function onPointermove(event: PointerEvent) {
  draggable.move(new Point({ x: event.offsetX, y: event.offsetY }))
  groupPosition.value = { x: draggable.position.x, y: draggable.position.y }
}

function onPointerup() {
  window.removeEventListener('pointermove', onPointermove)
  window.removeEventListener('pointerup', onPointerup)
}

function onWheel(event: WheelEvent) {
  const source = new Scale(scale)
  if (event.deltaY > 0) {
    scale.in(1.1)
  }
  else {
    scale.out(1.1)
  }
  groupScale.value = scale.x
  groupPosition.value = Scale.focusZoom(source, scale, new Point({ x: groupPosition.value.x, y: groupPosition.value.y }), new Point({ x: event.offsetX, y: event.offsetY }))
}

</script>
