<template>
  <div class='database-table'>
    <div class='flex mb-20px'>
      <div
        class='w-32px h-32px rounded-2px  mr-20px flex-shrink-0'
        :style="{'background-color':tableColor}"
      />
      <a-input
        v-model='tableName'
        placeholder='Table Name'
      />
    </div>
    <div class='flex items-center mb-20px'>
      <div class='text-20px'>
        Columns
      </div>
      <div class='ml-auto'>
        <a-checkbox
          class='mr-2'
          value='1'
        >
          <template #checkbox='{ checked }'>
            <a-tag
              checkable
              :checked='checked'
            >
              <icon-expand />
            </a-tag>
          </template>
        </a-checkbox>
        <a-button
          shape='circle'
          @click='addField'
        >
          <template #icon>
            <icon-plus />
          </template>
        </a-button>
      </div>
    </div>
    <a-table
      :bordered='false'
      :columns='columns'
      :data='fieldData'
      :expandable='expandable'
      :hoverable='false'
      :pagination='false'
    >
      <template #expand-row>
        Comment <a-input />
      </template>
      <template #name='{record}'>
        <a-input
          v-model='record.name'
          placeholder='Name'
        />
      </template>
      <template #type='{record}'>
        <a-select v-model='record.type'>
          <a-option>Beijing</a-option>
          <a-option>Shanghai</a-option>
          <a-option>Guangzhou</a-option>
        </a-select>
      </template>
      <template #nullable='{record}'>
        <a-checkbox v-model='record.nullable' />
      </template>
      <template #defaultValue='{record}'>
        <a-input
          v-model='record.default'
          placeholder='(NULL)'
        />
      </template>
      <template #primary='{record}'>
        <a-checkbox v-model='record.primary' />
      </template>

      <template #remove='{rowIndex}'>
        <a-button
          shape='circle'
          status='danger'
          type='text'
          @click='removeField(rowIndex)'
        >
          <template #icon>
            <icon-close />
          </template>
        </a-button>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { IconPlus, IconClose, IconExpand } from '@arco-design/web-vue/es/icon'
export type DatabaseTableFieldType = ''

export interface DatabaseTableField {
  name: string,
  type: DatabaseTableFieldType,
  nullable: boolean,
  primary: boolean,
  unique: boolean,
}

export interface DatabaseTableInt extends DatabaseTableField {
  autoincrement: boolean,
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
  fields?: DatabaseTableField[],
}>(), {
  color: 'blue',
  comment: '',
  fields: () => [],
})

let fieldIndex = 0
const expandable = reactive({
  title: '',
  width: 80,
  expandedRowRender: (record) => {
    return `${record.key}`
  },
})

const tableName = ref('')
const tableColor = ref('#60a5fa')
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    slotName: 'name',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    slotName: 'type',
  },
  {
    title: 'Nullable',
    dataIndex: 'nullable',
    slotName: 'nullable',
  },
  {
    title: 'Default Value',
    dataIndex: 'default',
    slotName: 'defaultValue',
  },
  {
    title: 'primary',
    dataIndex: 'primary',
    slotName: 'primary',
  },
  {
    slotName: 'remove',
  },
]
const fieldData = ref<Record<string, any>[]>([])

watch(() => props.fields, () => {
  if (props.fields.length > 0) {

  }
  else {
    resetFieldData()
  }
}, {
  immediate: true,
})

function addField() {
  fieldData.value.push({ key: ++fieldIndex })
}

function removeField(index: number) {
  if (fieldData.value.length === 1) {
    resetFieldData()
    return
  }
  fieldData.value.splice(index, 1)
}

function resetFieldData() {
  fieldIndex = 0
  fieldData.value = [{ key: fieldIndex }]
}
</script>

<style>
.database-table .arco-table-td{
  border-bottom: none;
}
</style>
