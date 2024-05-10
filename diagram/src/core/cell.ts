import { EventEmitter } from 'eventemitter3'
import { v4 as uuidv4 } from 'uuid'

export interface CellOptions extends EventEmitter {

  // 节点/边的唯一标识，默认使用自动生成的 UUID。
  id?: string,

  // 节点/边在画布中的层级，默认根据节点/边添加顺序自动确定。
  zIndex?: number,

  // 节点/边是否可见。
  visible?: boolean,

  // 父节点。
  parent?: string,

  // 子节点/边
  children?: string[],
}

export class Cell {
  constructor(options: CellOptions) {
    this._id = options?.id ?? uuidv4()
    this._zIndex = options?.zIndex ?? 0
    this._visible = options?.visible ?? true
  }

  private _id: string

  private _zIndex: number

  private _visible: boolean

  get id(): string {
    return this._id
  }

  get zIndex(): number {
    return this._zIndex
  }

  get visible(): boolean {
    return this._visible
  }

  setZIndex(value: number): this {
    this._zIndex = value
    return this
  }

  show(): this {
    this._visible = true
    return this
  }

  hide(): this {
    this._visible = false
    return this
  }

  setParent(parent: Cell): this {
    return this
  }

  addChild(child: Cell): this {
    return this
  }

  removeChild(child: Cell): this {
    return this
  }

  remove(){
    
  }

  add(): this {
    return this
  }
}
