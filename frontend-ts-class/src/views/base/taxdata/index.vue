<template>
    <div class="container">
        <div class="handle-box">
            <el-form :inline="true">
                <el-form-item>
                    <el-input
                            v-model="searchForm.vendorCode"
                            placeholder="Vendor Code"
                            clearable
                    >
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button @click="clickUploadDialog">Upload Excel</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="deptAllList">Find</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="dialogVisible = true">Create</el-button>
                </el-form-item>
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
            <el-table-column
              prop="countryCode"
              label="Country Code">
            </el-table-column>
            <el-table-column
              prop="countryName"
              label="Country Name">
            </el-table-column>
            <el-table-column
              prop="taxType"
              label="Tax Type">
            </el-table-column>

            <el-table-column
              prop="taxName"
              label="Tax Name">
            </el-table-column>

            <el-table-column
                prop="taxRate"
                label="Tax Rate"
            >
                <template slot-scope="scope">
                    <div class="text-center">{{ scope.row.taxRate * 100 }}%</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="importRate"
                label="Import Tax Rate"
            >
                <template slot-scope="scope">
                    <div class="text-center">{{ scope.row.importRate * 100 }}%</div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="created"
                    label="Created At"
            ></el-table-column>
            <el-table-column
                    prop="updated"
                    
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
                width="700px"
                :before-close="handleClose">

            <el-form :model="editForm" :rules="editFormRules" ref="editForm" class="grid lg:grid-cols-2">

                <el-form-item label="Nation Code"  prop="nationName" label-width="150px">
                    <el-input v-model="editForm.nationCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Nation Name"  prop="nationName" label-width="150px">
                    <el-input v-model="editForm.nationName" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Country Code"  prop="countryCode" label-width="150px">
                    <el-input v-model="editForm.countryCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Country Name"  prop="countryName" label-width="150px">
                    <el-input v-model="editForm.countryCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Tax Type"  prop="taxType" label-width="150px">
                    <el-input v-model="editForm.taxType" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Tax Code"  prop="taxCode" label-width="150px">
                    <el-input v-model="editForm.taxCode" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Tax Name"  prop="taxName" label-width="150px" class="lg:col-span-full">
                    <el-input v-model="editForm.taxName" autocomplete="off"></el-input>
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
import { formatJson, readExcel } from '@/utils/importExcel'
import moment from 'moment'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class vendor extends Vue {
    fileList: any = []
    editForm: any = {}
    tableData: any = []

    testEcelHeader1 = [
        'Vendor Code',
        'Vendor Name'
    ]

    testEcelHeader2 = [
        'vendorCode',
        'vendorName'
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

    async uploadFile(file: any) {
        const data = await readExcel(file)
        const reData = formatJson(this.testEcelHeader1, this.testEcelHeader2, data)
        reData.forEach( (res: any) => {
        axios.post('/system/country/tax/create', res).then((res: any) => {
                        
                this.$notify({
                    title: 'Msg',
                    showClose: true,
                    message: 'Upload success',
                    type: 'success',
                })
                this.deptAllList()
                this.uploaderDialog = false
                file = undefined
                this.fileList = []
            })
        })
    }

    deptAllList() {
        axios.post(
            '/system/country/tax/listAll',
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
                axios.post('/system/country/tax/' + (this.editForm.id ? 'update' : 'create'), this.editForm)
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
        axios.get('/system/country/tax/' + id).then((res: any) => {
            this.editForm = res.data.data
            this.dialogVisible = true
        })
    }

    delItem(id: number) {
        axios.delete('/system/country/tax/remove/'+ id).then((res: any) => {
            this.deptAllList()
            this.$notify({
                title: '',
                showClose: true,
                message: 'Remove Action success',
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