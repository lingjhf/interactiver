import { EventEmitter } from 'eventemitter3'
import { v4 as uuidv4 } from 'uuid'

export interface CellOptions {

  // 节点/边的唯一标识，默认使用自动生成的 UUID。
  id?: string,
}

export class Cell extends EventEmitter {
  constructor(options?: CellOptions) {
    super()
    this._id = options?.id ?? uuidv4()
  }

  private _id: string

  get id() {
    return this._id
  }
}
