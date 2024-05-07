<template>
  <div class='flex flex-col database-table-structure'>
    <TabView
      v-model:active-index='currentTab'
      :pt="{panelContainer:{class:'p-0'}}"
    >
      <TabPanel
        v-for='tab in tabs'
        :key='tab'
        :header='tab'
      />
    </TabView>
    <database-table-columns v-if='currentTab === 0' />
    <database-table-indexes v-if='currentTab === 1' />
    <database-table-relations v-if='currentTab === 2' />
  </div>
</template>

<script setup lang="ts">
import DatabaseTableColumns from './DatabaseTableColumns.vue'
import DatabaseTableIndexes from './DatabaseTableIndexes.vue'
import DatabaseTableRelations from './DatabaseTableRelations.vue'

const tabs = ref(['Columns', 'Indexes', 'Relations'])
const currentTab = ref(0)

</script>
