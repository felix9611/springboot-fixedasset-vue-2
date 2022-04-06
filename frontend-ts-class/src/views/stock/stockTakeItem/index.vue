<template>
    <div class="container">
        <div class="handle-box">
            <el-form :inline="true">
                <el-form-item label="Stock take list" prop="place" label-width="100px">
                    <el-select v-model="searchForm.stockTakeId" placeholder="Select" filterable>
                        <el-option
                        v-for="item in stockTakeList"
                        :key="item.id"
                        :label="item.actionName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button @click="stockTakeItemList">Find</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="dialogVisible = true">Check</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                :default-sort = "{prop: 'assetCode', order: 'descending'}"
                @selection-change="handleSelectionChange">
            <el-table-column
              sortable
              prop="assetCode"
              label="Asset Code"
              width="150">
            </el-table-column>
            <el-table-column
              prop="assetName"
              label="Asset Name"
              width="200">
            </el-table-column>
            <el-table-column
              prop="placeCode"
              label="Place Code"
              width="200">
            </el-table-column>
            <el-table-column
              prop="placeName"
              label="Place Name"
              width="200">
            </el-table-column>
            <el-table-column
              prop="status"
              label="Status"
              width="200">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="Remark"
              width="270">
            </el-table-column>
            <el-table-column
              sortable
              prop="checkTime"
              width="200"
              label="Check At"
            >
            </el-table-column>
            <el-table-column
                    prop="icon"
                    width="150px"
                    label="Action">

                <template slot-scope="scope">
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
                    <el-input v-model="editForm.assetCode" autocomplete="off"></el-input>
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
                <el-form-item label="Status" prop="status" label-width="100px">
                    <el-select v-model="editForm.status" placeholder="Select" filterable>
                        <el-option
                        v-for="item in statusItemNew"
                        :key="item.valueName"
                        :label="item.valueName"
                        :value="item.valueName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Remark"  prop="remark" label-width="100px">
                    <el-input type="textarea" v-model="editForm.remark"></el-input>
                </el-form-item>
                


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('editForm')">Cancel</el-button>
                <el-button type="primary" @click="submitForm('editForm')">{{ 'Checked' }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import axios from '@/axios'
import moment from 'moment'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class StocktakeItem extends Vue {
        searchForm: any = {
            limit: 10,
            page: 1
        }
        editForm: any = {}

                statusItemNew: any = []
                statusItem = [
                    { status: 'Exist' },
                    { status: 'Not Exist' },
                    { status: 'Ready restoration' },
                    { status: 'Under restoration' },
                    { status: 'Other' }
                ]

                delBtlStatu: boolean = true
                sumTotal: number = 0
                total: number = 0
                size: number|undefined
                current: number = 1

                dialogVisible: boolean = false

                tableData: any = []
                placeItem: any = []
                typeItem: any = []
                deptItem: any = []
                stockTakeList: any = []

                editFormRules = {
                    assetCode: [
                        { required: true, message: 'Asset Code cannot blank!', trigger: 'blur' }
                    ],
                    // place: [
                    //     { required: true, message: 'Place cannot blank!', trigger: 'blur' }
                    // ],
                    status: [
                        { required: true, message: 'Status cannot blank!', trigger: 'blur' }
                    ],
                    /* actionPlace: [
                        {required: true, message: 'Action Place must choose!', trigger: 'blur'}
                    ] */
                }

                roleDialogFormVisible: boolean = false
                defaultProps = {
                    children: 'children',
                    label: 'name'
                }

                treeCheckedKeys: any = []
                checkStrictly: boolean = true
                multipleSelection: any = []

        created() {
            this.stockTakeItemList()
            this.getAllstockTakeList()
            this.getAllPlace()
            this.getAllValueCode()
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

          stockTakeItemList() {
                if (!this.searchForm['stockTakeId']) {
                    this.$notify({
                        title: '',
                        showClose: true,
                        message: 'Please select stocklist list!',
                        type: 'error',
                    })
                }
                axios.post(
                    '/stock/stock_take/item/list',
                    this.searchForm
                ).then(
                    (res: any) => {
                    this.tableData = res.data.data.records
                    this.size = res.data.data.size
                    this.current = res.data.data.current
                    this.total = res.data.data.total

                    this.tableData.forEach((re: any) => {
                        const newCheckTime =  re.checkTime ? moment(new Date(re.checkTime)).format('DD-MM-YYYY HH:MM') : null

                        re['checkTime'] = newCheckTime
                        return re
                    })
              })
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

          getAllstockTakeList() {
                axios.get(
                    '/stock/stock_take/getAllST'
                ).then(
                    (res: any) => {
                        // console.log(res.data.data)
                        this.stockTakeList = res.data.data
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
                this.stockTakeItemList()
            }

            handleCurrentChange(val: number) {
                this.searchForm.page = val
                this.stockTakeItemList()
            }
        
            resetForm(formName: string) {
                if (!this.searchForm['stockTakeId']) {
                    this.$notify({
                        title: '',
                        showClose: true,
                        message: 'Please select stocklist list!',
                        type: 'error',
                    })
                }
                const refs: any = this.$refs[formName]
                refs.resetFields()
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
  
                      axios.post(
                          '/asset/assetList/findAsset',
                          {
                              assetCode: this.editForm.assetCode,
                              placeId: this.editForm.placeId
                          }
                      ).then(
                          (res: any) => {
                              const stockTakeId = this.searchForm.stockTakeId
                              if (this.editForm.placeId === Number(res.data.data.placeId)) {
                                const assetId = res.data.data.id
                                        
                                axios.post('/stock/stock_take/item/save', { 
                                    ...this.editForm, 
                                    stockTakeId, 
                                    assetId 
                                }).then((res: any) => {
                                        this.stockTakeItemList()
                                        this.$notify({
                                            title: '',
                                            showClose: true,
                                            message: 'Action is successful ',
                                            type: 'success',
                                        })
                                        this.handleClose()
                                    })
                                    this.handleClose()
                              } else if(res.data.data === null){
                                axios.post('/stock/stock_take/item/save', {
                                    ...this.editForm,
                                    stockTakeId,
                                    status: 'Incorrect location OR does not exist'
                                })
                                    .then((res: any) => {
                                        this.stockTakeItemList()
                                        this.$notify({
                                            title: '',
                                            showClose: true,
                                            message: 'Action is successful ',
                                            type: 'success',
                                        })
                                        this.handleClose()
                                    })
                              }
                        })
                        
                      this.dialogVisible = false

                
                    } else {
                        return false;
                    }
                });
            }

            delItem(id: number) {
                axios.delete(`/stock/stock_take/remove/${id}`).then(res => {
                    this.stockTakeItemList()
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