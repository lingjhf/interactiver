import { Node, Point } from './base'

export class Brush extends Node {
  // 原点位置
  private _origin: Point = new Point()

  start(point: Point): this {
    this._origin = point
    return this
  }

  move(point: Point): this {
    if (point.x >= this._origin.x) {
      this.position.set({ x: this._origin.x })
      this._width = point.x - this._origin.x
    }
    else {
      this.position.set({ x: point.x })
      this._width = this._origin.x - point.x
    }

    if (point.y >= this._origin.y) {
      this.position.set({ y: this._origin.y })
      this._height = point.y - this._origin.y
    }
    else {
      this.position.set({ y: point.y })
      this._height = this._origin.y - point.y
    }
    return this
  }
}
