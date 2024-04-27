import { Node } from '@interactiver/core'

export function generateTree(deep: number, level = 1, parent?: Node): Node {
  if (!parent) {
    parent = new Node({ width: 300, height: 200 })
  }
  const nodes: Node[] = []
  if (level < deep) {
    nodes.push(...Array.from({ length: level + 1 }, () => {
      return new Node({ width: 300, height: 200 })
    }))
    parent.add(...nodes)
    level++
    for (const node of nodes) {
      generateTree(deep, level, node)
    }
  }
  return parent
}
