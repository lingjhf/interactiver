import { Container } from './container'
import type { ContainerOptions } from './container'
import { Interactive } from './interactive'

export type InteractiveViewOptions = ContainerOptions

export class InteractiveView extends Container {
  constructor(element: HTMLElement | SVGAElement, interactive: Interactive, options?: InteractiveViewOptions) {
    super(interactive, options)
    element.style.position = 'absolute'
    this.element = element
  }

  readonly element: HTMLElement | SVGAElement

  render(): this {
    this.element.style.transform = `
    translate(${this._interactive.position.x}px,${this._interactive.position.y}px) 
    scale(${this._interactive.zoom.x},${this._interactive.zoom.y})
    `
    return this
  }
}
