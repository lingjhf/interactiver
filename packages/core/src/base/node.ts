import { Cell, CellOptions } from './cell'

export type NodeOptions = CellOptions

export class Node extends Cell {
  constructor(options?: NodeOptions) {
    super(options)
  }

  protected _parent?: Node

  protected _children: Map<string, Node> = new Map()

  get parent(): Node | undefined {
    return this._parent
  }

  get children(): Node[] {
    return [...this._children.values()]
  }

  /**
   * 设置父级节点
   *
   * @param value
   * @returns
   */
  setParent(value?: Node): this {
    if (value !== this) {
      this._parent = value
    }
    return this
  }

  /**
   * 添加子节点
   *
   * @param children
   * @returns
   */
  add(...children: Node[]): this {
    this._addChildren(...children)
    return this
  }

  /**
   * 移除子节点
   *
   * @param children
   * @returns
   */
  remove(...children: Node[]): this {
    for (const child of children) {
      this._children.delete(child.id)
    }
    return this
  }

  /**
   * 移除所有子节点
   *
   * @returns
   */
  clear(): this {
    this._children.clear()
    return this
  }

  private _addChildren(...children: Node[]): this {
    for (const child of children) {
      child.setParent(this)
      this._children.set(child.id, child)
    }
    return this
  }
}
