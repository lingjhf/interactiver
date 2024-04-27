import { TreeLayout, Node, TreeLayoutLabel, TreeLayoutDirection, Edge } from '@interactiver/core'
import * as d3 from 'd3'

import { generateLRCurve, generateRLCurve, generateTBCurve, generateBTCurve } from './paths'

export interface D3TreeEdge {
  d: string,
  edge: Edge<Node>,
}

export class D3Tree {
  constructor(root: Node) {
    this._layout = new TreeLayout(root)
    this._initNodes(this._layout.root.children)
  }

  private _layout: TreeLayout

  private _nodes: Node[] = []

  private _direction: TreeLayoutDirection = 'LR'

  get nodes(): Node[] {
    return this._nodes
  }

  get edges(): D3TreeEdge[] {
    const d3TreeEdges: D3TreeEdge[] = []
    for (const node of this._nodes) {
      if (node.parent) {
        const edge = new Edge(node.parent, node)
        let path: d3.Path
        switch (this._direction) {
          case 'RL':
            path = generateRLCurve(edge)
            break
          case 'TB':
            path = generateTBCurve(edge)
            break
          case 'BT':
            path = generateBTCurve(edge)
            break
          default:
            path = generateLRCurve(edge)
        }
        d3TreeEdges.push({ d: path.toString(), edge })
      }
    }
    return d3TreeEdges
  }

  layout(options: TreeLayoutLabel): this {
    this._direction = options.rankdir ?? this._direction
    this._nodes = this._layout.layout(options)
    return this
  }

  private _initNodes(nodes: Node[]) {
    for (const node of nodes) {
      if (node.parent) {
        this._layout.setNode(node, node.parent)
        if (node.children.length > 0) {
          this._initNodes(node.children)
        }
      }
    }
  }
}
