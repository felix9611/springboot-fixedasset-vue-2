<template>
    <div class="container">
        <div class="handle-box">
            <el-form :inline="true">
                <el-form-item>
                    <el-input
                            v-model="searchForm.username"
                            placeholder="Username"
                            clearable
                    >
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button @click="getUserList">Find</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="dialogVisible = true" v-if="hasAuth('sys:user:save')">Add</el-button>
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
                    type="selection"
                    width="55">
            </el-table-column>

            <el-table-column
                    label="ICON"
                    width="100">
                <template slot-scope="scope">
                    <el-avatar :src="scope.row.avatarBase64"></el-avatar>
                </template>
            </el-table-column>

            <el-table-column
                    prop="username"
                    label="Username"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="code"
                    label="Role Name">
                <template slot-scope="scope">
                    <el-tag size="small" type="info" v-for="item in scope.row.sysRoles" :key="item">{{item.name}}</el-tag>
                </template>

            </el-table-column>
            <el-table-column
                    prop="email"
                    label="Email">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="Phone">
            </el-table-column>

            <el-table-column
                    prop="statu"
                    label="Status">
                <template slot-scope="scope">
                    <el-tag size="small" v-if="scope.row.statu === 1" type="success">Active</el-tag>
                    <el-tag size="small" v-else-if="scope.row.statu === 0" type="danger">Stop</el-tag>
                </template>

            </el-table-column>
            <el-table-column
                    prop="created"
                    width="200"
                    label="Created At"
            >
            </el-table-column>
            <el-table-column
                    prop="icon"
                    width="370px"
                    label="Action">

                <template slot-scope="scope">
                    <el-button size="mini" @click="roleHandle(scope.row.id)">Assigning Roles</el-button>
                    <el-divider direction="vertical"></el-divider>

                    <el-button size="mini" @click="repassHandle(scope.row.id, scope.row.username)">Reset Password</el-button>
                    <el-divider direction="vertical"></el-divider>

                    <el-button size="mini" @click="editHandle(scope.row.id)">Edit</el-button>
                    <el-divider direction="vertical"></el-divider>

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
                title="Form"
                :visible.sync="dialogVisible"
                width="600px"
                :before-close="handleClose">

            <el-form :model="editForm" :rules="editFormRules" ref="editForm">

                <el-form-item>
                    <el-upload
                        class="upload-demo"
                        :auto-upload="false"
                        :file-list="fileList"
                        :on-change="onChangeUpload"
                        :on-remove="removeUploaded"
                        >
                        <el-button size="small" type="primary">Upload</el-button>
                        <div slot="tip" class="el-upload__tip">Only upload one picture on JPG or PNG</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="Username" prop="username" label-width="100px">
                    <el-input v-model="editForm.username" autocomplete="off"></el-input>
                    <el-alert
                            title="Default Password 888888"
                            :closable="false"
                            type="info"
                            style="line-height: 12px;"
                    ></el-alert>
                </el-form-item>

                <el-form-item label="E-mail"  prop="email" label-width="100px">
                    <el-input v-model="editForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Phone"  prop="phone" label-width="100px">
                    <el-input v-model="editForm.phone" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Dept" prop="Dept" label-width="100px">
                    <el-select v-model="editForm.deptId" placeholder="Select" filterable>
                        <el-option
                        v-for="deptItems in deptItem"
                        :key="deptItems.id"
                        :label="deptItems.deptName"
                        :value="deptItems.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="Status"  prop="statu" label-width="100px">
                    <el-radio-group v-model="editForm.statu">
                        <el-radio :label="0">Stop</el-radio>
                        <el-radio :label="1">Active</el-radio>
                    </el-radio-group>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('editForm')">Cancel</el-button>
                <el-button type="primary" @click="submitForm('editForm')">Confirm</el-button>
            </div>
        </el-dialog>

        <!-- 分配权限对话框 -->
        <el-dialog title="分配角色" :visible.sync="roleDialogFormVisible" width="600px">

            <el-form :model="roleForm">
                <el-tree
                        :data="roleTreeData"
                        show-checkbox
                        ref="roleTree"
                        :check-strictly=checkStrictly
                        node-key="id"
                        :default-expand-all=true
                        :props="defaultProps">
                </el-tree>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="roleDialogFormVisible=false">Cancel</el-button>
                <el-button type="primary" @click="submitRoleHandle('roleForm')">{{ editForm.id? 'Update' : 'Create' }}</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script lang="ts">
import axios from '@/axios'
import moment from 'moment'
import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type'
import { uploadImgToBase64 } from '@/utils/uploadImgToBase64'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class User extends Vue {
    roleForm: any = {}
    editForm: any = {}
    multipleSelection: any = []
    searchForm: any = {
        page: 1,
        limit: 10
    }
    deptItem: any = []
    fileList: any = []
    delBtlStatu: boolean = true
    total: number=  0
    size: number|undefined
    current: number = 1
    dialogVisible: boolean = false
    tableData: any = []
    editFormRules = {
        username: [
            {required: true, message: 'Please entry username', trigger: 'blur'}
        ],
        email: [
            { required: true, message: 'Please entry email', trigger: 'blur'}
        ],
        statu: [
            {required: true, message: 'Please select statu', trigger: 'blur'}
        ]
    }
    roleDialogFormVisible: boolean = false
    defaultProps = {
        children: 'children',
        label: 'name'
    }
    roleTreeData: any = []
    treeCheckedKeys: any = []
    checkStrictly: boolean = true
    fileBase64Data: string = ''


    created() {
        this.getUserList()
        this.getAlldept()
    }

    removeUploaded() {
        this.fileList = []
    }

    onChangeUpload(file: UploadFile) {
        let testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
        const isJpg = testmsg === 'jpg' || testmsg === 'png' || testmsg === 'JPG' || testmsg === 'PNG'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJpg) {
            this.fileList = this.fileList.filter(v => v.uid !== file.uid)
            this.$message.error('Only Upload jpg and png!')
        }
        if (!isLt2M) {
            this.fileList = this.fileList.filter(v => v.uid !== file.uid)
            this.$message.error('File size cannot over 2MB!')
        }
        if (isJpg && isLt2M){
            this.fileList.push(file)
        }
        if (this.fileList.length > 1) {
            this.$message.error('Cannot upload more than one pcture!')
        }
        this.imgToBase64()
        // return isJpg && isLt2M;
    }

    imgToBase64() {
        this.fileList.map(async (file: any) => {
            const response: any = await uploadImgToBase64(file.raw)
            const dataBase64: string = response.data
            this.fileBase64Data = dataBase64
            console.log(this.fileBase64Data)
            // const test = response as never
        })
    }

    getAlldept() {
        axios.get(
            '/base/department/getAll'
        ).then(
            (res: any) => {
                this.deptItem = res.data.data
            }
        )
    }

    getRoleList() {
        axios.get('/sys/role/list').then((res: any) => {
            this.roleTreeData = res.data.data.records
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
        this.getUserList()
    }

    handleCurrentChange(val: number) {
        this.current = val
        this.getUserList()
    }
            

    resetForm(formName: string) {
        const refs: any = this.$refs[formName]
        refs.resetFields();
        this.dialogVisible = false
        this.editForm = {}
    }

    handleClose() {
        this.resetForm('editForm')
    }

            getUserList() {
                axios.post('/sys/user/list',
                    this.searchForm
                /* {
                    params: {
                        username: this.searchForm.username,
                        current: this.current,
                        size: this.size
                    } */
                ).then((res: any) => {
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

    submitForm(formName: string) {
        const formNames :any = this.$refs[formName]
        formNames.validate((valid: any) => {
            if (valid) {
                this.editForm.avatarBase64 = this.fileBase64Data
                axios.post('/sys/user/' + (this.editForm.id?'update' : 'save'), this.editForm)
                    .then((res: any) => {
                            
                            this.$notify({
                                title: '',
                                showClose: true,
                                message: 'Save success',
                                type: 'success',
                            })
                            this.searchForm.username = ''
                            this.getUserList()    
                            this.dialogVisible = false
                            this.handleClose()
                        })
                } else {
                     return false
                }
        })
    }

    editHandle(id: number) {
        axios.get('/sys/user/info/' + id).then((res: any) => {
            this.editForm = res.data.data
            this.dialogVisible = true
        })
    }

    roleHandle (id: number) {
        this.getRoleList()
        this.roleDialogFormVisible = true

        axios.get('/sys/user/info/' + id).then((res: any) => {
            this.roleForm = res.data.data

            let roleIds: any = []
            res.data.data.sysRoles.forEach((row: any) => {
                roleIds.push(row.id)
            })
            const refs: any =this.$refs
            refs.roleTree.setCheckedKeys(roleIds)
        })
    }

    submitRoleHandle(formName: string) {
        const refs: any = this.$refs
        const roleIds = refs.roleTree.getCheckedKeys()

        axios.post('/sys/user/role/' + this.roleForm.id, roleIds).then((res: any) => {
            this.searchForm.username = null
            this.getUserList()
            this.$notify({
                title: '',
                showClose: true,
                message: 'Action is successful ',
                type: 'success'
            })
            this.roleDialogFormVisible = false
        })
    }

    repassHandle(id: string, username: string) {

        this.$confirm(`Will reset User ${username} password`, 'Alert', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning'
        }).then(() => {
            axios.post("/sys/user/repass", id).then((res: any) => {
                this.searchForm.username = null
                this.getUserList()
                this.$notify({
                    title: '',
                    showClose: true,
                    message: 'Action is successful ',
                    type: 'success'
                })
            })
        })
    }

    hasAuth(perm: string) {
        var authority = this.$store.state.permList
        return authority.indexOf(perm) > -1
    }
}
</script>

<style scoped>

    .handle-box {
        margin-bottom: 20px;
    }

</style>