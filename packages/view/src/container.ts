import { Node, NodeOptions } from '@interactiver/core'

import { createElement } from './utils'

export interface ContainerOptions extends NodeOptions<Container> {
  onDrag?: () => void,
}
export class Container extends Node<Container> {
  constructor(options?: ContainerOptions) {
    super(options)
    this.element = createElement('g')
    this._render()
  }

  readonly element: SVGGElement

  private _render(): this {
    this.element.setAttribute('transform', `translate(${this.x},${this.y})`)
    return this
  }
}
