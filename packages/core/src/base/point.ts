import { EventEmitter } from 'eventemitter3'

export interface PointOptions {
  x?: number,
  y?: number,
}

export class Point extends EventEmitter<{ change: void, }> {
  constructor(options?: PointOptions) {
    super()
    this._x = options?.x ?? 0
    this._y = options?.y ?? 0
  }

  private _x: number

  private _y: number

  get x(): number {
    return this._x
  }

  get y(): number {
    return this._y
  }

  set(point: { x?: number, y?: number, }): this {
    if (point?.x !== undefined) {
      this._x = point.x
    }
    if (point?.y !== undefined) {
      this._y = point.y
    }
    this.emit('change')
    return this
  }

  distanceOf(other: Point): number {
    const dx = this._x - other.x
    const dy = this._y - other.y
    return Math.sqrt(dx * dx + dy * dy)
  }

  centerOf(other: Point): Point {
    return new Point({
      x: (other.x - this._x) / 2 + this._x,
      y: (other.y - this._y) / 2 + this._y,
    })
  }
}
