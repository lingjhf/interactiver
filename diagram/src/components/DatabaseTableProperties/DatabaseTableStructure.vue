<template>
  <div class='flex flex-col database-table-structure'>
    <a-tabs
      v-model:active-key='currentTab'
      hide-content
    >
      <a-tab-pane
        v-for='tab in tabs'
        :key='tab'
        :title='tab'
      />
    </a-tabs>
    <database-table-columns v-if='currentTab === "Columns"' />
    <database-table-indexes v-if='currentTab === "Indexes"' />
    <database-table-relations v-if='currentTab === "Relations"' />
  </div>
</template>

<script setup lang="ts">
import type { DatabaseTableStructureProps } from './types'

const props = withDefaults(defineProps<DatabaseTableStructureProps>(), {
  name: '',
  comment: '',
  fields: () => [],
  color: '',
})

const tabs = ref(['Columns', 'Indexes', 'Relations'])
const currentTab = ref('Columns')

</script>
