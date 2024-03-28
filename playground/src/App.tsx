import { TreeLayoutNode } from '@interactiver/core'
import { InteractiveView, Container, createElement, Tree, createCurve } from '@interactiver/view'
import * as d3 from 'd3'

import { generateTree } from './utils'

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
    interactiveView = new InteractiveView(el)
    interactiveView.zoom.setAll(0.1)
    interactiveView.element.innerHTML = ''
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

export default App
