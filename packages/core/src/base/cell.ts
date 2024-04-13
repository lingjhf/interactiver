import { EventEmitter } from 'eventemitter3'
import { v4 as uuidv4 } from 'uuid'

import { Point } from './point'
import { Zoom, ZoomOptions } from './zoom'

export interface Meta {
  [key: string]: unknown,
}

export interface CellOptions {
  id?: string,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
  zoom?: ZoomOptions,
  meta?: Meta,
}

export class Cell extends EventEmitter {
  constructor(options?: CellOptions) {
    super()
    this.id = options?.id ?? uuidv4()
    this.position = new Point({ x: options?.x, y: options?.y })
    this.zoom = new Zoom(options?.zoom)
    this._width = options?.width ?? 0
    this._height = options?.height ?? 0
    this.meta = options?.meta ?? {}
  }

  readonly id: string

  readonly position: Point

  readonly zoom: Zoom

  protected _width: number

  protected _height: number

  meta: Meta

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
