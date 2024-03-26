import { resolve } from 'node:path'

function r(p: string) {
  return resolve(__dirname, p)
}

export const alias: Record<string, string> = {
  '@interactiver/core': r('./packages/core/src/'),
  '@interactiver/view': r('./packages/view/src/'),
  '@interactiver/gestures': r('./packages/gestures/src/'),
  '@interactiver/keyboard': r('./packages/keyboard/src/'),
}
