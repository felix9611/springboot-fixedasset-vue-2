export const exportExcelHeader1: any = [
  'Asset Code',
  'Asset Name',
  'Type Code',
  'Type Name',
  'Unit',
  'Purchase Date',
  'Description',
  'Cost',
  'Serial Number',
  'Invoice No.',
  'Invoice Date',
  'Department Code',
  'Department Name',
  'Place Code',
  'Place Name',
  'Remark',
  'Created At',
  'Updated At',
  'Write Off Date',
  'Write Off Reason'
]

export const exportExcelHeader2: any = [
  'assetCode',
  'assetName',
  'typeCode',
  'typeName',
  'unit',
  'buyDate',
  'description',
  'cost',
  'serialNum',
  'invoiceNo',
  'invoiceDate',
  'deptCode',
  'deptName',
  'placeCode',
  'placeName',
  'remark',
  'created',
  'updated',
  'newWriteOffTime',
  'writeOffReason'
]

export const columnsStyle: any = {
    border: {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    },
    fill: {
      fgColor: { rgb: 'FFFFCC00' }
    }
}

export const headerColSeetting = {
  '!cols':[
      {
        wpx: 80,
      },
      {
        wpx: 250,
      },
      {
        wpx: 50,
      },
      {
        wpx: 100,
      },
      {
        wpx: 80,
      },
      {
        wpx: 120,
      },
      {
        wpx: 200,
      },
      {
        wpx: 50,
      },
      {
        wpx: 100,
      },
      {
        wpx: 100,
      },
      {
        wpx: 120,
      },
      {
        wpx: 50,
      },
      {
        wpx: 100,
      },
      {
        wpx: 50,
      },
      {
        wpx: 100,
      },
      {
        wpx: 200,
      },
      {
        wpx: 120,
      },
      {
        wpx: 120,
      }
  ]
}

export const pdfColumns: any = [
  { title : 'Asset Code', dataKey: 'assetCode' },
  { title : 'Asset Name', dataKey: 'assetName' },
  { title : 'Type', dataKey: 'Type' },
  { title : 'Department', dataKey: 'deptName' },
  { title : 'Place', dataKey: 'placeName' },
  { title : 'Purchase Date', dataKey: 'buyDate' , type: 'datetime', format: 'MM/DD/YYYY' },
  { title : 'Cost', dataKey: 'cost' }
]