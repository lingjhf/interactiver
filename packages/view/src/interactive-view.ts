import { Draggable, Zoom, Point, focusZoom } from '@interactiver/core'
import Hammer from 'hammerjs'

import { createElement } from './utils'

export interface InteractiveViewOptions {
  width?: number,
  height?: number,
}

export class InteractiveView {
  constructor(element: HTMLElement, options?: InteractiveViewOptions) {
    this._width = options?.width ?? 400
    this._height = options?.height ?? 400

    const svg = createElement('svg')
    const hitAreaGroup = createElement('g')
    this.hitArea = createElement('rect')
    this.element = createElement('g')

    svg.setAttribute('width', this._width.toString())
    svg.setAttribute('height', this._height.toString())
    this.hitArea.setAttribute('width', this._width.toString())
    this.hitArea.setAttribute('height', this._height.toString())
    this.hitArea.setAttribute('fill', 'transparent')

    hitAreaGroup.appendChild(this.hitArea)
    hitAreaGroup.appendChild(this.element)
    svg.appendChild(hitAreaGroup)
    element.appendChild(svg)

    this._hm = new Hammer(this.hitArea)
    this._draggable = new Draggable()
    this.zoom = new Zoom()
    // this.zoom.on('change', () => this._renderElement())
    // this._draggable.position.on('change', () => this._renderElement())
    this._onDrag()
    this._onZoom()
    this._renderElement()
  }

  private _width?: number

  private _height?: number

  private _hm: HammerManager

  private _draggable: Draggable

  readonly zoom: Zoom

  readonly element: SVGGElement

  readonly hitArea: SVGRectElement

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

  private _onZoom() {
    this.hitArea.addEventListener('wheel', (event) => {
      event.preventDefault()
      const area = this.hitArea.getBoundingClientRect()

      if (event.deltaY > 0) {
        this.zoom.out(0.03)
      }
      else {
        this.zoom.in(0.03)
      }
      // this._focusZoom.focus.set(new Point({ x: event.x - area.x, y: event.y - area.y }))
    })
  }
}
