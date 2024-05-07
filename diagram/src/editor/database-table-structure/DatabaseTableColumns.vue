<template>
  <div class='flex flex-col h-full pt-2 '>
    <Message
      v-if='errorMessage'
      class='mx-2'
      :closable='false'
      severity='error'
    >
      {{ errorMessage }}
    </Message>
    <state-list-provider
      :add-item='addItem'
      :apply='applyColumns'
    >
      <state-list-header class='px-2' />
      <state-list
        class='mt-2 px-2'
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
              v-model='item.type'
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

import { StateListItem } from '../../components/state-list/types'
import { dataTypes } from '../constants'
import { useEditorStore } from '../store'
import type { DatabaseTableField } from '../types'

const editorStore = useEditorStore()

const errorMessage = ref('')
const columns = ref<DatabaseTableField[]>([])

watch(() => editorStore.currentTable, () => {
  columns.value = editorStore.currentTable?.fields ?? []
}, {
  immediate: true,
})

function addItem(item: StateListItem) {
  item.type = 'int'
  return item
}

function applyColumns(items: DatabaseTableField[]) {
  const set = new Set()
  for (const item of items) {
    if (set.has(item.name)) {
      errorMessage.value = `字段 ${item.name} 重复`
      return false
    }
    if (!item.name) {
      errorMessage.value = '字段不能为空'
      return false
    }
    set.add(item.name)
  }
  errorMessage.value = ''
  if (editorStore.currentTable) {
    editorStore.updateTable(editorStore.currentTable.name, { fields: items })
  }
  return true
}
</script>
