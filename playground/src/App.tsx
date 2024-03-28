import { InteractiveView, Container, createElement, Tree, createCurve } from '@interactiver/view'

import { generateTree } from './utils'

function App() {
  const tree = new Tree(layout => generateTree(layout, 5),
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
  function initInteractiveView(el: HTMLDivElement) {
    const interactiveView = new InteractiveView(el)
    interactiveView.zoom.setAll(0.03)
    interactiveView.element.append(...tree.layout({ rankdir: 'LR', nodesep: 100, ranksep: 1000 }).elements)
  }

  return (
    <div class='h-2000px w-2000px'>
      <div class='h-screen' ref={initInteractiveView}>
      </div>
    </div>
  )
}

export default App
