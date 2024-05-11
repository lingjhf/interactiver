<template>
  <div
    class='w-full h-32px bg-green-300 flex items-center'
    @pointerenter='onPointerenter'
  >
    <div
      class='bg-blue w-12px h-12px rounded-6px'
      @pointerdown.stop='dragHandler'
    />
  </div>
</template>

<script setup lang="ts">
import * as d3 from 'd3'
import { v4 as uuid } from 'uuid'

import { CanvasProviderKey } from './provider'
import { createDragHandler } from './utils'
const providerValue = inject(CanvasProviderKey)
if (!providerValue) {
  throw Error('Must be used with CanvasProvider')
}

const { addColumn } = providerValue
const key = uuid()

addColumn(key)

function onPointerenter() {
  console.log('ok')
}

const dragHandler = createDragHandler({
  start(event) {
    console.log(event.target)
  },
  move(event) {
    
  },
})

</script>
