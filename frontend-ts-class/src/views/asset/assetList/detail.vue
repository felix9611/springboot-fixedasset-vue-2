<template>
  <div class="w-full bg-white p-1 shadow-lg rounded-lg">
    <div class="handle-box p-2">
        <el-button icon="el-icon-back" circle @click="back"></el-button>
        <el-button icon="el-icon-circle-plus" circle v-if="readonlyForm === true" @click="startEdit()"></el-button>
    </div>
    <el-form :model="editForm" ref="editForm" :disabled="readonlyForm"  class="grid sm:lg:grid-cols-1 lg:grid-cols-4 p-1">
      <el-form-item class="lg:col-span-4 px-8">
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
      <el-form-item label="Asset Code"  prop="assetCode" label-width="120px">
        <el-input v-model="editForm.assetCode" autocomplete="off" readonly></el-input>
      </el-form-item>
      <el-form-item label="Asset Name"  prop="assetName" label-width="120px" class="lg:col-span-3">
        <el-input v-model="editForm.assetName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Type" prop="type" label-width="120px">
        <el-select v-model="editForm.typeId" placeholder="Select" filterable class="w-full">
          <el-option
              v-for="typeItems in typeItem"
              :key="typeItems.id"
              :label="typeItems.typeName"
              :value="typeItems.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Place" prop="place" label-width="120px">
        <el-select v-model="editForm.placeId" placeholder="Select" filterable class="w-full">
          <el-option
            v-for="placeItems in placeItem"
            :key="placeItems.id"
            :label="placeItems.placeName"
            :value="placeItems.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Department" prop="Dept" label-width="120px">
        <el-select v-model="editForm.deptId" placeholder="Select" filterable class="w-full">
          <el-option
            v-for="deptItems in deptItem"
            :key="deptItems.id"
            :label="deptItems.deptName"
            :value="deptItems.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Buy Date" prop="Dept" label-width="120px">
        <el-date-picker
          class="w-full"
          v-model="editForm.buyDate"
          type="datetime"
          placeholder="Select date and time">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Description"  prop="description" label-width="120px" class="lg:col-span-4">
        <el-input type="textarea" v-model="editForm.description"></el-input>
      </el-form-item>
      <el-form-item label="Vendor" prop="vendor" label-width="120px">
        <el-select v-model="editForm.vendorId" placeholder="Select" filterable class="w-full">
          <el-option
            v-for="vendorItems in vendorItem"
            :key="vendorItems.id"
            :label="vendorItems.vendorName"
            :value="vendorItems.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Sponsor" prop="sponsor" label-width="120px" class="w-full">
        <el-checkbox v-model="editForm.sponsor" size="large" />
      </el-form-item>
      <el-form-item label="Sponsor Name"  prop="sponsorName" label-width="120px" class="lg:col-span-2">
        <el-input v-model="editForm.sponsorName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Unit"  prop="nit" label-width="120px">
        <el-input v-model="editForm.unit" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Cost"  prop="cost" label-width="120px">
        <el-input v-model="editForm.cost" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Serial No."  prop="serialNum" label-width="120px" class="lg:col-span-2">
        <el-input v-model="editForm.serialNum" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Invoice No."  prop="invoiceNo" label-width="120px" class="lg:col-span-2">
        <el-input v-model="editForm.invoiceNo" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Invoice Date" prop="invoiceDate" label-width="120px" class="lg:col-span-2">
        <el-date-picker
          v-model="editForm.invoiceDate"
          type="datetime"
          placeholder="Select date and time">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Tax Information" prop="taxInformation" label-width="120px" v-if="!editForm.id" class="lg:col-span-4">
        <el-checkbox v-model="taxInformation" />
      </el-form-item>
      <el-form-item label="Tax Type"  prop="invoiceNo" label-width="120px" v-if="taxInformation || editForm.id">
        <el-select v-model="editForm.taxCode" placeholder="Select" filterable clearable class="w-full">
          <el-option
            v-for="items in taxesData"
            :key="items.taxCode"
            :label="items.label"
            :value="items.taxCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Tax Code"  prop="taxCode" label-width="120px" v-if="taxInformation || editForm.id">
        <el-select v-model="editForm.taxCode" placeholder="Select" filterable clearable class="w-full">
          <el-option
            v-for="items in taxesData"
            :key="items.taxCode"
            :label="items.taxCode"
            :value="items.taxCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Inclube Tax" prop="includeTax" label-width="120px" v-if="taxInformation || editForm.id">
        <el-checkbox v-model="editForm.includeTax" />
      </el-form-item>
      <el-form-item label="After / Before Tax Total"  prop="invoiceNo" label-width="160px" v-if="taxInformation || editForm.id">
        <el-input v-model="editForm.afterBeforeTax" autocomplete="off"></el-input>
      </el-form-item>


      <el-form-item label="Remark"  prop="remark" label-width="120px" class="lg:col-span-4">
        <el-input type="textarea" v-model="editForm.remark"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer p-4">
        <el-button @click="resetForm('editForm')">Reset</el-button>
        <el-button :disabled="hideSaveBtn" type="primary" @click="submitForm('editForm')" v-if="!readonlyForm">{{ editForm.id? 'Update' : 'Create' }}</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import axios from '@/axios'
import VueBase64FileUpload from 'vue-base64-file-upload'
import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type'
import moment from 'moment'
import { Component, Vue, Watch } from 'vue-property-decorator'
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
  taxInformation: boolean = false

  sponsorOpts: any = [
    { id: 0, label: 'No' },
    { id: 1, label: 'Yes' },
  ]

  @Watch('editForm.taxCode')
  onTaxChange() {
    const taxObject =  this.taxesData.find(item => item.taxCode === this.editForm.taxCode)

    this.editForm.taxCountryCode = taxObject.countryCode
    this.editForm.taxCountryCode = taxObject.countryCode
    this.editForm.taxRate = taxObject.taxRate
  }

  @Watch('editForm.includeTax')
  onTaxTotalChange() {
    if (this.editForm.includeTax) {
      console.log(this.editForm.afterBeforeTax)
      this.editForm.afterBeforeTax = (this.editForm.cost * (1- Number(this.editForm.taxRate))).toFixed(1)
    } else {
      this.editForm.afterBeforeTax = (this.editForm.cost * (1 + Number(this.editForm.taxRate))).toFixed(1)
    }
  }

  created() {
    this.getAlldept()
    this.getAllType()
    this.getAllPlace()
    this.getAllVendor()
    if (this.$route.params.id) {
      this.editForm.id = Number(this.$route.params.id)
      this.editHandle()
    }
    this.getAllTaxesData()
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

  taxesData: any = []
  getAllTaxesData() {
    axios.get(
            '/system/country/tax/getAll'
        ).then(
            (res: any) => {

            let results = res.data.data
            const updates = results.map( x=> {
              return {
                ...x,
                taxRate: Number(x.taxRate),
                label: `${x.nationName} - ${x.countryName} ${x.taxCode} (${Number(x.taxRate) * 100}%)`
              }
            } )
            this.taxesData = updates
        })
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
