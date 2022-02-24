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
                <!--<el-form-item>
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
                    <el-select v-model="searchForm.placeId" placeholder="Select" filterable>
                        <el-option
                        v-for="item in placeItem"
                        :key="item.id"
                        :label="item.placeName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>-->

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
              width="105">
            </el-table-column>
            <el-table-column
              prop="assetName"
              label="Asset Name"
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
              width="100">
            </el-table-column>
            <el-table-column
              prop="placeName"
              label="Place Name"
              width="150">
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
                    width="380px"
                    label="Action">

                <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="success"
                      @click="getAllBase64File(scope.row.id)">Read File(Image)</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button
                      size="mini"
                      type="success"
                      @click="readHandle(scope.row.id)">Read</el-button>
                    <el-divider direction="vertical"></el-divider>
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
                title="Image Boxs"
                :visible.sync="showImageDialog"
                width="700px"
                :before-close="handleCloseImageDialog">
                <div v-for="item in fileBase64Data" :key="item.fileName">
                    <el-row  :gutter="20">
                        <el-col :span="15">
                            <p>Uploaded File Name:   {{ item.fileName }}</p>
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
                title="Form Box"
                :visible.sync="dialogVisible"
                width="700px"
                :before-close="handleClose">

            <el-form :model="editForm" :rules="editFormRules" ref="editForm" :disabled="readonlyForm">
                <el-form-item>
                    <el-upload
                        class="upload-demo"
                        :auto-upload="false"
                        :file-list="fileList"
                        :on-change="onChangeUpload"
                        :on-remove="clearFile"
                        >
                        <el-button size="small" type="primary">Upload</el-button>
                        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                    </el-upload>
                </el-form-item>

                <el-form-item label="Asset Code"  prop="assetCode" label-width="100px">
                    <el-input v-model="editForm.assetCode" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="Asset Name"  prop="assetName" label-width="100px">
                    <el-input v-model="editForm.assetName" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Type" prop="type" label-width="100px">
                    <el-select v-model="editForm.typeId" placeholder="Select" filterable>
                        <el-option
                        v-for="typeItems in typeItem"
                        :key="typeItems.id"
                        :label="typeItems.typeName"
                        :value="typeItems.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="Place" prop="place" label-width="100px">
                    <el-select v-model="editForm.placeId" placeholder="Select" filterable>
                        <el-option
                        v-for="placeItems in placeItem"
                        :key="placeItems.id"
                        :label="placeItems.placeName"
                        :value="placeItems.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Dept" prop="Dept" label-width="100px">
                    <el-select v-model="editForm.deptId" placeholder="Select" filterable>
                        <el-option
                        v-for="deptItems in deptItem"
                        :key="deptItems.id"
                        :label="deptItems.deptName"
                        :value="deptItems.id">
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
                <el-button :disabled="hideSaveBtn" type="primary" @click="submitForm('editForm')">{{ editForm.id? 'Update' : 'Create' }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import ref from 'vue'
import axios from '../../../axios'
import VueBase64FileUpload from 'vue-base64-file-upload'
import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type'
import { uploadImgToBase64 } from '../../../utils/uploadImgToBase64'

export default Vue.extend({
        name: 'AssetList',
        components: {
            VueBase64FileUpload
        },
        data() {
            const searchForm: any = {
                limit: 10,
                page: 1
            }
            const editForm: any = {}
            const fileList: any = []
            const fileBase64Data: any = []
            const getBase64Data: any = []
            return {
                fileList,
                customImageMaxSize: 3,
                getBase64Data,
                fileBase64Data,
                // file size ^
                searchForm,
                delBtlStatu: true,
                sumTotal: 0,
                total: 0,
                size: 10,
                current: 1,
                readonlyForm: false,
                dialogVisible: false,
                editForm,
                tableData: [],
                placeItem: [],
                typeItem: [],
                deptItem: [],
                hideSaveBtn: false,
                showImageDialog: false,
                editFormRules: {
                    assetName: [
                        {required: true, message: 'Asset Name cannot blank!', trigger: 'blur'}
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
            this.assetAllList()
            this.getAllType()
            this.getAllPlace()
            this.getAlldept()
            this.getTotalCost()
        },
        methods: {
            clearFile() {
                const refs: any = this.$refs
                return refs.upload.clearFiles()
            },
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
                // return isJpg && isLt2M;
            },
            imgToBase64() {
                this.fileList.map(async (file: any) => {
                    const response: any = await uploadImgToBase64(file.raw)
                    const dataBase64: string = response.data
                    this.fileBase64Data.push({ fileName: file.name, dataBase64 })
                    // const test = response as never
                })
            },
            getTotalCost() {
                axios.get(
                '/asset/assetList/getTotalSum'
                ).then(
                (res: any) => {
                    this.sumTotal = res.data.data
                }
                )
          },
          getAlldept() {
            axios.get(
              '/base/department/getAll'
            ).then(
              (res: any) => {
                this.deptItem = res.data.data
              }
            )
          },
          getAllType() {
            axios.get(
              '/base/asset_type/getAll'
            ).then(
              (res: any) => {
                this.typeItem = res.data.data
              }
            )
          },
          getAllPlace() {
                axios.get(
                    '/base/location/getAll'
                ).then(
                    (res: any) => {
                        // console.log(res.data.data)
                        this.placeItem = res.data.data
                    }
                )
            },
            assetAllList() {
                axios.post(
                    '/asset/assetList/listAll',
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
                this.assetAllList()
            },
            handleCurrentChange(val: number) {
                this.searchForm.page = val
                this.assetAllList()
            },

            resetForm(formName: string) {
                const refs: any = this.$refs[formName]
                refs.resetFields();
                this.dialogVisible = false
                this.editForm = {}
            },
            handleCloseImageDialog() {
                this.showImageDialog = false
            },
            handleClose() {
                this.resetForm('editForm')
            },
            submitForm(formName: string) {
                const refs: any = this.$refs[formName]
                refs.validate((valid: any) => {
                    if (valid) {
                      console.log(this.fileBase64Data[0])
                        axios.post('/asset/assetList/' + (this.editForm.id ? 'update' : 'create'), this.editForm)
                            .then((res: any) => {
                                if (this.fileBase64Data[0]) {
                                    const assetCode = this.editForm.id ? res.data.data.assetCode : res.data.data
                                    axios.get(`/asset/assetList/assetCode/${assetCode}`).then(
                                        ((res: any) => {
                                            const assetId = res.data.data.id
                                            this.fileBase64Data.forEach( (dataFile: any) => {
                                                console.log(dataFile)
                                                const { fileName, dataBase64 } = dataFile
                                                axios.post(
                                                    '/asset/assetList/addFile',
                                                    { assetId, fileName, base64: dataBase64 }
                                                ).then(
                                                    res=> {
                                                         this.assetAllList()
                                                            this.$notify({
                                                                title: '',
                                                                showClose: true,
                                                                message: 'Success to save',
                                                                type: 'success',
                                                            });

                                                            this.fileList = []
                                                            this.fileBase64Data = []
                                                            this.dialogVisible = false
                                                            this.handleClose()
                                                    }
                                                )
                                            })
                                        })
                                    )
                                } else {
                                    this.assetAllList()
                                    this.$notify({
                                        title: '',
                                        showClose: true,
                                        message: 'Success to save',
                                        type: 'success',
                                    });

                                    this.dialogVisible = false
                                    this.handleClose()
                                }
                            })
                    } else {
                        return false;
                    }
                });
            },
            getAllBase64File(assetId: number) {
                axios.post('/asset/assetList/loadFile', 
                { assetId }).then((res: any)=>{
                    this.fileBase64Data = res.data.data
                    this.showImageDialog = true
                    console.log(this.fileBase64Data)
                })
            },
            readHandle(id: number) {
                axios.get(`/asset/assetList/${id}`).then((res: any) => {
                    console.log(this.placeItem)
                    this.editForm = res.data.data
                    this.dialogVisible = true
                    this.readonlyForm = true
                    this.hideSaveBtn = true
                })
            },
            editHandle(id: number) {
                axios.get(`/asset/assetList/${id}`).then((res: any) => {
                    console.log(this.placeItem)
                    this.editForm = res.data.data
                    this.dialogVisible = true
                })
            },
            delItem(id: number) {
                axios.delete(`/asset/assetList/remove/${id}`).then(res => {
                    this.assetAllList()
                    this.$notify({
                        title: '',
                        showClose: true,
                        message: '恭喜你，Action成功',
                        type: 'success'
                    });
                })
            },
            delItemFile(id: number, assetId: number) {
                axios.delete(`/asset/assetList/removeFile/${id}`).then(res => {
                    this.getAllBase64File(assetId)
                    this.$notify({
                        title: '',
                        showClose: true,
                        message: 'Delete file success',
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