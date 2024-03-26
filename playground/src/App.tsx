import { TreeLayout } from '@interactiver/core'
import { InteractiveView, Container, createElement } from '@interactiver/view'

import { generateTree } from './utils'

function renderNode(container: Container): SVGGElement {
  const background = createElement('rect')
  background.setAttribute('width', `${container.width}px`)
  background.setAttribute('height', `${container.height}px`)
  background.setAttribute('color', 'blue')
  container.element.appendChild(background)
  return container.element
}

function App() {
  const treeLayout = new TreeLayout()
  generateTree(treeLayout, 5)
  treeLayout.layout({ rankdir: 'LR', nodesep: 100, ranksep: 1000 })
  function initInteractiveView(el: HTMLDivElement) {
    const interactiveView = new InteractiveView(el)
    const containers = treeLayout.nodes.map(
      node =>
        renderNode(new Container({ id: node.id, x: node.position.x, y: node.position.y, width: node.width, height: node.height }).render()),
    )
    interactiveView.element.append(...containers)
  }

  return (
    <div class='h-2000px w-2000px'>
      <div class='w-500px h-500px bg-blue-400' ref={initInteractiveView}>
      </div>
    </div>
  )
}

export default App
