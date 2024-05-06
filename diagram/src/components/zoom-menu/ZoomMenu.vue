<template>
  <div class='flex items-center w-200px h-32px'>
    <div class='w-32px h-32px rounded-l-50% overflow-hidden border-y-[.5px] border-y-solid border-l-[.5px] border-l-solid flex-shrink-0  border-blue-500'>
      <a-button
        type='text'
        @click='minus'
      >
        <template #icon>
          <icon-minus />
        </template>
      </a-button>
    </div>
    <div class='w-full h-full flex items-center px-12px border-y-[.5px] border-y-solid  border-blue-500'>
      <a-slider
        :max='max'
        :min='min'
        :model-value='sliderValue'
        :step='step'
        @update:model-value='sliderUpdate'
      />
    </div>
    <div class='w-32px h-32px rounded-r-50% overflow-hidden border-y-[.5px] border-y-solid border-r-[.5px] border-r-solid flex-shrink-0  border-blue-500'>
      <a-button
        type='text'
        @click='add'
      >
        <template #icon>
          <icon-plus />
        </template>
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconPlus, IconMinus } from '@arco-design/web-vue/es/icon'

const props = withDefaults(defineProps<{
  direction?: 'horizontal' | 'vertical',
  modelValue?: number,
  step?: number,
  min?: number,
  max?: number,
}>(), {
  direction: 'horizontal',
  modelValue: 0,
  step: 1,
  min: 0,
  max: 100,
})

const emit = defineEmits<{
  'update:modelValue': [value: number],
}>()

const sliderValue = ref(0)

watch(() => props.modelValue, () => {
  sliderValue.value = props.modelValue
}, {
  immediate: true,
})

function emitValue() {
  emit('update:modelValue', sliderValue.value)
}

function sliderUpdate(value: number | [number, number]) {
  if (typeof value === 'number') {
    sliderValue.value = value
    emitValue()
  }
}

function add() {
  const value = sliderValue.value + props.step
  if (value <= props.max) {
    sliderValue.value = value
  }
}

function minus() {
  const value = sliderValue.value - props.step
  if (value >= props.min) {
    sliderValue.value = value
  }
}

</script>
