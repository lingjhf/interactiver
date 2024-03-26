import { Point } from './point'

export interface ZoomOptions {
  x?: number,
  y?: number,
}

export class Zoom {
  constructor(options?: ZoomOptions) {
    this._x = options?.x ?? 1
    this._y = options?.y ?? 1
  }

  private _x: number

  private _y: number

  get x(): number {
    return this._x
  }

  get y(): number {
    return this._y
  }

  set(value: { x?: number, y?: number, }): this {
    if (value.x !== undefined) {
      this._x = value.x
    }
    if (value.y !== undefined) {
      this._y = value.y
    }
    return this
  }

  setAll(value: number): this {
    this.set({ x: value, y: value })
    return this
  }

  /** 放大
   *
   * @param value 倍数
   * @returns
   */
  in(value: number): this {
    this._x *= value
    this._y *= value
    return this
  }

  /** 缩小
   *
   * @param value 倍数
   * @returns
   */
  out(value: number): this {
    this._x /= value
    this._y /= value
    return this
  }
}

export function focusZoom(source: Zoom, target: Zoom, position: Point, focus: Point): Point {
  const zoomX = target.x / source.x
  const zoomY = target.y / source.y
  return new Point({
    x: focus.x - zoomX * (focus.x - position.x),
    y: focus.y - zoomY * (focus.y - position.y),
  })
}
