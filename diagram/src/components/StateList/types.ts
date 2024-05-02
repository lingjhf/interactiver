export interface StateListProps {
  data: StateListItem[],
}

export type StateListEmits = {
  'update:data': [value: StateListItem[]],
}

export interface StateListItem {
  state?: 'add' | 'remove' | 'modify',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any,
}
