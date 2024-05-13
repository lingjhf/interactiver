<template>
  <svg
    ref='svgRef'
    class='touch-none select-none'
    xmlns='http://www.w3.org/2000/svg'
    @pointerdown='dragHandler'
    @wheel='onWheel'
  >
    <text
      x='10'
      y='10'
    >{{ edges }}</text>
    <g :transform='`translate(${groupPosition.x},${groupPosition.y}) scale(${groupScale})`'>
      <slot />
      <path
        v-for='[key,d] in edges.entries()'
        :key='key'
        :d='d'
        stroke='blue'
        stroke-width='1'
      />
      <path
        v-if='currentEdgeString'
        :d='currentEdgeString.toString()'
        stroke='blue'
        stroke-width='1'
      />
    </g>
  </svg>
</template>

<script setup lang="ts">

import { CanvasProviderKey } from './provider'
import { createDragHandler } from './utils'
import { Draggable, Edge, Point, Scale, Node } from '../../core'

const draggable = new Draggable()
const scale = new Scale()

const svgRef = shallowRef<SVGSVGElement>()
const svgRect = { x: 0, y: 0, width: 0, height: 0 }
const groupPosition = ref({ x: 0, y: 0 })
const groupScale = ref(1)
const edges = ref(new Map<string, string>())
const currentEdgeString = ref('')

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
    draggable.start(getEventGlobalPosition(event))
  },
  move(event) {
    draggable.move(getEventGlobalPosition(event))
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
    getEventGlobalPosition(event),
  )
}

function getEventGlobalPosition(event: PointerEvent | MouseEvent): Point {
  return getGlobalPosition(new Point({ x: event.pageX, y: event.pageY }))
}

function getGlobalPosition(point: Point): Point {
  return new Point({ x: point.x - svgRect.x, y: point.y - svgRect.y })
}

function setCurrentEdge(edge?: Edge<Node>) {
  if (edge) {
    currentEdgeString.value = edge.path().toString()
  }
  else {
    currentEdgeString.value = ''
  }
}

provide(CanvasProviderKey, {
  scale,
  edges,
  setCurrentEdge,
  getEventGlobalPosition,
  getGlobalPosition,
})
</script>
