import { Point } from './point'

export interface DraggableOptions {
  position: Point,
}

export class Draggable {
  constructor(options?: DraggableOptions) {
    this.position = options?.position ?? new Point()
  }

  // 拖拽位置
  readonly position: Point

  // 按下位置与拖拽位置的偏移位置
  readonly downOffsetPosition = new Point()

  start(point: Point): this {
    this.downOffsetPosition.set(new Point({
      x: point.x - this.position.x,
      y: point.y - this.position.y,
    }))
    return this
  }

  move(point: Point): this {
    this.position.set(new Point({
      x: point.x - this.downOffsetPosition.x,
      y: point.y - this.downOffsetPosition.y,
    }))
    return this
  }
}
