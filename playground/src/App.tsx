import { generateLRCurve } from '@interactiver/core'
import { InteractiveView, Container, createElement, Tree } from '@interactiver/view'

import { generateTree } from './utils'

function App() {
  const tree = new Tree(layout => generateTree(layout, 5), {
    renderNode(node) {
      const container = new Container({ id: node.id, x: node.x, y: node.y, width: node.width, height: node.height })
      const background = createElement('rect')
      background.setAttribute('width', `${container.width}px`)
      background.setAttribute('height', `${container.height}px`)
      background.setAttribute('color', 'blue')
      container.element.appendChild(background)
      return container.element
    },
    renderEdge(edge) {
      const line = createElement('path')
      line.setAttribute('d', generateLRCurve(edge).toString())
      line.setAttribute('fill', 'none')
      line.setAttribute('stroke-width', '2')
      line.setAttribute('stroke', 'black')
      return line
    },
  })
  function initInteractiveView(el: HTMLDivElement) {
    const interactiveView = new InteractiveView(el, { width: 600, height: 600 })
    interactiveView.zoom.setAll(0.1)
    interactiveView.element.append(...tree.layout({ rankdir: 'LR', nodesep: 100, ranksep: 1000 }).elements)
  }

  return (
    <div class='h-2000px w-2000px'>
      <div class=' bg-blue-400' ref={initInteractiveView}>
      </div>
    </div>
  )
}

export default App
