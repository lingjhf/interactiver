import { Cell, CellOptions } from './cell'

export interface NodeOptions<C extends Cell = Cell> extends CellOptions {
  children?: C[],
}

type _Node = Node

export class Node<C extends _Node = _Node> extends Cell {
  constructor(options?: NodeOptions<C>) {
    super(options)
    this._addChildren(...(options?.children ?? []))
  }

  protected _parent?: C

  protected _children: Map<string, C> = new Map()

  get parent(): C | undefined {
    return this._parent
  }

  get children(): C[] {
    return [...this._children.values()]
  }

  /**
   * 设置父级节点
   *
   * @param value
   * @returns
   */
  setParent(value?: C | this): this {
    if (value !== this) {
      this._parent = value as C
    }
    return this
  }

  /**
   * 添加子节点
   *
   * @param children
   * @returns
   */
  add(...children: C[]): this {
    this._addChildren(...children)
    return this
  }

  /**
   * 移除子节点
   *
   * @param children
   * @returns
   */
  remove(...children: C[]): this {
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

  private _addChildren(...children: C[]): this {
    for (const child of children) {
      child.setParent(this)
      this._children.set(child.id, child)
    }
    return this
  }
}
