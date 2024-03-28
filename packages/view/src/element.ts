import { generateLRCurve, generateRLCurve, generateBTCurve, generateTBCurve, Edge, Cell } from '@interactiver/core'

export function createElement<K extends keyof SVGElementTagNameMap>(qualifiedName: K): SVGElementTagNameMap[K] {
  return document.createElementNS('http://www.w3.org/2000/svg', qualifiedName)
}

export function createCurve(direction: 'LR' | 'RL' | 'TB' | 'BT', edge: Edge<Cell>) {
  const path = createElement('path')
  let d = ''
  switch (direction) {
    case 'LR':
      d = generateLRCurve(edge).toString()
      break
    case 'RL':
      d = generateRLCurve(edge).toString()
      break
    case 'TB':
      d = generateTBCurve(edge).toString()
      break
    case 'BT':
      d = generateBTCurve(edge).toString()
      break
  }
  path.setAttribute('d', d)
  path.setAttribute('fill', 'none')
  return path
}
