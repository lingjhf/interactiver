import { EventEmitter } from 'eventemitter3'

import { Point, Scale, Edge, Node } from '../../core'

export const CanvasProviderKey = Symbol() as InjectionKey<{
  scale: Scale,
  edges: Ref<Map<string, string>>,
  setCurrentEdge: (edge?: Edge<Node>) => void,
  getEventGlobalPosition: (event: PointerEvent | MouseEvent) => Point,
  getGlobalPosition: (point: Point) => Point,
}>
