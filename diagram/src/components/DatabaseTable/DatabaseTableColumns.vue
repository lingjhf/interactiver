<template>
  <div class='flex flex-col h-full pt-2'>
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
            />
            <a-select
              :disabled="item.state ==='remove'"
            />
            <a-checkbox>
              <template #checkbox='{ checked }'>
                <a-tag
                  checkable
                  :checked='checked'
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

            <a-checkbox>
              <template #checkbox='{ checked }'>
                <a-tag
                  checkable
                  :checked='checked'
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

function addColumn() {
  columns.value.push({
    name: '',
    type: '',
    nullable: false,
    primary: false,
    unique: false,
  })
}

</script>
