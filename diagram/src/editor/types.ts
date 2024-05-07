import { TreeNodeData as _TreeNodeData } from '@arco-design/web-vue'

export interface DatabaseTable {
  name: string,
  comment: string,
  fields: DatabaseTableField[],
}

export interface DatabaseTableField {
  name: string,
  type: string,
  nullable: boolean,
  primary: boolean,
  unique: boolean,
  default?: string,
}

export interface DatabaseTableInt extends DatabaseTableField {
  autoincrement: boolean,

}

export interface DatabaseTableVarchar extends DatabaseTableField {
  size: number,
}

export interface TreeNodeData extends _TreeNodeData {
  [key: string]: any,
}
