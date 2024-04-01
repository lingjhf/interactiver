import dagre from 'dagre'

import { Edge } from './edge'
import { NodeOptions, Node } from './node'

export type TreeGraphLabel = dagre.GraphLabel

type TreeLayoutNodeMap = Map<string, Node>
type TreeLayoutEdgeMap = Map<string, Edge<Node>>

export class TreeLayout {
  private _graph = new dagre.graphlib.Graph()

  private _nodeMap: TreeLayoutNodeMap = new Map()

  private _edgeMap: TreeLayoutEdgeMap = new Map()

  get nodes(): Node[] {
    return [...this._nodeMap.values()]
  }

  get edges(): Edge<Node>[] {
    return [...this._edgeMap.values()]
  }

  addNode() {}

  remove() {}

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
