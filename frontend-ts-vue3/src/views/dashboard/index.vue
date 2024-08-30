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
                        Total Item by Year-Month
                    </div>
                    <div class="card-content">
                        <ChartJsStackedChart :data="itemYearMonthData" :headers="itemYearMonthHeader" v-bind="chartsSetItemYearMonth" />
                    </div>
                </v-card> 
            </el-col>
        </el-row>

        <el-row :gutter="24">
            <el-col :span="24">
                <v-card>
                    <div class="card-title">
                        Total Costs by Year-Month
                    </div>
                    <div class="card-content">
                        <ChartJsStackedChart :data="getAssetCostYearMonthData" :headers="getAssetCostYearMonthHeader" v-bind="chartsSetAssetCostYearMonth" />
                    </div>
                </v-card> 
            </el-col>
        </el-row>


        <el-row :gutter="24">
            <el-col :span="12">
                <v-card
                    max-width="1700"
                >
                    <div class="card-title">
                        Total Item by type
                    </div>
                    <div class="card-content">
                        <ChartJsStackedChart :data="getAssetGroupTypeData" :headers="getAssetGroupTypeHeader" v-bind="chartsSetAssetGroupType" /> 
                    </div> 
                </v-card> 
            </el-col>
            <el-col :span="12">
                <v-card
                    max-width="1700"
                >
                    <div class="card-title">
                        Total Item by Place
                    </div>
                    <div class="card-content">
                        <ChartJsStackedChart :data="getAssetGroupPlaceData" :headers="getAssetGroupPlaceHeader" v-bind="chartsSetAssetGroupPlace" /> 
                    </div> 
                </v-card> 
            </el-col>
        </el-row>

        <el-row :gutter="24">
            <el-col :span="12">
                <v-card
                    max-width="1700"
                >
                    <div class="card-title">
                        Total Item by Department & year week
                    </div>
                    <div class="card-content">
                        <ChartJsStackedChart :data="getAssetYearQtyDeptData" :headers="getAssetYearQtyDeptHeader" v-bind="chartsSetAssetYearQtyDept" /> 
                    </div> 
                </v-card> 
            </el-col>
            <el-col :span="12">
                <v-card
                    max-width="1700"
                >
                    <div class="card-title">
                        Total Item by Type & year week
                    </div>
                    <div class="card-content">
                        <ChartJsStackedChart :data="getAssetYearQtyTypeData" :headers="getAssetYearQtyTypeHeader" v-bind="chartsSetAssetYearQtyType" /> 
                    </div> 
                </v-card> 
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <v-card
                    max-width="1700"
                >
                    <div class="card-title">
                        Total Item by Place & year week
                    </div>
                    <div class="card-content">
                        <ChartJsStackedChart :data="getAssetYearQtyPlaceData" :headers="getAssetYearQtyPlaceHeader" v-bind="chartsSetAssetYearQtyPlace" /> 
                    </div> 
                </v-card> 
            </el-col>
            <el-col :span="12">
                <v-card
                    max-width="1700"
                >
                    <div class="card-title">
                        Total Cost by Place & year week
                    </div>
                    <div class="card-content">
                        <ChartJsStackedChart :data="getAssetYearCostPlaceData" :headers="getAssetYearCostPlaceHeader" v-bind="chartsSetAssetYearCostPlace" /> 
                    </div> 
                </v-card> 
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <v-card
                    max-width="1700"
                >
                    <div class="card-title">
                        Buy Year-month and Department - Cost
                    </div>
                    <div class="card-content">
                        <ChartJsStackedChart :data="getAssetYearCostDeptData" :headers="getAssetYearCostDeptHeader" v-bind="chartsSetAssetYearCostDept" /> 
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

        
    </div>
</template>

<script lang="ts">
import bus from '../../components/common/bus'
import axios from '../../axios'
import ApexChartOne from '../../components/charts/apex/apexOne.vue'
import ChartJsStackedChart from '@/components/charts/chartJs/StackedChart.vue'

export default {
    components: {
        ApexChartOne,
        ChartJsStackedChart,
    },
    data() {
        return {
            buyDateForm: [],
            searchForm: {},

            //ITEM
            typeItem: [],
            deptItem: [],
            

            getAssetYearCostTypeData: [],
            getAssetYearCostTypeHeader: [],
            chartsSetAssetYearCostType: {
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
                            { 
                                stacked: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Year & Month'
                                }
                            }
                        ],
                        yAxes: [
                            { 
                                stacked: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Cost (HKD)'
                                }
                            }
                        ]
                    }
                }
            },

            getAssetYearCostDeptData: [],
            getAssetYearCostDeptHeader: [],
            chartsSetAssetYearCostDept: {
                    heigh: 300,
                    type: 'bar',
                    datasetKey: 'deptName',
                    alwaysMultipleDatasets: true,
                    fill: true,
                    customChartOptions: {
                        scales: {
                            xAxes: [
                                { 
                                    stacked: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Year & Month'
                                    }
                                }
                            ],
                            yAxes: [
                                { 
                                    stacked: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Cost (HKD)'
                                    }
                                }
                            ]
                        }
                }
            },

            getAssetYearCostPlaceData: [],
            getAssetYearCostPlaceHeader: [],
            chartsSetAssetYearCostPlace: {
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
                                { 
                                    stacked: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Year & Month'
                                    }
                                }
                            ],
                            yAxes: [
                                { 
                                    stacked: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Cost (HKD)'
                                    }
                                }
                            ]
                        }
                    }
            },

            getAssetYearQtyPlaceData: [],
            getAssetYearQtyPlaceHeader: [],
            chartsSetAssetYearQtyPlace: {
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
                            { 
                                stacked: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Year & Month'
                                }
                            }
                        ],
                        yAxes: [
                            { 
                                stacked: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'PCS'
                                }
                            }
                        ]
                    }
                }
            },

            getAssetYearQtyTypeData: [],
            getAssetYearQtyTypeHeader: [],
            chartsSetAssetYearQtyType: {
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
                            { 
                                stacked: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Year & Month'
                                }
                            }
                        ],
                        yAxes: [
                            { 
                                stacked: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'PCS'
                                }
                            }
                        ]
                    }
                }
            },

            getAssetYearQtyDeptData: [],
            getAssetYearQtyDeptHeader: [],
            chartsSetAssetYearQtyDept: {
                    heigh: 300,
                    type: 'bar',
                    datasetKey: 'deptName',
                    alwaysMultipleDatasets: true,
                    fill: true,
                    customChartOptions: {
                        scales: {
                            xAxes: [
                                { 
                                    stacked: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Year & Month'
                                    }
                                }
                            ],
                            yAxes: [
                                { 
                                    stacked: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'PCS'
                                    }
                                }
                            ]
                        }
                }
            },

            getAssetGroupPlaceData: [],
            getAssetGroupPlaceHeader: [],
            chartsSetAssetGroupPlace: {
                    heigh: 300,
                    type: 'bar',
                    datasetKey: 'placeName',
                    alwaysMultipleDatasets: true,
                    fill: true,
                    customChartOptions: {
                        scales: {
                            xAxes: [
                                { 
                                    stacked: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Year & Month'
                                    }
                                }
                            ],
                            yAxes: [
                                { 
                                    stacked: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'PCS'
                                    }
                                }
                            ]
                        }
                }
            },

            getAssetGroupTypeData: [],
            getAssetGroupTypeHeader: [],
            chartsSetAssetGroupType: {
                width: 600,
                heigh: 200,
                type: 'bar',
                // datasetKey: 'typeName',
                labelData: 'Total Items',
                // colors: '#a1d41b',
            },

            getAssetCostYearMonthData: [],
            getAssetCostYearMonthHeader: [],
            chartsSetAssetCostYearMonth: {
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
            },

            itemYearMonthData: [],
            itemYearMonthHeader: [],
            chartsSetItemYearMonth: {
                width: 1500,
                heigh: 900,
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
    },
    created() {
        this.getAssetYearCostDeptFind()
        this.getAssetYearCostType()
        this.getAssetYearCostPlaceFind()
        this.getAssetYearQtyPlaceFind()
        this.getAssetYearQtyTypeFind()
        this.getAssetYearQtyDeptDataFind()
        this.groupByPlaceFind()
        this.groupByTypeFind()
        this.getAssetCostYearMonthFind()
        this.getItemYearMonth()

        this.getAllType()
        this.getAlldept()
    },
    methods: {
        getGetAssetYearCostTypeHeader() {
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
        },
        getGetAssetYearCostDeptHeader() {
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
        },
        getGetAssetYearCostPlaceHeader() {
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
        },
        getGetAssetYearQtyPlaceHeader() {
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
        },
        getGetAssetYearQtyTypeHeader() {
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
        },
        getGetAssetYearQtyDeptHeader() {
            const header: any = []
            const test = this.getAssetYearQtyDeptData.map(x=> {  
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
        },
        getGetAssetGroupPlaceHeader() {
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
        },
        getGetAssetGroupTypeHeader() {
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
        },
        getGetAssetCostYearMonthHeader() {
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
        },
        getGetItemYearMonthHeader() {
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
        },
        


        getAssetYearCostDeptFind() {
            axios.post(
                '/asset/assetList/getAssetYearCostDeptFind',
                this.searchForm
            ).then(
                (res: any) => {
                    this.getAssetYearCostDeptData = res.data.data
                    this.getAssetYearCostDeptHeader = this.getGetAssetYearCostDeptHeader()
                }
            )
        },
        getAssetYearCostType() {
            axios.post(
                '/asset/assetList/getAssetYearCostTypeFind',
                this.searchForm
            ).then(
                (res: any) => {
                    this.getAssetYearCostTypeData = res.data.data
                    this.getAssetYearCostTypeHeader = this.getGetAssetYearCostTypeHeader()
                }
            )
        },
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
                    this.getAssetYearCostPlaceHeader = this.getGetAssetYearCostPlaceHeader()
                }
            )
        },
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
                    this.getAssetYearQtyPlaceHeader = this.getGetAssetYearQtyPlaceHeader()
                }
            )
        },
        getAssetYearQtyTypeFind() {
            axios.post(
                '/asset/assetList/getAssetYearQtyTypeFind',
                this.searchForm
            ).then(
                (res: any) => {
                    this.getAssetYearQtyTypeData = res.data.data
                    this.getAssetYearQtyTypeHeader = this.getGetAssetYearQtyTypeHeader()
                }
            )
        },
        getAssetYearQtyDeptDataFind() {
            axios.post(
                '/asset/assetList/getAssetYearQtyDeptFind',
                this.searchForm
            ).then(
                (res: any) => {
                    this.getAssetYearQtyDeptData = res.data.data
                    this.getAssetYearQtyDeptHeader = this.getGetAssetYearQtyDeptHeader()
                }
            )
        },
        groupByPlaceFind() {
            axios.post(
                '/asset/assetList/getAssetGroupPlaceFind',
                this.searchForm
            ).then(
                (res: any) => {
                    this.getAssetGroupPlaceData = res.data.data
                    this.getAssetGroupPlaceHeader = this.getGetAssetGroupPlaceHeader()
                }
            )
        },
        groupByTypeFind() {
            axios.post(
                '/asset/assetList/groupByTypeFind',
                this.searchForm
            ).then(
                (res: any) => {
                    this.getAssetGroupTypeData = res.data.data
                    this.getAssetGroupTypeHeader = this.getGetAssetGroupTypeHeader()
                }
            )
        },
        getAssetCostYearMonthFind() {
            axios.post(
                '/asset/assetList/getAssetCostYearMonthFind',
                this.searchForm
            ).then(
                (res: any) => {
                    this.getAssetCostYearMonthData = res.data.data
                    this.getAssetCostYearMonthHeader = this.getGetAssetCostYearMonthHeader()
                }
            )
        },
        getItemYearMonth() {
            axios.post(
                '/asset/assetList/getItemYearMonthFind',
                this.searchForm
            ).then(
                (res: any) => {
                    this.itemYearMonthData = res.data.data
                    this.itemYearMonthHeader = this.getGetItemYearMonthHeader()
                }
            )
        },


        getAllType() {
            axios.get(
                '/base/asset_type/getAll'
            ).then(
                (res: any) => {
                this.typeItem = res.data.data
            })
        },
        getAlldept() {
            axios.get(
                '/base/department/getAll'
            ).then(
                (res: any) => {
                this.deptItem = res.data.data
            })
        },
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
