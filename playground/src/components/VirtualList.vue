<template>
  <div
    ref='virtualRef'
    class='virtual-list'
    :style='`height:${visualHeight}px`'
  >
    <div
      class='virtual-list-container'
      :style='`height:${totalHeight}px`'
    >
      <div
        class='virtual-item-container'
        :style='`transform: translateY(${contentTop}px)`'
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VirtualList } from '@interactiver/virtual-list'
import { onMounted, ref, shallowRef, watch } from 'vue'

import type { VirtualListItem, VirtualListItemRaw } from '@interactiver/virtual-list'

const props = withDefaults(
  defineProps<{
    height: number,
    items?: VirtualListItemRaw[],
    buffer?: number,
  }>(),
  {
    items: () => [],
    buffer: 10,
  },
)

const emits = defineEmits<{
  (e: 'change', items: VirtualListItem[]): void,
}>()

const virtualScroll = new VirtualList({ items: [], viewHeight: props.height, buffer: 0, change: (items) => {
  if (items.length > 0) {
    contentTop.value = items[0].y
  }
  emits('change', items)
} })
const virtualRef = shallowRef<HTMLDivElement>()
const visualHeight = ref(0)
const totalHeight = ref(0)
const contentTop = ref(0)

watch([() => props.items, () => props.height, () => props.buffer], () => {
  if (props.items.length > 0) {
    virtualScroll.setItems(props.items)
    if (virtualRef.value) {
      virtualRef.value.scrollTop = virtualScroll.scrollTop
    }
  }
  if (props.height > 0 && props.height !== virtualScroll.viewHeight) {
    virtualScroll.setViewHeight(props.height)
  }
  if (props.buffer >= 0 && props.buffer !== virtualScroll.buffer) {
    virtualScroll.setBuffer(props.buffer)
  }
  visualHeight.value = virtualScroll.viewHeight
  totalHeight.value = virtualScroll.totalHeight
  virtualScroll.exec()
}, {
  immediate: true,
})

onMounted(() => {
  virtualRef.value?.addEventListener('scroll', event => scroll(event))
})

function scroll(event: Event) {
  const eventTarget = event.target as HTMLDivElement
  virtualScroll.setScrollTop(eventTarget.scrollTop).exec()
}

</script>

<style>
.virtual-list {
  overflow-y: auto;
}

.virtual-list-container {
  position: relative;
}

.virtual-item-container {
  position: absolute;
  left: 0;
  right: 0;
}
</style>
