export interface StateListProps {
  data: StateListItem[],
}

export type StateListProviderProps = {
  addItem?: (item: StateListItem) => StateListItem,
  apply?: (value: any) => boolean,
}

export interface StateListItem {
  state?: 'add' | 'remove' | 'modify',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any,
}
