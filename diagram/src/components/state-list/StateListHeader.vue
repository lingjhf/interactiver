<template>
  <div class='flex'>
    <a-button
      class='ml-auto'
      shape='circle'
      @click='add'
    >
      <template #icon>
        <icon-plus />
      </template>
    </a-button>
  </div>
</template>

<script setup lang="ts">

import { IconPlus } from '@arco-design/web-vue/es/icon'

import { StateListProviderKey } from './provider'
import type { StateListProps, StateListItem } from './types'

const providerValue = inject(StateListProviderKey)
if (!providerValue) {
  throw Error('Must be used with StateListProvider')
}

const { items, setItems, addItem, removeItem } = providerValue

function add() {
  addItem({})
}
</script>
