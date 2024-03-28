import { Draggable, Zoom, Point, focusZoom } from '@interactiver/core'
import Hammer from 'hammerjs'

import { createElement } from './element'

export interface InteractiveViewOptions {
  width?: number | string,
  height?: number | string,
}

export class InteractiveView {
  constructor(element: HTMLElement, options?: InteractiveViewOptions) {
    this._width = options?.width ?? '100%'
    this._height = options?.height ?? '100%'

    const svg = createElement('svg')
    this.element = createElement('g')
    svg.setAttribute('width', this._width.toString())
    svg.setAttribute('height', this._height.toString())
    svg.appendChild(this.element)
    element.appendChild(svg)

    this._hm = new Hammer(svg)
    this._draggable = new Draggable()
    this.zoom = new Zoom()
    this._draggable.position.on('change', () => this._renderElement())
    this.zoom.on('change', () => this._renderElement())
    this._onDrag()
    this._onZoom(svg)
    this._renderElement()
  }

  private _width?: number | string

  private _height?: number | string

  private _hm: HammerManager

  private _draggable: Draggable

  readonly zoom: Zoom

  readonly element: SVGGElement

  private _renderElement() {
    this.element.setAttribute(
      'transform',
    `translate(${this._draggable.position.x},${this._draggable.position.y}) scale(${this.zoom.x},${this.zoom.y})`,
    )
  }

  private _onDrag() {
    this._hm.on('panstart', (event: HammerInput) => {
      this._draggable.start(new Point({ x: event.center.x, y: event.center.y }))
    })
    this._hm.on('panmove', (event: HammerInput) => {
      this._draggable.move(new Point({ x: event.center.x, y: event.center.y }))
    })
  }

  private _onZoom(element: SVGGraphicsElement) {
    element.addEventListener('wheel', (event) => {
      event.preventDefault()
      const area = element.getBoundingClientRect()
      const source = new Zoom(this.zoom)
      if (event.deltaY > 0) {
        this.zoom.out(1.1)
      }
      else {
        this.zoom.in(1.1)
      }
      this._draggable.position.set(
        focusZoom(source, this.zoom, this._draggable.position, new Point({ x: event.x - area.x, y: event.y - area.y })),
      )
    })
  }
}
