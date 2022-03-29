<template>
  <div class="container">
    <div class="handle-box">
      <v-form>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="searchForm.deptCode"
                label="Department Code"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-btn @click="deptAllList">Search</v-btn>
            </v-col>
            <v-col>
              <v-btn @click="dialogOpen">Create</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
    <v-data-table
      :headers="headers"
      :items="tableData"
      :items-per-page="searchForm.limit"
      :page.sync="current"
      loading
    >
    </v-data-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '@/axios'
import moment from 'moment'

@Component
export default class Department extends Vue {
  headers: any = [
    { text: 'Department Code', value: 'deptCode' },
    { text: 'Department Name', value: 'deptName' },
    { text: 'Created At', value: 'created' },
    { text: 'Updated At', value: 'updated' },
    { text: 'Actions', value: 'actions', sortable: false },
  ]

  searchForm: object = {
        deptCode: '',
        page: 1,
        limit: 10
  }

  createForm: object = {
    deptCode: '',
    deptName: '',
    deptOtherName: {},
    deptRemark: ''
  }

  size: number|undefined
  current: number = 1
  total: number = 0

  tableData: any = []

  snack: boolean = false
  dialogVisible: boolean = false

  created() {
    this.deptAllList()
  }

  resetForm(formName: string) {
      const refs: any = this.$refs[formName]
      refs.resetFields()
      this.dialogVisible = false
      this.createForm = {}
  }

  dialogOpen() {
    this.dialogVisible = true
  }

  deptAllList() {
    console.log(this.searchForm)
        axios.post(
            '/base/department/listAll',
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
}
</script>
<style>
.v-data-table-header {
  background-color: skyblue;
}

.v-data-table-header-text{
  color: white;
}

</style>
