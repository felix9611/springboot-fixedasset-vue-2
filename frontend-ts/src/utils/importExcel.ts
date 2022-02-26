const XLSX = require('xlsx')
const XLSXS = require('xlsx-style')
import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type'
import FileSaver from 'FileSaver'

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

export function formatJsonToSheet(filterVal: any, jsonData: any) {
  return jsonData.map(v => filterVal.map( j => {
    return v[j]
  }))
}
/*
aoa_to_sheet converts an array of arrays of JS data to a worksheet.
json_to_sheet converts an array of JS objects to a worksheet.
table_to_sheet converts a DOM TABLE element to a worksheet.
sheet_add_aoa adds an array of arrays of JS data to an existing worksheet.
sheet_add_json adds an array of JS objects to an existing worksheet.
。
*/
export function saveJsonToExcel(headers: any, data: any, excelHeader: any, fileName: any, excelStyle?: any) {
  let dataSet = formatJsonToSheet(headers, data)
  const ws = XLSX.utils.aoa_to_sheet([excelHeader])
  XLSX.utils.sheet_add_aoa(ws, dataSet, { origin: 'A2' })
  let wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, fileName)
}

function s2ab(s) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i: number = 0; i != s.length; i = ++i) {
    s.charCodeAt(i) & 0xff
  }
  return buf
}