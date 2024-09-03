<template>
    <div class="container">
        <div class="handle-box">
            <el-form :inline="true">
                <el-form-item>
                    <el-input
                            v-model="searchForm.name"
                            placeholder="Name"
                            clearable
                    >
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button @click="getRoleList">Find</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="dialogVisible = true">Add</el-button>
                </el-form-item>
                <el-form-item>
                  <!--  <el-popconfirm title="Is this sure to delete in bulk? ？" @confirm="delHandle(null)">
                        <el-button type="danger" slot="reference" :disabled="delBtlStatu">Bulk Delete</el-button>
                    </el-popconfirm> -->
                </el-form-item>
            </el-form>
        </div>


        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                class="w-[100%]"
                @selection-change="handleSelectionChange">

            <!--<el-table-column
                    type="selection"
                    width="55">
            </el-table-column>-->

            <el-table-column
                    prop="name"
                    label="Name"
                    width="150">
            </el-table-column>
            <el-table-column
                    width="150"
                    prop="code"
                    label="Unique Code"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="remark"
                    label="Remark"
                    show-overflow-tooltip>
            </el-table-column>

            <el-table-column
                     width="100"
                    prop="statu"
                    label="Status">
                <template slot-scope="scope">
                    <el-tag size="small" v-if="scope.row.statu === 1" type="success">Active</el-tag>
                    <el-tag size="small" v-else-if="scope.row.statu === 0" type="danger">Stop</el-tag>
                </template>

            </el-table-column>
            <el-table-column
                    width="500"
                    prop="icon"
                    label="Action">

                    

                <template slot-scope="scope">
                    <div class="grid grid-cols-3 gap-3">
                        <button @click="permHandle(scope.row.id)" class="border border-2 rounded-md bg-[#b9dfb0] hover:bg-[#a3d597] p-1">Assign Permissions</button>
                        <el-button size="mini" @click="editHandle(scope.row.id)">Edit</el-button>
                        <button @click="openTheVoidUserDialog(scope.row.id)" class="text-white border border-2 rounded-md bg-[#ffadad] hover:bg-[#ff7575] p-1">Void</button>
                    </div>
                    
                <!--    <template>
                        <el-popconfirm title="Is this a piece of content to delete? ？" @onConfirm="delHandle(scope.row.id)">
                            <el-button size="mini" type="danger" slot="reference">Delete</el-button>
                        </el-popconfirm>
                    </template> -->



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


        <!--Dialog-->
        <el-dialog
                title="Form"
                :visible.sync="dialogVisible"
                width="600px"
                :before-close="handleClose">

            <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px" class="demo-editForm">

                <el-form-item label="Role Name" prop="name" label-width="100px">
                    <el-input v-model="editForm.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Unique Code" prop="code" label-width="100px">
                    <el-input v-model="editForm.code" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Remark" prop="remark" label-width="100px">
                    <el-input v-model="editForm.remark" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Status" prop="statu" label-width="100px">
                    <el-radio-group v-model="editForm.statu">
                        <el-radio :label=0>Stop</el-radio>
                        <el-radio :label=1>Active</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('editForm')"> {{ editForm.id? 'Update': 'Create' }}</el-button>
                    <el-button @click="resetForm('editForm')">Reset</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>

        <el-dialog
                title="Assign Permissions"
                :visible.sync="permDialogVisible"
                width="600px">

            <el-form :model="permForm">

                <el-tree
                        :data="permTreeData"
                        show-checkbox
                        ref="permTree"
                        :default-expand-all=true
                        node-key="id"
                        :check-strictly=true
                        :props="defaultProps">
                </el-tree>

            </el-form>

            <span slot="footer" class="dialog-footer">
			    <el-button @click="permDialogVisible = false">Cancel</el-button>
			    <el-button type="primary" @click="submitPermFormHandle('permForm')">{{ permTreeData.menuIds? 'Update' : 'Create' }}</el-button>
			</span>
        </el-dialog>

        <el-dialog
                title="Role Void"
                :visible.sync="voidDialogVisible"
                width="600px">
                    <div class="text-center p-2">
                        <span class="text-[1.1rem]">Are you sure to delete this role?</span>
                        <div class="flex gap-3 items-center justify-center text-[1.1rem]">
                            <button class="border border-2 rounded-md bg-[#ffadad] hover:bg-[#ff7575] p-1 text-white px-5" @click="delHandle()">Sure</button>
                            <button class="btn border border-1 rounded-md p-1 px-6 bg-[#ececec] hover:bg-[#d0d0d0]" @click="voidDialogVisible = false">No</button>
                            
                        </div>
                    </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import axios from '@/axios'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Role extends Vue {
    permForm: any = {}
    searchForm: any = {}
    editForm: any = {}
    delBtlStatu: boolean = true
    total: number = 0
    size: number|undefined
    current: number =1
    dialogVisible: boolean = false
    voidDialogVisible: boolean = false
    tableData: any = []
    voidReadyId: number = 0

    editFormRules = {
        name: [
            { required: true, message: '请输入角色名称', trigger: 'blur'}
        ],
        code: [
            { required: true, message: '请输入唯一编码', trigger: 'blur'}
        ],
        statu: [
            { required: true, message: '请选择状态', trigger: 'blur'}
        ]
    }
    multipleSelection: any = []
    permDialogVisible: boolean = false
    defaultProps = {
        children: 'children',
        label: 'name'
    }
    permTreeData: any = []
            
    created() {
        this.getRoleList()

        axios.get('/sys/menu/list').then((res: any) => {
            this.permTreeData = res.data.data
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
        this.size = val
        this.getRoleList()
    }

    handleCurrentChange(val: number) {
        this.current = val
        this.getRoleList()
    }


    resetForm(formName: string) {
        const refs: any = this.$refs[formName]
        refs[formName].resetFields();
        this.dialogVisible = false
        this.editForm = {}
    }

    handleClose() {
        // this.resetForm('editForm')
        this.dialogVisible = false
    }
        
    getRoleList() {
        axios.get('/sys/role/list', {
            params: {
                name: this.searchForm.name,
                current: this.current,
                size: this.size
            }
        }).then(res => {
            this.tableData = res.data.data.records
            this.size = res.data.data.size
            this.current = res.data.data.current
            this.total = res.data.data.total
        })
    }

    submitForm(formName: string) {
        const refs: any = this.$refs[formName]
        refs.validate((valid: any) => {
            if (valid) {
                axios.post('/sys/role/' + (this.editForm.id ? 'update' : 'save'), this.editForm)
                    .then(res => {
                        this.getRoleList()
                        this.$notify({
                            title: '',
                            showClose: true,
                            message: 'Action is successful ',
                            type: 'success'
                        })
                    this.dialogVisible = false
                    this.resetForm(formName)
                })
            } else {
                return false
            }
        })
    }

    editHandle(id: number) {
        axios.get('/sys/role/info/' + id).then((res: any) => {
            this.editForm = res.data.data
            this.dialogVisible = true
        })
    }

    permHandle(id: number) {
        this.permDialogVisible = true

        axios.get(`/sys/role/info/${id}`).then((res: any) => {
            const permTree: any = this.$refs.permTree
            permTree.setCheckedKeys(res.data.data.menuIds)
            this.permForm = res.data.data
        })
    }

    submitPermFormHandle(formName: string) {
        const permTree: any = this.$refs.permTree
        const menuIds = permTree.getCheckedKeys()

        axios.post(`/sys/role/perm/${this.permForm.id}`, menuIds).then(res => {
            this.getRoleList()
            this.$notify({
                title: '',
                showClose: true,
                message: 'Action is successful ',
                type: 'success'
            })
            this.permDialogVisible = false
            this.resetForm(formName)
        })
    }

    delHandle() {
        console.log(this.voidReadyId)
        axios.delete(`/sys/role/void/${this.voidReadyId}`).then(res => {
            this.getRoleList()
            this.$notify({
                title: '',
                showClose: true,
                message: 'Void the role successful',
                type: 'success'
            })
            this.voidDialogVisible = false
        })
    }

    openTheVoidUserDialog(id: number) {
        this.voidDialogVisible = true
        this.voidReadyId = id
    }
}
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }
</style>