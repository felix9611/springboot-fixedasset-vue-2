<template>
    <div class="container">
        
        <div class="handle-box">
            <el-form :inline="true">
                <el-form-item>
                    <el-input
                            v-model="searchForm.type"
                            placeholder="Type"
                            clearable
                    >
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button @click="exportExcel">Export Excel</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="clickUploadDialog">Upload Excel</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="codeTypeAllList">Find</el-button>
                </el-form-item>

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
                @selection-change="handleSelectionChange">
            <el-table-column
                sortable
                prop="type"
                label="Type"
                width="120">
            </el-table-column>
            <el-table-column
                sortable
                prop="valueCode"
                label="Value Code"
                width="200">
            </el-table-column>
            <el-table-column
              prop="valueName"
              label="Value Name"
              width="200">
            </el-table-column>
            <el-table-column
                sortable
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

                <el-form-item label="Type"  prop="type" label-width="100px">
                    <el-input v-model="editForm.type" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Value Code"  prop="valueCode" label-width="100px">
                    <el-input v-model="editForm.valueCode" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Value Name"  prop="valueName" label-width="100px">
                    <el-input v-model="editForm.valueName" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('editForm')">{{ editForm.id? 'Update' : 'Create' }}</el-button>
                <el-button @click="resetForm('editForm')">Cancel</el-button>
            </div>
        </el-dialog>
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
    </div>
</template>

<script lang="ts">
import axios from '@/axios'
import { formatJson, readExcel, saveJsonToExcel } from '@/utils/importExcel'
import moment from 'moment'

export default {
    data() {
        return {
            editForm: {},
            searchForm: {},
            fileList: [],
            exportData: [],
            tableData: [],
            size: 10,
            current: 1,
            total: 0,

            uploaderDialog: false,

            testEcelHeader1: [
                'Type',
                'Value Code',
                'Value Name'
            ],
            testEcelHeader2: [
                'type',
                'valueCode',
                'valueName'
            ],

            editFormRules: {
                type: [
                    { required: true, message: 'Type cannot blank!', trigger: 'blur' }
                ],
                valueCode: [
                    { required: true, message: 'Value Code cannot blank!', trigger: 'blur' }
                ],
                valueName: [
                    { required: true, message: 'Value Name cannot blank!', trigger: 'blur' }
                ]
            },

            delBtlStatu: true,
            dialogVisible: false
        }
    },
    created() {
        this.codeTypeAllList()
    },
    methods: {
        async exportExcel() {
            await saveJsonToExcel(this.testEcelHeader2, this.tableData, this.testEcelHeader1,'code_type.xlsx')
        },
        
        clearFile() {
            this.fileList = []
        },

        clickUploadDialog() {
            this.uploaderDialog = true
        },

        closerUploadDialog() {
            this.uploaderDialog = false
        },

        async uploadFile(file: any) {
            const data = await readExcel(file)
            const reData = formatJson(this.testEcelHeader1, this.testEcelHeader2, data)
            reData.forEach( (res: any) => {
                axios.post('/base/code_type/create', res).then((res: any) => {
                            
                    this.$notify({
                        title: 'Msg',
                        showClose: true,
                        message: 'Upload success',
                        type: 'success',
                    })
                    this.uploaderDialog = false
                    this.codeTypeAllList()
                    file = undefined
                    this.fileList = []
                })
            })
        },
        codeTypeAllList() {
            axios.post(
                '/base/code_type/listAll',
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
        },

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
        },

        handleSelectionChange(val: any) {
            this.delBtlStatu = val.length == 0
        },

        handleSizeChange(val: number) {
            this.searchForm.limit = val
            this.codeTypeAllList()
        },

        handleCurrentChange(val: number) {
            this.searchForm.page = val
            this.codeTypeAllList()
        },

        resetForm(formName: string) {
            const refs: any = this.$refs[formName]
            refs.resetFields();
            this.dialogVisible = false
            this.editForm = {}
        },

        handleClose() {
            this.resetForm('editForm')
        },

        submitForm(formName: string) {
            const refs: any = this.$refs[formName]
            refs.validate((valid: any) => {
                if (valid) {
                    console.log(this.editForm)
                    axios.post('/base/code_type/' + (this.editForm.id ? 'update' : 'create'), this.editForm)
                        .then((res: any) => {
                            this.codeTypeAllList()
                            this.$notify({
                                title: '',
                                showClose: true,
                                message: 'Action is successful ',
                                type: 'success',
                            })
                            this.handleClose()
                            this.dialogVisible = false
                        })
                } else {
                    return false
                }
            })
        },

        editHandle(id: number) {
            axios.get('/base/code_type/' + id).then(res => {
                this.editForm = res.data.data
                this.dialogVisible = true
            })
        },

        delItem(id: number) {
            axios.delete('/base/code_type/remove/'+ id)
            .then((res: any) => {
                this.codeTypeAllList()
                this.$notify({
                    title: '',
                    showClose: true,
                    message: 'Action is successful ',
                    type: 'success'
                })
            })
        }
    }
}
</script>

<style scoped>

    .handle-box {
        margin-bottom: 20px;
    }
</style>