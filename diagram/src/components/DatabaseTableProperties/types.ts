import { DatabaseTable, DatabaseTableField } from '../../types'

export interface DatabaseTableStructureProps extends Partial<DatabaseTable> {
  color?: string,
}

export interface DatabaseTableColumnsProps {
  data?: DatabaseTableField[],
}
