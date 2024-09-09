<template>
    <div class="w-full bg-white p-3">
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
                    <el-button @click="allListHere()">Find</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="dialogVisible = true">Create</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="handle-box">

            <el-table
                ref="multipleTable"
                :data="tableData"
                class="w-[100%]"
            >
                <el-table-column
                        sortable
                        prop="assetCode"
                        label="Asset Code">
                </el-table-column>
                <el-table-column
                        sortable
                        prop="assetName"
                        label="Asset Name">
                </el-table-column>
                <el-table-column
                    sortable
                    prop="repairReason"
                    label="Reason for repair">
                </el-table-column>
                <el-table-column
                    sortable
                    prop="maintenanceDate"
                    label="Date of Maintenance">
                </el-table-column>
                <el-table-column
                    sortable
                    prop="repairAmount"
                    label="Amount of repair">
                </el-table-column>
                <el-table-column
                    sortable
                    prop="created"
                    label="Create Date">
                </el-table-column>
                <el-table-column
                    sortable
                    prop="updated"
                    label="Updated Date">
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

            <el-dialog
                title="Form"
                :visible.sync="dialogVisible"
                width="800px"
                :before-close="handleClose">
                <el-form :model="editForm" :rules="editFormRules" ref="editForm" class="grid lg:grid-cols-2 gap-3">
                    <el-form-item label="Asset Code"  prop="assetCode" label-width="160px">
                        <el-input v-model="editForm.assetCode" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Maintenance Reriod"  prop="maintenanceReriod" label-width="160px">
                        <el-checkbox v-model="editForm.maintenanceReriod" size="large" />
                    </el-form-item>
                    <el-form-item label="Repair Reason"  prop="repairReason" label-width="160px" class="lg:col-span-2">
                        <el-input v-model="editForm.repairReason" autocomplete="off"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="Maintenance Date"  prop="maintenanceDate" label-width="160px">
                        <el-date-picker
                            class="w-full"
                            v-model="editForm.maintenanceDate"
                            type="datetime"
                            placeholder="Select date and time">
                            </el-date-picker>
                    </el-form-item>
                    <el-form-item label="Finish Repair Date"  prop="maintenanceFinishDate" label-width="160px">
                        <el-date-picker
                            class="w-full"
                            v-model="editForm.maintenanceFinishDate"
                            type="datetime"
                            placeholder="Select date and time">
                            </el-date-picker>
                    </el-form-item>
                    <el-form-item label="Repair Invoice No"  prop="repairInvoiceNo" label-width="160px" class="lg:col-span-2">
                        <el-input v-model="editForm.repairInvoiceNo" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="repair Invoice Date"  prop="repairInvoiceDate" label-width="160px">
                        <el-date-picker
                            class="w-full"
                            v-model="editForm.repairInvoiceDate"
                            type="datetime"
                            placeholder="Select date and time">
                            </el-date-picker>
                    </el-form-item>
                    <el-form-item label="Repair Amount"  prop="repairAmount" label-width="120px">
                        <el-input v-model="editForm.repairAmount" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="Remark"  prop="remark" label-width="120px" class="lg:col-span-2">
                        <el-input type="textarea" v-model="editForm.remark" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('editForm')">{{ editForm.id? 'Update' : 'Create' }}</el-button>
                    <el-button @click="resetForm('editForm')">Cancel</el-button>
                </div>
            </el-dialog>
        </div> 
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import moment from 'moment'
import axios from '@/axios'

@Component
export default class RepairRecord extends Vue {
    searchForm: any = {
        limit: 10,
        page: 1,
        status: 1
    }
    

    editForm: any = {}
    editFormRules: any = []

    tableData: any = []
    dialogVisible: boolean = false
    handleClose: boolean = false

    delBtlStatu: boolean = true
    multipleSelection: any = []

    total: number = 0
    size: number
    current: number = 1
    created() {
        this.allListHere()
    }

    handleSelectionChange(val: any) {
        this.multipleSelection = val;
        this.delBtlStatu = val.length == 0
    }


    allListHere() {
        console.log('here')
        axios.post(
            '/asset/asset-repair/listAll',
            this.searchForm
        ).then(
            (res: any) => {
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
    

    async editHandle(id: number) {
        axios.get(`/asset/asset-repair/${id}`).then((res: any) => {
            this.editForm = res.data.data
        })
    }

    async delItem(id: number) {
        await axios.delete('/asset/asset-repair/remove/'+ id).then((res: any) => {
            this.allListHere()
            this.$notify({
                title: '',
                showClose: true,
                message: 'Action is successful ',
                type: 'success'
            })
        })
    }

    resetForm(formName: string) {
        const refs: any = this.$refs[formName]
        refs.resetFields();
        this.dialogVisible = false
        this.editForm = {}
    }

    submitForm(formName: string) {
        const refs: any = this.$refs[formName]
        refs.validate(async (valid: any) => {
            if (valid) {
                axios.post('/asset/asset-repair/' + (this.editForm.id ? 'update' : 'create'), this.editForm).then((res: any) => {
                    this.allListHere()
                    this.$notify({
                        title: '',
                        showClose: true,
                        message: 'Success to save',
                        type: 'success',
                    })
                    this.dialogVisible = false           
                    this.editForm = {}
                })
            }
        })
    }

    @Watch('editForm.assetCode')
    async findAsset(val: string) {
        await axios.get(`/asset/assetList/assetCode/${val}`).then((res: any) => {
            const data = res.data.data
            this.editForm.assetId = data.id
            this.dialogVisible = true
        })
    }
}
</script>