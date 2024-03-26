import { Node, NodeOptions } from '@interactiver/core'

import { createElement } from './utils'

export type ContainerOptions = NodeOptions<Container>
export class Container extends Node<Container> {
  constructor(options?: ContainerOptions) {
    super(options)
    this.element = createElement('g')
  }

  readonly element: SVGGElement

  render(): this {
    this.element.setAttribute('transform', `translate(${this.position.x},${this.position.y})`)
    return this
  }
}
