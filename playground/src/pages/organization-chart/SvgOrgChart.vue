<template>
  <svg
    ref='interactiveRef'
    style='width: 100%;height: 100%;'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect
      fill='black'
      height='100%'
      width='100%'
    />
    <g ref='canvasRef'>
      <path
        v-for='edge of edges'
        :key='edge.edge.target.id'
        :d='edge.d'
        fill='none'
        stroke='white'
        stroke-width='2'
      />
      <g
        v-for='node of nodes'
        :key='node.id'
        :transform='`translate(${node.x},${node.y})`'
      >
        <rect
          fill='white'
          :height='node.height'
          :width='node.width'
        />
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">

import { Node } from '@interactiver/core'
import { D3Tree, D3TreeEdge, Container } from '@interactiver/view'

import { generateTree } from '../../utils'

const emit = defineEmits<{
  treeChange: [value: SVGGElement],
}>()

const containerRef = shallowRef<SVGGElement>()
const root = generateTree(5)
const d3Tree = new D3Tree(root)

const edges = ref<D3TreeEdge[]>([])
const nodes = ref<Node[]>([])
const interactiveRef = shallowRef<SVGElement>()
const canvasRef = shallowRef<SVGGElement>()

onMounted(() => {
  initInteractive()
})

function initInteractive() {
  if (interactiveRef.value && canvasRef.value) {
    const interactive = new Container(interactiveRef.value, { draggable: true, wheelZoom: true })
    const content = new Container(canvasRef.value)
    interactive.on('drag', () => {
      renderCanvas()
    })
    interactive.on('zoom', () => {
      renderCanvas()
    })
    function renderCanvas() {
      content.position.set(interactive.position)
      content.zoom.set(interactive.zoom)
      content.render()
    }
  }
  if (containerRef) {
    resetTree()
  }
}

function resetTree() {
  d3Tree.layout({ rankdir: 'LR', nodesep: 100, ranksep: 1000 })
  edges.value = d3Tree.edges
  nodes.value = d3Tree.nodes
  if (canvasRef.value) {
    nextTick(() => {
      canvasRef.value && emit('treeChange', canvasRef.value)
    })
  }
}

</script>
