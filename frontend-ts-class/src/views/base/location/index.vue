<template>
    <div class="container">
        <div class="handle-box">
            <el-form :inline="true">
                <el-form-item>
                    <el-input
                            v-model="searchForm.deptCode"
                            placeholder="Department Code"
                            clearable
                    >
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button @click="clickUploadDialog">Upload Excel</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="placeAllList">Find</el-button>
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
                :default-sort = "{prop: 'placeCode', order: 'descending'}"
                @selection-change="handleSelectionChange">
            <el-table-column
                sortable
                prop="placeCode"
                label="Place Code"
                width="150">
            </el-table-column>
            <el-table-column
              prop="placeName"
              label="Place Name">
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
                    <el-button size="mini" @click="editHandle(scope.row.id)">Edit</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button size="mini" type="danger" @click="delItem(scope.row.id)">Delete</el-button>
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


        <!--新增对话框-->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="700px"
                :before-close="handleClose">

            <el-form :model="editForm" :rules="editFormRules" ref="editForm">

                <el-form-item label="Place Code"  prop="placeCode" label-width="100px">
                    <el-input v-model="editForm.placeCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Place Name"  prop="placeName" label-width="100px">
                    <el-input v-model="editForm.placeName" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Other Name"  prop="deptOtherName" label-width="100px">
                    <el-input type="textarea" v-model="editForm.placeOtherName"></el-input>
                </el-form-item>
                <el-form-item label="Remark"  prop="deptOtherName" label-width="100px">
                    <el-input type="textarea" v-model="editForm.remark"></el-input>
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
                    </el-upload>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '@/axios'
import { formatJson, readExcel } from '@/utils/importExcel'
import moment from 'moment'

@Component
export default class Location extends Vue {
    fileList: any = []
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
    uploaderDialog: boolean = false

    editFormRules = {
        placeCode: [
            { required: true, message: 'Place Code cannot blank!', trigger: 'blur' }
        ],
        placeName: [
            { required: true, message: 'Place Name cannot blank!', trigger: 'blur' }
        ]
    }

    testEcelHeader1 = [
        'Place Code',
        'Place Name'
    ]
    testEcelHeader2 = [
        'placeCode',
        'placeName'
    ]

    created() {
        this.placeAllList()
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
        axios.post('/base/location/create', res).then((res: any) => {
                        
                this.$notify({
                    title: 'Msg',
                    showClose: true,
                    message: 'Upload success',
                    type: 'success',
                })

                this.uploaderDialog = false
                this.placeAllList()
                this.fileList = []
                file = undefined
            })
        })
    }

    placeAllList() {
        axios.post(
            '/base/location/listAll',
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
            }
        )
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
        this.placeAllList()
    }

    handleCurrentChange(val: number) {
        this.searchForm.page = val
        this.placeAllList()
    }

    resetForm(formName: string) {
        const refs: any = this.$refs[formName]
        refs.resetFields();
        this.dialogVisible = false
        this.editForm = {
            id: 0,
            placeName: '',
            placeCode: '',
            remark: '',
            placeOtherName: null
        }
    }

    handleClose() {
        this.resetForm('editForm')
    }
    
    submitForm(formName: string) {
        const refs: any = this.$refs[formName]
        refs.validate((valid: any) => {
            if (valid) {
                axios.post('/base/location/' + (this.editForm.id ? 'update' : 'create'), this.editForm)
                    .then(res => {
                        this.placeAllList()
                        this.$notify({
                            title: '',
                            showClose: true,
                            message: 'Action is successful ',
                            type: 'success',
                        });

                        this.dialogVisible = false
                        this.handleClose()
                    })
            } else {
                return false;
            }
        });
    }

     editHandle(id: number) {
        axios.get('/base/location/' + id).then(res => {
            console.log(res.data.data)
            this.editForm = res.data.data
            this.dialogVisible = true
         })
    }

    delItem(id: number) {
        axios.delete('/base/location/remove/'+ id).then(res => {
            this.placeAllList()
            this.$notify({
                title: '',
                showClose: true,
                message: 'Action is successful ',
                type: 'success'
            });
        })
    }

}
</script>

<style scoped>

    .handle-box {
        margin-bottom: 20px;
    }

</style>