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
import ApexChartOne from '@/components/charts/apex/apexOne.vue'
import ChartJs from '@/components/charts/chartJs/index.vue'
import ChartJsStackedChart from '@/components/charts/chartJs/StackedChart.vue'
export default {
    components: {
        ApexChartOne,
        ChartJs,
        ChartJsStackedChart
    },
    created() {
        this.getCostWithDept()
        this.name = localStorage.getItem('ms_username')
    },
    data() {
        return {
            getCostWithDeptData: [],
            name: '',
            role: 'Felix'
        }
    },
    methods: {
        getCostWithDept() {
            axios.get(
                '/asset/assetList/getCostWithDept'
            ).then(
                (res: any) => {
                    this.getCostWithDeptData = res.data.data
                }
            )
        }
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
