<template>
  <foreignObject
    height='200'
    width='200'
    :x='position.x'
    :y='position.y'
    @pointerdown.stop='dragHandler'
  >
    <div class='bg-blue-400 h-full '>
      <slot />
    </div>
  </foreignObject>
</template>

<script setup lang="ts">
import { Draggable } from '@interactiver/core'

import { CanvasProviderKey } from './provider'
import { createDragHandler } from './utils'

const providerValue = inject(CanvasProviderKey)
if (!providerValue) {
  throw Error('Must be used with CanvasProvider')
}

const { scale, getOffsetGlobalPosition } = providerValue

const draggable = new Draggable({ scale })

const position = ref({ x: 0, y: 0 })

const dragHandler = createDragHandler({
  start(event) {
    draggable.position.set(position.value)
    draggable.start(getOffsetGlobalPosition(event))
  },
  move(event) {
    draggable.move(getOffsetGlobalPosition(event))
    position.value = { x: draggable.position.x, y: draggable.position.y }
  },
})

</script>
