<template>
  <div class='flex h-full w-full editor'>
    <sidebar
      class='border-r-solid h-full border-r-[0.5px] border-gray-300 box-border'
      :width='330'
    >
      <database-table-list :data='tables' />
    </sidebar>
    <div class='w-full' />
    <div class='border-l-solid h-full border-l-[0.5px] border-gray-300 flex-shrink-0 w-600px box-border'>
      <database-table-structure class='h-full' />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DatabaseTable } from './types'

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
