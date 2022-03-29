<template>
    <div class="container">

        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    prop="actionName"
                    label="Action Name"
                    width="120">
            </el-table-column>
            <el-table-column
              prop="actionMethod"
              label="Action Method"
              width="120">
            </el-table-column>
            <el-table-column
              prop="actionFrom"
              label="Action From"
              width="160">
            </el-table-column>
            <el-table-column
              prop="actionData"
              label="Action Data">
            </el-table-column>
            <el-table-column
              prop="actionSuccess"
              label="Action Success"
              width="160">
            </el-table-column>
            <el-table-column
                    prop="created"
                    width="200"
                    label="Created At"
            >
            </el-table-column>

        </el-table>

        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes, prev, pager, next, jumper"
                :page-sizes="[10, 20, 50, 100]"
                :current-page="searchForm.page"
                :page-size="searchForm.limit"
                :total="total">
        </el-pagination>

    </div>
</template>
<script lang="ts">
import axios from '@/axios'
import moment from 'moment'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ActionLog extends Vue {
    tableData: any = []
    searchForm: any = {
        page: 1,
        limit: 10
    }
    delBtlStatu: boolean = true
    total: number = 0
    size: number|undefined
    current: number =  1

    created() {
        this.getAllRecord()
    }

    getAllRecord() {
        axios.post('/base/action/listAll', this.searchForm).then(res => {
            this.tableData = res.data.data.records
            this.size = res.data.data.size
            this.current = res.data.data.current
            this.total = res.data.data.total

            this.tableData.forEach((re: any) => {
                const newCreated =  moment(new Date(re.created)).format('DD-MM-YYYY HH:MM')
                re['created'] = newCreated

                return re
            })
        })
    }

    toggleSelection(rows: any) {
        if (rows) {
            rows.forEach((row: any) => {
                const refs: any = this.$refs.multipleTable
                refs.toggleRowSelection(row)
            })
        } else {
            const refs: any = this.$refs.multipleTable
            refs.clearSelection();
        }
    }

    handleSelectionChange(val: any) {
        this.delBtlStatu = val.length == 0
    }

    handleSizeChange(val: number) {
        this.searchForm.limit = val
        this.getAllRecord()
    }

    handleCurrentChange(val: number) {
        this.searchForm.page = val
        this.getAllRecord()
    }
}
</script>

<style scoped>

    .handle-box {
        margin-bottom: 20px;
    }

</style>