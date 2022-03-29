<template>
    <div class="container">
        <!--Action栏 begin-->
        <div class="handle-box">
            <el-button type="primary" icon="el-icon-plus" class="mr10" @click="dialogVisible = true">Add</el-button>
        </div>
        <!--Action栏 end-->

        <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">

            <el-table-column
                    prop="name"
                    label="Name"
                    sortable
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="perms"
                    label="Perms Code"
                    sortable
                    width="180">
            </el-table-column>

            <el-table-column
                    prop="icon"
                    label="Icon">
            </el-table-column>

            <el-table-column
                    prop="type"
                    label="Type">
                <template slot-scope="scope">
                    <el-tag size="small" v-if="scope.row.type === 0">Meun</el-tag>
                    <el-tag size="small" v-else-if="scope.row.type === 1" type="success">Item</el-tag>
                    <el-tag size="small" v-else-if="scope.row.type === 2" type="info">Button</el-tag>
                </template>

            </el-table-column>

            <el-table-column
                    prop="path"
                    label="Meun URL">
            </el-table-column>
            <el-table-column
                    prop="component"
                    label="Component">
            </el-table-column>
            <el-table-column
                    prop="orderNum"
                    label="Order No.">
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
                    prop="icon"
                    label="Action">

                <template slot-scope="scope">
                    <el-button size="mini" @click="editHandle(scope.row.id)">Edit</el-button>
                    <el-divider direction="vertical"></el-divider>

                    <template>
                        <el-popconfirm title="Is this a piece of content to delete?" confirm-button-text="Confirm" cancel-button-text="Cancel" @onConfirm="delHandle(scope.row.id)">
                            <el-button size="mini" type="danger" slot="reference">Remove</el-button>
                        </el-popconfirm>
                    </template>

                </template>
            </el-table-column>

        </el-table>

        <!--新增对话框-->
        <el-dialog
                title="Form"
                :visible.sync="dialogVisible"
                width="600px"
                :before-close="handleClose">

            <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px" class="demo-editForm">

                <el-form-item label="Parent Id" prop="parentId">
                    <el-select v-model="editForm.parentId" placeholder="Please select the parent menu ">
                        <template v-for="item in tableData">
                            <el-option :label="item.name" :value="item.id"></el-option>
                            <template v-for="child in item.children">
                                <el-option :label="child.name" :value="child.id">
                                    <span>{{ "- " + child.name }}</span>
                                </el-option>
                            </template>
                        </template>
                    </el-select>
                </el-form-item>

                <el-form-item label="Meun Name" prop="name" label-width="100px">
                    <el-input v-model="editForm.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Perms Code" prop="perms" label-width="100px">
                    <el-input v-model="editForm.perms" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Icon" prop="icon" label-width="100px">
                    <el-input v-model="editForm.icon" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Meun URL" prop="path" label-width="100px">
                    <el-input v-model="editForm.path" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Component" prop="component" label-width="100px">
                    <el-input v-model="editForm.component" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Type" prop="type" label-width="100px">
                    <el-radio-group v-model="editForm.type">
                        <el-radio :label=0>Meun</el-radio>
                        <el-radio :label=1>Item</el-radio>
                        <el-radio :label=2>Button</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="Status" prop="statu" label-width="100px">
                    <el-radio-group v-model="editForm.statu">
                        <el-radio :label=0>Stop</el-radio>
                        <el-radio :label=1>Active</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="Order Num" prop="orderNum" label-width="100px">
                    <el-input-number v-model="editForm.orderNum" :min="1" label="Order Num">1</el-input-number>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="submitForm('editForm')">{{ editForm.id? 'Update' : 'Create' }}</el-button>
                    <el-button @click="resetForm('editForm')">Reset</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
    </div>
</template>

<script lang="ts">
import axios from '@/axios'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Menu extends Vue {
    editForm: any = {}

    dialogVisible: boolean = false
    editFormRules =  {
        parentId: [
            { required: true, message: 'Please select upper menu', trigger: 'blur' }
        ],
        name: [
            {required: true, message: 'Please type name', trigger: 'blur'}
        ],
        perms: [
            { required: true, message: 'Please type the perms code', trigger: 'blur' }
        ],
        type: [
            { required: true, message: 'Please select the type', trigger: 'blur' }
        ],
        orderNum: [
            { required: true, message: 'Please type sort number', trigger: 'blur' }
        ],
        statu: [
            { required: true, message: 'Please select the status', trigger: 'blur' }
        ]
    }
    tableData: any = []

    created() {
        this.getMenuTree()
    }

    getMenuTree() {
        axios.get('/sys/menu/list').then((res: any) => {
            this.tableData = res.data.data
        })
    }
            
    submitForm(formName: string) {
        const refs: any = this.$refs[formName]
        refs.validate((valid: any) => {
            if (valid) {
                axios.post('/sys/menu/' + (this.editForm.id?'update' : 'save'), this.editForm)
                    .then((res: any) => {
                        this.getMenuTree()
                        this.$notify({
                            title: '',
                            showClose: true,
                            message: 'Action is successful ',
                            type: 'success'
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
        axios.get(`/sys/menu/info/${id}`).then((res: any) => {
            this.editForm = res.data.data
            this.dialogVisible = true
        })
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

    delHandle(id: number) {
        axios.post(`/sys/menu/delete/${id}`).then(res => {
            this.getMenuTree()
            if(res.data.code === 200) {
                this.$notify({
                    title: '',
                    showClose: true,
                    message: 'Action is successful ',
                    type: 'success'
                })
            }
        })
    }
}
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }
</style>