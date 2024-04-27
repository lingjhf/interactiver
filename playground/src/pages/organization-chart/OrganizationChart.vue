<template>
  <div class='flex h-full w-full'>
    <div class='flex flex-col w-full'>
      <v-tabs
        v-model='tab'
        class=' flex-shrink-0'
      >
        <v-tab value='html'>
          html
        </v-tab>
        <v-tab value='svg'>
          svg
        </v-tab>
      </v-tabs>
      <svg-org-chart
        ref='svgRef'
        @tree-change='onTreeChange'
      />
    </div>
    <v-divider
      vertical
    />
    <div class='w-300px flex-shrink-0 flex flex-col p-2'>
      <v-btn @click='exportImage'>
        导出图片
      </v-btn>
      <v-btn class='mt-2'>
        导出pdf
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">

import { Canvg } from 'canvg'

import SvgOrgChart from './SvgOrgChart.vue'
const tab = ref('html')
const svgRef = shallowRef<InstanceType<typeof SvgOrgChart>>()
let treeElement: SVGGElement | undefined

function onTreeChange(value: SVGGElement) {
  treeElement = value
}

function getTreeSize(): { width: number, height: number, } {
  const { x = 0, y = 0, width = 0, height = 0 } = treeElement?.getBoundingClientRect() ?? {}
  return { width: x + width, height: y + height }
}

async function exportImage() {
  const { width, height } = getTreeSize()

  const svgEl = svgRef.value?.$el as SVGElement
  new SvgToImage(svgEl, width, height).export('org')
}

class SvgToImage {
  constructor(element: Element, width: number, height: number) {
    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(element)
    const ctx = this._canvas.getContext('2d')!
    this._canvas.width = width
    this._canvas.height = height
    this._canvg = Canvg.fromString(ctx, svgString)
  }

  private _canvg: Canvg

  private _canvas = document.createElement('canvas')

  export(name: string, type = 'image/png') {
    this._canvg.start()
    this._canvas.toBlob((blob) => {
      if (!blob) return
      this._download(name, window.URL.createObjectURL(blob))
    }, type)
  }

  private _download(name: string, href: string) {
    const downloadLink = document.createElement('a')
    downloadLink.href = href
    downloadLink.download = name
    document.body.appendChild(downloadLink)
    downloadLink.click()
    window.URL.revokeObjectURL(href)
    document.body.removeChild(downloadLink)
  }
}

</script>

<!--
import { TreeLayoutNode } from '@interactiver/core'
import { InteractiveView, Container, createElement, Tree, createCurve } from '@interactiver/view'
import * as d3 from 'd3'

import { generateTree } from './utils'

function createShadow() {
  const filter = d3.create('svg:filter').attr('id', 'drop-shadow').attr('x', '-20%').attr('y', '-20%').attr('width', 100).attr('height', 70)
  const shadow = d3.create('svg:feDropShadow').attr('dx', 4).attr('dy', 4).attr('stdDeviation', 4).attr('flood-color', '#000000').attr('flood-opacity', 0.4)
  filter.append(() => shadow.node())
  return filter
}

function App() {
  let interactiveView: InteractiveView

  const tree = new Tree(
    {
      renderNode(node) {
        const container = new Container({ id: node.id, x: node.x, y: node.y, width: node.width, height: node.height })
        const background = createElement('rect')
        background.setAttribute('width', `${container.width}px`)
        background.setAttribute('height', `${container.height}px`)
        background.setAttribute('fill', '#fff')
        background.setAttribute('filter', 'url(#drop-shadow)')
        container.element.appendChild(background)
        const text = createElement('text')
        text.innerHTML = node.id
        container.element.appendChild(text)
        const path = d3.path()
        path.arc(node.width, node.height / 2, 8, 0, Math.PI * 2)
        const expandBtn = createElement('path')

        expandBtn.setAttribute('d', path.toString())
        if (node.expand) {
          expandBtn.setAttribute('stroke', '#bdbdbd')
          expandBtn.setAttribute('stroke-width', '2')
          expandBtn.setAttribute('fill', '#ffffff')
        }
        else {
          expandBtn.setAttribute('fill', '#bdbdbd')
        }
        expandBtn?.addEventListener('pointerdown', () => {
          node.setExpand(!node.expand)
          const sourceX = node.x
          const sourceY = node.y
          resetTreeLayout()
          const targetX = node.x
          const targetY = node.y
          interactiveView.position.set({
            x: interactiveView.position.x - (targetX - sourceX) * interactiveView.zoom.x,
            y: interactiveView.position.y - (targetY - sourceY) * interactiveView.zoom.x,
          })
        })
        container.element.appendChild(expandBtn)
        return container.element
      },
      renderEdge(edge) {
        const line = createCurve('LR', edge)
        line.setAttribute('stroke-width', '2')
        line.setAttribute('stroke', '#000')
        return line
      },
    })
  const res = generateTree(tree.layout, 5)
  tree.layout.add(res[0])
  function initInteractiveView(el: HTMLDivElement) {
    const shadow = createShadow()

    interactiveView = new InteractiveView(el)
    interactiveView.zoom.setAll(0.1)
    interactiveView.element.innerHTML = ''
    interactiveView.element.appendChild(shadow.node()!)
    interactiveView.element.append(...tree.autoLayout({ rankdir: 'LR', nodesep: 100, ranksep: 1000 }).elements)
  }

  function resetTreeLayout() {
    interactiveView.element.innerHTML = ''
    interactiveView.element.append(...tree.autoLayout({ rankdir: 'LR', nodesep: 100, ranksep: 1000 }).elements)
  }

  return (
    <div class='h-2000px w-2000px'>
      <div class='h-screen' ref={initInteractiveView}>
      </div>
    </div>
  )
}

export default App -->
