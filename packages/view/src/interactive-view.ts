import { createElement } from './utils'

export class InteractiveView {
  constructor(element: HTMLElement) {
    const svg = createElement('svg')
    svg.style.width = '100%'
    svg.style.height = '100%'
    element.appendChild(svg)
    this.element = createElement('g')
    this.element.setAttribute('transform', 'translate(0,0) scale(0.1)')
    svg.appendChild(this.element)
  }

  readonly element: SVGGElement
}
