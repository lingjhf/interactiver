import hotkeys, { KeyHandler } from 'hotkeys-js'

export interface ShortcutKey {
  scope: string,
  name: string,
  shortcut: string,
  handler: KeyHandler,
}

export class Keyboard {
  private _init(keys: ShortcutKey[]) {
    for (const key of keys) {
      hotkeys(key.shortcut, { scope: key.scope }, key.handler)
    }
  }
}
