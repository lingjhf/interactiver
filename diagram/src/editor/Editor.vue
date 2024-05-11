<template>
  <div class='flex h-full w-full editor'>
    <sidebar
      class='border-r-solid h-full border-r-[0.5px] border-gray-300 pt-2 box-border flex-shrink-0'
      :width='330'
    >
      <database-table-list :data='tables' />
    </sidebar>
    <e-canvas class='w-full h-full'>
      <e-table>
        <e-column />
      </e-table>

      <e-table>
        <e-column />
      </e-table>
    </e-canvas>

    <div
      v-if='editorStore.currentTable'
      class='border-l-solid h-full border-l-[0.5px] border-gray-300 flex-shrink-0 w-600px box-border'
    >
      <database-table-structure class='h-full' />
    </div>
  </div>
</template>

<script setup lang="ts">
import ECanvas from './canvas/Canvas.vue'
import EColumn from './canvas/Column.vue'
import ETable from './canvas/Table.vue'
import { DatabaseTableList } from './database-table-list'
import { DatabaseTableStructure } from './database-table-structure'
import { useEditorStore } from './store'
import type { DatabaseTable } from './types'
const editorStore = useEditorStore()

const tables = ref<DatabaseTable[]>([
  { name: 'user', comment: '', fields: [
    {
      name: 'id',
      type: 'varchar',
      nullable: false,
      primary: false,
      unique: false,

    },
  ] },
  { name: 'role', comment: '', fields: [] },
])

</script>
