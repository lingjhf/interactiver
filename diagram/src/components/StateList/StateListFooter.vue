<template>
  <div class='flex items-center'>
    <div class=' ml-auto [&>:not(first-child)]:ml-2'>
      <a-button
        size='mini'
        @click='resetItems'
      >
        Reset
      </a-button>
      <a-button
        size='mini'
        @click='applyChanged'
      >
        <span
          v-if='itemsChanged.length'
          class='mr-1'
        >{{ itemsChanged.length }}</span>
        Apply
      </a-button>
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
