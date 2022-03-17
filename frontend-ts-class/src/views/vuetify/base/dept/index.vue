<template>
  <div class="container">
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
import axios from '../../../../axios'
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

  searchForm: any = {
        page: 1,
        limit: 10
  }

  size: number|undefined
  current: number = 1
  total: number = 0

  tableData: any = []

  snack: boolean = false


  save () {
        this.snack = true
      }
      cancel () {
        this.snack = true
      }
      open () {
        this.snack = true
      }
      close () {
        console.log('Dialog closed')
      }

  created() {
    this.deptAllList()
  }

  deptAllList() {
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
