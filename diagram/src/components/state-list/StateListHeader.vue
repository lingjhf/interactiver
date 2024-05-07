<template>
  <div class='flex'>
    <Button
      class='ml-auto w-32px h-32px'
      rounded
      @click='add'
    >
      <template #icon>
        <icon-plus />
      </template>
    </Button>
  </div>
</template>

<script setup lang="ts">

import { IconPlus } from '@arco-design/web-vue/es/icon'

import { StateListProviderKey } from './provider'

const providerValue = inject(StateListProviderKey)
if (!providerValue) {
  throw Error('Must be used with StateListProvider')
}

const { addItem } = providerValue

function add() {
  addItem({})
}
</script>
