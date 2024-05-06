<template>
  <div class='flex flex-col h-full pt-2 px-2'>
    {{ columns }}
    <state-list-provider>
      <state-list-header />
      <state-list
        class='mt-2'
        :data='columns'
      >
        <template #default='{item}'>
          <div class='flex w-full [&>*]:bg-transparent! [&>*]:border-none!'>
            <a-input
              v-model='item.name'
              :disabled="item.state ==='remove'"
              placeholder='name'
            />
            <a-select
              :disabled="item.state ==='remove'"
              placeholder='type'
            >
              <a-option
                v-for='option in dataTypes'
                :key='option.value'
                :value='option.value'
              >
                {{ option.name }}
              </a-option>
            </a-select>
            <a-checkbox
              v-model='item.nullable'
              class='p-0 w-9 flex-shrink-0'
            >
              <template #checkbox='{ checked }'>
                <a-tag
                  checkable
                  :checked='checked'
                  class='p-0 h-full w-full flex justify-center items-center'
                  color='blue'
                >
                  <icon-question class='text-20px' />
                </a-tag>
              </template>
            </a-checkbox>
            <a-input
              v-model='item.default'
              :disabled="item.state ==='remove'"
              placeholder='(NULL)'
            />

            <a-checkbox
              v-model='item.primary'
              class='p-0 w-9 flex-shrink-0'
            >
              <template #checkbox='{ checked }'>
                <a-tag
                  checkable
                  :checked='checked'
                  class='p-0 h-full w-full flex justify-center items-center'
                  color='blue'
                >
                  <IconKeyVerticalOutline class='text-20px' />
                </a-tag>
              </template>
            </a-checkbox>
          </div>
        </template>
      </state-list>
      <state-list-footer class=' mt-auto  bg-#0000001a h-9 px-2' />
    </state-list-provider>
  </div>
</template>

<script setup lang="ts">

import { dataTypes } from './constants'
import type { DatabaseTableColumnsProps } from './types'
import type { DatabaseTableField } from '../../types'

const props = withDefaults(defineProps<DatabaseTableColumnsProps>(), {
  data: () => [],
})

const columns = ref<DatabaseTableField[]>(props.data)

watch(() => props.data, () => {
  if (props.data.length > 0) {
    columns.value = props.data
  }
  else {
    setDefaultColumns()
  }
}, {
  immediate: true,
})

function setDefaultColumns() {
  columns.value = [{
    name: '123',
    type: '',
    nullable: false,
    primary: false,
    unique: false,
  }]
}
</script>
