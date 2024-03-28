export function createElement<K extends keyof SVGElementTagNameMap>(qualifiedName: K): SVGElementTagNameMap[K] {
  return document.createElementNS('http://www.w3.org/2000/svg', qualifiedName)
}
