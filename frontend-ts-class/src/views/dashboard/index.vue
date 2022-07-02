<template>
    <div class="container">
        
            <el-row :gutter="30">
                <el-form :model="searchForm">
                    <el-col :span="30">
                        <el-form-item label="Buy Date" prop="Dept" label-width="100px">
                            <el-date-picker
                            v-model="buyDateForm"
                            type="daterange"
                            placeholder="Select date and time">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="Type" prop="type">
                            <el-select v-model="searchForm.typeId" placeholder="Select" filterable>
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
                        <el-form-item>
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
            <el-col :span="12">
                <v-card
                    max-width="1700"
                >
                    <div class="card-title">
                        Buy Year-month and Type - Cost
                    </div>
                    <div class="card-content">
                        <ChartJsStackedChart :data="getAssetYearCostDeptData" :headers="getAssetYearCostTypeHeader" v-bind="chartsSetAssetYearCostDept" /> 
                    </div> 
                </v-card> 
            </el-col>
            <el-col :span="12">
                <v-card
                    max-width="1700"
                >
                    <div class="card-title">
                        Buy Year-month and Type - Cost
                    </div>
                    <div class="card-content">
                        <ChartJsStackedChart :data="getAssetYearCostTypeData" :headers="getAssetYearCostTypeHeader" v-bind="chartsSetAssetYearCostType" /> 
                    </div> 
                </v-card> 
            </el-col>
        </el-row>

        <el-row :gutter="24">
            <el-col :span="24">
                <v-card>
                    <div class="card-title">
                        Total Item by Year-Month
                    </div>
                    <div class="card-content">
                        <ChartJsStackedChart :data="itemYearMonthData" :headers="itemYearMonthHeader" v-bind="chartsSetItemYearMonth" />
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


    //base
    getAllType() {
        axios.get(
            '/base/asset_type/getAll'
        ).then(
            (res: any) => {
            this.typeItem = res.data.data
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

    // data
    getAssetYearCostDeptData: any = []
    get getAssetYearCostTypeHeader() {
        const header: any = []
        const test = this.getAssetYearCostDeptData.map(x=> {  
            return x.yearMonth
        })
        const xu = [ ...new Set(test) ]
        xu.forEach(r => {
            header.push({
              key: 'costs',
              label: r,
              test: `return row.yearMonth == '${r}'`,
            })
        })
        return header
    }
    get chartsSetAssetYearCostDept() {
        return {
            heigh: 300,
            type: 'bar',
            datasetKey: 'deptName',
            alwaysMultipleDatasets: true,
            fill: true,
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

    itemYearMonthData: any = []
    get itemYearMonthHeader() {
        const header: any = []
        this.itemYearMonthData.reduce((finalRes, r) => {
            header.push({
                key: 'items',
                label: r['yearMonth'],
                test: `return row.yearMonth == '${r['yearMonth']}'`,
            })
        })
        return header
    }
    get chartsSetItemYearMonth() {
        return {
            width: 1600,
            heigh: 900,
            fill: false,
            value: 'items',
            labelData: 'Total Items',
            type: 'line',
        }      
    }

    getAssetYearCostTypeData: any = []
    get chartsSetAssetYearCostType() {
        return {
            heigh: 200,
            type: 'bar',
            datasetKey: 'typeName',
            alwaysMultipleDatasets: true,
            value: 'items',
            label: 'Total Items',
            // colors: '#66ccff',
            fill: true,
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


    goToFind() {
        const [from, to] = this.buyDateForm
        this.serachFrom = {
            ...this.serachFrom,
            buyDateFrom: from,
            buyDateTo: to
        }

        console.log(this.serachFrom)
        this.getAssetYearCostDeptFind()
        this.getAssetYearCostType()
        this.getItemYearMonth()
        
    }

    created() {
        this.getAssetYearCostDeptFind()
        this.getAssetYearCostType()
        this.getItemYearMonth()
        this.getAllType()
        this.getAlldept()
    }

    // charts data
    getAssetYearCostDeptFind() {
        axios.post(
            '/asset/assetList/getAssetYearCostDeptFind',
            this.searchForm
        ).then(
            (res: any) => {
                this.getAssetYearCostDeptData = res.data.data
            }
        )
    }
    getItemYearMonth() {
        axios.post(
            '/asset/assetList/getItemYearMonthFind',
            this.searchForm
        ).then(
            (res: any) => {
                this.itemYearMonthData = res.data.data
            }
        )
    }
    getAssetYearCostType() {
        axios.post(
            '/asset/assetList/getAssetYearCostTypeFind',
            this.searchForm
        ).then(
            (res: any) => {
                this.getAssetYearCostTypeData = res.data.data
            }
        )
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
