import { Draggable, Node, NodeOptions, Point, Zoom } from '@interactiver/core'
import Hammer from 'hammerjs'

export interface ContainerOptions extends NodeOptions {
  draggable?: boolean,
  wheelZoom?: boolean,
}
export class Container extends Node {
  constructor(element: HTMLElement | SVGElement, options?: ContainerOptions) {
    super(options)
    this.element = element
    this._hm = new Hammer(element)
    this._draggable = new Draggable({ position: this.position })
    this.setDraggable(options?.draggable ?? false)
    this.setWheelZoom(options?.wheelZoom ?? false)
  }

  readonly element: HTMLElement | SVGElement

  private _hm: HammerManager

  private _draggable: Draggable

  setDraggable(value: boolean): this {
    const dragStart = (event: HammerInput) => this._dragStart(event)
    const dragMove = (event: HammerInput) => this._dragMove(event)
    if (value) {
      this._hm.on('panstart', dragStart)
      this._hm.on('panmove', dragMove)
    }
    else {
      this._hm.off('panstart', dragStart)
      this._hm.off('panmove', dragMove)
    }
    return this
  }

  setWheelZoom(value: boolean): this {
    const wheelZoom = (event: Event) => this._wheelZoom(event as WheelEvent)
    if (value) {
      this.element.addEventListener('wheel', wheelZoom)
    }
    else {
      this.element.removeEventListener('wheel', wheelZoom)
    }
    return this
  }

  render(): this {
    this.element.style.transform = `
    translate(${this.position.x}px,${this.position.y}px) 
    scale(${this.zoom.x},${this.zoom.y})
    `
    return this
  }

  private _dragStart(event: HammerInput) {
    this._draggable.start(new Point({ x: event.center.x, y: event.center.y }))
    this.emit('dragStart')
  }

  private _dragMove(event: HammerInput) {
    this._draggable.move(new Point({ x: event.center.x, y: event.center.y }))
    this.emit('drag')
  }

  private _wheelZoom(event: WheelEvent) {
    event.preventDefault()
    const area = this.element.getBoundingClientRect()
    const source = new Zoom(this.zoom)
    if (event.deltaY > 0) {
      this.zoom.out(1.1)
    }
    else {
      this.zoom.in(1.1)
    }
    this.position.set(
      Zoom.focusZoom(source, this.zoom, this.position, new Point({ x: event.x - area.x, y: event.y - area.y })),
    )
    this.emit('zoom')
  }
}
