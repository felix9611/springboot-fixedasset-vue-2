<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20">
                    <div class="user-info-list">
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
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card shadow="hover" class="mgb20">
                    <!--<ApexChartOne 
                        v-bind="chartsSetA"
                    />-->
                    <ChartJs v-bind="chartsSetA1" />
                </el-card>
            </el-col>
        </el-row>
        <!--<el-row :gutter="24">
            <el-col :span="24">
                <el-card shadow="hover" class="mgb20" >
                    <ApexChartOne 
                        v-bind="chartsSetB"
                    />
                </el-card>
            </el-col>
        </el-row>-->
        <el-row :gutter="24">
            <el-col :span="24">
                <el-card shadow="hover" class="mgb20" >
                    <div>
                        Buy Date & Cost (By year-month)
                    </div>
                    <div style="height: 1%;">
                        <ChartJs v-bind="chartsSetC1" />
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-card shadow="hover" class="mgb20" >
                    <div>
                        Buy Date & Items (By year-month)
                    </div>
                    <div style="height: 1%;">
                        <ChartJs v-bind="chartsSetC2" />
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-card shadow="hover" class="mgb20" >
                    <div>
                        Group By Department
                    </div>
                    <div style="height: 1%;">
                        <ChartJs v-bind="chartsSetD" />
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover" class="mgb20" >
                    <div>
                        Group By Location
                    </div>
                    <div style="height: 1%;">
                        <ChartJs v-bind="chartsSetE" />
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import bus from '../../components/common/bus'
import axios from '../../axios'
import { Component, Vue } from 'vue-property-decorator'
import ApexChartOne from '../../components/charts/apex/apexOne.vue'
import ChartJs from '../../components/charts/chartJs/index.vue'

@Component({
    components: {
        ApexChartOne,
        ChartJs
    }
})
export default class Dashboard extends Vue {

    costYearMonthData: any = []
    itemYearMonthData: any = []
    getAssetGroupTypeData: any = []
    getAssetGroupDeptData: any = []
    getAssetGroupPlaceData: any = []

    groupChartOption = [
        {
            key: 'groupByType',
            data: this.getAssetGroupTypeData,
            datasetKey: 'typeName',
            
        },
        {
            key: 'groupByDept',
            data: this.getAssetGroupDeptData,
            datasetKey: 'deptName'
        },
        {
            key: 'groupByPlace',
            data: this.getAssetGroupPlaceData,
            datasetKey: 'deptName'
        }
    ]

    get chartsSetA() {
        return {
            width: 1000,
            heigh: 450,
            datasetKey: 'typeName',
            value: 'items',
            label: 'Total Items',
            type: 'bar',
            chartOptions: {
                stroke: {
                curve: 'smooth'
                },
                chart: {
                    toolbar: {
                        show: true
                    },
                },
                title: {
                    text: 'Group By Type',
                    align: 'left'
                },
                yaxis: {
                    title: {
                        text: 'Item'
                    }
                },
                dataLabels: {
                enabled: false
                }
            },
            data: this.getAssetGroupTypeData
        }
    }

    get chartsSetA1() {
        return {
            width: 1000,
            heigh: 450,
            type: 'bar',
            datasetKey: 'typeName',
            value: 'items',
            data: this.getAssetGroupTypeData,
            label: 'Total Items',
            colors: '#a1d41b'
        }
    }

    get chartsSetB() {
        return {
            width: 1600,
            heigh: 450,
            datasetKey: 'yearMonth',
            value: 'totalCost',
            label: 'Total Cost(HKD)',
            type: 'line',
            chartOptions: {
                stroke: {
                    curve: 'smooth'
                },
                chart: {
                    toolbar: {
                        show: true
                    },
                },
                title: {
                    text: 'Buy Date & Cost (By year-month)',
                    align: 'left'
                },
                yaxis: {
                    title: {
                        text: 'Cost(HKD)'
                    }
                }
            },
            data: this.costYearMonthData
        }
    }

    get chartsSetC1() {
        return {
            width: 1600,
            heigh: 450,
            type: 'line',
            datasetKey: 'yearMonth',
            value: 'totalCost',
            label: 'Total Cost($)',
            data: this.costYearMonthData,
            colors: '#00CCCC'
        }
    }

    get chartsSetC2() {
        return {
            width: 1600,
            heigh: 450,
            type: 'line',
            datasetKey: 'yearMonth',
            value: 'items',
            label: 'Total Items',
            data: this.itemYearMonthData,
            colors: '#00CCCC'
        }
    }

    get chartsSetD() {
        return {
            type: 'bar',
            datasetKey: 'deptName',
            value: 'items',
            data: this.getAssetGroupDeptData,
            label: 'Total Items',
            colors: '#66ccff'
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
    created() {
        this.getCostYearMonth()
        this.groupByTypeWithAsset()
        this.getAssetGroupDept()
        this.getAssetGroupPlace()
        this.getItemYearMonth()
    }

    getAssetGroupPlace() {
        axios.get(
            '/asset/assetList/getAssetGroupPlace'
        ).then(
            (res: any) => {
                this.getAssetGroupPlaceData = res.data.data
                console.log(this.getAssetPlaceypeData)
            }
        )
    }

    getAssetGroupDept() {
        axios.get(
            '/asset/assetList/getAssetGroupDept'
        ).then(
            (res: any) => {
                this.getAssetGroupDeptData = res.data.data
                console.log(this.getAssetGroupDeptData)
            }
        )
    }

    groupByTypeWithAsset() {
         axios.get(
            '/asset/assetList/groupByType'
        ).then(
            (res: any) => {
                this.getAssetGroupTypeData = res.data.data
                console.log(this.getAssetGroupTypeData)
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

    name = localStorage.getItem('ms_username')
    
    
    get role() {
        return 'Felix'
    }
}
</script>


<style scoped>
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

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
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
