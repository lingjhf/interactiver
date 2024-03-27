import { TreeLayout, TreeLayoutNode, Edge, TreeGraphLabel } from '@interactiver/core'

export interface TreeOptions {
  renderNode?: (node: TreeLayoutNode) => SVGGraphicsElement,
  renderEdge?: (edge: Edge<TreeLayoutNode>) => SVGGraphicsElement,
}

export class Tree {
  constructor(init: (layout: TreeLayout) => void, options?: TreeOptions) {
    this._layout = new TreeLayout()
    init(this._layout)
    this._renderNode = options?.renderNode
    this._renderEdge = options?.renderEdge
  }

  private _layout: TreeLayout

  private _renderNode?: (node: TreeLayoutNode) => void

  private _renderEdge?: (node: Edge<TreeLayoutNode>) => void

  elements: SVGGraphicsElement[] = []

  layout(options: TreeGraphLabel): this {
    this._layout.layout(options)
    this.elements = []
    for (const node of this._layout.nodes) {
      const n = this._renderNode?.(node)
      if (n) {
        this.elements.push(n)
      }
    }
    for (const edge of this._layout.edges) {
      const e = this._renderEdge?.(edge)
      if (e) {
        this.elements.push(e)
      }
    }
    return this
  }
}
