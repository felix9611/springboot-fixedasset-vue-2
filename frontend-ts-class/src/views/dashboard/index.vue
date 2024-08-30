<template>
    <div class="p-4 flex grid-cols-1 grid md:grid-cols-1 lg:grid-cols-10 gap-3">
        <el-row :gutter="30" class="shadow-lg rounded-lg bg-white pt-6 md:col-span-full lg:col-span-full">
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
                    <el-col :span="30">
                        <el-form-item label="Type" prop="type" label-width="60px">
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
                    <el-col :span="30">
                        <el-form-item label="Department" label-width="100px">
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
                    <el-col :span="30">
                        <el-form-item>
                            <el-button type="primary" @click="goToFind()">Find</el-button>
                        </el-form-item>
                    </el-col>
            </el-form>
            </el-row>

            <div class="lg:col-span-full shadow-lg rounded-lg bg-white">
                <div class="font-bold p-1">
                    Total Item by Year-Month
                </div>
                <div class="p-1">
                    <ChartJsStackedChart class="max-h-[300px]" :data="itemYearMonthData" :headers="itemYearMonthHeader" v-bind="chartsSetItemYearMonth" />
                </div>
            </div>

            <div class="lg:col-span-full shadow-lg rounded-lg bg-white">
                <div class="font-bold p-1">
                    Total Costs by Year-Month
                </div>
                <div class="p-1">
                    <ChartJsStackedChart :data="getAssetCostYearMonthData" :headers="getAssetCostYearMonthHeader" v-bind="chartsSetAssetCostYearMonth" />
                </div>
            </div>

            <div class="lg:col-span-5 shadow-lg rounded-lg bg-white">
                <div class="font-bold p-1">
                    Total Item by type
                </div>
                <div class="p-1">
                    <ChartJsStackedChart :data="getAssetGroupTypeData" :headers="getAssetGroupTypeHeader" v-bind="chartsSetAssetGroupType" /> 
                </div>
            </div>

            <div class="lg:col-span-5 shadow-lg rounded-lg bg-white">
                <div class="font-bold p-1">
                    Total Item by Place
                </div>
                <div class="p-1">
                    <ChartJsStackedChart :data="getAssetGroupPlaceData" :headers="getAssetGroupPlaceHeader" v-bind="chartsSetAssetGroupPlace" /> 
                </div>
            </div>

            <div class="lg:col-span-5 shadow-lg rounded-lg bg-white">
                <div class="font-bold p-1">
                    Total Item by Department & year week
                </div>
                <div class="p-1">
                    <ChartJsStackedChart :data="getAssetYearQtyDeptData" :headers="getAssetYearQtyTypeHeader" v-bind="chartsSetAssetYearQtyDept" /> 
                </div>
            </div>

            <div class="lg:col-span-5 shadow-lg rounded-lg bg-white">
                <div class="font-bold p-1">
                    Total Item by Type & year week
                </div>
                <div class="p-1">
                    <ChartJsStackedChart :data="getAssetYearQtyTypeData" :headers="getAssetYearQtyTypeHeader" v-bind="chartsSetAssetYearQtyType" /> 
                </div>
            </div>

            <div class="lg:col-span-5 shadow-lg rounded-lg bg-white">
                <div class="font-bold p-1">
                    Total Item by Place & year week
                </div>
                <div class="p-1">
                    <ChartJsStackedChart :data="getAssetYearQtyPlaceData" :headers="getAssetYearQtyPlaceHeader" v-bind="chartsSetAssetYearQtyPlace" /> 
                </div>
            </div>

            <div class="lg:col-span-5 shadow-lg rounded-lg bg-white">
                <div class="font-bold p-1">
                    Total Cost by Place & year week
                </div>
                <div class="p-1">
                    <ChartJsStackedChart :data="getAssetYearCostPlaceData" :headers="getAssetYearCostPlaceHeader" v-bind="chartsSetAssetYearCostPlace" /> 
                </div>
            </div>

            <div class="lg:col-span-5 shadow-lg rounded-lg bg-white">
                <div class="font-bold p-1">
                    Buy Year-month and Department - Cost
                </div>
                <div class="p-1">
                    <ChartJsStackedChart :data="getAssetYearCostDeptData" :headers="getAssetYearCostTypeHeader" v-bind="chartsSetAssetYearCostDept" /> 
                </div>
            </div>

            <div class="lg:col-span-5 shadow-lg rounded-lg bg-white">
                <div class="font-bold p-1">
                    Buy Year-month and Type - Cost
                </div>
                <div class="p-1">
                    <ChartJsStackedChart :data="getAssetYearCostTypeData" :headers="getAssetYearCostDeptHeader" v-bind="chartsSetAssetYearCostType" /> 
                </div>
            </div>
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
    get getAssetYearCostDeptHeader() {
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
        const test = this.getAssetYearCostDeptData.map(x=> {  
            return x.yearMonth
        })
        const xu = [ ...new Set(test) ]
        xu.forEach(r => {
            header.push({
              key: 'items',
              label: r,
              test: `return row.yearMonth == '${r}'`,
            })
        })
        return header
    }
    get chartsSetItemYearMonth() {
        return {
            width: 1500,
            heigh: 200,
            fill: false,
            value: 'items',
            labelData: 'Total Items',
            type: 'line',
            customChartOptions: {
                scales: {
                    xAxes: [
                    { 
                        stacked: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }
                    ],
                    yAxes: [
                    { 
                        stacked: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }
                    ]
                }
            }
        }      
    }

    getAssetYearCostTypeData: any = []
    get getAssetYearCostTypeHeader() {
        const header: any = []
        const test = this.getAssetYearCostTypeData.map(x=> {  
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
    get chartsSetAssetYearCostType() {
        return {
            height: 300,
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

    getAssetGroupTypeData: any = []
    get getAssetGroupTypeHeader() {
       const header: any = []
        const test = this.getAssetGroupTypeData.map(x=> {  
            return x.typeName
        })
        const xu = [ ...new Set(test) ]
        xu.forEach(r => {
            header.push({
              key: 'items',
              label: r,
              test: `return row.typeName == '${r}'`,
            })
        })
        return header
    }
    get chartsSetAssetGroupType() {
        return {
            width: 600,
            heigh: 200,
            type: 'bar',
            // datasetKey: 'typeName',
            labelData: 'Total Items',
            // colors: '#a1d41b',

        }
    }

    getAssetGroupPlaceData: any = []
    get getAssetGroupPlaceHeader() {
        const header: any = []
        const test = this.getAssetGroupPlaceData.map(x=> {  
            return x.placeName
        })
        const xu = [ ...new Set(test) ]
        xu.forEach(r => {
            header.push({
              key: 'items',
              label: r,
              test: `return row.placeName == '${r}'`,
            })
        })
        return header
    }
    get chartsSetAssetGroupPlace() {
        return {
            width: 600,
            heigh: 200,
            type: 'bar',
            // datasetKey: 'typeName',
            labelData: 'Total Items',
            // colors: '#a1d41b',

        }
    }

    getAssetYearQtyTypeData: any = []
    get getAssetYearQtyTypeHeader() {
        const header: any = []
        const test = this.getAssetYearQtyTypeData.map(x=> {  
            return x.yearMonth
        })
        const xu = [ ...new Set(test) ]
        xu.forEach(r => {
            header.push({
              key: 'items',
              label: r,
              test: `return row.yearMonth == '${r}'`,
            })
        })
        return header
    }
    get chartsSetAssetYearQtyType() {
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


    getAssetYearQtyDeptData: any = []
    get chartsSetAssetYearQtyDept() {
        return {
            heigh: 200,
            type: 'bar',
            datasetKey: 'deptName',
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

    getAssetCostYearMonthData: any = []
    get chartsSetAssetCostYearMonth() {
        return {
            width: 1500,
            heigh: 200,
            type: 'line',
            alwaysMultipleDatasets: true,
            value: 'costs',
            labelData: 'Total Cost',
            fill: false,
            customChartOptions: {
                scales: {
                    xAxes: [
                    { 
                        stacked: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }
                    ],
                    yAxes: [
                    { 
                        stacked: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }
                    ]
                }
            }
        }
    }
    get getAssetCostYearMonthHeader() {
        const header: any = []
        const test = this.getAssetCostYearMonthData.map(x=> {  
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
    


    getAssetYearQtyPlaceData: any = []
    get chartsSetAssetYearQtyPlace() {
        return {
            heigh: 200,
            type: 'bar',
            datasetKey: 'placeName',
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
    get getAssetYearQtyPlaceHeader() {
        const header: any = []
        const test = this.getAssetYearQtyPlaceData.map(x=> {  
            return x.yearMonth
        })
        const xu = [ ...new Set(test) ]
        xu.forEach(r => {
            header.push({
              key: 'items',
              label: r,
              test: `return row.yearMonth == '${r}'`,
            })
        })
        return header
    }

    getAssetYearCostPlaceData: any = []
    get chartsSetAssetYearCostPlace() {
        return {
            heigh: 200,
            type: 'bar',
            datasetKey: 'placeName',
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
    get getAssetYearCostPlaceHeader() {
        const header: any = []
        const test = this.getAssetYearCostPlaceData.map(x=> {  
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

    goToFind() {
        const [from, to] = this.buyDateForm
        this.searchForm = {
            ...this.searchForm,
            buyDateFrom: from,
            buyDateTo: to
        }
        this.getItemYearMonth()
        this.getAssetYearCostDeptFind()
        this.getAssetYearCostType()
        this.groupByTypeFind()
        this.groupByPlaceFind()
        this.getAssetYearQtyTypeFind()
        this.getAssetYearQtyDeptDataFind()
        this.getAssetCostYearMonthFind()
        this.getAssetYearQtyPlaceFind()
        this.getAssetYearCostPlaceFind()
    }

    created() {
        this.getItemYearMonth()
        this.getAssetYearCostDeptFind()
        this.getAssetYearCostType()
        this.groupByTypeFind()
        this.groupByPlaceFind()
        this.getAssetYearQtyTypeFind()
        this.getAssetYearQtyDeptDataFind()
        this.getAssetCostYearMonthFind()
        this.getAssetYearQtyPlaceFind()
        this.getAssetYearCostPlaceFind()

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
    groupByTypeFind() {
        axios.post(
            '/asset/assetList/groupByTypeFind',
            this.searchForm
        ).then(
            (res: any) => {
                this.getAssetGroupTypeData = res.data.data
            }
        )
    }
    groupByPlaceFind() {
        axios.post(
            '/asset/assetList/getAssetGroupPlaceFind',
            this.searchForm
        ).then(
            (res: any) => {
                this.getAssetGroupPlaceData = res.data.data
            }
        )
    }
    getAssetYearQtyTypeFind() {
        axios.post(
            '/asset/assetList/getAssetYearQtyTypeFind',
            this.searchForm
        ).then(
            (res: any) => {
                this.getAssetYearQtyTypeData = res.data.data
            }
        )
    }

    getAssetYearQtyDeptDataFind() {
        axios.post(
            '/asset/assetList/getAssetYearQtyDeptFind',
            this.searchForm
        ).then(
            (res: any) => {
                this.getAssetYearQtyDeptData = res.data.data
            }
        )
    }

    getAssetCostYearMonthFind() {
        axios.post(
            '/asset/assetList/getAssetCostYearMonthFind',
            this.searchForm
        ).then(
            (res: any) => {
                this.getAssetCostYearMonthData = res.data.data
            }
        )
    }

    getAssetYearQtyPlaceFind() {
        axios.post(
            '/asset/assetList/getAssetYearQtyPlaceFind',
            this.searchForm
        ).then(
            (res: any) => {
                this.getAssetYearQtyPlaceData = res.data.data
                this.getAssetYearQtyPlaceData.map(
                    _res => {
                        _res['yearMonth'] = `${_res.years}-${_res.months}`
                    }
                )
            }
        )
    }

    getAssetYearCostPlaceFind() {
        axios.post(
            '/asset/assetList/getAssetYearCostPlaceFind',
            this.searchForm
        ).then(
            (res: any) => {
                this.getAssetYearCostPlaceData = res.data.data
                this.getAssetYearCostPlaceData.map(
                    _res => {
                        _res['yearMonth'] = `${_res.years}-${_res.months}`
                    }
                )
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
