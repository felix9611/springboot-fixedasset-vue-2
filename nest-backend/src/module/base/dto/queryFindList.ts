export interface queryFindDept {
  deptCode: string
  deptName: string
  page: number,
  limit: number
}

export interface queryFindAssetType {
  typeCode: string
  typeName: string
  page: number,
  limit: number
}

export interface queryFindRole  {
  name: string
  page: number,
  limit: number
}