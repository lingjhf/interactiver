import dagre from 'dagre'

import { Node } from './base'

export type TreeLayoutLabel = dagre.GraphLabel

export interface TreeLayoutNodeDetail {
  offset: number,
  limit: number,
  expand: boolean,
  node: Node,
  parent?: TreeLayoutNodeDetail,
  children: Map<string, TreeLayoutNodeDetail>,
}

export interface TreeLayoutNodeOptions {
  offset?: number,
  limit?: number,
  expand?: boolean,
}

export class TreeLayout {
  constructor(root: Node) {
    this._root = root
    this._nodeMap.set(root.id, {
      offset: 0,
      limit: 10,
      expand: true,
      node: root,
      children: new Map(),
    })
  }

  private _root: Node

  private _graph = new dagre.graphlib.Graph()

  private _nodeMap: Map<string, TreeLayoutNodeDetail> = new Map()

  get root() {
    return this._root
  }

  /**
   * 执行布局
   *
   * @param label
   * @returns
   */
  layout(label: TreeLayoutLabel): Node[] {
    this._graph = new dagre.graphlib.Graph()
    this._graph.setGraph(label)
    this._graph.setDefaultEdgeLabel(() => ({}))
    const nodes = this._layout(this._graph, this._root)
    dagre.layout(this._graph)
    for (const id of this._graph.nodes()) {
      const detail = this._nodeMap.get(id)
      if (detail) {
        const graphNode = this._graph.node(id)
        detail.node.position.set({ x: graphNode.x, y: graphNode.y })
      }
    }
    return nodes
  }

  private _layout(graph: dagre.graphlib.Graph, node: Node): Node[] {
    let nodes = [node]
    graph.setNode(node.id, { width: node.width, height: node.height })
    const detail = this._nodeMap.get(node.id)
    if (detail) {
      if (detail.parent) {
        this._graph.setEdge(detail.parent.node.id, node.id)
      }
      if (detail.expand) {
        for (const child of Array.from(detail.children.values()).slice(detail.offset, detail.offset + detail.limit)) {
          nodes = [...nodes, ...this._layout(graph, child.node)]
        }
      }
    }
    return nodes
  }

  setNode(node: Node, parent: Node, options?: TreeLayoutNodeOptions): this {
    let nodeDetail = this._nodeMap.get(node.id)
    if (!nodeDetail) {
      const targetDetail = this._nodeMap.get(parent.id)
      nodeDetail = {
        offset: options?.offset ?? 0,
        limit: options?.limit ?? 10,
        expand: options?.expand ?? true,
        parent: targetDetail,
        node,
        children: new Map(),
      }
      this._nodeMap.set(node.id, nodeDetail)
      if (targetDetail) {
        targetDetail.children.set(node.id, nodeDetail)
      }
      return this
    }
    else {
      const targetDetail = this._nodeMap.get(parent.id)
      if (targetDetail && nodeDetail.parent !== targetDetail) {
        nodeDetail.parent?.children?.delete(node.id)
        nodeDetail.parent = targetDetail
        targetDetail.children.set(node.id, nodeDetail)
      }
      nodeDetail.offset = options?.offset ?? nodeDetail.offset
      nodeDetail.limit = options?.limit ?? nodeDetail.limit
      nodeDetail.expand = options?.expand ?? nodeDetail.expand
    }
    return this
  }

  remove(node: Node): this {
    const nodeDetail = this._nodeMap.get(node.id)
    if (nodeDetail) {
      this._nodeMap.delete(node.id)
      if (nodeDetail.children.size > 0) {
        for (const detail of nodeDetail.children.values()) {
          this.remove(detail.node)
        }
      }
    }
    return this
  }

  clear(): this {
    this._nodeMap.clear()
    return this
  }
}
