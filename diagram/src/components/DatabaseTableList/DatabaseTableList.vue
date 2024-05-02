<template>
  <div class='database-table-list'>
    <div class='px-2'>
      <a-input />
    </div>
    <div class='flex pt px-3 items-center'>
      <div>
        Tables
      </div>
      <a-button
        class='ml-auto'
        size='mini'
        type='text'
        @click='add'
      >
        <template #icon>
          <icon-plus />
        </template>
      </a-button>
    </div>
    <div class='px-2 pt-3'>
      <a-tree
        v-model:expanded-keys='expandedKeys'
        block-node
        :data='treeData'
        :show-line='true'
      >
        <template #title='{title,type,isLeaf}'>
          <div
            v-if='isLeaf'
            class='flex w-full'
          >
            <span> {{ title }}</span>
            <span class='ml-auto'>
              {{ type }}
            </span>
          </div>
          <div v-else>
            {{ title }}
          </div>
        </template>
      </a-tree>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TreeNodeData } from '@arco-design/web-vue'
import { IconDown, IconPlus } from '@arco-design/web-vue/es/icon'

import { DatabaseTableListProps } from './DatabaseTableList.types'
import { DatabaseTable } from '../../types'

const props = withDefaults(defineProps<DatabaseTableListProps>(), {
  data: () => [],
})

const emit = defineEmits<{
  add: [],
}>()

const treeData = ref<TreeNodeData[]>([])
const expandedKeys = ref<string[]>([])

watch(() => props.data, () => {
  initTreeData(props.data)
}, {
  immediate: true,
})

function initTreeData(data: DatabaseTable[]) {
  const _treeData: TreeNodeData[] = []
  for (const table of data) {
    const children: TreeNodeData[] = []
    if (table.fields.length > 0) {
      for (const field of table.fields) {
        children.push({
          key: field.name,
          title: field.name,
          type: field.type,
          isLeaf: true,
          switcherIcon: () => h('div'),
        })
      }
    }
    if (children.length > 0) {
      const treeNodeData: TreeNodeData = {
        key: table.name,
        title: table.name,
        children: children,
        switcherIcon: () => h(IconDown),
      }
      _treeData.push(treeNodeData)
    }
  }
  treeData.value = _treeData
}

function add() {
  emit('add')
}

</script>

<style>
.database-table-list .arco-tree-node-is-leaf .arco-tree-node-switcher{
  width: 0;
  margin: 0;
}

.database-table-list .arco-tree-node-title-text{
  width: 100%;
}
</style>
