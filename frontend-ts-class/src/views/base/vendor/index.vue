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
                    <el-button @click="deptAllList">Find</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="dialogVisible = true">Create</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="downloadTemplateExcel()">Download Template Excel</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="clickUploadDialog">Upload Excel</el-button>
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
                sortable
                prop="vendorCode"
                label="Vendor Code"
                width="150">
            </el-table-column>
            <el-table-column
              prop="vendorName"
              label="Vendor Name">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="Phone">
            </el-table-column>
            <el-table-column
              prop="email"
              label="Email">
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
                width="700px"
                :before-close="handleClose">

            <el-form :model="editForm" :rules="editFormRules" ref="editForm">

                <el-form-item label="Vendor Code"  prop="vendorCode" label-width="150px">
                    <el-input v-model="editForm.vendorCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Vendor Name"  prop="vendorName" label-width="150px">
                    <el-input v-model="editForm.vendorName" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Other Name"  prop="vendorOtherName" label-width="150px">
                    <el-input type="textarea" v-model="editForm.vendorOtherName"></el-input>
                </el-form-item>

                <el-form-item label="Type"  prop="type" label-width="150px">
                    <el-input v-model="editForm.type" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Email"  prop="email" label-width="150px">
                    <el-input v-model="editForm.email" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Phone"  prop="phone" label-width="150px">
                    <el-input v-model="editForm.phone" autocomplete="off"></el-input>
                </el-form-item>

                 <el-form-item label="Fax"  prop="fax" label-width="150px">
                    <el-input v-model="editForm.fax" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Address"  prop="address" label-width="150px">
                    <el-input type="textarea" v-model="editForm.address"></el-input>
                </el-form-item>

                <el-form-item label="contactPerson"  prop="contactPerson" label-width="150px">
                    <el-input v-model="editForm.contactPerson"  autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Remark"  prop="remark" label-width="150px">
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
export default class vendor extends Vue {
    fileList: any = []
    editForm: any = {}
    tableData: any = []

    testEcelHeader1 = [
        'Vendor Code',
        'Vendor Name',
        'Other Name',
        'Type',
        'Email',
        'Phone',
        'Fax',
        'Address',
        'Contact Person',
        'Remark'
    ]

    testEcelHeader2 = [
        'vendorCode',
        'vendorName',
        'vendorOtherName',
        'type',
        'email',
        'phone',
        'fax',
        'address',
        'contactPerson',
        'remark'
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

    downloadTemplateExcel() {
        downloadTempExcelFile(this.testEcelHeader1, 'vendors_template.xlsx')
    }

    async uploadFile(file: any) {
        const data: any = await readExcel(file)
        console.log(data, 'updatedArray')
  
        const updatedArray = data.map(obj => {
            const newObj: any = {};

            Object.keys(obj).forEach((key) => {
                const trimmedKey = key.trim(); // Trim spaces from the key
                const index = this.testEcelHeader1.indexOf(trimmedKey);
                if (index !== -1) {
                // If the key is found in array1, replace it with the corresponding key from array2
                newObj[this.testEcelHeader2[index]] = obj[key];
                } else {
                // If the key is not found in array1, copy it as is
                newObj[key] = obj[key];
                }
            });

            return newObj
        })

        axios.post('/base/vendor/batch-create', updatedArray).then((res: any) => {
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
            '/base/vendor/listAll',
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
                axios.post('/base/vendor/' + (this.editForm.id ? 'update' : 'create'), this.editForm)
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
        axios.get('/base/vendor/' + id).then((res: any) => {
            this.editForm = res.data.data
            this.dialogVisible = true
        })
    }

    delItem(id: number) {
        axios.delete('/base/vendor/remove/'+ id).then((res: any) => {
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