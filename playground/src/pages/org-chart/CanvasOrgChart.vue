<template>
  <div
    ref='canvasRef'
    class='h-full w-full'
  />
</template>

<script setup lang="ts">
import { Cell, Edge, Node, Point } from '@interactiver/core'
import { D3Tree } from '@interactiver/view'
import { Application, Graphics, Text, Container, GraphicsPath, ICanvas, Color } from 'pixi.js'

import treeData from '../../data/tree.json'

const canvasRef = shallowRef<HTMLDivElement>()
const d3Tree = new D3Tree(getRootNode(treeData))

onMounted(async () => {
  const app = new Application()
  await app.init({ antialias: true, backgroundColor: 'white', resizeTo: canvasRef.value })
  canvasRef.value?.appendChild(app.canvas)
  d3Tree.layout({ rankdir: 'LR', nodesep: 50, ranksep: 100 })
  const container = new Container()
  for (const edge of d3Tree.edges) {
    const g = new Graphics().path(generateLRCurve(edge.edge))
    g.stroke({ width: 2, color: 0x666666 })
    container.addChild(g)
  }
  for (const node of d3Tree.nodes) {
    const frame = new Graphics({
      x: node.x,
      y: node.y,
    })
      .rect(0, 0, node.width, node.height)
      .fill(0x666666)
    const text = new Text({
      text: node.meta.name as string,
      x: 10,
      y: 10,
      style: {
        fontSize: 24,
        wordWrap: true,
        wordWrapWidth: 180,
      },
    })
    frame.addChild(text)
    container.addChild(frame)
  }
  container.scale.set(0.4, 0.4)

  const c = new Graphics().rect(0, 0, 100, 100).fill(0xff0000)
  const c2 = new Graphics().rect(0, 0, 100, 100).fill(0x00ff00)
  app.stage.addChild(c)
  app.stage.addChild(c2)
  app.stage.addChild(container)

  const blob = await getCanvasBlob(app.renderer.extract.canvas(c))
  const blob2 = await getCanvasBlob(app.renderer.extract.canvas(c2))
  if (blob && blob2) {
    const b = await mergeBlobs(blob, blob2)
  }
})

async function getCanvasBlob(canvas: ICanvas): Promise<Blob | undefined> {
  return new Promise((resolve, reject) => {
    canvas.toBlob?.((value) => {
      if (value) {
        resolve(value)
      }
      else {
        reject()
      }
    }, 'image/png')
  })
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

function generateCubicBezierPath(p0: Point, p1: Point, p2: Point, p3: Point): GraphicsPath {
  const path = new GraphicsPath()
  path.moveTo(p0.x, p0.y)
  path.bezierCurveTo(
    p1.x, p1.y,
    p2.x, p2.y,
    p3.x, p3.y,
  )
  return path
}

function generateLRCurve(edge: Edge<Cell>): GraphicsPath {
  const source = new Point({ x: edge.source.x + edge.source.width, y: edge.source.y + edge.source.height / 2 })
  const target = new Point({ x: edge.target.x, y: edge.target.y + edge.target.height / 2 })
  const centerPoint = source.centerOf(target)
  return generateCubicBezierPath(
    source,
    new Point({ x: centerPoint.x, y: source.y }),
    new Point({ x: centerPoint.x, y: target.y }),
    target,
  )
}

function mergeBlobs(blob1: Blob, blob2: Blob) {
  return new Promise((resolve, reject) => {
    const reader1 = new FileReader()
    reader1.onload = function (event) {
      const reader2 = new FileReader()
      reader2.onload = function (event2) {
        const uint8Array1 = new Uint8Array(event.target.result)
        const uint8Array2 = new Uint8Array(event2.target.result)

        // 创建一个新的Uint8Array，其长度是两个Blob数据之和
        const uint8Array = new Uint8Array(uint8Array1.length + uint8Array2.length)

        // 将第一个Blob的数据复制到新的Uint8Array中
        uint8Array.set(uint8Array1, 0)

        // 将第二个Blob的数据追加到新的Uint8Array中
        uint8Array.set(uint8Array2, uint8Array1.length)

        // 创建一个新的Blob对象
        const mergedBlob = new Blob([uint8Array], { type: 'image/png' }) // 根据需要更改类型
        resolve(mergedBlob)
      }
      reader2.readAsArrayBuffer(blob2)
    }
    reader1.readAsArrayBuffer(blob1)
  })
}
function autoDownloadBlob(name: string, blob: Blob) {
  const href = window.URL.createObjectURL(blob)
  autoDownloadHref(name, href)
}

function autoDownloadHref(name: string, href: string) {
  const downloadLink = document.createElement('a')
  downloadLink.href = href
  downloadLink.download = name
  document.body.appendChild(downloadLink)
  downloadLink.click()
  window.URL.revokeObjectURL(href)
  document.body.removeChild(downloadLink)
}

</script>
