<template>
    <div class="bg-white p-3 rounded-lg">
        <div class="handle-box">
            <div class="grid grid-cols-5 gap-3">
                <v-card
                        class="mgb20-score"
                        max-width="500"
                    >
                        <div class="card-content-score">
                            <div class="text-center text-[1.5rem] text-[midnightblue]">
                                Total
                            </div>
                            <div class="text-center pt-[10%] text-[1.5rem] text-[midnightblue]">
                                Used Cost
                            </div>
                            <div class="text-center pt-[10%] text-[1.5rem] text-[midnightblue]">
                                HKD ${{ sumTotal ? sumTotal && sumTotal.costs: 0 }}
                            </div>    
                        </div>
                    </v-card>
                    <v-card
                        class="mgb20-score"
                        max-width="500"
                    >
                        <div class="card-content-score">
                            <div class="text-center text-[1.5rem] text-[midnightblue]">
                                Total with Sponsor
                            </div>
                            <div class="text-center pt-[10%] text-[1.5rem] text-[midnightblue]">
                                Used Cost 
                            </div>
                            <div class="text-center pt-[10%] text-[1.5rem] text-[midnightblue]">
                                HKD ${{ sumTotalWithSponsor ? sumTotalWithSponsor && sumTotalWithSponsor.costs : 0 }}
                            </div>    
                        </div>
                    </v-card> 
            </div>
            
        </div>
        <div class="handle-box">
            <el-form :inline="true">
                <el-form-item>
                    <el-input
                      v-model="searchForm.assetCode"
                      placeholder="Asset Code"
                      clearable
                    >
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input
                      v-model="searchForm.assetName"
                      placeholder="Asset Name"
                      clearable
                    >
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="searchForm.typeIds" placeholder="Select" filterable clearable multiple collapse-tags>
                        <el-option
                        v-for="item in typeItem"
                        :key="item.id"
                        :label="item.typeName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>  
                <el-form-item>
                    <el-select v-model="searchForm.placeIds" placeholder="Select" filterable clearable multiple collapse-tags>
                        <el-option
                        v-for="item in placeItem"
                        :key="item.id"
                        :label="item.placeName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="searchForm.deptIds" placeholder="Select" filterable clearable multiple collapse-tags>
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

                <!--<el-form-item>
                    <el-button type="primary" @click="dialogVisible = true">Create</el-button>
                </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" @click="goToCreate()">New Create</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button @click="clickUploadExcelDialog">Upload Excel</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="downloadTemplateExcel()">Download Template Excel</el-button>
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
              fixed="left"
              prop="assetCode"
              label="Asset Code"
              width="130">
            </el-table-column>
            <el-table-column
              prop="assetName"
              label="Asset Name"
              width="350">
            </el-table-column>
            <el-table-column
              prop="buyDate"
              label="Purchase Date"
              width="180">
            </el-table-column>
            <el-table-column
              prop="typeCode"
              label="Type Code"
              width="150">
            </el-table-column>
            <el-table-column
              prop="typeName"
              label="Type Name"
              width="150">
            </el-table-column>
            <el-table-column
              prop="placeCode"
              label="Place Code"
              width="150">
            </el-table-column>
            <el-table-column
              prop="placeName"
              label="Place Name"
              width="140">
            </el-table-column>
            <el-table-column
              prop="deptCode"
              label="Department Code"
              width="180">
            </el-table-column>
            <el-table-column
              prop="deptName"
              label="Department Name"
              width="180">
            </el-table-column>
            <el-table-column
              prop="created"
              width="140"
              label="Created At"
            >
            </el-table-column>
            <el-table-column
              prop="updated"
              width="140"
              label="Update At"
            >
            </el-table-column>
            <el-table-column
                    prop="icon"
                    width="460px"
                    label="Action">

                <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="success"
                      @click="getQRCodeTag(scope.row)">Save QR Tag</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button
                      size="mini"
                      type="success"
                      @click="getAllBase64File(scope.row.id)">Read File(Image)</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button
                      size="mini"
                      @click="editHandle(scope.row.id)">Detail</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="delItem(scope.row)">Write Off</el-button>
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
                title="Image Boxs"
                :visible.sync="showImageDialog"
                width="700px"
                :before-close="handleCloseImageDialog">
                <div v-for="item in fileBase64Data" :key="item.fileName">
                    <el-row  :gutter="20">
                        <el-col :span="15">
                            <p>Uploaded File Name: {{ item.fileName }}</p>
                        </el-col>
                        <el-col :span="5">
                            <el-button
                            size="mini"
                            type="danger"
                            @click="delItemFile(item.id, item.assetId)">Delete</el-button>
                        </el-col>
                    </el-row>
                    <br>
                    <br>
                    <el-row>
                        <el-col>
                            <img :src="item.base64" style="width: 70%">
                        </el-col>
                    </el-row>
                    <el-divider ></el-divider>
                </div>
        </el-dialog>

        <el-dialog
                title="Upload Excel"
                :visible.sync="excelUploaderDialog"
                width="700px"
                :before-close="closeUploadExcelDialog">
                <el-upload
                        class="upload-demo"
                        :auto-upload="false"
                        :file-list="excelFileList"
                        :on-change="uploadExcelFile"
                        :on-remove="clearFile"
                        >
                        <el-button size="small" type="primary">Upload</el-button>
                        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                    </el-upload>
        </el-dialog>

        <el-dialog
                title="Photos View"
                :visible.sync="photoViewDialog"
                width="900px"
                :before-close="closephotoViewDialog">

        </el-dialog>


        <el-dialog
                title="QR Code Tag"
                :visible.sync="qrCodeTagDialog"
                width="300px"
                :before-close="closeQRCodeDialog">
                <div>
                        <p>
                            Asset Code: {{ assetDetail.assetCode }}
                        </p>
                        <p>
                            Asset Name: {{ assetDetail.assetName }}
                        </p>
                        <br>
                        <br>
                        <div>
                        </div>
                    <qrcode-vue :value="qrTagContent" :size="250" level="M" />
                </div>
        </el-dialog>

        <el-dialog
                title="Write Off Form"
                :visible.sync="writeOffDialog"
                width="700px"
                :before-close="closeWriteOffDialog">
                <div>
                    <el-form :model="writeOffForm">
                        <el-form-item label="Asset Code"  prop="assetCode" label-width="130px">
                            <el-input v-model="writeOffForm.assetCode" autocomplete="off" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="Asset Name"  prop="assetName" label-width="130px">
                            <el-input v-model="writeOffForm.assetName" autocomplete="off" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="Place Code"  prop="placeCode" label-width="130px">
                            <el-input v-model="writeOffForm.placeCode" autocomplete="off" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="Place Name"  prop="placeName" label-width="130px">
                            <el-input v-model="writeOffForm.placeName" autocomplete="off" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="Last Updated"  prop="updated" label-width="130px">
                            <el-input v-model="writeOffForm.updated" autocomplete="off" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="Write Off Reason"  prop="reason" label-width="130px">
                            <el-input type="textarea" v-model="writeOffForm.reason"></el-input>
                        </el-form-item>

                        <div>
                            <el-button @click="cancelWriteOff()">Reset</el-button>
                            <el-button :disabled="hideSaveBtn" type="primary" @click="writeOff()">Confirm Write Off</el-button>
                        </div>
                         
                    </el-form>
                </div>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import axios from '@/axios'
import VueBase64FileUpload from 'vue-base64-file-upload'
import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type'
import { uploadImgToBase64 } from '@/utils/uploadImgToBase64'
import moment from 'moment'
import { Component, Vue } from 'vue-property-decorator'
import { exportExcelHeader1, exportExcelHeader2 } from './importSetting'
import { formatJson, readExcel, downloadTempExcelFile } from '@/utils/importExcel'
import QrcodeVue from 'qrcode.vue'

@Component({
    components: {
        VueBase64FileUpload,
        QrcodeVue
    }
})
export default class AssetList extends Vue {
    searchForm: any = {
        limit: 10,
        page: 1
    }
    editForm: any = {}
    fileList: any = []
    fileBase64Data: any = []
    getBase64Data: any = []

    customImageMaxSize: number = 3
    delBtlStatu: boolean = true
    sumTotalWithSponsor: any = {}
    sumTotal: any = {}

    total: number = 0
    size: number
    current: number = 1
    readonlyForm: boolean =  false
    dialogVisible: boolean =  false

    tableData: any = []
    placeItem: any = []
    typeItem: any = []
    deptItem: any = []
    vendorItem: any = []

    hideSaveBtn: boolean =  false
    showImageDialog: boolean =  false
    writeOffDialog: boolean =  false

    writeOffForm: any = {}

    editFormRules = {
        assetName: [
            { required: true, message: 'Asset Name cannot blank!', trigger: 'blur' }
        ],
        sponsor : [
            { required: true, message: 'Sponsor cannot blank!', trigger: 'blur' }
        ]
    }

    roleDialogFormVisible: boolean =  false
    excelUploaderDialog: boolean = false
    excelFileList: any = []
    qrCodeTagDialog: boolean = false
    qrTagContent: string = ''
    assetDetail: any = {}
    sponsorOpts: any = [
        { id: 0, label: 'No' },
        { id: 1, label: 'Yes' },
    ]

    photoViewDialog: boolean = false

    
    clearFile() {
        this.fileList = []
    }

    goToCreate() {
        this.$router.push({ path: '/asset/assetList/create' })
    }

    closeWriteOffDialog() {
        this.writeOffDialog = false
    }

    clickUploadExcelDialog() {
        this.excelFileList = []
        this.excelUploaderDialog = true
    }

    closeUploadExcelDialog() {
        this.excelFileList = []
        this.excelUploaderDialog = false
    }

    created() {
        this.assetAllList()
        this.getAllType()
        this.getAllPlace()
        this.getAlldept()
        this.getTotalCost()
        this.getAllVendor()
    }
        
    formToImage(id: number) {
        this.dialogVisible = false
        this.getAllBase64File(id)
        this.editForm = {}
    }

    removeUploaded() {
        this.fileList = []
    }

    closeQRCodeDialog() {
        this.qrCodeTagDialog = false
    }

    closephotoViewDialog() {
        this.photoViewDialog = false
    }

    async uploadExcelFile(file: any) {
        const data = await readExcel(file)
        const processData = formatJson(exportExcelHeader1, exportExcelHeader2, data)

        axios.post('/asset/assetList/batch-create', processData).then((res: any) => {
            if (res) {
                this.$notify({
                    title: 'Msg',
                    showClose: true,
                    message: 'Upload success',
                    type: 'success',
                })
                this.excelUploaderDialog = false
                this.assetAllList()
                this.fileList = []
                file = undefined
            }
        })
    }

    onChangeUpload(file: UploadFile) {
        let testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
        const isJpg = testmsg === 'jpg' || testmsg === 'png' || testmsg === 'JPG' || testmsg === 'PNG'
        const isLt2M = file.size / 1024 / 1024 < 3
        if (!isJpg) {
            this.fileList = this.fileList.filter(v => v.uid !== file.uid)
            this.$message.error('Only Upload jpg and png!')
        }
        if (!isLt2M) {
            this.fileList = this.fileList.filter(v => v.uid !== file.uid)
            this.$message.error('File size cannot over 3MB!')
        }
        if (isJpg && isLt2M){
            this.fileList.push(file)
        }
        this.imgToBase64()
    }

    imgToBase64() {
        this.fileList.map(async (file: any) => {
            const response: any = await uploadImgToBase64(file.raw)
            const dataBase64: string = response.data
            this.fileBase64Data.push({ fileName: file.name, dataBase64 })
            // const test = response as never
        })
    }

    getQRCodeTag(asset: any) {
        this.qrCodeTagDialog = true
        const { assetCode, assetName, placeName, buyDate, updated } = asset
        this.assetDetail = asset
        const download = moment().format('DD-MM-YYYY HH:MM')
        this.qrTagContent = `${assetCode}|${assetName}|${placeName}|Purchase Date:${buyDate}|Updated At:${updated}|Download Tag:${download}`
    }
 
    sumCostWithSponsor() {
        axios.post(
            '/asset/assetList/sumCostWithSponsor',
            this.searchForm
        ).then(
            (res: any) => {
                this.sumTotalWithSponsor = res.data.data
            }
        )
    }

    getTotalCost() {
        axios.post(
            '/asset/assetList/getTotalSum',
            this.searchForm
        ).then(
            (res: any) => {
                this.sumTotal = res.data.data
            }
        )
    }

    getAlldept() {
        axios.get(
            '/base/department/getAll'
        ).then(
            (res: any) => {
            this.deptItem = res.data.data
        })
    }

    getAllType() {
        axios.get(
            '/base/asset_type/getAll'
        ).then(
            (res: any) => {
            this.typeItem = res.data.data
        })
    }

    getAllPlace() {
        axios.get(
            '/base/location/getAll'
        ).then(
            (res: any) => {
            // console.log(res.data.data)
            this.placeItem = res.data.data
        })
    }

    getAllVendor() {
        axios.get(
            '/base/vendor/getAll'
        ).then(
            (res: any) => {
            // console.log(res.data.data)
            this.vendorItem = res.data.data
        })
    }

    assetAllList() {
        this.sumCostWithSponsor()
        this.getTotalCost()
        axios.post(
            '/asset/assetList/listAll',
            this.searchForm
        ).then(
            (res: any) => {
                this.tableData = res.data.data.records
                this.size = res.data.data.size
                this.current = res.data.data.current
                this.total = res.data.data.total          

                this.tableData.forEach((re: any) => {
                    const newBuyDate = re.buyDate? moment(new Date(re.buyDate)).format('DD-MM-YYYY HH:MM') : null
                    const newCreated =  re.created ? moment(new Date(re.created)).format('DD-MM-YYYY HH:MM') : null
                    const newUpdated =  re.updated ? moment(new Date(re.updated)).format('DD-MM-YYYY HH:MM') : null
                    const newInvoiceDate =  re.invoiceDate? moment(new Date(re.invoiceDate)).format('DD-MM-YYYY HH:MM') : null

                    re['buyDate'] = newBuyDate
                    re['created'] = newCreated
                    re['updated'] = newUpdated
                    re['invoiceDate'] = newInvoiceDate
                    return re
                })
            }
        )
    }

    toggleSelection(rows: any) {
        if (rows) {
            rows.forEach((row: any) => {
                const multipleTable: any = this.$refs.multipleTable
                multipleTable.toggleRowSelection(row)
            })
        } else {
            const multipleTable: any = this.$refs.multipleTable
            multipleTable.clearSelection()
        }
    }

    handleSelectionChange(val: any) {
        this.delBtlStatu = val.length == 0
    }

    handleSizeChange(val: number) {
        this.searchForm.limit = val
        this.assetAllList()
    }
            
    handleCurrentChange(val: number) {
        this.searchForm.page = val
        this.assetAllList()
    }

    resetForm(formName: string) {
        const refs: any = this.$refs[formName]
        refs.resetFields();
        this.dialogVisible = false
        this.editForm = {}
    }

    handleCloseImageDialog() {
        this.showImageDialog = false
    }

    handleClose() {
        this.resetForm('editForm')
    }

    getAllBase64File(assetId: number) {
        axios.post(
            '/asset/assetList/loadFile', 
            { assetId })
        .then((res: any)=>{
            this.fileBase64Data = res.data.data
            this.showImageDialog = true
            console.log(this.fileBase64Data)
        })
    }

    readHandle(id: number) {
        axios.get(`/asset/assetList/${id}`).then((res: any) => {
            console.log(res.data.data)
            this.editForm = res.data.data
            this.dialogVisible = true
            this.readonlyForm = true
            this.hideSaveBtn = true
        })
    }

    editHandle(id: number) {
        this.$router.push({ path: `/asset/assetList/${id}` })
        /* axios.get(`/asset/assetList/${id}`).then((res: any) => {
            console.log(this.placeItem)
            this.readonlyForm = false
            this.editForm = res.data.data
            this.dialogVisible = true
        }) */
    }

    delItem(asset: any) {
        this.writeOffDialog = true
        this.writeOffForm = asset

        /* axios.delete(`/asset/assetList/remove/${id}`).then(res => {
            this.assetAllList()
            this.getTotalCost()
            this.sumCostWithSponsor()
            this.$notify({
                title: '',
                showClose: true,
                message: 'Action is successful ',
                type: 'success'
            })
        }) */
    }

    writeOff() {
        const assetId = this.writeOffForm.id
        axios.post('/asset/assetList/writeOff', {
            assetId: this.writeOffForm.id,
            lastPlaceId: this.writeOffForm.placeId,
            reason: this.writeOffForm.reason
        }).then(res => {
             axios.delete(`/asset/assetList/remove/${assetId}`).then(res => {
                this.assetAllList()
                this.getTotalCost()
                this.sumCostWithSponsor()
                this.$notify({
                    title: '',
                    showClose: true,
                    message: 'Action is successful ',
                    type: 'success'
                })
                this.writeOffDialog = false
            })
        })
    }

    delItemFile(id: number, assetId: number) {
        axios.delete(`/asset/assetList/removeFile/${id}`).then(res => {
            this.getAllBase64File(assetId)
            this.$notify({
                title: '',
                showClose: true,
                message: 'Delete file success',
                type: 'success'
            })
            this.assetAllList()
            this.getTotalCost()
            this.sumCostWithSponsor()
        })
    }

    cancelWriteOff() {
        this.writeOffForm = {}
        this.writeOffDialog = false
    }

    downloadTemplateExcel() {
        downloadTempExcelFile(exportExcelHeader1, 'asset_list_template.xlsx')
    }
}
</script>

<style scoped>

    .handle-box {
        margin-bottom: 20px;
    }

    .mgb20-score {
        /* margin-bottom: 20px; */
        background-color: lightskyblue;
        border-color: midnightblue;
        border-width: 0.2rem;
        height: 170px;
        width: 250px;
    }

    .card-content-score {
        padding-right: 0.8rem;
        padding-left: 0.8rem;
        padding-bottom: 0.5rem;
        padding-top:0.7rem;
    }
</style>