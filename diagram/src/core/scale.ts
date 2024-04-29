import { EventEmitter } from 'eventemitter3'

import { Point } from './point'

export interface ScaleOptions {
  x?: number,
  y?: number,
  max?: number,
  min?: number,
}

export class Scale extends EventEmitter {
  constructor(options?: ScaleOptions) {
    super()
    this._x = options?.x ?? 1
    this._y = options?.y ?? 1
    this._max = options?.max ?? 10
    this._min = options?.min ?? 0.001
  }

  private _x: number

  private _y: number

  private _max: number

  private _min: number

  get x(): number {
    return this._x
  }

  get y(): number {
    return this._y
  }

  set(value: { x?: number, y?: number, }): this {
    if (value.x !== undefined && value.x < this._max && value.x > this._min) {
      this._x = value.x
    }
    if (value.y !== undefined && value.y < this._max && value.y > this._min) {
      this._y = value.y
    }
    this.emit('change')
    return this
  }

  /** 放大
   *
   * @param value 倍数
   * @returns
   */
  in(value: number): this {
    return this.set({ x: this._x * value, y: this._y * value })
  }

  /** 缩小
   *
   * @param value 倍数
   * @returns
   */
  out(value: number): this {
    return this.set({ x: this._x / value, y: this._y / value })
  }

  static focusZoom(source: Scale, target: Scale, position: Point, focus: Point): Point {
    const zoomX = target.x / source.x
    const zoomY = target.y / source.y
    return new Point({
      x: focus.x - zoomX * (focus.x - position.x),
      y: focus.y - zoomY * (focus.y - position.y),
    })
  }
}
