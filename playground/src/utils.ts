import { TreeLayoutNode, TreeLayout } from '@interactiver/core'

export function generateTree(layout: TreeLayout, deep: number, level = 0, parent: TreeLayoutNode[] = []) {
  const nodes: TreeLayoutNode[] = []
  if (level < deep) {
    if (parent.length === 0) {
      nodes.push(...Array.from({ length: level + 1 }, (_, key) => new TreeLayoutNode(layout, { id: `${key}`, width: 100, height: 70 })))
    }
    for (const parentNode of parent) {
      const children = Array.from({ length: level + 1 }, (_, key) => new TreeLayoutNode(layout, { id: `${parentNode.id}-${key}`, width: 100, height: 70 }))
      parentNode.add(...children)
      nodes.push(...children)
    }
    generateTree(layout, deep, ++level, nodes)
  }
  return nodes
}
