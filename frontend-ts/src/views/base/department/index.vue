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
                    <el-button @click="deptAllList">Find</el-button>
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
                    prop="deptCode"
                    label="Department Code"
                    width="120">
            </el-table-column>
            <el-table-column
              prop="deptName"
              label="Department Name">
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


        <!--新增对话框-->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="700px"
                :before-close="handleClose">

            <el-form :model="editForm" :rules="editFormRules" ref="editForm">

                <el-form-item label="Department Code"  prop="deptCode" label-width="100px">
                    <el-input v-model="editForm.deptCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Department Name"  prop="deptName" label-width="100px">
                    <el-input v-model="editForm.deptName" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Other Name"  prop="deptOtherName" label-width="100px">
                    <el-input type="textarea" v-model="editForm.deptOtherName"></el-input>
                </el-form-item>

                <!-- <el-form-item label="Test">
                    <el-select v-model="value" placeholder="Select">
                        <el-option
                        v-for="item in placeItem"
                        :key="item.id"
                        :label="item.placeName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item> -->

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('editForm')">Cancel</el-button>
                <el-button type="primary" @click="submitForm('editForm')">OK</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Department",
        data() {
            return {
                // test 
                options: [{
                    value: 'Option1',
                    label: 'Option1'
                    }, {
                    value: 'Option2',
                    label: 'Option2'
                    }, {
                    value: 'Option3',
                    label: 'Option3'
                    }, {
                    value: 'Option4',
                    label: 'Option4'
                    }, {
                    value: 'Option5',
                    label: 'Option5'
                    }],
                value: '',



                searchForm: {
                    limit: 10,
                    page: 1
                },
                delBtlStatu: true,

                total: 0,
                size: 10,
                current: 1,

                dialogVisible: false,
                editForm: {
                    id: null,
                    deptCode: null,
                },

                tableData: [],
                placeItem: [],

                editFormRules: {
                    deptCode: [
                        {required: true, message: 'Department Code cannot blank!', trigger: 'blur'}
                    ]
                },

                multipleSelection: [],

                roleDialogFormVisible: false,
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                roleForm: {},
                roleTreeData:  [],
                treeCheckedKeys: [],
                checkStrictly: true

            }
        },
        created() {
            this.deptAllList()
            this.getAllPlace()
        },
        methods: {
            /* getAllPlace() {
                this.$axios.get(
                    '/base/location/getAll'
                ).then(
                    res => {
                        // console.log(res.data.data)
                        this.placeItem = res.data.data
                    }
                )
            }, */
            deptAllList() {
              this.$axios.post(
                '/base/department/listAll',
                this.searchForm
              ).then(
                res => {
                  this.tableData = res.data.data.records
                  this.size = res.data.data.size
                  this.current = res.data.data.current
                  this.total = res.data.data.total
              })
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;

                this.delBtlStatu = val.length == 0
            },

            handleSizeChange(val) {
                this.searchForm.limit = val
                this.deptAllList()
            },
            handleCurrentChange(val) {
                this.searchForm.page = val
                this.deptAllList()
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.dialogVisible = false
                this.editForm = {}
            },
            handleClose() {
                this.resetForm('editForm')
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                      console.log(this.editForm)
                        this.$axios.post('/base/department/' + (this.editForm.id ? 'update' : 'create'), this.editForm)
                            .then(res => {
                                this.deptAllList()
                                this.$notify({
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
            editHandle(id) {
                this.$axios.get('/base/department/' + id).then(res => {
                    console.log(this.placeItem)
                    this.editForm = res.data.data
                    this.dialogVisible = true
                })
            },
            delItem(id) {
                this.$axios.delete('/base/department/remove/'+ id).then(res => {
                    this.deptAllList()
                    this.$notify({
                        showClose: true,
                        message: '恭喜你，Action成功',
                        type: 'success'
                    });
                })
            }
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