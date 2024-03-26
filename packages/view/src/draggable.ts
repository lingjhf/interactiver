import { Draggable, DraggableOptions, Point } from '@interactiver/core'

export function createDraggable(hm: HammerManager, options?: { onChange?: () => void, options?: DraggableOptions, }) {
  const draggable = new Draggable(options?.options)
  hm.on('panstart', (event: HammerInput) => {
    draggable.start(new Point({ x: event.center.x, y: event.center.y }))
    options?.onChange?.()
  })
  hm.on('panmove', (event: HammerInput) => {
    draggable.move(new Point({ x: event.center.x, y: event.center.y }))
    options?.onChange?.()
  })
  return draggable
}
