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
import { SvgExporter, elementToString, autoDownloadBlob } from '@interactiver/utils'
import { D3Tree, D3TreeEdge, Container } from '@interactiver/view'
import { Canvg } from 'canvg'
import '../../plugins/blob-stream'
import '../../plugins/pdfkit.standalone'

import TestPng0 from './test0.png'
import TestPng1 from './test1.png'
import TestPng2 from './test2.png'
import TestPng3 from './test3.png'
import TestPng4 from './test4.png'
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
  svgToPdf(interactiveRef.value, Math.round(x + width), Math.round(y + height))
}

function svgToPdf(root: globalThis.Node, width: number, height: number) {
  const pdfPageSize = { width: 595.28, height: 841.89 }
  const chunkHeight = width / pdfPageSize.width * pdfPageSize.height
  const overflowHeight = height % chunkHeight
  const chunks = Array.from({ length: Math.floor(height / chunkHeight) }, () => chunkHeight)
  if (overflowHeight > 0) {
    chunks.push(overflowHeight)
  }
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }
  const doc = new PDFDocument({ size: 'A4' })
  const stream = doc.pipe(blobStream())
  const svg = new XMLSerializer().serializeToString(root)
  const canvg = Canvg.fromString(ctx, svg)
  let offsetY = 0
  for (let i = 0; i < chunks.length; i++) {
    if (i > 0) {
      doc.addPage({ size: 'A4' })
    }
    const chunkH = chunks[i]
    canvg.resize(width, chunkH)
    canvg.start({ offsetY: 0 - offsetY })
    offsetY += chunkH
    doc.image(canvas.toDataURL('image/png'), 0, 0, {
      width: pdfPageSize.width,
      height: pdfPageSize.height,
    })
  }
  doc.end()
  stream.on('finish', function () {
    const blob = stream.toBlob('application/pdf')
    autoDownloadBlob('test', blob)
  })
  canvg.stop()
}

</script>
