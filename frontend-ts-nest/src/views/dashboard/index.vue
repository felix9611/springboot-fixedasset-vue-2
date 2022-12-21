<template>
    <div class="container">

            <el-row :gutter="30">
                <el-form :model="searchForm">
                    <el-col :span="30">
                        <el-form-item label="Buy Date" prop="Dept" label-width="100px">
                            <el-date-picker
                            v-model="searchForm.buyDate"
                            type="daterange"
                            placeholder="Select date and time">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="Type" prop="type">
                            <el-select v-model="searchForm.typeId" placeholder="Select" filterable clearable>
                            <el-option
                                v-for="typeItems in typeItem"
                                :key="typeItems.id"
                                :label="typeItems.typeName"
                                :value="typeItems.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="Department">
                            <el-select v-model="searchForm.deptId" placeholder="Select" filterable clearable>
                                <el-option
                                v-for="item in deptItem"
                                :key="item.id"
                                :label="item.deptName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                        <el-form-item>
                            <el-button type="primary" @click="goToFind()">Find</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
              </el-row>

         <br>

         <el-row :gutter="24">
             <el-col :span="24">
                 <v-card>
                     <div class="card-title">
                         Total Cost by Year-Month
                     </div>
                     <div class="card-content">
                         <ChartJsStackedChart :data="assetCostYearMonthFindData" :headers="assetCostYearMonthFindHeader" v-bind="chartGetAssetCostYearMonthFind" />
                     </div>
                 </v-card>
             </el-col>
         </el-row>

         <el-row :gutter="24">
             <el-col :span="24">
                 <v-card>
                     <div class="card-title">
                         Total Count by Year-Month
                     </div>
                     <div class="card-content">
                         <ChartJsStackedChart :data="assetItemsYearMonthFindData" :headers="assetItemsYearMonthFindHeader" v-bind="chartGetAssetItemsYearMonthFind" />
                     </div>
                 </v-card>
             </el-col>
         </el-row>

         <el-row :gutter="24">
             <el-col :span="24">
                 <v-card>
                     <div class="card-title">
                         Total Cost By Department & Year-Month
                     </div>
                     <div class="card-content">
                         <ChartJsStackedChart :data="assetCostsYearMonthByDeptFindData" :headers="assetCostsYearMonthByDeptFindHeader" v-bind="chartGetAssetCostsYearMonthByDeptFind" />
                     </div>
                 </v-card>
             </el-col>
         </el-row>

         <el-row :gutter="24">
             <el-col :span="24">
                 <v-card>
                     <div class="card-title">
                         Total Count By Department & Year-Month
                     </div>
                     <div class="card-content">
                         <ChartJsStackedChart :data="assetCountYearMonthByDeptFindData" :headers="assetCountYearMonthByDeptFindHeader" v-bind="chartGetAssetCountYearMonthByDeptFind" />
                     </div>
                 </v-card>
             </el-col>
         </el-row>



    </div>
</template>

<script lang="ts">
import bus from '../../components/common/bus'
import axios from '../../axios'
import { Component, Vue } from 'vue-property-decorator'
import ApexChartOne from '../../components/charts/apex/apexOne.vue'
import ChartJsStackedChart from '@/components/charts/chartJs/StackedChart.vue'

@Component({
    components: {
        ApexChartOne,
        ChartJsStackedChart,

    }
})
export default class Dashboard extends Vue {
    buyDateForm: any = []
    searchForm: any = {}

    //ITEM
    typeItem: any = []
    deptItem: any = []

    // base
    assetCostYearMonthFindData: any[] = []
    assetCostYearMonthFindHeader: any[] = []

    assetItemsYearMonthFindData: any[] = []
    assetItemsYearMonthFindHeader: any[] = []

    assetCountYearMonthByDeptFindData: any[] = []
    assetCountYearMonthByDeptFindHeader: any[] = []

    assetCostsYearMonthByDeptFindData: any[] = []
    assetCostsYearMonthByDeptFindHeader: any[] = []


    created() {
      this.getAssetCostYearMonthFind()
      this.getAssetItemsYearMonthFind()
      this.getAssetCountYearMonthByDeptFind()
      this.getAssetCostsYearMonthByDeptFind()

      this.getAllType()
      this.getAlldept()
    }

    goToFind() {
      this.assetCostYearMonthFindHeader = []
      this.assetItemsYearMonthFindHeader = []
      this.assetCountYearMonthByDeptFindHeader = []

      this.getAssetCostYearMonthFind()
      this.getAssetItemsYearMonthFind()
      this.getAssetCountYearMonthByDeptFind()
      this.getAssetCostsYearMonthByDeptFind()
    }


    //base
    getAllType() {
        axios.get(
            '/api/asset/type/getAll'
        ).then(
            (res: any) => {
            this.typeItem = res
        })
    }
    getAlldept() {
        axios.get(
            '/api/department/getAll'
        ).then(
            (res: any) => {
            this.deptItem = res
        })
    }

    get chartGetAssetCostYearMonthFind() {
      return {
        width: 1500,
        heigh: 900,
        fill: false,
        value: 'costs',
        labelData: 'Total Costs',
        type: 'line'
      }
    }
    getAssetCostYearMonthFind() {
      axios.post(
          '/api/dashboard/cards/getAssetCostYearMonthFind',
          this.searchForm
      ).then(
          (res: any) => {
          this.assetCostYearMonthFindData = res

          res.map( mp => {
            this.assetCostYearMonthFindHeader.push({
              key: 'costs',
              label: `${mp.year}-${mp.month}`,
              test: `return row.year == '${mp.year}' && row.month == '${mp.month}'`,
            })
          })
      })
    }

    get chartGetAssetItemsYearMonthFind() {
      return {
        width: 1500,
        heigh: 900,
        fill: false,
        value: 'count',
        labelData: 'Total Costs',
        type: 'line'
      }
    }
    getAssetItemsYearMonthFind() {
      axios.post(
          '/api/dashboard/cards/getAssetItemsYearMonthFind',
          this.searchForm
      ).then(
          (res: any) => {
          this.assetItemsYearMonthFindData = res

          res.map( mp => {
            this.assetItemsYearMonthFindHeader.push({
              key: 'count',
              label: `${mp.year}-${mp.month}`,
              test: `return row.year == '${mp.year}' && row.month == '${mp.month}'`,
            })
          })
      })
    }

    get chartGetAssetCountYearMonthByDeptFind() {
      return {
        width: 1500,
        heigh: 900,
        fill: false,
        value: 'count',
        labelData: 'Total Counts',
        datasetKey: 'deptName',
        alwaysMultipleDatasets: true,
        type: 'bar',
        customChartOptions: {
            scales: {
                xAxes: [
                { stacked: true }
                ],
                yAxes: [
                { stacked: true }
                ]
            }
        }
      }
    }
    getAssetCountYearMonthByDeptFind() {
      axios.post(
          '/api/dashboard/cards/getAssetCountsYearMonthByDeptFind',
          this.searchForm
      ).then(
          (res: any) => {

          this.assetCountYearMonthByDeptFindData = res.map((asa: any) => {
            const { Department, ..._asa } = asa
            const { deptName } = Department
            return {
              deptName,
              ..._asa
            }
          } )

          res.map( mp => {
            this.assetCountYearMonthByDeptFindHeader.push({
              key: 'count',
              label: `${mp.year}-${mp.month}`,
              test: `return row.year == '${mp.year}' && row.month == '${mp.month}'`,
            })
          })
      })
    }

    get chartGetAssetCostsYearMonthByDeptFind() {
      return {
        width: 1500,
        heigh: 900,
        fill: false,
        value: 'costs',
        labelData: 'Total costs',
        datasetKey: 'deptName',
        alwaysMultipleDatasets: true,
        type: 'bar',
        customChartOptions: {
            scales: {
                xAxes: [
                { stacked: true }
                ],
                yAxes: [
                { stacked: true }
                ]
            }
        }
      }
    }
    getAssetCostsYearMonthByDeptFind() {
      axios.post(
          '/api/dashboard/cards/getAssetCostsYearMonthByDeptFind',
          this.searchForm
      ).then(
          (res: any) => {

          this.assetCostsYearMonthByDeptFindData = res.map((asa: any) => {
            const { Department, ..._asa } = asa
            const { deptName } = Department
            return {
              deptName,
              ..._asa
            }
          } )

          res.map( mp => {
            this.assetCostsYearMonthByDeptFindHeader.push({
              key: 'costs',
              label: `${mp.year}-${mp.month}`,
              test: `return row.year == '${mp.year}' && row.month == '${mp.month}'`,
            })
          })
      })
    }


}
</script>


<style scoped>
.handle-box {
     margin-bottom: 20px;
}

.card-title{
    padding: 0.5rem 0rem 0rem 0.5rem;
}

.card-content-score {
    padding-right: 0.8rem;
    padding-left: 0.8rem;
    padding-bottom: 0.5rem;
    padding-top:0.7rem;
}

.card-content{
    padding-right: 0.8rem;
    padding-left: 0.8rem;
    padding-bottom: 0.5rem;
}

.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    padding-top: 1rem;
    padding-left: 1rem;
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-card {
    padding: 30px 30px 30px 30px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 1px;
}

.mgb20-score {
    /* margin-bottom: 20px; */
    background-color: lightskyblue;
    border-color: midnightblue;
    border-width: 0.2rem;
    height: 220px;
    width: 260px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}


</style>
<style lang="scss" scoped>
.filter-bar {
  align-items: center;
  display: flex;
  min-height: 32px;

  &.dense {
    max-height: 28px;
  }

  .chips {
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    max-height: 30px;
    overflow: auto;
    text-overflow: ellipsis;
    &:hover {
      overflow-y: scroll;
      max-height: 200px;
    }
  }
}
</style>
