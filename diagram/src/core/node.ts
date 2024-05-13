import { Cell, CellOptions } from './cell'
import { Point } from './point'
import { Scale } from './scale'

export interface NodeOptions extends CellOptions {
  position?: Point,
  scale?: Scale,
}

export class Node extends Cell {
  constructor(options?: NodeOptions) {
    super(options)
    this.position = options?.position ?? new Point()
    this.scale = options?.scale ?? new Scale()
  }

  readonly position: Point

  readonly scale: Scale

  get x(): number {
    return this.position.x
  }

  get y(): number {
    return this.position.y
  }
}
