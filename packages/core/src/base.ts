import dagre from 'dagre'

import { Mitt, MittEvents } from './events'
import { Point } from './point'
import { createUUID } from './utils'

export interface Meta {
  [key: string]: unknown,
}

export interface CellOptions {
  id?: string,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
  meta?: Meta,
}

class Cell<Events extends MittEvents = {}> extends Mitt<Events> {
  constructor(options?: CellOptions) {
    super()
    this.id = options?.id ?? createUUID()
    this.position = new Point({ x: options?.x, y: options?.y })
    this._width = options?.width ?? 0
    this._height = options?.height ?? 0
    this.meta = options?.meta ?? {}
  }

  readonly id: string

  readonly position: Point

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

export type NodeOptions = CellOptions

class Node< Events extends MittEvents = {}> extends Cell<Events> {
  constructor(options?: NodeOptions) {
    super(options)
  }

  protected _parent?: typeof this

  protected _children: Map<string, typeof this> = new Map()

  get parent(): typeof this | undefined {
    return this._parent
  }

  get children(): typeof this[] {
    return [...this._children.values()]
  }

  /**
   * 设置父级节点
   *
   * @param value
   * @returns
   */
  setParent(value?: typeof this): this {
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
  add(...children: typeof this[]): this {
    this._addChildren(...children)
    return this
  }

  /**
   * 移除子节点
   *
   * @param children
   * @returns
   */
  remove(...children: typeof this[]): this {
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

  private _addChildren(...children: typeof this[]): this {
    for (const child of children) {
      child.setParent(this)
      this._children.set(child.id, child)
    }
    return this
  }
}

export class Edge<C extends Cell> {
  constructor(source: C, target: C) {
    this.source = source
    this.target = target
  }

  source: C

  target: C
}

export type TreeGraphLabel = dagre.GraphLabel

type TreeLayoutNodeMap = Map<string, TreeLayoutNode>
type TreeLayoutEdgeMap = Map<string, Edge<TreeLayoutNode>>

export class TreeLayout {
  private _graph = new dagre.graphlib.Graph()

  private _nodeMap: TreeLayoutNodeMap = new Map()

  private _edgeMap: TreeLayoutEdgeMap = new Map()

  get nodes(): TreeLayoutNode[] {
    return [...this._nodeMap.values()]
  }

  get edges(): Edge<TreeLayoutNode>[] {
    return [...this._edgeMap.values()]
  }

  /**
   * 执行布局
   *
   * @param label
   * @returns
   */
  layout(label: TreeGraphLabel): this {
    this._graph = new dagre.graphlib.Graph()
    this._graph.setGraph(label)
    this._graph.setDefaultEdgeLabel(() => ({}))
    for (const node of this._nodeMap.values()) {
      this._graph.setNode(node.id, { width: node.width, height: node.height })
    }
    for (const edge of this._edgeMap.values()) {
      this._graph.setEdge(edge.source.id, edge.target.id)
    }
    dagre.layout(this._graph)
    for (const id of this._graph.nodes()) {
      const node = this._nodeMap.get(id)
      if (node) {
        const graphNode = this._graph.node(id)
        node.position.set({ x: graphNode.x, y: graphNode.y })
      }
    }
    return this
  }

  /**
   * 添加布局上的节点
   * @param node
   */
  add(...children: TreeLayoutNode[]): this {
    for (const child of children) {
      this._nodeMap.set(child.id, child)
      if (child.parent) {
        this._edgeMap.set(child.id, new Edge(child.parent, child))
      }
      if (child.visibleChildren.length > 0 && child.expand) {
        this.add(...child.visibleChildren)
      }
    }
    return this
  }

  /**
   * 移除布局上的节点
   * @param node
   */
  remove(...children: TreeLayoutNode[]): this {
    for (const child of children) {
      this._nodeMap.delete(child.id)
      this._edgeMap.delete(child.id)
      if (this._nodeMap.size > 0 && child.visibleChildren.length > 0) {
        this.remove(...child.visibleChildren)
      }
    }
    return this
  }

  /**
   * 清除所有节点
   *
   * @returns
   */
  clear(): this {
    this._nodeMap.clear()
    this._edgeMap.clear()
    return this
  }
}

export interface TreeLayoutNodeOptions extends NodeOptions {
  offset?: number,
  limit?: number,
  expand?: boolean,
}

export class TreeLayoutNode<Events extends MittEvents = {}> extends Node<Events> {
  constructor(layout: TreeLayout, options?: TreeLayoutNodeOptions) {
    super(options)
    this._layout = layout
    this._offset = options?.offset ?? 0
    this._limit = options?.limit ?? 10
    this._expand = options?.expand ?? true
    this._setVisibleChildren()
  }

  private _layout: TreeLayout

  private _offset: number

  private _limit: number

  private _expand = true

  private _visibleChildren: typeof this[] = []

  get limit(): number {
    return this._limit
  }

  get offset(): number {
    return this._offset
  }

  get expand(): boolean {
    return this._expand
  }

  get visibleChildren(): typeof this[] {
    return this._visibleChildren
  }

  /**
   * 设置偏移数量
   *
   * @param value
   * @returns
   */
  setOffset(value: number): this {
    this._offset = value
    this._layout.remove(...this._visibleChildren)
    this._setVisibleChildren()
    this._layout.add(...this._visibleChildren)
    return this
  }

  /**
   * 设置限制数量
   *
   * @param value
   * @returns
   */
  setLimit(value: number): this {
    this._limit = value
    this._layout.remove(...this._visibleChildren)
    this._setVisibleChildren()
    this._layout.add(...this._visibleChildren)
    return this
  }

  /**
   * 是否展开
   *
   * @param value
   * @returns
   */
  setExpand(value: boolean): this {
    this._expand = value
    if (this._expand) {
      this._layout.add(...this._visibleChildren)
    }
    else {
      this._layout.remove(...this._visibleChildren)
    }
    return this
  }

  add(...children: typeof this[]): this {
    super.add(...children)
    this._setVisibleChildren()
    this._layout.add(...this._visibleChildren)
    return this
  }

  remove(...children: typeof this[]): this {
    super.remove(...children)
    this._setVisibleChildren()
    this._layout.remove(...this._visibleChildren)
    return this
  }

  clear(): this {
    this._layout.remove(...this._visibleChildren)
    super.clear()
    return this
  }

  private _setVisibleChildren() {
    this._visibleChildren = this.children.slice(this._offset, this._offset + this._limit)
  }
}
