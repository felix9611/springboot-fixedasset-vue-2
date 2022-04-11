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
                    prop="statu"
                    label="Status">
                <template slot-scope="scope">
                    <el-tag size="small" v-if="scope.row.active === 1" type="success">In Progress</el-tag>
                    <el-tag size="small" v-else-if="scope.row.active === 0" type="danger">Finished</el-tag>
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
                    width="200px"
                    label="Action">

                <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="stockTakeItem(scope.row.id)">Stock Take</el-button>
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


        <el-dialog
            title="Stocktake Item"
            :visible.sync="itemTakeDialog"
            width="1200px"
            :before-close="closeItemDialog">
            <el-form :model="itemTakeForm" ref="itemTakeForm">
                    <el-form-item label="Asset Code"  prop="assetCode" label-width="100px">
                        <el-input v-model="itemTakeForm.assetCode" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Place" prop="place" label-width="100px">
                        <el-select v-model="itemTakeForm.placeId" placeholder="Select" filterable>
                            <el-option
                            v-for="item in placeItem"
                         :key="item.id"
                            :label="item.placeName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Status" prop="status" label-width="100px">
                        <el-select v-model="itemTakeForm.status" placeholder="Select" filterable>
                            <el-option
                            v-for="item in statusItemNew"
                            :key="item.valueName"
                            :label="item.valueName"
                            :value="item.valueName">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Remark"  prop="remark" label-width="100px">
                        <el-input type="textarea" v-model="itemTakeForm.remark"></el-input>
                    </el-form-item>
            </el-form>
            <div>
                <el-button  @click="resetItemForm('itemTakeForm')">Reset</el-button>
                <el-button type="primary" @click="submitItemForm('itemTakeForm')">Submit</el-button>
            </div>
            <br>
            <br>

            <el-table
                ref="multipleTable"
                :data="itemDataList"
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                sortable
                prop="assetCode"
                label="Asset Code">
                </el-table-column>
                <el-table-column
                prop="assetName"
                label="Asset Name">
                </el-table-column>
                <el-table-column
                prop="placeCode"
                label="Place Code">
                </el-table-column>
                <el-table-column
                prop="placeName"
                label="Place Name">
                </el-table-column>
                <el-table-column
                prop="status"
                label="Status">
                </el-table-column>
                <el-table-column
                prop="remark"
                label="Remark">
                </el-table-column>
                <el-table-column
                sortable
                prop="checkTime"
                label="Check At">
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleItemSizeChange"
                @current-change="handleItemCurrentChange"
                layout="total, sizes, prev, pager, next, jumper"
                :page-sizes="[5, 10, 20, 30]"
                :current-page="itemCurrent"
                :page-size="itemSize"
                :total="itemTotal">
            </el-pagination>
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
    statusItem = [
        { status: 'Exist' },
        { status: 'Not Exist' },
        { status: 'Ready restoration' },
        { status: 'Under restoration' },
        { status: 'Other' }
    ]

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

    closeItemDialog() {
        this.itemTakeDialog = false
    }

    stockTakeItem(id: number) {
        this.stockTakeId = id
        this.itemTakeForm.stockTakeId = id
        this.itemFindForm.stockTakeId = id
        this.itemTakeDialog = true

        axios.post(
            '/stock/stock_take/item/list',
            this.itemFindForm
        ).then(
            (res: any) => {
                this.itemDataList = res.data.data.records
                this.itemSize = res.data.data.size
                this.itemCurrent = res.data.data.current
                this.itemTotal = res.data.data.total

                this.itemDataList.forEach((re: any) => {
                    const newCheckTime =  re.checkTime ? moment(new Date(re.checkTime)).format('DD-MM-YYYY HH:MM') : null

                    re['checkTime'] = newCheckTime
                    return re
                })
        })

    }

    stockTakeList() {
                axios.post(
                    '/stock/stock_take/listAll',
                    this.searchForm
                ).then(
                    (res: any) => {
                    this.tableData = res.data.data.records
                    this.size = res.data.data.size
                    this.current = res.data.data.current
                    this.total = res.data.data.total

                    this.tableData.forEach((re: any) => {
                        const newCreated =  re.createdAt ? moment(new Date(re.createdAt)).format('DD-MM-YYYY HH:MM') : null
                        const newFinishTime =  re.finishTime ? moment(new Date(re.finishTime)).format('DD-MM-YYYY HH:MM') : null

                        re['createdAt'] = newCreated
                        re['finishTime'] = newFinishTime
                        return re
                    })
                })
    }

    submitItemForm(formName: string) {
        const refs: any = this.$refs[formName]
        refs.validate((valid: any) => {
           if (valid) {

            axios.post(
                '/asset/assetList/findAsset',
                {
                    assetCode: this.itemTakeForm.assetCode,
                    placeId: this.itemTakeForm.placeId
                }
            ).then(
                (res: any) => {
                    if (this.itemTakeForm.placeId === Number(res.data.data.placeId)) {
                        const assetId = res.data.data.id
                                        
                        axios.post('/stock/stock_take/item/save', { 
                            ...this.itemTakeForm, 
                            assetId 
                        }).then((res: any) => {
                            this.stockTakeItem(this.stockTakeId)
                            this.$notify({
                                title: '',
                                showClose: true,
                                message: 'Action is successful ',
                                type: 'success',
                            })
                        })

                    } else if(res.data.data === null){
                        axios.post('/stock/stock_take/item/save', {
                            ...this.itemTakeForm,
                            status: 'Incorrect location OR does not exist'
                        }).then((res: any) => {
                            this.stockTakeItem(this.stockTakeId)
                            this.$notify({
                                title: '',
                                showClose: true,
                                message: 'Action is successful ',
                                type: 'success',
                            })
                        })
                    }
                })          
            } else {
                return false;
           }
        })
    }

          getAllPlace() {
                axios.get(
                    '/base/location/getAll'
                ).then(
                    (res: any) => {
                        // console.log(res.data.data)
                        this.placeItem = res.data.data
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

    handleItemSizeChange(val: number) {
        this.itemFindForm.limit = val
        this.stockTakeItem(this.stockTakeId)
    }

    handleItemCurrentChange(val: number) {
        this.itemFindForm.page = val
        this.stockTakeItem(this.stockTakeId)
    }

    resetItemForm(formName: string) {
        const refs: any = this.$refs[formName]
        refs.resetFields();
        this.itemTakeForm = {}
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
                        axios.post('/stock/stock_take/create', this.editForm)
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

            delItem(id: number) {
                axios.delete(`/stock/stock_take/remove/${id}`).then(res => {
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