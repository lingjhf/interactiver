export function createDragHandler(options: {
  start?: (event: PointerEvent) => void,
  move?: (event: PointerEvent) => void,
  end?: (event: PointerEvent) => void,
}) {
  const onPointerdown = (event: PointerEvent) => {
    options.start?.(event)
    window.addEventListener('pointermove', onPointermove)
    window.addEventListener('pointerup', onPointerup)
  }

  const onPointermove = (event: PointerEvent) => {
    options.move?.(event)
  }

  const onPointerup = (event: PointerEvent) => {
    options.end?.(event)
    window.removeEventListener('pointermove', onPointermove)
    window.removeEventListener('pointerup', onPointerup)
  }
  return onPointerdown
}
