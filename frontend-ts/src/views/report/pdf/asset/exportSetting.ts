export const exportExcelHeader1: any = [
  'Asset Code',
  'Asset Name',
  'Type Code',
  'Type Name',
  'Unit',
  'Buy Date',
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
  'Updated At'
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
  'updated'
]

export const columnsStyle: any = {
  '!cols':[
      {
        wpx: 60,
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
        wpx: 100,
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
        wpx: 100,
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
        wpx: 100,
      },
      {
        wpx: 100,
      }
    ]
  }

export const pdfColumns: any = [
  { title : 'Asset Code', dataKey: 'assetCode' },
  { title : 'Asset Name', dataKey: 'assetName' },
  { title : 'Type', dataKey: 'Type' },
  { title : 'Department', dataKey: 'deptName' },
  { title : 'Place', dataKey: 'placeName' },
  { title : 'Buy Date', dataKey: 'buyDate' , type: 'datetime', format: 'MM/DD/YYYY' },
  { title : 'Cost', dataKey: 'cost' }
]