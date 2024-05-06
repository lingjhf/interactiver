<template>
  <div class='flex h-full w-full'>
    <svg
      ref='interactiveRef'
      style='width: 100%;height: 100%;'
      xmlns='http://www.w3.org/2000/svg'
    >
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
          <text y='16'>{{ node.meta.name }}</text>
        </g>
      </g>
    </svg>
    <div class='w-300px'>
      <div>
        <a-button @click='exportSVG'>
          导出SVG
        </a-button>
      </div>
      <div class='pt-2'>
        <a-button @click='exportPDF'>
          导出PDF
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { Node } from '@interactiver/core'
import { svgToPdf } from '@interactiver/export-file'
import { D3Tree, D3TreeEdge, Container } from '@interactiver/view'

import treeData from '../../data/tree.json'

const containerRef = shallowRef<SVGGElement>()
const d3Tree = new D3Tree(getRootNode(treeData))

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
  d3Tree.layout({ rankdir: 'LR', nodesep: 50, ranksep: 100 })
  edges.value = d3Tree.edges
  nodes.value = d3Tree.nodes
}

function getRootNode(data: any) {
  const node = new Node({
    width: 150,
    height: 90, meta: { name: data.name } })
  if (Array.isArray(data.children)) {
    for (const child of data.children) {
      const childNode = getRootNode(child)
      node.add(childNode)
    }
  }
  return node
}

function exportSVG() {

}

async function exportPDF() {
  if (!interactiveRef.value) {
    return
  }
  const { x = 0, y = 0, width = 0, height = 0 } = canvasRef.value?.getBoundingClientRect() ?? {}
  // svgToPdf(interactiveRef.value, Math.round(x + width), Math.round(y + height))
}

</script>
