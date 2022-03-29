<template>
    <div class="container">
        <div class="handle-box">
            <el-form :inline="true">

                <el-form-item>
                    <el-button type="primary" @click="dialogVisible = true">Create</el-button>
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
                    prop="testCode"
                    label="Type Code"
                    width="120">
            </el-table-column>
            <el-table-column
              prop="test"
              label="Type Name"
              width="200">
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


        <!--新增对话框-->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="700px"
                :before-close="handleClose">

            <el-form :model="editForm" :rules="editFormRules" ref="editForm">
                <el-form-item label="Department Name"  prop="deptName" label-width="100px">
                    <el-input v-model="editForm.test" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('editForm')">Cancel</el-button>
                <el-button type="primary" @click="submitForm('editForm')">OK</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '@/axios'

@Component
export default class TestCode extends Vue {
    editForm: any = {}
    tableData: any = []
    searchForm: any = {
        page: 1,
        limit: 10
    }
    multipleSelection: any = []

    size: number|undefined
    current: number = 1
    total: number = 0

    delBtlStatu: boolean = true
    dialogVisible: boolean = false

    editFormRules: any = {}

    created() {
        this.testAll()
    }

    testAll() {
        axios.post(
            '/test/code/listAll',
            this.searchForm
        ).then(
            res => {
            this.tableData = res.data.data.records
            this.size = res.data.data.size
            this.current = res.data.data.current
            this.total = res.data.data.total
        })
    }

    toggleSelection(rows: any) {
        if (rows) {
            rows.forEach((row: any) => {
                const multipleTable: any = this.$refs.multipleTable
                multipleTable.toggleRowSelection(row)
            })
        } else {
            const refs: any = this.$refs
            refs.multipleTable.clearSelection()
        }
    }
    handleSelectionChange(val: any) {
        this.multipleSelection = val
        this.delBtlStatu = val.length == 0
    }

    handleSizeChange(val: number) {
        this.size = val
        this.testAll()
    }
    
    handleCurrentChange(val: number) {
        this.current = val
        this.testAll()
    }
    handleClose() {
        this.resetForm('editForm')
    }

    resetForm(formName: string) {
        const refs: any = this.$refs[formName]
        refs.resetFields()
        this.dialogVisible = false
        this.editForm = {}
    }

}
</script>

<style scoped>

    .handle-box {
        margin-bottom: 20px;
    }

    /*.el-pagination {*/
    /*    float: right;*/
    /*    margin-top: 5px;*/
    /*}*/

</style>