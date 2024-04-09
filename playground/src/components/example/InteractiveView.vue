<template>
  <div
    ref='interactiveRef'
    class='w-full h-full'
  >
    <div ref='interactiveViewRef' />
  </div>
</template>

<script setup lang="ts">
import { InteractiveView, Interactive } from '@interactiver/view'

let interactiveView: InteractiveView

const interactiveRef = shallowRef<HTMLDivElement>()
const interactiveViewRef = shallowRef<HTMLDivElement>()

onMounted(() => {
  if (interactiveRef.value && interactiveViewRef.value) {
    interactiveView = new InteractiveView(interactiveRef.value, new Interactive(interactiveViewRef.value))
  }
})

</script>

<style scoped></style>
