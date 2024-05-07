import { DatabaseTable } from './types'

export const useEditorStore = defineStore('editor', () => {
  const tables = ref<DatabaseTable[]>(getLocationTables())
  const tableMap = new Map<string, DatabaseTable>(tables.value.map(item => [item.name, item]))
  const currentTable = ref<DatabaseTable>()

  function addTable(value: DatabaseTable) {
    const table = { ...value }
    let index = tables.value.length
    while (true) {
      if (!tableMap.has(table.name)) {
        break
      }
      table.name = `table_${++index}`
    }
    tableMap.set(table.name, table)
    tables.value.push(table)
    saveLocationTables(tables.value)
  }

  function removeTable(key: string) {
    const table = tableMap.get(key)
    if (!table) {
      return false
    }
    if (key === currentTable.value?.name) {
      setCurrentTable(undefined)
    }
    tableMap.delete(key)
    tables.value.splice(tables.value.findIndex(item => item.name === table.name), 1)
    saveLocationTables(tables.value)
    return true
  }

  function updateTable(key: string, value: Partial<DatabaseTable>) {
    const table = tableMap.get(key)
    if (!table) {
      return
    }
    if (value.fields) {
      table.fields = value.fields
    }
    saveLocationTables(tables.value)
  }

  function setCurrentTable(key?: string) {
    if (key === undefined) {
      currentTable.value = undefined
      return
    }
    if (currentTable.value?.name !== key) {
      currentTable.value = tableMap.get(key)
    }
  }

  return { tables, addTable, removeTable, currentTable, setCurrentTable, updateTable }
})

function getLocationTables() {
  const tables = localStorage.getItem('tables')
  if (!tables) {
    return []
  }
  return JSON.parse(tables)
}

function saveLocationTables(tables: DatabaseTable[]) {
  localStorage.setItem('tables', JSON.stringify(tables))
}
