<template>
    <div class="container">
        <div class="handle-box">
            <el-form :inline="true">
                <el-form-item>
                    <el-input
                            v-model="searchForm.name"
                            placeholder="Department Code/Name"
                            clearable
                    >
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button @click="deptAllList">Find</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="dialogVisible = true">Create</el-button>
                </el-form-item>

           <!--    <el-form-item>
                    <el-button @click="downloadTemplateExcel()">Download Template Excel</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="clickUploadDialog">Upload Excel</el-button>
                </el-form-item>--> 
            </el-form>
        </div>

        <el-dialog
                title="Upload Excel"
                :visible.sync="uploaderDialog"
                width="700px"
                :before-close="closerUploadDialog">
                <el-upload
                        class="upload-demo"
                        :auto-upload="false"
                        :file-list="fileList"
                        :on-change="uploadFile"
                        :on-remove="clearFile"
                        >
                        <el-button size="small" type="primary">Upload</el-button>
                        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                    </el-upload>
        </el-dialog>

        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
         <!--   <el-table-column
              prop="budgetNo"
              label="Budget No.">
            </el-table-column>-->
            <el-table-column
              prop="budgetName"
              label="Budget Name">
            </el-table-column>
            <el-table-column
              prop="deptName"
              label="Department Name">
            </el-table-column>
            <el-table-column
              prop="placeName"
              label="Location Name">
            </el-table-column>
            <el-table-column
              prop="year"
              label="Year">
            </el-table-column>
            <el-table-column
              prop="month"
              label="Month">
            </el-table-column>
            <el-table-column
                    prop="created"
                    width="200"
                    label="Created At"
            >
            </el-table-column>
            <el-table-column
                    prop="updated"
                    width="200"
                    label="Update At"
            >
            </el-table-column>
            <el-table-column
                    prop="icon"
                    width="260px"
                    label="Action">

                <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="editHandle(scope.row.id)">Edit</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="delItem(scope.row.id)">Delete</el-button>
                </template>
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


        <el-dialog
                title="Form"
                :visible.sync="dialogVisible"
                width="800px"
                :before-close="handleClose">

            <el-form :model="editForm" :rules="editFormRules" ref="editForm">

                <!--<el-form-item label="Budget No."  prop="budgetNo" label-width="120px" disabled>
                    <el-input v-model="editForm.budgetNo" autocomplete="off"></el-input>
                </el-form-item>-->
                <el-form-item label="Budget Name"  prop="budgetName" label-width="120px">
                    <el-input v-model="editForm.budgetName" autocomplete="off"></el-input>
                </el-form-item>

                <div class="grid grid-cols-2 gap-2">
                    <el-form-item label="Place" prop="place" label-width="120px">
                        <el-select v-model="editForm.placeId" placeholder="Select" filterable class="w-full">
                        <el-option
                            v-for="placeItems in placeItem"
                            :key="placeItems.id"
                            :label="placeItems.placeName"
                            :value="placeItems.id">
                        </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Department" prop="Dept" label-width="120px">
                        <el-select v-model="editForm.deptId" placeholder="Select" filterable class="w-full">
                        <el-option
                            v-for="deptItems in deptItem"
                            :key="deptItems.id"
                            :label="deptItems.deptName"
                            :value="deptItems.id">
                        </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="Year"  prop="year" label-width="120px">
                        <el-input v-model="editForm.year" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Month"  prop="month" label-width="120px">
                        <el-input v-model="editForm.month" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Date From" prop="budgetFrom" label-width="120px">
                    <el-date-picker
                        class="w-[100%]"
                        v-model="editForm.budgetFrom"
                        type="datetime"
                        placeholder="Select date and time">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="Date To" prop="budgetTo" label-width="120px">
                        <el-date-picker
                        class="w-[100%]"
                        v-model="editForm.budgetTo"
                        type="datetime"
                        placeholder="Select date and time">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="Amount"  prop="amount" label-width="120px">
                        <el-input v-model="editForm.amount" autocomplete="off">
                        <template #prepend>$</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Budget Status"  prop="budgetStatus" label-width="120px">
                        <el-input v-model="editForm.budgetStatus" autocomplete="off"></el-input>
                    </el-form-item>
                </div>

                

                

                <el-form-item label="Remark"  prop="remark" label-width="120px">
                    <el-input type="textarea" v-model="editForm.remark"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('editForm')">{{ editForm.id? 'Update' : 'Create' }}</el-button>
                <el-button @click="resetForm('editForm')">Cancel</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import axios from '@/axios'
import { downloadTempExcelFile, formatJson, readExcel } from '@/utils/importExcel'
import moment from 'moment'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Department extends Vue {
    fileList: any = []
    editForm: any = {}
    tableData: any = []
    deptItem: any = []
    placeItem: any = []

    testEcelHeader1 = [
        'Department Code',
        'Department Name',
        'Remark'
    ]

    testEcelHeader2 = [
        'deptCode',
        'deptName',
        'deptRemark'
    ]

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
    uploaderDialog: boolean = false

    editFormRules = {
        deptCode: [
            { required: true, message: 'Department Code cannot blank!', trigger: 'blur'}
                    ],
        deptName: [
            { required: true, message: 'Department Name cannot blank!', trigger: 'blur'}
        ]
    }

    created() {
        this.getAlldept()
        this.getAllPlace()
        this.deptAllList()
    }


     clearFile() {
        this.fileList = []
    }

    clickUploadDialog() {
        this.uploaderDialog = true
    }
    
    closerUploadDialog() {
        this.uploaderDialog = false
    }

    downloadTemplateExcel() {
        downloadTempExcelFile(this.testEcelHeader1, 'budget_template.xlsx')
    }

    getAllPlace() {
        axios.get(
            '/base/location/getAll'
        ).then(
            (res: any) => {
            // console.log(res.data.data)
            this.placeItem = res.data.data
        })
    }

    getAlldept() {
        axios.get(
            '/base/department/getAll'
        ).then(
            (res: any) => {
            this.deptItem = res.data.data
        })
    }

    async uploadFile(file: any) {
        const data = await readExcel(file)
        const reData = formatJson(this.testEcelHeader1, this.testEcelHeader2, data)

        axios.post('/base/budget/batch-create', reData).then((res: any) => {
            if (res) {
                this.$notify({
                    title: 'Msg',
                    showClose: true,
                    message: 'Upload success',
                    type: 'success',
                })
                this.uploaderDialog = false
                this.deptAllList()
                this.fileList = []
                file = undefined
            }
        })
    }

    deptAllList() {
        axios.post(
            '/base/budget/listAll',
            this.searchForm
        ).then(
            (res: any) => {
                this.tableData = res.data.data.records
                this.size = res.data.data.size
                this.current = res.data.data.current
                this.total = res.data.data.total

                this.tableData.forEach((re: any) => {
                    const newCreated =  re.created ? moment(new Date(re.created)).format('DD-MM-YYYY HH:MM') : null
                    const newUpdated =  re.updated ? moment(new Date(re.updated)).format('DD-MM-YYYY HH:MM') : null

                    re['created'] = newCreated
                    re['updated'] = newUpdated
                    return re
                
            })
        })
    }

    toggleSelection(rows: any) {
        const multipleTable: any = this.$refs.multipleTable
        if (rows) {
            rows.forEach((row: any) => {
                multipleTable.toggleRowSelection(row);
            })
        } else {
            multipleTable.clearSelection();
        }
    }

    handleSelectionChange(val: any) {
        this.multipleSelection = val
        this.delBtlStatu = val.length == 0
    }

    handleSizeChange(val: any) {
        this.searchForm.limit = val
        this.deptAllList()
    }

    handleCurrentChange(val: any) {
        this.searchForm.page = val
        this.deptAllList()
    }

    resetForm(formName: string) {
        const ref: any = this.$refs[formName]
        ref.resetFields();
        this.dialogVisible = false
        this.editForm = {
            id: 0,
            deptCode: '',
            deptName: '',
            deptOtherName: null
        }
    }

    handleClose() {
        this.resetForm('editForm')
    }

    submitForm(formName: string) {
        const validData: any = this.$refs[formName]
        validData.validate((valid: any) => {
            if (valid) {
                console.log(this.editForm)
                axios.post('/base/budget/' + (this.editForm.id ? 'update' : 'create'), this.editForm)
                    .then((res: any) => {
                        this.deptAllList()
                        this.$notify({
                            title: 'Msg',
                            showClose: true,
                            message: 'Action is successful ',
                            type: 'success',
                        })
                    this.handleClose()
                    this.dialogVisible = false
                })
            } else {
                return false;
            }
        })
    }

    editHandle(id: number) {
        axios.get('/base/budget/' + id).then((res: any) => {
            this.editForm = res.data.data
            this.dialogVisible = true
        })
    }

    delItem(id: number) {
        axios.delete('/base/budget/remove/'+ id).then((res: any) => {
            this.deptAllList()
            this.$notify({
                title: '',
                showClose: true,
                message: 'Action is successful ',
                type: 'success'
            })
        })
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