<template>
    <div class="container">

        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                border
                stripe
                @selection-change="handleSelectionChange">
            <el-table-column
                    prop="actionName"
                    label="Action Name"
                    width="120">
            </el-table-column>
            <el-table-column
              prop="actionMethod"
              label="Action Method"
              width="120">
            </el-table-column>
            <el-table-column
              prop="actionFrom"
              label="Action From"
              width="160">
            </el-table-column>
            <el-table-column
              prop="actionData"
              label="Action Data">
            </el-table-column>
            <el-table-column
              prop="actionSuccess"
              label="Action Success"
              width="160">
            </el-table-column>
            <el-table-column
                    prop="created"
                    width="200"
                    label="Created At"
            >
            </el-table-column>

        </el-table>

        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes, prev, pager, next, jumper"
                :page-sizes="[10, 20, 50, 100]"
                :current-page="searchForm.page"
                :page-size="searchForm.limit"
                :total="total">
        </el-pagination>


        <!--新增对话框-->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="700px"
                :before-close="handleClose">

            <el-form :model="editForm" :rules="editFormRules" ref="editForm">

                <el-form-item label="Department Code"  prop="deptCode" label-width="100px">
                    <el-input v-model="editForm.deptCode" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Department Name"  prop="deptName" label-width="100px">
                    <el-input v-model="editForm.deptName" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="Other Name"  prop="deptOtherName" label-width="100px">
                    <el-input type="textarea" v-model="editForm.deptOtherName"></el-input>
                </el-form-item>

                <!-- <el-form-item label="Test">
                    <el-select v-model="value" placeholder="Select">
                        <el-option
                        v-for="item in placeItem"
                        :key="item.id"
                        :label="item.placeName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item> -->

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('editForm')">Cancel</el-button>
                <el-button type="primary" @click="submitForm('editForm')">OK</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from '../../../axios'

export default Vue.extend({
        name: 'ActionLog',
        data() {
            return {
                searchForm: {
                    limit: 10,
                    page: 1
                },
                delBtlStatu: true,

                total: 0,
                size: 10,
                current: 1,

                dialogVisible: false,
                editForm: {
                    id: null
                },

                tableData: [],
                roleDialogFormVisible: false,
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                treeCheckedKeys: [],
                checkStrictly: true,
                multipleSelection: []
            }
        },
        created() {
            this.getAllRecord()
        },
        methods: {
            getAllRecord() {
              axios.post('/base/action/listAll', this.searchForm).then(res => {
                this.tableData = res.data.data.records
                  this.size = res.data.data.size
                  this.current = res.data.data.current
                  this.total = res.data.data.total
              })
            },
            toggleSelection(rows: any) {
                if (rows) {
                    rows.forEach((row: any) => {
                        const refs: any = this.$refs.multipleTable
                        refs.toggleRowSelection(row);
                    });
                } else {
                    const refs: any = this.$refs.multipleTable
                    refs.clearSelection();
                }
            },
            handleSelectionChange(val: any) {
                this.multipleSelection = val;

                this.delBtlStatu = val.length == 0
            },

            handleSizeChange(val: number) {
                this.searchForm.limit = val
                this.getAllRecord()
            },
            handleCurrentChange(val: number) {
                this.searchForm.page = val
                this.getAllRecord()
            }
        }
})
</script>

<style scoped>

    .handle-box {
        margin-bottom: 20px;
    }

    /*.el-pagination {*/
    /*    float: right;*/
    /*    margin-top: 5px;*/
    /*}*/

</style>