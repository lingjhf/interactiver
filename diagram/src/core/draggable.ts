import { Point } from './point'
import { Scale } from './scale'

export interface DraggableOptions {
  position?: Point,
  scale?: Scale,
}

export class Draggable {
  constructor(options?: DraggableOptions) {
    this.position = options?.position ?? new Point()
    this.scale = options?.scale ?? new Scale()
  }

  // 拖拽位置
  readonly position: Point

  readonly scale: Scale

  // 按下位置与拖拽位置的偏移位置
  readonly downOffsetPosition = new Point()

  private _startPosition = new Point()

  start(point: Point): this {
    this._startPosition.set(this.position)
    this.downOffsetPosition.set(new Point({
      x: point.x - this.position.x,
      y: point.y - this.position.y,
    }))
    return this
  }

  move(point: Point): this {
    this.position.set(new Point({
      x: this._startPosition.x + (point.x - this.downOffsetPosition.x - this._startPosition.x) / this.scale.x,
      y: this._startPosition.y + (point.y - this.downOffsetPosition.y - this._startPosition.y) / this.scale.y,
    }))
    return this
  }
}
