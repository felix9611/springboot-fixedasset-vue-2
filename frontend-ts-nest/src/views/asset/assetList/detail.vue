<template>
  <div div class="container">
    <div class="handle-box">
        <el-button icon="el-icon-back" circle @click="back"></el-button>
        <el-button icon="el-icon-circle-plus" circle v-if="readonlyForm === true" @click="startEdit()"></el-button>
    </div>
    <el-form :model="editForm" ref="editForm" :disabled="readonlyForm">
        <el-form-item>
            <el-upload
              class="upload-demo"
              :auto-upload="false"
              :file-list="fileList"
              :on-change="onChangeUpload"
              :on-remove="removeUploaded"
              >
              <el-button size="small" type="primary">Upload</el-button>
              <div slot="tip" class="el-upload__tip">Only upload JPG or PNG</div>
            </el-upload>
          </el-form-item>
          <el-row :span="24">
            <el-col :span="6">
              <el-form-item label="Asset Code"  prop="assetCode" label-width="130px">
                <el-input v-model="editForm.assetCode" autocomplete="off" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="Asset Name"  prop="assetName" label-width="130px">
                <el-input v-model="editForm.assetName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="6">
              <el-form-item label="Type" prop="type" label-width="130px">
                <el-select v-model="editForm.typeId" placeholder="Select" filterable>
                  <el-option
                    v-for="typeItems in typeItem"
                    :key="typeItems.id"
                    :label="typeItems.typeName"
                    :value="typeItems.id">
                    </el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Place" prop="place" label-width="130px">
                <el-select v-model="editForm.placeId" placeholder="Select" filterable>
                  <el-option
                    v-for="placeItems in placeItem"
                    :key="placeItems.id"
                    :label="placeItems.placeName"
                    :value="placeItems.id">
                    </el-option>
                  </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Department" prop="Dept" label-width="130px">
                <el-select v-model="editForm.deptId" placeholder="Select" filterable>
                  <el-option
                    v-for="deptItems in deptItem"
                    :key="deptItems.id"
                    :label="deptItems.deptName"
                    :value="deptItems.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Buy Date" prop="Dept" label-width="130px">
                <el-date-picker
                  v-model="editForm.buyDate"
                  type="datetime"
                  placeholder="Select date and time">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="Description"  prop="description" label-width="130px">
            <el-input type="textarea" v-model="editForm.description"></el-input>
          </el-form-item>

          <el-row :span="24">
            <el-col :span="6">
              <el-form-item label="Vendor" prop="vendor" label-width="130px">
                <el-select v-model="editForm.vendorId" placeholder="Select" filterable>
                  <el-option
                    v-for="vendorItems in vendorItem"
                    :key="vendorItems.id"
                    :label="vendorItems.vendorName"
                    :value="vendorItems.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Sponsor" prop="sponsor" label-width="130px">
                <el-select v-model="editForm.sponsor" placeholder="Select" filterable>
                  <el-option
                    v-for="items in sponsorOpts"
                    :key="items.id"
                    :label="items.label"
                    :value="items.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Sponsor Name"  prop="sponsorName" label-width="130px">
                <el-input v-model="editForm.sponsorName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :span="24">
            <el-col :span="6">
              <el-form-item label="Cost"  prop="cost" label-width="130px">
                <el-input v-model="editForm.cost" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="Serial No."  prop="serialNum" label-width="130px">
                <el-input v-model="editForm.serialNum" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24">
            <el-col :span="18">
              <el-form-item label="Invoice No."  prop="invoiceNo" label-width="130px">
                <el-input v-model="editForm.invoiceNo" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Invoice Date" prop="invoiceDate" label-width="130px">
                  <el-date-picker
                    v-model="editForm.invoiceDate"
                    type="datetime"
                    placeholder="Select date and time">
                  </el-date-picker>
                </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="Remark"  prop="remark" label-width="130px">
            <el-input type="textarea" v-model="editForm.remark"></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('editForm')">Reset</el-button>
        <el-button :disabled="hideSaveBtn" type="primary" @click="submitForm('editForm')" v-if="!readonlyForm">{{ editForm.id? 'Update' : 'Create' }}</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import axios from '@/axios'
import VueBase64FileUpload from 'vue-base64-file-upload'
import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type'
import moment from 'moment'
import { Component, Vue } from 'vue-property-decorator'
import QrcodeVue from 'qrcode.vue'
import { uploadImgToBase64 } from '@/utils/uploadImgToBase64'

@Component({
    components: {
        VueBase64FileUpload,
        QrcodeVue
    }
})
export default class StockTakeDetail extends Vue {
  editForm: any = {}
  readonlyForm: boolean = false
  fileList: any = []
  deptItem: any = []
  fileBase64Data: any = []
  typeItem: any = []
  placeItem: any = []
  vendorItem: any = []

  sponsorOpts: any = [
    { id: 0, label: 'No' },
    { id: 1, label: 'Yes' },
  ]

  created() {
   this.getAlldept()
   this.getAllType()
   this.getAllPlace()
    // this.getAllVendor()
    if (this.$route.params.id) {
      this.editForm.id = Number(this.$route.params.id)
      this.editHandle()
    }
  }

  back() {
    this.$router.push({ path: '/asset/assetList' })
  }

  editHandle() {
    axios.get(`/asset/assetList/${this.$route.params.id}`).then((res: any) => {
      this.readonlyForm = true
      this.editForm = res.data.data
    })
  }

  startEdit() {
    this.readonlyForm = false
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

  removeUploaded() {
    this.fileList = []
  }

  getAlldept() {
        axios.get(
            '/api/department/getAll'
        ).then(
            (res: any) => {
            this.deptItem = res
        })
  }

  getAllType() {
        axios.get(
            '/api/asset/type/getAll'
        ).then(
            (res: any) => {
            this.typeItem = res
        })
  }

  getAllPlace() {
        axios.get(
            '/api/location/getAll'
        ).then(
            (res: any) => {
            this.placeItem = res
        })
  }

  getAllVendor() {
        axios.get(
            '/api/vendor/getAll'
        ).then(
            (res: any) => {
            // console.log(res.data.data)
            this.vendorItem = res.data.data
        })
  }

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
                                                this.$notify({
                                                    title: '',
                                                    showClose: true,
                                                    message: 'Success to save',
                                                    type: 'success',
                                                })

                                                this.fileList = []
                                                this.fileBase64Data = []
                                                this.back()
                                            })
                                        })
                                    })
                                )
                            } else {
                                this.$notify({
                                    title: '',
                                    showClose: true,
                                    message: 'Success to save',
                                    type: 'success',
                                })
                                this.back()
                            }
                })
            } else {
                return false;
            }
        })
  }

  resetForm(formName: string) {
    const refs: any = this.$refs[formName]
    refs.resetFields()
    this.editForm = {}
    if (this.$route.params.id) {
      this.editHandle()
    }
  }

}
</script>
<style scoped>

    .handle-box {
        margin-bottom: 20px;
    }
</style>
