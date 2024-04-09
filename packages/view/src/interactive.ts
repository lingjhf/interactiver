import { Point, Draggable, DraggableOptions, ZoomOptions, Zoom, focusZoom, Mitt } from '@interactiver/core'
import Hammer from 'hammerjs'

export interface InteractiveOptions {
  x?: number,
  y?: number,
}

export type InteractiveEvents = {
  dragStart: void,
  drag: void,
  zoom: void,
}

export class Interactive extends Mitt<InteractiveEvents> {
  constructor(element: HTMLElement | SVGElement, options?: InteractiveOptions) {
    super()
    this.element = element
    this.position = new Point({ x: options?.x, y: options?.y })
    this._hm = new Hammer(element)
    this.draggable = this._initDraggable({ position: this.position })
    this.zoom = this._initZoom({})
  }

  readonly element: HTMLElement | SVGElement

  readonly position: Point

  readonly draggable: Draggable

  readonly zoom: Zoom

  private _hm: HammerManager

  private _initDraggable(options: DraggableOptions): Draggable {
    const draggable = new Draggable(options)
    this._hm.on('panstart', (event: HammerInput) => {
      draggable.start(new Point({ x: event.center.x, y: event.center.y }))
      this.emit('dragStart')
    })
    this._hm.on('panmove', (event: HammerInput) => {
      draggable.move(new Point({ x: event.center.x, y: event.center.y }))
      this.emit('drag')
    })
    return draggable
  }

  private _initZoom(options: ZoomOptions): Zoom {
    const zoom = new Zoom(options)
    this.element.addEventListener('wheel', (e: Event) => {
      const event = e as WheelEvent
      event.preventDefault()
      const area = this.element.getBoundingClientRect()
      const source = new Zoom(zoom)
      if (event.deltaY > 0) {
        zoom.out(1.1)
      }
      else {
        zoom.in(1.1)
      }
      this.position.set(
        focusZoom(source, zoom, this.position, new Point({ x: event.x - area.x, y: event.y - area.y })),
      )
      this.emit('zoom')
    })
    return zoom
  }
}
