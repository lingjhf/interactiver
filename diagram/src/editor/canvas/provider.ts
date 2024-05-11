import { Point, Scale } from '@interactiver/core'

export const CanvasProviderKey = Symbol() as InjectionKey<{
  scale: Scale,
  getOffsetGlobalPosition: (event: PointerEvent | MouseEvent) => Point,
  addColumn: (key: string) => void,
}>
