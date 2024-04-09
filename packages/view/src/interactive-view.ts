import { Container } from './container'
import type { ContainerOptions } from './container'
import { Interactive } from './interactive'

export type InteractiveViewOptions = ContainerOptions

export class InteractiveView extends Container {
  constructor(element: HTMLElement | SVGAElement, interactive: Interactive, options?: InteractiveViewOptions) {
    super(interactive, options)
    this.element = element
    this._interactive = interactive
    this._interactive.element.appendChild(element)
    this._interactive.on('drag', () => this._render())
    this._interactive.on('zoom', () => this._render())
    this._render()
  }

  readonly element: HTMLElement | SVGAElement

  protected _render() {
    this.element.setAttribute(
      'transform',
    `
    translate(${this._interactive.position.x},${this._interactive.position.y}) 
    scale(${this._interactive.zoom.x},${this._interactive.zoom.y})
    `,
    )
  }
}
