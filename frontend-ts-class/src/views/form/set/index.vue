<template>
  <div class="container">
    <div class="handle-box">
      <el-button type="primary" @click="toCreateForm()">Create</el-button>
    </div>

    <br>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :default-sort = "{prop: 'typeCode', order: 'descending'}"
      @selection-change="handleSelectionChange">
      <el-table-column
        sortable
        prop="path"
        label="Path">
      </el-table-column>
      <el-table-column
        sortable
        prop="method"
        label="Method">
      </el-table-column>
      <el-table-column
        prop="created"
        width="200"
        label="Created At"
      ></el-table-column>
      <el-table-column
        prop="updated"
        width="200"
        label="Update At"
      ></el-table-column>
      <el-table-column
        prop="icon"
        label="Action">
        <template slot-scope="scope">
          <el-button
            @click="editHandle(scope.row.id)">Detail</el-button>
            <el-button
              type="danger"
              @click="remove(scope.row.id)">Remove</el-button>
         <el-divider direction="vertical"></el-divider>
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
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '@/axios'
import moment from 'moment'

@Component
export default class FormSetting extends Vue {
  tableData: any = []
  searchForm: any = {
    page: 1,
    limit: 10
  }
  size: number|undefined
  current: number = 1
  total: number = 0

  created() {
    this.allList()
  }

  allList() {
    axios.post(
      '/base/form/json/listAll',
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
      }
    )
  }

  toCreateForm() {
    this.$router.push({ path:'/form/setting/create' })
  }

  editHandle(id: number) {
    this.$router.push({ path: `/form/setting/${id}` })
  }

  remove(id: number) {
    axios.delete(`/base/form/json/remove/${id}`).then(
      (res: any) => {
        this.$notify({
          title: '',
          showClose: true,
          message: 'Action is successful ',
          type: 'success'
        })
        this.allList()
      }
    )
  }
}
</script>