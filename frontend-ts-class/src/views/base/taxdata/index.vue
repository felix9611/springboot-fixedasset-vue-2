<template>
    <div class="container">
        <div class="handle-box">
            <el-form :inline="true">
                <el-form-item>
                    <el-input
                            v-model="searchForm.countryName"
                            placeholder="Country Name"
                            clearable
                    >
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button @click="downloadTemplateExcel()">Download Template Excel</el-button>
                </el-form-item>


                <el-form-item>
                    <el-button @click="clickUploadDialog">Upload Excel</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="taxInfoAllList">Find</el-button>
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
                    <el-input v-model="editForm.countryName" autocomplete="off"></el-input>
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

                <el-form-item label="Tax Rate"  prop="taxRate" label-width="150px">
                    <el-input type="number" v-model="editForm.taxRate" autocomplete="off">
                        <template #append>%</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="Import Tax Rate"  prop="importTax" label-width="150px">
                    <el-input type="number" v-model="editForm.importTax" autocomplete="off">
                        <template #append>%</template>
                    </el-input>
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
        'Nation Code',
        'Nation Name',
        'Country Code',
        'Country Name',
        'Tax Type',
        'Tax Code',
        'Tax Name',
        'Tax Rate',
        'Import Rate'
    ]

    testEcelHeader2 = [
        'nationCode',
        'nationName',
        'countryCode',
        'countryName',
        'taxType',
        'taxCode',
        'taxName',
        'taxRate',
        'importRate'
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
        this.taxInfoAllList()
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
        downloadTempExcelFile(this.testEcelHeader1, 'tax_informations_template.xlsx')
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

        
        axios.post('/system/country/tax/batch-create', updatedArray).then((res: any) => {
            if (res) {
                this.$notify({
                    title: 'Msg',
                    showClose: true,
                    message: 'Upload success',
                    type: 'success',
                })
                this.uploaderDialog = false
                this.taxInfoAllList()
                this.fileList = []
                file = undefined
            }
        })
    }

    taxInfoAllList() {
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
        this.taxInfoAllList()
    }

    handleCurrentChange(val: any) {
        this.searchForm.page = val
        this.taxInfoAllList()
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
                this.editForm = {
                    ...this.editForm,
                    taxRate: this.editForm.taxRate / 100,
                    importTax: this.editForm.importTax / 100
                }
                axios.post('/system/country/tax/' + (this.editForm.id ? 'update' : 'create'), this.editForm)
                    .then((res: any) => {
                        this.taxInfoAllList()
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
            this.editForm = {
                    ...res.data.data,
                    taxRate: res.data.data.taxRate * 100,
                    importTax: res.data.data.importTax * 100
                }
            this.dialogVisible = true

        })
    }

    delItem(id: number) {
        axios.delete('/system/country/tax/remove/'+ id).then((res: any) => {
            this.taxInfoAllList()
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