import { Zoom, Point } from './base'

export interface PinchOptions {
  zoom?: Zoom,
}

export class Pinch {
  constructor(options?: PinchOptions) {
    this.zoom = options?.zoom ?? new Zoom()
  }

  private _firstDistance = 0

  private _firstZoom = new Zoom()

  // 缩放值：根据初始的两个点和移动后的两个点计算比例得出缩放值
  readonly zoom: Zoom

  start(first: Point, second: Point): this {
    this._firstZoom = this.zoom
    this._firstDistance = first.distanceOf(second)
    return this
  }

  move(first: Point, second: Point): this {
    const secondDistance = first.distanceOf(second)
    this.zoom.set({
      x: this._getZoom(this._firstZoom.x, this._firstDistance, secondDistance),
      y: this._getZoom(this._firstZoom.y, this._firstDistance, secondDistance),
    })
    return this
  }

  private _getZoom(zoom: number, distance1: number, distance2: number): number {
    return (distance2 * (zoom / distance1))
  }
}
