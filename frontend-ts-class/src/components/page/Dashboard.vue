<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="8">
                <v-card
                    max-width="500"
                >
                    <div class="user-card">
                        <div class="user-info-list-1">
                            <span  style="margin: 0px;">Felix</span>
                        </div>
                        <div>
                            FixedAsset - Springboot MVC X VUE 2.0
                        </div>
                        <br>
                        <br>
                        <div>
                            Testing any charts
                        </div> 
                    </div> 
                </v-card>
            </el-col>
            <el-col :span="16">
                <v-card
                    max-width="1200"
                >
                    <div class="card-title">
                        Total Item by Department
                    </div>
                    <div class="card-content">
                        <ChartJsStackedChart :data="getAssetGroupTypeData" :headers="getAssetGroupTypeHeader" v-bind="chartsSetA1" /> 
                        <!--<ChartJs v-bind="chartsSetA1" /> -->
                    </div> 
                </v-card>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <v-card
                    max-width="1000"
                >
                    <div class="card-title">
                        Group By Department
                    </div>
                    <div class="card-content">
                        <ChartJs v-bind="chartsSetDe" /> 
                    </div> 
                </v-card> 
            </el-col>
            <el-col :span="12">
                <v-card
                    max-width="1000"
                >
                    <div class="card-title">
                        Group By Location
                    </div>
                    <div class="card-content">
                        <ChartJs v-bind="chartsSetE" /> 
                    </div> 
                </v-card> 
            </el-col>
        </el-row>

        <el-row :gutter="24">
            <el-col :span="24">
                <v-card
                    max-width="1700"
                >
                    <div class="card-title">
                        Group By Location
                    </div>
                    <div class="card-content">
                        <ChartJs v-bind="chartsSetC2" /> 
                    </div> 
                </v-card> 
            </el-col>
        </el-row>

        <el-row :gutter="24">
            <el-col :span="24">
                <v-card
                    max-width="1700"
                >
                    <div class="card-title">
                        Buy Year-month and Type - Items
                    </div>
                    <div class="card-content">
                        <ChartJsStackedChart :data="getAssetYearQtyTypeData" :headers="getAssetYearQtyTypeHeader" v-bind="chartsSetD" /> 
                    </div> 
                </v-card> 
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="24">
                <v-card
                    max-width="1700"
                >
                    <div class="card-title">
                        Buy Year-month and Type - Cost
                    </div>
                    <div class="card-content">
                        <ChartJsStackedChart :data="getAssetYearCostTypeData" :headers="getAssetYearCostTypeHeader" v-bind="chartsSetD" /> 
                    </div> 
                </v-card> 
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <div v-for="item in getCostWithDeptData" :key="item.deptName">
                    <template>
                        <el-col :span="getCostWithDeptData.length - 1">
                            <v-card
                                class="mgb20-score"
                                max-width="500"
                            >
                                <div class="card-content-score">
                                    <div style="text-align: center;font-size: 2rem;color: midnightblue;">
                                        {{ item.deptName }}
                                    </div>
                                    <div style="text-align: center;padding-top: 10%;font-size: 1.6rem;color: midnightblue;">
                                        Used Cost
                                    </div>
                                    <div style="text-align: center;padding-top: 10%;font-size: 1.6rem;color: midnightblue;">
                                        HKD ${{ item.totalCost }}
                                    </div>    
                                </div>
                            </v-card> 
                        </el-col>    
                </template>              
            </div>
        </el-row>  
    </div>
</template>

<script lang="ts">
import bus from '@/components/common/bus'
import axios from '@/axios'
import { Component, Vue } from 'vue-property-decorator'
import ApexChartOne from '@/components/charts/apex/apexOne.vue'
import ChartJs from '@/components/charts/chartJs/index.vue'
import ChartJsStackedChart from '@/components/charts/chartJs/StackedChart.vue'

@Component({
    components: {
        ApexChartOne,
        ChartJs,
        ChartJsStackedChart
    }
})
export default class Dashboard extends Vue {

    groupByFind: any = {}

    costYearMonthData: any = []
    itemYearMonthData: any = []
    getAssetGroupTypeData: any = []
    getAssetGroupDeptData: any = []
    getAssetGroupPlaceData: any = []
    getCostWithDeptData: any = []
    getAssetYearQtyTypeData: any = []
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

    get getAssetGroupTypeHeader() {
        const header: any = []
        this.getAssetGroupTypeData.reduce((finalRes, r) => {
            header.push({
              key: 'items',
              label: r['typeName'],
              test: `return row.typeName == '${r['typeName']}'`,
            })
        })
        return header
    }

    get chartsSetA1() {
        return {
            width: 1000,
            heigh: 90,
            type: 'bar',
            // datasetKey: 'typeName',
            labelData: 'Total Items',
            colors: '#a1d41b',

        }
    }

    get itemYearMonthHeader() {
        const header: any = []
        this.itemYearMonthData.reduce((finalRes, r) => {
            header.push({
              key: 'items',
              label: r['yearMonth'],
              test: `return row.typeName == '${r['yearMonth']}'`,
            })
        })
        return header
    }

    get chartsSetC2() {
        return {
            width: 1600,
            heigh: 90,
            datasetKey: 'yearMonth',
            value: 'items',
            label: 'Total Items',
            type: 'line',
            colors: '#ff4d88',
            data: this.itemYearMonthData,
            pluginsOption: {
                datalabels: {
                    display: false
                }
            }
        }      
    }

    

    get chartsSetDe() {
        return {
            type: 'bar',
            datasetKey: 'deptName',
            value: 'items',
            data: this.getAssetGroupDeptData,
            label: 'Total Items',
            colors: '#66ccff'
        }
    }

    get chartsSetD() {
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

    get chartsSetE() {
        return {
            type: 'bar',
            datasetKey: 'placeName',
            value: 'items',
            data: this.getAssetGroupPlaceData,
            label: 'Total Items',
            colors: '#ff9966'
        }
    }

    get chartsSetF() {
        return {
            type: 'bar',
            datasetKey: 'deptName',
            value: 'totalCost',
            data: this.getCostWithDeptData,
            label: 'Total Cost',
            colors: '#ff9966'
        }
    }

    created() {
        this.getCostYearMonth()
        this.groupByTypeWithAsset()
        this.getAssetGroupDept()
        this.getAssetGroupPlace()
        this.getItemYearMonth()
        this.getCostWithDept()
        this.getAssetYearQtyType()
        this.getAssetYearCostType()
    }

    getCostWithDept() {
        axios.get(
            '/asset/assetList/getCostWithDept'
        ).then(
            (res: any) => {
                this.getCostWithDeptData = res.data.data
            }
        )
    }

    getAssetGroupPlace() {
        axios.get(
            '/asset/assetList/getAssetGroupPlace'
        ).then(
            (res: any) => {
                this.getAssetGroupPlaceData = res.data.data
            }
        )
    }

    getAssetGroupDept() {
        axios.get(
            '/asset/assetList/getAssetGroupDept'
        ).then(
            (res: any) => {
                this.getAssetGroupDeptData = res.data.data
            }
        )
    }

    groupByTypeWithAsset() {
         axios.get(
            '/asset/assetList/groupByType'
        ).then(
            (res: any) => {
                this.getAssetGroupTypeData = res.data.data
            }
        )
    }

    getCostYearMonth() {
        axios.get(
            '/asset/assetList/getCostYearMonth'
        ).then(
            (res: any) => {
                this.costYearMonthData = res.data.data
            }
        )
    }

    getItemYearMonth() {
        axios.get(
            '/asset/assetList/getItemYearMonth'
        ).then(
            (res: any) => {
                this.itemYearMonthData = res.data.data
            }
        )
    }

    getAssetYearQtyType() {
        axios.get(
            '/asset/assetList/getAssetYearQtyType'
        ).then(
            (res: any) => {
                this.getAssetYearQtyTypeData = res.data.data
            }
        )
    }

    getAssetYearCostType() {
        axios.get(
            '/asset/assetList/getAssetYearCostType'
        ).then(
            (res: any) => {
                this.getAssetYearCostTypeData = res.data.data
            }
        )
    }

    

    name = localStorage.getItem('ms_username')

    get role() {
        return 'Felix'
    }
}
</script>


<style scoped>
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
