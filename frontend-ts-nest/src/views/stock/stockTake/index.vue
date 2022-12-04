<template>
    <div class="container">
        <div class="handle-box">
            <el-form :inline="true">
                <el-form-item>
                    <el-input
                      v-model="searchForm.actionName"
                      placeholder="Action Name"
                      clearable
                    >
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button @click="stockTakeList">Find</el-button>
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
                @selection-change="handleSelectionChange">
            <el-table-column
              prop="actionName"
              label="Action Name"
              width="200">
            </el-table-column>
            <el-table-column
              prop="Location.placeName"
              label="Action Place"
              width="200">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="Status">
                <template slot-scope="scope">
                    <el-tag size="small" v-if="scope.row.status === 1" type="success">In Progress</el-tag>
                    <el-tag size="small" v-else-if="scope.row.status === 2" type="danger">Finished</el-tag>
                    <el-tag size="small" v-else-if="scope.row.status === 0" type="danger">Delete</el-tag>
                </template>

            </el-table-column>

            <el-table-column
              prop="createdAt"
              width="200"
              label="Created At"
            >
            </el-table-column>
            <el-table-column
              prop="finishTime"
              width="200"
              label="Finished At"
            >
            </el-table-column>
            <el-table-column
                    prop="icon"
                    width="320px"
                    label="Action">

                <template slot-scope="scope">
                    <el-button
                      v-if="scope.row.status === 1"
                      size="mini"
                      @click="stockTakeItem(scope.row.id)">Stock Take</el-button>
                    <el-button
                      v-if="scope.row.status === 1"
                      size="mini"
                      type="danger"
                      @click="voidItem(scope.row.id)">Delete</el-button>
                      <el-button
                      v-if="scope.row.status === 1"
                      size="mini"
                      type="danger"
                      @click="finishItem(scope.row.id)">Finish</el-button>
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
                <el-form-item label="Action Name"  prop="actionName" label-width="100px">
                    <el-input v-model="editForm.actionName" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Place" prop="place" label-width="100px">
                    <el-select v-model="editForm.actionPlace" placeholder="Select" filterable>
                        <el-option
                        v-for="item in placeItem"
                        :key="item.id"
                        :label="item.placeName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('editForm')">Cancel</el-button>
                <el-button type="primary" @click="submitForm('editForm')">{{ editForm.id? 'Update' : 'Create' }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import axios from '@/axios'
import moment from 'moment'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Stocktake extends Vue {
    searchForm: any = {
                limit: 10,
                page: 1
    }
    editForm: any = {}

    delBtlStatu: boolean = true
    sumTotal: number = 0
    total: number = 0
    size: number|undefined
    current: number = 1
    dialogVisible: boolean = false

                tableData: any =[]
                placeItem: any =[]
                typeItem: any =[]
                deptItem: any =[]

                editFormRules = {
                    actionName: [
                        {required: true, message: 'Action Nmae cannot blank!', trigger: 'blur'}
                    ],
                    actionPlace: [
                        {required: true, message: 'Action Place must choose!', trigger: 'blur'}
                    ]
                }
                roleDialogFormVisible: boolean = false
                defaultProps = {
                    children: 'children',
                    label: 'name'
                }
                treeCheckedKeys: any = []
                checkStrictly: boolean = true
                multipleSelection: any = []

    itemDataList: any = []
    itemTakeForm: any = {}
    itemFindForm: any = {
        limit: 10,
        page: 1
    }
    itemTotal: number = 0
    itemSize: number|undefined
    itemCurrent: number

    stockTakeId: number = 0
    itemTakeDialog: boolean = false

    statusItemNew: any = []


    created() {
        this.stockTakeList()
        this.getAllPlace()
        this.getAllValueCode()
    }

    getAllValueCode() {
        axios.post(
            '/base/code_type/getAllValue',
            { type: 'StockTake' }
        ).then(
            (res: any) => {
                this.statusItemNew = res.data.data
        })
    }

    stockTakeItem(id: number) {
        this.$router.push({ path: `/stock/stocktake/${id}` })
    }

    stockTakeList() {
                axios.post(
                    '/api/stocktake/listAll',
                    this.searchForm
                ).then(
                    (res: any) => {
                    this.tableData = res.rows
                    this.total = res.count

                    this.tableData.forEach((re: any) => {
                        const newCreated =  re.createdAt ? moment(new Date(re.createdAt)).format('DD-MM-YYYY HH:MM') : null
                        const newFinishTime =  re.finishTime ? moment(new Date(re.finishTime)).format('DD-MM-YYYY HH:MM') : null

                        re['createdAt'] = newCreated
                        re['finishTime'] = newFinishTime
                        return re
                    })
                })
    }



          getAllPlace() {
                axios.get(
                    '/api/location/GetAll'
                ).then(
                    (res: any) => {
                        // console.log(res.data.data)
                        this.placeItem = res
                    }
                )
            }

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
            }

            handleSelectionChange(val: any) {
                this.multipleSelection = val;

                this.delBtlStatu = val.length == 0
            }

    handleSizeChange(val: number) {
        this.searchForm.limit = val
        this.stockTakeList()
    }

    handleCurrentChange(val: number) {
        this.searchForm.page = val
        this.stockTakeList()
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

            submitForm(formName: string) {
                const refs: any = this.$refs[formName]
                refs.validate((valid: any) => {
                    if (valid) {
                      console.log(this.editForm)
                        axios.post('/api/stocktake/create', this.editForm)
                            .then((res: any) => {
                                this.stockTakeList()
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

            voidItem(id: number) {
                axios.delete(`/api/stocktake/void/${id}`).then(res => {
                    this.stockTakeList()
                    this.$notify({
                        title: '',
                        showClose: true,
                        message: 'Action is successful ',
                        type: 'success'
                    });
                })
            }

            finishItem(id: number) {
                axios.delete(`/stock/stock_take/finish/${id}`).then(res => {
                    this.stockTakeList()
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
