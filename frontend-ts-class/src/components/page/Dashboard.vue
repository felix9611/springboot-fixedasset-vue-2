<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info-list">
                        <span  style="margin: 0px;">Felix</span>
                    </div>
                    <div>
                        FixedAsset - Springboot MVC X VUE 2.0
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-card shadow="hover" class="mgb20" >
                    <ApexChartOne 
                        :width="1600"
                        :height="400"
                        :type="'line'"
                        :chartOptions="chartsO"
                        :data="costYearMonthData"
                        :headers="costYearMonthDataHeader"
                        datasetKey="yearMonth"
                        :alwaysMultipleDatasets="true"
                        label="Total Cost"
                        value="totalCost"
                    />
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import Schart from 'vue-schart'
import bus from '../../components/common/bus'
import axios from '../../axios'
import { Component, Vue } from 'vue-property-decorator'
import ApexChartOne from '../../components/charts/apex/apexOne.vue'

@Component({
    components: {
        Schart,
        ApexChartOne
    }
})
export default class Dashboard extends Vue {

    costYearMonthData: any = []
    costYearMonthDataHeader: any = []

    get chartsO() {
        return {
            stroke: {
                curve: 'smooth'
            },
            chart: {
                toolbar: {
                    show: true
                },
            }
        }
    }

    created() {
        this.getCostYearMonth()
    }

    getCostYearMonth() {
        axios.get(
            '/asset/assetList/getCostYearMonth'
        ).then(
            (res: any) => {
                this.costYearMonthData = res.data.data
                // console.log(this.costYearMonthData)
                this.costYearMonthDataHeader = this.costYearMonthData.map( res=> {
                    const headers: any = []
                    headers.push({
                        key: 'totalCost',
                        label: res['yearMonth'],
                        test: `return row['yearMonth'] === '${res['yearMonth']}';`
                    })
                    return headers
                })
            }
        )
    }

    name = localStorage.getItem('ms_username')
    
    todoList = [
                {
                    title: '路由管理、动态路由、标签页管理',
                    status: true
                },
                {
                    title: '登录权限认证（基于JWT、SpringSecurity）',
                    status: true
                },
                {
                    title: '用户权限分配',
                    status: true
                },
                {
                    title: '菜单管理、用户管理、角色管理',
                    status: true
                },
                {
                    title: '基于此权限系统进一步开发后台管理系统',
                    status: false
                }
    ]
    data = [
                {
                    name: '2018/09/04',
                    value: 1083
                },
                {
                    name: '2018/09/05',
                    value: 941
                },
                {
                    name: '2018/09/06',
                    value: 1139
                },
                {
                    name: '2018/09/07',
                    value: 816
                },
                {
                    name: '2018/09/08',
                    value: 327
                },
                {
                    name: '2018/09/09',
                    value: 228
                },
                {
                    name: '2018/09/10',
                    value: 1065
                }
            ]

    changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item: any, index: any) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            })
    }
    
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
