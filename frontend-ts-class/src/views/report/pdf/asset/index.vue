<template>
    <div class="bg-white p-3 rounded-lg w-screen">
        <div class="handle-box">
            <el-form :inline="true">
                <el-form-item>
                    <el-select v-model="apiSelector" placeholder="Select" filterable clearable>
                        <el-option
                        v-for="item in apiSelectorList"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item> 
                <el-form-item>
                    <el-button @click="assetAllList">Find</el-button>
                </el-form-item>
            </el-form>
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
                stripe
                @selection-change="handleSelectionChange">
                    <el-table-column
                    sortable
                    fixed="left"
                    prop="assetCode"
                    label="Asset Code"
                    width="140">
                    </el-table-column>
                    <el-table-column
                    fixed="left"
                    prop="assetName"
                    label="Asset Name"
                    width="200">
                    </el-table-column>
                   <el-table-column
                    prop="buyDate"
                    label="Purchase Date"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="typeCode"
                    label="Type Code"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    prop="typeName"
                    label="Type Name"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    prop="placeCode"
                    label="Place Code"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    prop="placeName"
                    label="Place Name"
                    width="140">
                    </el-table-column>
                    <el-table-column
                    prop="deptCode"
                    label="Department Code"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="deptName"
                    label="Department Name"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="created"
                    width="140"
                    label="Created At"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="updated"
                    width="140"
                    label="Update At"
                    >
                    </el-table-column>
                    <el-table-column                
                        prop="newWriteOffTime"
                        width="140"
                        label="Write Off Date"
                    ></el-table-column>
                    <el-table-column
                        prop="writeOffReason"
                        width="140"
                        label="Write Off Reason"
                    ></el-table-column>
                </el-table>
            </div>

    </div>
</template>
<script lang="ts">
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import axios from '@/axios'
import { saveJsonToExcel } from '@/utils/importExcel'
import moment from 'moment'
import { exportExcelHeader1, exportExcelHeader2, pdfColumns, columnsStyle, headerColSeetting } from './exportSetting'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AssetList extends Vue {
    searchForm: any = {}
    editForm: any = {}

    delBtlStatu: boolean = true
    sumTotal: number = 0
    total: number = 0
    size: number|undefined
    current: number =  1
    dialogVisible: boolean = false
    tableData: any = []

    checkStrictly: boolean = true
    multipleSelection: any = []

    apiSelector: number = 0

    apiSelectorList: any = [
        { value: 0, text: 'Active' },
        { value: 1, text: 'Write Off' }
    ]

    created() {
        this.assetAllList()
        this.getTotalCost()
    }

    async exportExcel() {
        await saveJsonToExcel(
            exportExcelHeader2, 
            this.tableData, 
            exportExcelHeader1,
            'asset_list_report.xlsx', 
            columnsStyle, 
            headerColSeetting
        )
    }

    generatePDF() {
        const doc = new jsPDF('p', 'pt', 'a4', true)

        let body: any = this.tableData

        doc.addFont('NotoSansCJKjp-Regular.ttf', 'NotoSansCJKjp', 'normal')
        doc.setFont('NotoSansCJKjp')

        const nowTime = moment().format('DD-MM-YYYY HH:mm')
        doc.text(`Download At: ${nowTime}`, 40, 30)
        if (this.apiSelector === 0) {
            doc.text('Active Asset Report', 40, 45)
            doc.text(`Total Cost: $${this.sumTotal}`, 40, 65)
        } 
        if (this.apiSelector === 1) {
            doc.text('Write Off List', 40, 50)
        }

        autoTable(doc, {
            startY: 80,
            columns: pdfColumns,
            body,
            styles: {
                font: 'NotoSansCJKtc'
            }
        })
        doc.save('asset_list.pdf')         
    }

    getTotalCost() {
        axios.post(
            '/asset/assetList/getTotalSum',
            this.searchForm
        ).then(
            (res: any) => {
                this.sumTotal = res.data.data
            }
        )
    }

    assetAllList() {
        axios.post(
            this.apiSelector === 0 ? '/asset/assetList/report/listAll' : '/asset/assetList/writeOff/listAll',
            this.searchForm
        ).then(
            (res: any) => {
            this.tableData = res.data.data


            this.tableData.forEach((re: any) => {
                const newBuyDate = re.buyDate? moment(new Date(re.buyDate)).format('DD-MM-YYYY HH:MM') : null
                const newCreated =  re.created ? moment(new Date(re.created)).format('DD-MM-YYYY HH:MM') : null
                const newUpdated =  re.updated ? moment(new Date(re.updated)).format('DD-MM-YYYY HH:MM') : null
                const newInvoiceDate =  re.invoiceDate? moment(new Date(re.invoiceDate)).format('DD-MM-YYYY HH:MM') : null

                let newWriteOffTime: any
                if (re.writeOffTime) {
                    newWriteOffTime =  re.writeOffTime? moment(new Date(re.writeOffTime)).format('DD-MM-YYYY HH:MM') : null
                }

                re['newWriteOffTime'] = newWriteOffTime
                re['buyDate'] = newBuyDate
                re['created'] = newCreated
                re['updated'] = newUpdated
                re['invoiceDate'] = newInvoiceDate
                return re
            })
            console.log(this.tableData)
        })
    }

    toggleSelection(rows: any) {
        if (rows) {
            rows.forEach((row: any) => {
                const multipleTable: any = this.$refs.multipleTable
                multipleTable.toggleRowSelection(row);
            })
        } else {
            const multipleTable: any = this.$refs.multipleTable
            multipleTable.clearSelection();
        }
    }

    handleSelectionChange(val: any) {
        this.multipleSelection = val;
        this.delBtlStatu = val.length == 0
    }

    handleSizeChange(val: number) {
        this.searchForm.limit = val
        this.assetAllList()
    }

    handleCurrentChange(val: number) {
        this.searchForm.page = val
         this.assetAllList()
    }
}
</script>

<style scoped>

    .handle-box {
        margin-bottom: 20px;
    }

</style>