import Hammer from 'hammerjs'

export function twoTap(hm: HammerManager, handler: HammerListener) {
  hm.add(new Hammer.Tap({ event: 'twoTap', pointers: 2 }))
  hm.on('twoTap', handler)
}

export function threeTap(hm: HammerManager, handler: HammerListener) {
  hm.add(new Hammer.Tap({ event: 'threeTap', pointers: 3 }))
  hm.on('threeTap', handler)
}

export function fourTap(hm: HammerManager, handler: HammerListener) {
  hm.add(new Hammer.Tap({ event: 'fourTap', pointers: 4 }))
  hm.on('fourTap', handler)
}

export function threeSwipe(hm: HammerManager, handler: HammerListener) {
  hm.add(new Hammer.Swipe({ event: 'threeSwipe', pointers: 3 }))
  hm.on('treeSwipe', handler)
}
