<template>
  <div>
    <div>
      name<a-input
        allow-clear
        placeholder='Please enter something'
        :style="{width:'320px'}"
      />
      <div class='flex'>
        <a-input placeholder='Name' />
        <a-input placeholder='Type' />
        <a-checkbox value='1'>
          <template #checkbox='{ checked }'>
            <a-tag
              checkable
              :checked='checked'
            >
              This is a tag checkbox 1
            </a-tag>
          </template>
        </a-checkbox>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

export type DatabaseTableFieldType = ''

export interface DatabaseTableField {
  name: string,
  type: DatabaseTableFieldType,
  nullable: boolean,
  primaryKey: boolean,
  unique: boolean,
}

export interface DatabaseTableInt extends DatabaseTableField {
  Autoincrement: boolean,
  default: number,
}

export interface DatabaseTableVarchar extends DatabaseTableField {
  size: number,
  default: string,
}

const props = withDefaults(defineProps<{
  name: string,
  color?: string,
  comment?: string,
  fields: DatabaseTableField[],
}>(), {
  color: 'blue',
  comment: '',
  fields: () => [],
})

</script>
