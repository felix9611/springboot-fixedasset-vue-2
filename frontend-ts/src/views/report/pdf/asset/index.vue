<template>
    <div class="container">
        <div class="handle-box">
            <el-button
                size="mini"
                type="danger"
                @click="generatePDF()">Download PDF
            </el-button>
            <el-button size="mini" @click="exportExcel">Export Excel</el-button>
        </div>
        <div class="handle-box">
            Total butget Cost : HKD {{ sumTotal }}
        </div>
        <div id="dataTable">
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
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="assetName"
                    label="Asset Name"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="typeCode"
                    label="Type Code"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="typeName"
                    label="Type Name"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    prop="placeCode"
                    label="Place Code"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="placeName"
                    label="Place Name"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    prop="deptCode"
                    label="Department Code"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="deptName"
                    label="Department Name"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    prop="buyDate"
                    width="150"
                    label="Buy Date"
                    >
                    </el-table-column>
                </el-table>
            </div>

    </div>
</template>
<script lang="ts">
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import Vue from 'vue'
import axios from '../../../../axios'
import { saveJsonToExcel } from '../../../../utils/importExcel'
import moment from 'moment'
import { exportExcelHeader1, exportExcelHeader2, pdfColumns, columnsStyle } from './exportSetting'

export default Vue.extend({
        name: 'AssetList',
        data() {
            const searchForm: any = {
                limit: 200,
                page: 1
            }
            const editForm: any = {}
            return {
                searchForm,
                delBtlStatu: true,
                sumTotal: 0,
                total: 0,
                size: 10,
                current: 1,

                dialogVisible: false,
                editForm,
                tableData: [],

                roleDialogFormVisible: false,
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                treeCheckedKeys: [],
                checkStrictly: true,
                multipleSelection: [],

            }
        },
        created() {
            this.assetAllList()
            this.getTotalCost()
        },
        methods: {
            async exportExcel() {
                await saveJsonToExcel(exportExcelHeader2, this.tableData, exportExcelHeader1,'asset_list_report.xlsx', columnsStyle)
            },
            generatePDF() {
                const doc = new jsPDF('p', 'pt', 'a4', true)

                let body: any = this.tableData

                doc.addFont('NotoSansCJKjp-Regular.ttf', 'NotoSansCJKjp', 'normal')
                doc.setFont('NotoSansCJKjp')

                const nowTime = moment().format('DD-MM-YYYY HH:mm')
                doc.text(`Download At: ${nowTime}`, 40, 30)
                doc.text(`Total Cost: $${this.sumTotal}`, 40, 50)

                autoTable(doc, {
                    startY: 60,
                    columns: pdfColumns,
                    body,
                    styles: {
                        font: 'NotoSansCJKtc'
                    }
                })

                doc.save('asset_list.pdf')
                
            },
            getTotalCost() {
                axios.get(
                '/asset/assetList/getTotalSum'
                ).then(
                (res: any) => {
                    this.sumTotal = res.data.data
                }
                )
            },
            assetAllList() {
                axios.post(
                    '/asset/assetList/listAll',
                    this.searchForm
                ).then(
                    (res: any) => {
                    this.tableData = res.data.data.records
                    this.size = res.data.data.size
                    this.current = res.data.data.current
                    this.total = res.data.data.total

                    this.tableData.forEach((re: any) => {
                        const newBuyDate = re.buyDate? moment(new Date(re.buyDate)).format('DD-MM-YYYY HH:MM') : null
                        const newCreated =  re.created ? moment(new Date(re.created)).format('DD-MM-YYYY HH:MM') : null
                        const newUpdated =  re.updated ? moment(new Date(re.updated)).format('DD-MM-YYYY HH:MM') : null
                        const newInvoiceDate =  re.invoiceDate? moment(new Date(re.invoiceDate)).format('DD-MM-YYYY HH:MM') : null

                        re['buyDate'] = newBuyDate
                        re['created'] = newCreated
                        re['updated'] = newUpdated
                        re['invoiceDate'] = newInvoiceDate
                        return re
                    })
                })
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
                this.assetAllList()
            },
            handleCurrentChange(val: number) {
                this.searchForm.page = val
                this.assetAllList()
            }
        }
})
</script>

<style scoped>

    .handle-box {
        margin-bottom: 20px;
    }

</style>