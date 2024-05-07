<template>
  <div class='database-table-list h-full  flex flex-col'>
    <div class='px-2'>
      <InputText
        class='w-full'
        size='small'
        variant='filled'
      />
    </div>
    <div class='flex pt-2 px-3 items-center'>
      <div>
        Tables
      </div>
      <Button
        class='w-32px h-32px ml-auto'
        rounded
        @click='addTable'
      >
        <template #icon>
          <icon-plus />
        </template>
      </Button>
    </div>
    <div
      class=' h-full overflow-auto pt-2'
    >
      <Tree
        v-model:selectionKeys='expandedKeys'
        class='w-full'
        :pt='{root:{class:"p-0"}, label:{class:"flex w-full"} }'
        selection-mode='single'
        :value='treeData'
        @node-select='onNodeSelect'
      >
        <template #default='{node}'>
          <div class='w-full flex items-center'>
            {{ node.title }}
            <Button
              class='w-32px h-32px  ml-auto'
              text
              @click='removeTable(node.key)'
            >
              <template #icon>
                <icon-close />
              </template>
            </Button>
          </div>
        </template>
        <template #field='{node}'>
          <div>
            {{ node.title }}
          </div>
        </template>
      </Tree>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconPlus, IconClose } from '@arco-design/web-vue/es/icon'
import { TreeNode } from 'primevue/treenode'

import { useEditorStore } from '../store'
import { DatabaseTable } from '../types'
const editorStore = useEditorStore()

const treeData = ref<TreeNode[]>([])
const expandedKeys = ref<string[]>([])

watch(() => editorStore.tables, (value) => {
  treeData.value = generateTreeData(value)
}, { immediate: true, deep: true })

function generateTreeData(data: DatabaseTable[]) {
  const treeData: TreeNode[] = []
  for (const table of data) {
    const children: TreeNode[] = []
    if (table.fields.length > 0) {
      for (const field of table.fields) {
        children.push({
          key: field.name,
          title: field.name,
          type: 'field',
          isLeaf: true,
        })
      }
    }
    const treeNodeData: TreeNode = {
      key: table.name,
      title: table.name,
      children: children,
    }
    treeData.push(treeNodeData)
  }
  return treeData
}

function addTable() {
  editorStore.addTable({ name: `table_${treeData.value.length}`, comment: '', fields: [] })
}

function removeTable(key?: string) {
  if (key) {
    editorStore.removeTable(key)
  }
}

function onNodeSelect(value: TreeNode) {
  if (value.key) {
    editorStore.setCurrentTable(value.key)
  }
}
</script>
