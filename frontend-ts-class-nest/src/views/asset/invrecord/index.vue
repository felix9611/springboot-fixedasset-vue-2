<template>
  <div class="container">
    <div class="handle-box">
      <el-form :inline="true">
        <el-form-item>
          <el-date-picker
            v-model="searchForm.createdFrom"
            type="datetime"
            placeholder="Select From">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="searchForm.createdTo"
            type="datetime"
            placeholder="Select To">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="invRecordAllList()">Find</el-button>
        </el-form-item>

        <el-form-item>
          <el-button
            size="mini"
            type="danger"
            @click="generatePDF()">Download PDF
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :default-sort = "{prop: 'assetCode', order: 'descending'}"
      @selection-change="handleSelectionChange">
      <el-table-column
        sortable
        fixed="left"
        prop="assetCode"
        label="Asset Code"
        width="140">
      </el-table-column>
      <el-table-column
        sortable
        fixed="left"
        prop="fromPlaceCode"
        label="From Place Code"
        width="200">
      </el-table-column>
      <el-table-column
        sortable
        fixed="left"
        prop="fromPlaceName"
        label="From Place Name"
        width="200">
      </el-table-column>
      <el-table-column
        sortable
        fixed="left"
        prop="toPlaceCode"
        label="To Place Code"
        width="200">
      </el-table-column>
      <el-table-column
        sortable
        fixed="left"
        prop="toPlaceName"
        label="To Place Name"
        width="200">
      </el-table-column>
       <el-table-column
        sortable
        fixed="left"
        prop="created"
        label="Created At">
      </el-table-column>
      <el-table-column
        prop="statu"
        label="Status">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.statu === 1" type="success">Active</el-tag>
          <el-tag size="small" v-else-if="scope.row.statu === 0" type="danger">Write Off</el-tag>
        </template>

      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 50, 100]"
      :current-page="current"
      :page-size="size"
      :total="total">
    </el-pagination>
  </div>
</template>
<script lang="ts">
import moment from 'moment'
import { Component, Vue } from 'vue-property-decorator'
import axios from '../../../axios'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { pdfColumns } from './exportSetting'
@Component
export default class InvRecord extends Vue {
  searchForm: any = {
    limit: 10,
    page: 1
  }
  tableData: any = []
  exportData: any = []
  total: number = 0
  size: number
  current: number = 1

  created() {
    this.invRecordAllList()
  }

  handleSizeChange(val: number) {
    this.searchForm.limit = val
    this.invRecordAllList()
  }
            
  handleCurrentChange(val: number) {
    this.searchForm.page = val
    this.invRecordAllList()
  }

  generatePDF() {
        const doc = new jsPDF('p', 'pt', 'a4', true)

        let body: any = this.exportData

        doc.addFont('NotoSansCJKjp-Regular.ttf', 'NotoSansCJKjp', 'normal')
        doc.setFont('NotoSansCJKjp')

        const nowTime = moment().format('DD-MM-YYYY HH:mm')
        doc.text(`Download At: ${nowTime}`, 40, 30)

        if (this.searchForm.createdFrom && this.searchForm.createdTo) {
          const to = moment(this.searchForm.createdTo).format('DD-MM-YYYY HH:MM')
          const from = moment(this.searchForm.createdFrom).format('DD-MM-YYYY HH:MM')
          const nowTime = moment().format('DD-MM-YYYY HH:mm')
          doc.text(`Date: ${from} to ${to}`, 40, 50)
        }

        autoTable(doc, {
            startY: 60,
            columns: pdfColumns,
            body,
            styles: {
                font: 'NotoSansCJKtc'
            }
        })
        doc.save('asset_list.pdf')         
    }

  invRecordCurAllList() {
    this.searchForm.limit = 200
    this.searchForm.page = 1
    axios.post(
      '/asset/invRecord/listAll',
      this.searchForm
    ).then(
      (res: any) => {
        this.exportData = res.data.data.records

        this.exportData.forEach((re: any) => {
          const newCreated =  moment(new Date(re.created)).format('DD-MM-YYYY HH:MM')
          re['created'] = newCreated
          return re
        })
      }
    )
  }

  invRecordAllList() {
    axios.post(
      '/asset/invRecord/listAll',
      this.searchForm
    ).then(
      (res: any) => {
        this.tableData = res.data.data.records
        this.size = res.data.data.size
        this.current = res.data.data.current
        this.total = res.data.data.total

        this.invRecordCurAllList()

        this.tableData.forEach((re: any) => {
          const newCreated =  moment(new Date(re.created)).format('DD-MM-YYYY HH:MM')
          re['created'] = newCreated
          return re
        })
      }
    )
  }
}
</script>