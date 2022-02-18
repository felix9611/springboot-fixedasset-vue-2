<template>
    <div class="container">
        
        <div class="handle-box">
            <el-form :inline="true">
                <el-form-item>
                    <el-input
                            v-model="searchForm.typeCode"
                            placeholder="Type Code"
                            clearable
                    >
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button @click="typeAllList">Find</el-button>
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
                border
                stripe
                @selection-change="handleSelectionChange">
            <el-table-column
                    prop="typeCode"
                    label="Type Code"
                    width="120">
            </el-table-column>
            <el-table-column
              prop="typeName"
              label="Type Name"
              width="200">
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

                <el-form-item label="Type Code"  prop="typeCode" label-width="100px">
                    <el-input v-model="editForm.typeCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Type Name"  prop="typeName" label-width="100px">
                    <el-input v-model="editForm.typeName" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Other Name"  prop="typeOtherName" label-width="100px">
                    <el-input type="textarea" v-model="editForm.typeOtherName"></el-input>
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
import Vue from 'vue'
import axios from '../../../axios'

export default Vue.extend({
        name: "Department",
        data() {
            return {
                test: 0,
                searchForm: {
                    page: 1,
                    limit: 10
                },
                delBtlStatu: true,

                total: 0,
                size: 10,
                current: 1,

                dialogVisible: false,
                editForm: {
                    id: 0,
                    typeName: '',
                    typeCode: '',
                    typeOtherName: null
                },

                tableData: [],
                placeItem: [],

                editFormRules: {
                    deptCode: [
                        {required: true, message: 'Department Code cannot blank!', trigger: 'blur'}
                    ]
                },
                roleDialogFormVisible: false,
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                treeCheckedKeys: [],
                checkStrictly: true,
                multipleSelection: []
            }
        },
        created() {
            this.typeAllList()
        },
        methods: {
            typeAllList() {
                axios.post(
                '/base/asset_type/listAll',
                this.searchForm
              ).then(
                (res: any) => {
                  this.tableData = res.data.data.records
                  this.size = res.data.data.size
                  this.current = res.data.data.current
                  this.total = res.data.data.total
              })
            },
            toggleSelection(rows: any) {
                if (rows) {
                    rows.forEach((row: any) => {
                        const multipleTable: any = this.$refs.multipleTable
                        multipleTable.toggleRowSelection(row);
                    });
                } else {
                    const multipleTable: any = this.$refs.multipleTable
                    multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val: any) {
                this.multipleSelection = val;

                this.delBtlStatu = val.length == 0
            },
            handleSizeChange(val: number) {
                this.searchForm.limit = val
                this.typeAllList()
            },
            handleCurrentChange(val: number) {
                this.searchForm.page = val
                this.typeAllList()
            },

            resetForm(formName: string) {
                const refs: any = this.$refs[formName]
                refs.resetFields();
                this.dialogVisible = false
                this.editForm = {
                    id: 0,
                    typeName: '',
                    typeCode: '',
                    typeOtherName: null
                }
            },
            handleClose() {
                this.resetForm('editForm')
            },
            submitForm(formName: string) {
                const refs: any = this.$refs[formName]
                refs.validate(async (valid: any) => {
                    if (valid) {
                      console.log(this.editForm)
                        await axios.post('/base/asset_type/' + (this.editForm.id ? 'update' : 'create'), this.editForm)
                            .then((res: any) => {
                                this.typeAllList()
                                this.$notify({
                                    title: '',
                                    showClose: true,
                                    message: '恭喜你，Action成功',
                                    type: 'success',
                                });

                                this.dialogVisible = false
                            })
                    } else {
                        return false;
                    }
                });
            },
            async editHandle(id: number) {
                await axios.get('/base/asset_type/' + id).then(res => {
                    console.log(this.placeItem)
                    this.editForm = res.data.data
                    this.dialogVisible = true
                })
            },
            async delItem(id: number) {
                await axios.delete('/base/asset_type/remove/'+ id).then((res: any) => {
                    this.typeAllList()
                    this.$notify({
                        title: '',
                        showClose: true,
                        message: '恭喜你，Action成功',
                        type: 'success'
                    });
                })
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