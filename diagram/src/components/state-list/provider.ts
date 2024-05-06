import type { StateListItem } from './types'

export const StateListProviderKey = Symbol() as InjectionKey<{
  items: Ref<StateListItem[]>,
  itemsChanged: ComputedRef<StateListItem[]>,
  setItems: (value: StateListItem[]) => void,
  resetItems: () => void,
  applyChanged: () => void,
  addItem: (item: StateListItem) => void,
  removeItem: (index: number) => void,
}>
