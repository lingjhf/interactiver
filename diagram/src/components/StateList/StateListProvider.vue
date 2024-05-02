<template>
  <slot />
</template>

<script setup lang="ts">
import { StateListProviderKey } from './provider'
import type { StateListProps, StateListItem } from './types'

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
  setItems(sourceItems)
}

function applyChanged() {
  if (!itemsChanged.value.length) {
    return
  }
  const _items: StateListItem[] = []
  for (const item of items.value) {
    if (item.state !== 'remove') {
      item.state = undefined
      _items.push(item)
    }
  }
  setItems(_items)
}

function addItem(item: StateListItem) {
  item.state = 'add'
  items.value.push(item)
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
