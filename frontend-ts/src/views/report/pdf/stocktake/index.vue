<template>
    <div class="container">
        <div class="handle-box">
            <el-button
                size="mini"
                type="danger"
                @click="mainStockTakeData">
                    Download PDF
            </el-button>
        </div>
        <div class="handle-box">
            <el-form :inline="true">
                <el-form-item label="Place" prop="place" label-width="100px">
                    <el-select v-model="searchForm.stockTakeId" placeholder="Select" filterable>
                        <el-option
                        v-for="item in stockTakeList"
                        :key="item.id"
                        :label="item.actionName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button @click="stockTakeItemList">Find</el-button>
                </el-form-item>

            </el-form>
        </div>

        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                border
                stripe
                @selection-change="handleSelectionChange">
            <el-table-column
              prop="assetCode"
              label="Asset Code"
              width="150">
            </el-table-column>
            <el-table-column
              prop="assetName"
              label="Asset Name"
              width="200">
            </el-table-column>
            <el-table-column
              prop="placeCode"
              label="Place Code"
              width="200">
            </el-table-column>
            <el-table-column
              prop="placeName"
              label="Place Name"
              width="200">
            </el-table-column>
            <el-table-column
              prop="status"
              label="Status"
              width="200">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="Remark"
              width="270">
            </el-table-column>
            <el-table-column
              prop="checkTime"
              width="200"
              label="Check At"
            >
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
import Vue from 'vue'
import axios from '../../../../axios'
import { columns } from './pdfColumns'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import moment from 'moment'
export default Vue.extend({
        name: 'Stocktake',
        data() {
            const searchForm: any = {
                limit: 200,
                page: 1
            }
            const editForm: any = {}
            const mainStockTake: any ={}
            return {
                statusItemNew: [],
                statusItem: [
                    { status: 'Exist' },
                    { status: 'Not Exist' },
                    { status: 'Ready restoration' },
                    { status: 'Under restoration' },
                    { status: 'Other' }
                ],
                searchForm,
                delBtlStatu: true,
                sumTotal: 0,
                total: 0,
                size: 10,
                current: 1,
                
                stockTakeActionName: '',
                dialogVisible: false,
                editForm,
                tableData: [],
                stockTakeList: [],
                mainStockTake,
                roleDialogFormVisible: false,
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                treeCheckedKeys: [],
                checkStrictly: true,
                multipleSelection: []
            }
        },
        created() {
            this.stockTakeItemList()
            this.getAllstockTakeList()
        },
        methods: {
            mainStockTakeData() {
                axios.get(
                    `/stock/stock_take/${this.searchForm.stockTakeId}`
                ).then(
                    (res: any) => {
                        console.log(res.data)
                        this.mainStockTake = res.data.data
                        this.generatePDF()
                    }
                )
            },
            generatePDF() {
                console.log(this.mainStockTake)

                const doc = new jsPDF('p', 'pt', 'a4', true)
                let body: any = this.tableData
                
                const finishedTime = moment(this.mainStockTake.finishTime).format('DD-MM-YYYY HH:mm:ss')
                const startTime = moment(this.mainStockTake.startTime).format('DD-MM-YYYY HH:mm:ss')

                doc.text(`Action Name: ${this.mainStockTake.actionName}`, 40, 30)
                doc.text(`Start Time: ${startTime}`, 250, 30)
                doc.text(`Finished Time: ${finishedTime}`, 250, 50)
                doc.addFont('NotoSansCJKjp-Regular.ttf', 'NotoSansCJKjp', 'normal')
                doc.setFont('NotoSansCJKjp')
                autoTable(doc, {
                    startY: 60,
                    columns,
                    body,
                    styles: {
                        font: 'NotoSansCJKtc'
                    }
                })
                doc.save(`stocktake_report_${this.mainStockTake.actionName}_finished.pdf`)
          },
          stockTakeItemList() {
              axios.post(
                    '/stock/stock_take/item/list',
                    this.searchForm
                ).then(
                    (res: any) => {
                    this.tableData = res.data.data.records
                    this.size = res.data.data.size
                    this.current = res.data.data.current
                    this.total = res.data.data.total
              })
          },
          getAllstockTakeList() {
                axios.get(
                    '/stock/stock_take/getAllFinishedST'
                ).then(
                    (res: any) => {
                        // console.log(res.data.data)
                        this.stockTakeList = res.data.data
                    }
                )
            },
            toggleSelection(rows: any) {
                if (rows) {
                    rows.forEach((row: any) => {
                        const multipleTable: any = this.$refs.multipleTable
                        multipleTable.toggleRowSelection(row);
                    });
                } else {
                    const multipleTable: any = this.$refs.multipleTable
                    multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val: any) {
                this.multipleSelection = val;

                this.delBtlStatu = val.length == 0
            },
            handleSizeChange(val: number) {
                this.searchForm.limit = val
                this.stockTakeItemList()
            },
            handleCurrentChange(val: number) {
                this.searchForm.page = val
                this.stockTakeItemList()
            },
        }
})
</script>
<style scoped>

    .handle-box {
        margin-bottom: 20px;
    }
</style>