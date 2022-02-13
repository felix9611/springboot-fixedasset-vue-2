<template>
    <div class="container">
        <div class="handle-box">
            Total butget Cost : HKD {{ sumTotal }}
        </div>
        <div class="handle-box">
            <el-form :inline="true">
                <el-form-item>
                    <el-input
                      v-model="searchForm.assetName"
                      placeholder="Asset Name"
                      clearable
                    >
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="searchForm.typeId" placeholder="Select" filterable clearable>
                        <el-option
                        v-for="item in typeItem"
                        :key="item.id"
                        :label="item.typeName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="searchForm.deptId" placeholder="Select" filterable>
                        <el-option
                        v-for="item in deptItem"
                        :key="item.id"
                        :label="item.deptName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button @click="assetAllList">Find</el-button>
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
              prop="assetCode"
              label="Asset Code"
              width="120">
            </el-table-column>
            <el-table-column
              prop="assetName"
              label="Asset Name"
              width="200">
            </el-table-column>
            <el-table-column
              prop="typeCode"
              label="Type Code"
              width="100">
            </el-table-column>
            <el-table-column
              prop="typeName"
              label="Type Name"
              width="150">
            </el-table-column>
            <el-table-column
              prop="placeCode"
              label="Place Code"
              width="100">
            </el-table-column>
            <el-table-column
              prop="placeName"
              label="Place Name"
              width="150">
            </el-table-column>
            <el-table-column
              prop="deptCode"
              label="Department Code"
              width="100">
            </el-table-column>
            <el-table-column
              prop="deptName"
              label="Department Name"
              width="150">
            </el-table-column>
            <el-table-column
              prop="created"
              width="150"
              label="Created At"
            >
            </el-table-column>
            <el-table-column
              prop="updated"
              width="150"
              label="Update At"
            >
            </el-table-column>
            <el-table-column
                    prop="icon"
                    width="200px"
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

        <el-dialog
                title="Form Box"
                :visible.sync="dialogVisible"
                width="700px"
                :before-close="handleClose">

            <el-form :model="editForm" :rules="editFormRules" ref="editForm">

                <el-form-item label="Asset Code"  prop="assetCode" label-width="100px">
                    <el-input v-model="editForm.assetCode" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="Asset Name"  prop="assetName" label-width="100px">
                    <el-input v-model="editForm.assetName" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Type" prop="type" label-width="100px">
                    <el-select v-model="editForm.typeId" placeholder="Select" filterable>
                        <el-option
                        v-for="item in typeItem"
                        :key="item.id"
                        :label="item.typeName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="Place" prop="place" label-width="100px">
                    <el-select v-model="editForm.placeId" placeholder="Select" filterable>
                        <el-option
                        v-for="item in placeItem"
                        :key="item.id"
                        :label="item.placeName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Dept" prop="Dept" label-width="100px">
                    <el-select v-model="editForm.deptId" placeholder="Select" filterable>
                        <el-option
                        v-for="item in deptItem"
                        :key="item.id"
                        :label="item.deptName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="Buy Date" prop="Dept" label-width="100px">
                  <el-date-picker
                    v-model="editForm.buyDate"
                    type="datetime"
                    placeholder="Select date and time">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="Description"  prop="description" label-width="100px">
                    <el-input type="textarea" v-model="editForm.description"></el-input>
                </el-form-item>
                <el-form-item label="Cost"  prop="cost" label-width="100px">
                    <el-input v-model="editForm.cost" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Serial No."  prop="serialNum" label-width="100px">
                    <el-input v-model="editForm.serialNum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Invoice No."  prop="invoiceNo" label-width="100px">
                    <el-input v-model="editForm.invoiceNo" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Invoice Date" prop="invoiceDate" label-width="100px">
                  <el-date-picker
                    v-model="editForm.invoiceDate"
                    type="datetime"
                    placeholder="Select date and time">
                  </el-date-picker>
                </el-form-item>

                <el-form-item label="Remark"  prop="remark" label-width="100px">
                    <el-input type="textarea" v-model="editForm.remark"></el-input>
                </el-form-item>

                <!-- < -->

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
        name: 'AssetList',
        data() {
            return {
                searchForm: {
                    page: 1,
                    limit: 10
                },
                delBtlStatu: true,
                sumTotal: 0,
                total: 0,
                size: 10,
                current: 1,

                dialogVisible: false,
                editForm: {
                    id: 0
                },

                tableData: [],
                placeItem: [],
                typeItem: [],
                deptItem: [],

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
                checkStrictly: true

            }
        },
        created() {
            this.assetAllList()
            this.getAllType()
            this.getAllPlace()
            this.getAlldept()
            this.getTotalCost()
        },
        methods: {
          getTotalCost() {
            this.$axios.get(
              '/asset/assetList/getTotalSum'
            ).then(
              res => {
                this.sumTotal = res.data.data
              }
            )
          },
          getAlldept() {
            this.$axios.get(
              '/base/department/getAll'
            ).then(
              res => {
                this.deptItem = res.data.data
              }
            )
          },
          getAllType() {
            this.$axios.get(
              '/base/asset_type/getAll'
            ).then(
              res => {
                this.typeItem = res.data.data
              }
            )
          },
          getAllPlace() {
                this.$axios.get(
                    '/base/location/getAll'
                ).then(
                    res => {
                        // console.log(res.data.data)
                        this.placeItem = res.data.data
                    }
                )
            },
            assetAllList() {
                this.$axios.post(
                '/asset/assetList/listAll',
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
                this.assetAllList()
            },
            handleCurrentChange(val) {
                this.searchForm.page = val
                this.assetAllList()
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
                        this.$axios.post('/asset/assetList/' + (this.editForm.id ? 'update' : 'create'), this.editForm)
                            .then(res => {
                                this.assetAllList()
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
                this.$axios.get('/asset/assetList/' + id).then(res => {
                    console.log(this.placeItem)
                    this.editForm = res.data.data
                    this.dialogVisible = true
                })
            },
            delItem(id) {
                this.$axios.delete('/asset/assetList/remove/'+ id).then(res => {
                    this.assetAllList()
                    this.$notify({
                        showClose: true,
                        message: '恭喜你，Action成功',
                        type: 'success'
                    });
                })
            }
        }
    }
</script> -->

<style scoped>

    .handle-box {
        margin-bottom: 20px;
    }

    /*.el-pagination {*/
    /*    float: right;*/
    /*    margin-top: 5px;*/
    /*}*/

</style>