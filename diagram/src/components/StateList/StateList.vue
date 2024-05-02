<template>
  <div class='[&>:not(:first-child)]:mt-2'>
    <div
      v-for='(item,index) in items'
      :key='index'
      class='flex rounded-1 h-9 w-full'
      :style='getItemStyle(item)'
    >
      <slot v-bind='{item,index}' />
      <a-button
        class='flex-shrink-0  bg-transparent! hover:bg-transparent!'
        size='large'
        @click='remove(index)'
      >
        <template #icon>
          <icon-undo v-if="item.state ==='remove'" />
          <icon-close v-else />
        </template>
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconClose, IconUndo } from '@arco-design/web-vue/es/icon'

import { StateListProviderKey } from './provider'
import type { StateListProps, StateListItem, StateListEmits } from './types'

const providerValue = inject(StateListProviderKey)
if (!providerValue) {
  throw Error('Must be used with StateListProvider')
}

const { items, setItems, removeItem } = providerValue

const props = withDefaults(defineProps<StateListProps>(), {
  data: () => [],
})

const emit = defineEmits<StateListEmits>()

watch(() => props.data, () => {
  setItems(props.data)
},
{
  immediate: true,
})

function getItemStyle(item: StateListItem) {
  let bgColor = '#0000000d'
  switch (item.state) {
    case 'add':
      bgColor = '#5EDFD6'
      break
    case 'remove':
      bgColor = '#F98981'
      break
  }
  return { 'background-color': bgColor }
}

function remove(index: number) {
  removeItem(index)
}
</script>
