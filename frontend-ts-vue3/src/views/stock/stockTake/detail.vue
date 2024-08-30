<template>
  <div class="container">
    <div class="handle-box">
      <el-button icon="el-icon-back" circle @click="back"></el-button>
    </div>
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
      :data="stockTakeItemList"
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
  </div>
</template>
<script lang="ts">
import axios from '@/axios'
import VueBase64FileUpload from 'vue-base64-file-upload'
// import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type'
import moment from 'moment'
import QrcodeVue from 'qrcode.vue'

export default {
  components: {
    VueBase64FileUpload,
    QrcodeVue
  },
  data() {
    return {
      itemTakeForm: {},
      stockTakeItemList: [],
      stockTakeId: 0,

      itemFindForm: {
        limit: 5,
        page: 1
      },
      itemTotal: 0,
      itemSize: 10,
      itemCurrent: 1,
      statusItemNew: [],
      placeItem: [],
    }
  },
  created() {
    this.itemFindForm.stockTakeId = Number(this.$route.params.id)
    this.itemTakeForm.stockTakeId = Number(this.$route.params.id)
    this.stockTakeItems()
    this.getAllPlace()
    this.getAllValueCode()
  },
  methods: {
    back() {
      this.$router.push({ path: '/stock/stocktake' })
    },

    getAllPlace() {
      axios.get(
        '/base/location/getAll'
      ).then(
        (res: any) => {
          this.placeItem = res.data.data
        }
      )
    },

    resetItemForm(formName: string) {
      const refs: any = this.$refs[formName]
      refs.resetFields();
      this.itemTakeForm = {}
    },

    getAllValueCode() {
      axios.post(
        '/base/code_type/getAllValue',
        { type: 'StockTake' }
      ).then(
        (res: any) => {
          this.statusItemNew = res.data.data
      })
    },

    stockTakeItems() {
      axios.post(
        '/stock/stock_take/item/list',
        this.itemFindForm
      ).then(
        (res: any) => {
          this.stockTakeItemList = res.data.data.records
          this.itemSize = res.data.data.size
          this.itemCurrent = res.data.data.current
          this.itemTotal = res.data.data.total

          this.stockTakeItemList.forEach((re: any) => {
            const newCheckTime =  re.checkTime ? moment(new Date(re.checkTime)).format('DD-MM-YYYY HH:MM') : null

            re['checkTime'] = newCheckTime
            return re
        })
      })
    },

    handleItemSizeChange(val: number) {
      this.itemFindForm.limit = val
      this.stockTakeItems()
    },

    handleItemCurrentChange(val: number) {
      this.itemFindForm.page = val
      this.stockTakeItems()
    },

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
                              this.stockTakeItems()
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
                              this.stockTakeItems()
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
  }
}
</script>
<style scoped>

    .handle-box {
        margin-bottom: 20px;
    }
</style>
