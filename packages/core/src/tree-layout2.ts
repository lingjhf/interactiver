import dagre from 'dagre'

import { Node, Edge } from './base'

export type TreeLayoutLabel = dagre.GraphLabel

export interface TreeLayoutNodeDetail {
  offset: number,
  limit: number,
  expand: boolean,
  edge?: Edge<Node>,
  parent?: TreeLayoutNodeDetail,
  children: Map<Node, TreeLayoutNodeDetail>,
}

export interface TreeLayoutNodeOptions {
  offset?: number,
  limit?: number,
  expand?: boolean,
  parent?: Node,
}

export class TreeLayout {
  private _graph = new dagre.graphlib.Graph()

  private _nodeMap: Map<Node, TreeLayoutNodeDetail> = new Map()

  // private _visibleNodeMap: Map<Node, Edge<Node>> = new Map()

  /**
   * 执行布局
   *
   * @param label
   * @returns
   */
  layout(label: TreeLayoutLabel): this {
    this._graph = new dagre.graphlib.Graph()
    this._graph.setGraph(label)
    this._graph.setDefaultEdgeLabel(() => ({}))
    // for (const { node } of this._nodeMap.values()) {
    //   this._graph.setNode(node.id, { width: node.width, height: node.height })
    // }
    // for (const edge of this._edgeMap.values()) {
    //   this._graph.setEdge(edge.source.id, edge.target.id)
    // }
    // dagre.layout(this._graph)
    // for (const id of this._graph.nodes()) {
    //   const node = this._nodeMap.get(id)
    //   if (node) {
    //     const graphNode = this._graph.node(id)
    //     node.position.set({ x: graphNode.x, y: graphNode.y })
    //   }
    // }
    return this
  }

  setNode(node: Node, options?: TreeLayoutNodeOptions): this {
    let nodeDetail = this._nodeMap.get(node)
    if (!nodeDetail) {
      let targetDetail: TreeLayoutNodeDetail | undefined
      if (options?.parent) {
        targetDetail = this._nodeMap.get(options.parent)
      }
      nodeDetail = { offset: options?.offset ?? 0, limit: options?.limit ?? 10, expand: options?.expand ?? false, parent: targetDetail, children: new Map() }
      this._nodeMap.set(node, nodeDetail)
      if (targetDetail) {
        targetDetail.children.set(node, nodeDetail)
      }
      return this
    }
    else {
      if (options?.parent) {
        const targetDetail = this._nodeMap.get(options.parent)
        if (targetDetail && nodeDetail.parent !== targetDetail) {
          nodeDetail.parent?.children?.delete(node)
          nodeDetail.parent = targetDetail
          targetDetail.children.set(node, nodeDetail)
        }
      }
      nodeDetail.offset = options?.offset ?? nodeDetail.offset
      nodeDetail.limit = options?.limit ?? nodeDetail.limit
      nodeDetail.expand = options?.expand ?? nodeDetail.expand
      nodeDetail.parent = options?.parent ? nodeDetail.parent : undefined
    }

    return this
  }

  remove(node: Node): this {
    const nodeDetail = this._nodeMap.get(node)
    if (nodeDetail) {
      this._nodeMap.delete(node)
      if (nodeDetail.children.size > 0) {
        for (const child of nodeDetail.children.keys()) {
          this.remove(child)
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
