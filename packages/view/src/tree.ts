import { TreeLayout, TreeLayoutNode, Edge, TreeGraphLabel } from '@interactiver/core'

export interface TreeOptions {
  renderNode?: (node: TreeLayoutNode) => SVGGraphicsElement,
  renderEdge?: (edge: Edge<TreeLayoutNode>) => SVGGraphicsElement,
}

export class Tree {
  constructor(options?: TreeOptions) {
    this.layout = new TreeLayout()
    this._renderNode = options?.renderNode
    this._renderEdge = options?.renderEdge
  }

  readonly layout: TreeLayout

  private _renderNode?: (node: TreeLayoutNode) => void

  private _renderEdge?: (node: Edge<TreeLayoutNode>) => void

  elements: SVGGraphicsElement[] = []

  autoLayout(options: TreeGraphLabel): this {
    this.layout.layout(options)
    this.elements = []
    for (const edge of this.layout.edges) {
      const e = this._renderEdge?.(edge)
      if (e) {
        this.elements.push(e)
      }
    }
    for (const node of this.layout.nodes) {
      const n = this._renderNode?.(node)
      if (n) {
        this.elements.push(n)
      }
    }
    return this
  }
}
