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
                border
                stripe
                @selection-change="handleSelectionChange">

            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>

            <el-table-column
                    label="ICON"
                    width="50">
                <template slot-scope="scope">
                    <el-avatar size="small" :src="scope.row.avatar"></el-avatar>
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
                    width="260px"
                    label="Action">

                <template slot-scope="scope">
                    <el-button type="text" @click="roleHandle(scope.row.id)">Assigning Roles</el-button>
                    <el-divider direction="vertical"></el-divider>

                    <el-button type="text" @click="repassHandle(scope.row.id, scope.row.username)">Reset Password</el-button>
                    <el-divider direction="vertical"></el-divider>

                    <el-button type="text" @click="editHandle(scope.row.id)">Edit</el-button>
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
import Vue from 'vue'
import axios from '../../axios'

export default Vue.extend({
        name: 'User',
        data() {
            const roleForm: any = {}
            const editForm: any = {}
            const multipleSelection: any = []
            const searchForm: any = {}
            return {
                searchForm,
                delBtlStatu: true,

                total: 0,
                size: 10,
                current: 1,

                dialogVisible: false,
                editForm,

                tableData: [],

                editFormRules: {
                    username: [
                        {required: true, message: 'Please entry username', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: 'Please entry email', trigger: 'blur'}
                    ],
                    statu: [
                        {required: true, message: 'Please select statu', trigger: 'blur'}
                    ]
                },

                multipleSelection,

                roleDialogFormVisible: false,
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                roleForm,
                roleTreeData:  [],
                treeCheckedKeys: [],
                checkStrictly: true

            }
        },
        created() {
            this.getUserList()
        },
        methods: {
            getRoleList() {
                axios.get('/sys/role/list').then((res: any) => {
                    this.roleTreeData = res.data.data.records
                })
            },
            toggleSelection(rows: any) {
                if (rows) {
                    rows.forEach((row: any) => {
                        const multipleTable: any = this.$refs.multipleTable
                        multipleTable.toggleRowSelection(row);
                    });
                } else {
                    const refs: any = this.$refs
                    refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val: any) {
                this.multipleSelection = val;

                this.delBtlStatu = val.length == 0
            },

            handleSizeChange(val: number) {
                this.size = val
                this.getUserList()
            },
            handleCurrentChange(val: number) {
                this.current = val
                this.getUserList()
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

            getUserList() {
                axios.get("/sys/user/list", {
                    params: {
                        username: this.searchForm.username,
                        current: this.current,
                        size: this.size
                    }
                }).then((res: any) => {
                    this.tableData = res.data.data.records
                    this.size = res.data.data.size
                    this.current = res.data.data.current
                    this.total = res.data.data.total
                })
            },

            submitForm(formName: string) {
                const formNames :any = this.$refs[formName]
                formNames.validate((valid: any) => {
                    if (valid) {
                        axios.post('/sys/user/' + (this.editForm.id?'update' : 'save'), this.editForm)
                            .then((res: any) => {
                                this.getUserList()
                                this.$notify({
                                    title: '',
                                    showClose: true,
                                    message: 'Save success',
                                    type: 'success',
                                });

                                this.dialogVisible = false
                                this.handleClose()
                            })
                    } else {
                        return false;
                    }
                });
            },
            editHandle(id: number) {
                axios.get('/sys/user/info/' + id).then((res: any) => {
                    this.editForm = res.data.data
                    this.dialogVisible = true
                })
            },
            /* delHandle(id: number) {

                var ids = []

                if (id) {
                    ids.push(id)
                } else {
                    this.multipleSelection.forEach((row: any) => {
                        ids.push(row.id)
                    })
                }


                axios.post("/sys/user/delete", ids).then((res: any) => {
                    this.getUserList()
                    this.$notify({
                        title: '',
                        showClose: true,
                        message: '恭喜你，Action成功',
                        type: 'success'
                    });
                })
            }, */

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
            },
            submitRoleHandle(formName: string) {
                const refs: any = this.$refs
                const roleIds = refs.roleTree.getCheckedKeys()

                axios.post('/sys/user/role/' + this.roleForm.id, roleIds).then((res: any) => {
                    this.getUserList()
                    this.$notify({
                        title: '',
                        showClose: true,
                        message: '恭喜你，Action成功',
                        type: 'success'
                    });

                    this.roleDialogFormVisible = false
                })
            },
            repassHandle(id: string, username: string) {

                this.$confirm('将重置用户【' + username + '】的密码, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post("/sys/user/repass", id).then((res: any) => {
                        this.getUserList()
                        this.$notify({
                            title: '',
                            showClose: true,
                            message: '恭喜你，Action成功',
                            type: 'success'
                        });
                    })
                })
            },
            hasAuth(perm: string) {
                var authority = this.$store.state.permList
                return authority.indexOf(perm) > -1
            }
        }
})
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