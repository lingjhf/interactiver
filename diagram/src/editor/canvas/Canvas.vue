<template>
  <svg
    ref='svgRef'
    class='touch-none'
    xmlns='http://www.w3.org/2000/svg'
    @pointerdown='dragHandler'
    @wheel='onWheel'
  >
    <text
      x='10'
      y='10'
    >{{ columnMap }}</text>
    <g :transform='`translate(${groupPosition.x},${groupPosition.y}) scale(${groupScale})`'>
      <slot />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { Draggable, Point, Scale } from '@interactiver/core'

import { CanvasProviderKey } from './provider'
import { createDragHandler } from './utils'

const draggable = new Draggable()
const scale = new Scale()

const svgRef = shallowRef<SVGSVGElement>()
const svgRect = { x: 0, y: 0, width: 0, height: 0 }
const groupPosition = ref({ x: 0, y: 0 })
const groupScale = ref(1)
const columnMap = ref(new Map<string, { source: string, target?: string, path: string, }[]>())

onMounted(() => {
  if (svgRef.value) {
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        const rect = entry.target.getBoundingClientRect()
        svgRect.x = rect.x
        svgRect.y = rect.y
        svgRect.width = rect.width
        svgRect.height = rect.height
      }
    })
    resizeObserver.observe(svgRef.value)
  }
})

const dragHandler = createDragHandler({
  start(event) {
    draggable.position.set(groupPosition.value)
    draggable.start(getOffsetGlobalPosition(event))
  },
  move(event) {
    draggable.move(getOffsetGlobalPosition(event))
    groupPosition.value = { x: draggable.position.x, y: draggable.position.y }
  },
})

function onWheel(event: WheelEvent) {
  const source = new Scale(scale)
  if (event.deltaY > 0) {
    scale.in(1.1)
  }
  else {
    scale.out(1.1)
  }
  groupScale.value = scale.x
  groupPosition.value = Scale.focusZoom(
    source,
    scale,
    new Point({ x: groupPosition.value.x, y: groupPosition.value.y }),
    getOffsetGlobalPosition(event),
  )
}

function getOffsetGlobalPosition(event: PointerEvent | MouseEvent): Point {
  return new Point({ x: event.pageX - svgRect.x, y: event.pageY - svgRect.y })
}

function addColumn(key: string) {
  columnMap.value.set(key, [])
}

provide(CanvasProviderKey, {
  scale,
  getOffsetGlobalPosition,
  addColumn,
})
</script>
