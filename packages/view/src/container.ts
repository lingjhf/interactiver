import { Node } from '@interactiver/core'

import { createElement } from './utils'

export class Container extends Node {
  readonly element = createElement('g')

  render(): this {
    this.element.style.width = `${this.width}px`
    this.element.style.height = `${this.height}px`
    this.element.style.transform = `translate(${this.position.x},${this.position.y})`
    return this
  }
}
