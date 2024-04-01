<template>
  <div :ref='initInteractiveView' />
</template>

<script setup lang="ts">
import { InteractiveView } from '@interactiver/view'
import { ComponentPublicInstance } from 'vue'

let interactiveView: InteractiveView

function initInteractiveView(el: Element | ComponentPublicInstance | null) {
  interactiveView = new InteractiveView(el as HTMLElement)
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
