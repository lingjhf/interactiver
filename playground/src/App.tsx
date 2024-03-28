import { TreeLayoutNode } from '@interactiver/core'
import { InteractiveView, Container, createElement, Tree, createCurve } from '@interactiver/view'

import { generateTree } from './utils'

function App() {
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
        return container.element
      },
      renderEdge(edge) {
        const line = createCurve('LR', edge)
        line.setAttribute('stroke-width', '2')
        line.setAttribute('stroke', '#fff')
        return line
      },
    })
  // const res = generateTree(tree.layout, 5)
  const rootNode = new TreeLayoutNode(tree.layout, { id: '123', width: 200, height: 100 })
  tree.layout.add(rootNode)
  function initInteractiveView(el: HTMLDivElement) {
    const interactiveView = new InteractiveView(el)
    interactiveView.zoom.setAll(0.03)
    interactiveView.element.append(...tree.autoLayout({ rankdir: 'LR', nodesep: 100, ranksep: 1000 }).elements)
    setTimeout(() => {
      rootNode.add(
        new TreeLayoutNode(tree.layout, { width: 200, height: 100 }),
        new TreeLayoutNode(tree.layout, { width: 200, height: 100 }),
        new TreeLayoutNode(tree.layout, { width: 200, height: 100 }),
      )
      interactiveView.element.innerHTML = ''
      interactiveView.element.append(...tree.autoLayout({ rankdir: 'LR', nodesep: 100, ranksep: 1000 }).elements)
    }, 3000)
  }

  return (
    <div class='h-2000px w-2000px'>
      <div class='h-screen' ref={initInteractiveView}>
      </div>
    </div>
  )
}

export default App
