import { Node, NodeOptions } from '@interactiver/core'

import { Interactive } from './interactive'

export type ContainerOptions = NodeOptions<Container>
export class Container extends Node<Container> {
  constructor(element: HTMLElement | SVGElement, options?: ContainerOptions) {
    super(options)
    this.element = element
    this._interactive = new Interactive(element)
    this._interactive.on('drag', () => this.render())
    this._interactive.on('zoom', () => this.render())
  }

  readonly element: HTMLElement | SVGElement

  protected _interactive: Interactive

  render(): this {
    this.position.set(this._interactive.position)
    this._interactive.element.setAttribute(
      'transform',
    `
    translate(${this._interactive.position.x},${this._interactive.position.y}) 
    scale(${this._interactive.zoom.x},${this._interactive.zoom.y})
    `,
    )
    return this
  }
}
