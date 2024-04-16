<template>
  <div class='flex h-full w-full example'>
    <div class='w-100% flex justify-center items-center overflow-auto'>
      <VirtualList
        class='w-400px border'
        :height='600'
        :items='items'
        @change='itemsChange'
      >
        <div
          v-for='item in virtualItems'
          :key='item.y'
          class=' box-border border flex  items-center p-2 justify-between '
          :style='{ height: `${item.height}px` }'
        >
          <v-checkbox
            color='red'
            hide-details
            label='red'
            :model-value='true'
            value='red'
          />
          id: {{ item.id }}
          <div>
            y: {{ item.y }}
          </div>

          height: {{ item.height }}
        </div>
      </VirtualList>
    </div>
    <v-divider
      vertical
    />
    <div class='w-300px flex-shrink-0 flex flex-col p-2'>
      总数: {{ items.length }}
      <div class='flex mt-4'>
        <v-text-field
          v-model='itemsCount'
          density='compact'
          label='数量'
          variant='outlined'
        />
        <v-btn
          class='ml-2'
          style='--v-btn-height:40px'
          @click='onGenerateItems'
        >
          生成
        </v-btn>
      </div>
      <div class='flex '>
        <v-text-field
          v-model='removeIndexRange.start'
          density='compact'
          label='开始下标'
          variant='outlined'
        />
        <v-text-field
          v-model='removeIndexRange.end'
          class='ml-2'
          density='compact'
          label='结束下标'
          variant='outlined'
        />
        <v-btn
          class='ml-2'
          style='--v-btn-height:40px'
          @click='onRemoveRange'
        >
          删除
        </v-btn>
      </div>
      <v-btn
        class='w-full mt-auto'
        @click='reset'
      >
        重置
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VirtualListItemRaw, VirtualListItem } from '@interactiver/virtual-list'

const itemsCount = ref(1000)
const removeIndexRange = ref<{ start?: number, end?: number, }>({ start: 10, end: 20 })
const items = ref<VirtualListItemRaw[]>(generateItems(itemsCount.value))
const virtualItems = ref<VirtualListItem[]>([])

function itemsChange(items: VirtualListItem[]) {
  virtualItems.value = items
}

function onGenerateItems() {
  items.value = generateItems(itemsCount.value)
}

function onRemoveRange() {
  const startIndex = Number(removeIndexRange.value.start)
  const endIndex = Number(removeIndexRange.value.end)
  if (!isNaN(startIndex) && !isNaN(endIndex) && endIndex > startIndex) {
    items.value = [...items.value.slice(0, startIndex), ...items.value.slice(endIndex, items.value.length)]
  }
}

function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateItems(value: number): VirtualListItemRaw[] {
  return Array.from({ length: value }, (_, index) => ({ id: index, height: getRandom(50, 50), checked: false } as VirtualListItemRaw))
}

function reset() {
  itemsCount.value = 1000
  items.value = generateItems(itemsCount.value)
}

</script>
