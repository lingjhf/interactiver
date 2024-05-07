<template>
  <div class='flex items-center'>
    <div class=' ml-auto [&>:not(first-child)]:ml-2'>
      <Button
        class='h-24px'
        size='small'
        @click='resetItems'
      >
        Reset
      </Button>
      <Button
        class='h-24px'
        size='small'
        @click='applyChanged'
      >
        <span
          v-if='itemsChanged.length'
          class='mr-1'
        >{{ itemsChanged.length }}</span>
        Apply
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StateListProviderKey } from './provider'

const providerValue = inject(StateListProviderKey)
if (!providerValue) {
  throw Error('Must be used with StateListProvider')
}

const { itemsChanged, resetItems, applyChanged } = providerValue

</script>
