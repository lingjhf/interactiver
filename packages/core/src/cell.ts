import { Point } from './point'
import { createUUID } from './utils'

export interface CellOptions {
  id?: string,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
}

export class Cell {
  constructor(options?: CellOptions) {
    this.id = options?.id ?? createUUID()
    this.position = new Point({ x: options?.x, y: options?.y })
    this._width = options?.width ?? 0
    this._height = options?.height ?? 0
  }

  readonly id: string

  readonly position: Point

  protected _width: number

  protected _height: number

  get width(): number {
    return this._width
  }

  get height(): number {
    return this._height
  }

  get x(): number {
    return this.position.x
  }

  get y(): number {
    return this.position.y
  }

  /**
   * 设置节点宽度
   *
   * @param value
   * @returns
   */
  setWidth(value: number): this {
    this._width = value
    return this
  }

  /**
   * 设置节点高度
   *
   * @param value
   * @returns
   */
  setHeight(value: number): this {
    this._height = value
    return this
  }
}
