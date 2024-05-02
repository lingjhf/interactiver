<template>
  <div
    class='relative'
    :style='sidebarStyles'
  >
    <slot />
    <div
      class='top-0 -right-4px bottom-0 w-8px absolute select-none'
      @mouseenter='mouseenter'
      @mouseleave='mouseleave'
      @pointerdown='pointerdown'
    />
  </div>
</template>

<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    width?: number,
    max?: number,
    min?: number,
  }>(), {
    width: 300,
    max: 800,
    min: 100,
  },
)

const emit = defineEmits<{
  'update:width': [value: number],
}>()

const sidebarWidth = ref(props.width)
const cursor = ref('auto')
let isDown = false
let isEnter = false

watch(cursor, () => {
  document.body.style.cursor = cursor.value
})

const sidebarStyles = computed(() => ({
  width: `${sidebarWidth.value}px`,
}))

function mouseenter() {
  isEnter = true
  cursor.value = 'w-resize'
}

function mouseleave() {
  isEnter = false
  if (!isDown) {
    cursor.value = 'auto'
  }
}

function pointerdown(event: PointerEvent) {
  isDown = true
  cursor.value = 'w-resize'
  pointerup(pointermove(event.pageX))
}

function pointermove(startX: number) {
  const width = sidebarWidth.value
  const handler = (event: PointerEvent) => {
    let w = width + event.pageX - startX
    if (w < props.min) {
      w = props.min
    }
    else if (w > props.max) {
      w = props.max
    }
    sidebarWidth.value = w
    emitWidth()
  }
  window.addEventListener('pointermove', handler)
  return handler
}

function pointerup(pointermove: (event: PointerEvent) => void) {
  const handler = () => {
    isDown = false
    if (!isEnter) {
      cursor.value = 'auto'
    }
    window.removeEventListener('pointermove', pointermove)
    window.removeEventListener('pointerup', handler)
  }
  window.addEventListener('pointerup', handler)
}

function emitWidth() {
  emit('update:width', sidebarWidth.value)
}

</script>
