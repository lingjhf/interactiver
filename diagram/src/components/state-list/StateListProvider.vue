<template>
  <slot />
</template>

<script setup lang="ts">
import { StateListProviderKey } from './provider'
import type { StateListItem, StateListProviderProps } from './types'

const props = defineProps<StateListProviderProps>()

const items = ref<StateListItem[]>([])
let sourceItems: StateListItem[] = []

const itemsChanged = computed<StateListItem[]>(
  () => items.value.filter(item => item.state),
)

function setItems(value: StateListItem[]) {
  sourceItems = JSON.parse(JSON.stringify(value))
  items.value = value
}

function resetItems() {
  if (itemsChanged.value.length) {
    setItems(sourceItems)
  }
}

function applyChanged() {
  if (!itemsChanged.value.length) {
    return
  }
  const _items: StateListItem[] = []
  for (let item of items.value) {
    item = { ...item }
    if (item.state !== 'remove') {
      item.state = undefined
      _items.push(item)
    }
  }
  if (props.apply && !props.apply(_items)) {
    return
  }
  setItems(_items)
}

function addItem(item: StateListItem) {
  item.state = 'add'
  items.value.push(props.addItem?.(item) ?? item)
}

function removeItem(index: number) {
  const item = items.value[index]
  if (item.state === 'add') {
    items.value.splice(index, 1)
  }
  else if (item.state === 'remove') {
    item.state = undefined
  }
  else {
    item.state = 'remove'
  }
}

provide(StateListProviderKey, {
  items,
  itemsChanged,
  setItems,
  resetItems,
  applyChanged,
  addItem,
  removeItem,
})

</script>
