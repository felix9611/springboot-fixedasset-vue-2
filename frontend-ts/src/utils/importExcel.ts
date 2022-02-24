const XLSX = require('xlsx')
import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type'

export function readExcel(file: UploadFile) {
  return new Promise((resolve: any, reject :any) => {
    const types = file.name.split('.')[1]
    const fileType = [
      'xlsx',
      'xls',
      'csv'
    ].some((item) => item == types )

    if (!fileType) {
      return reject({ message: 'Format not is Excel!!'})
    }

    const reader = new FileReader()
    const result: any = []
    reader.onload = function (e) {
      const data = e.target?.result
      const wb = XLSX.read(data, {
        type: 'binary'
      })
      wb.SheetNames.forEach((sheetName: string) =>{
        result.push({
          sheetName,
          sheet: XLSX.utils.sheet_to_json(wb.Sheets[sheetName])
        })
        resolve(result.length > 1 ? result[0]: result[0].sheet)
      })
    }
    reader.onerror = function(error : any) {
      return reject(error)
    }
    reader.readAsArrayBuffer(file.raw || file)

  })
}

export function formatJson (header: any, filterVal: any, jsonData: any) {
  return jsonData.map((v: any)=> {
    const obj: any = {}
    header.forEach((h, i) => {
      const anyD: any = [filterVal[i]]
      const newData: any = v[h]
      obj[anyD] = newData
    })
    return obj
  })
}