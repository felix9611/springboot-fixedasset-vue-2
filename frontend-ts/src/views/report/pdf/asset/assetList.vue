<template>
    <div class="container">
        <div class="handle-box">
          <vue-html2pdf
              :show-layout="false"
              :float-layout="true"
              :enable-download="true"
              :preview-modal="true"
              :paginate-elements-by-height="1400"
              filename="hee hee"
              :pdf-quality="2"
              :manual-pagination="false"
              pdf-format="a4"
              pdf-orientation="landscape"
              pdf-content-width="800px"
      
              @progress="onProgress($event)"
              @hasStartedGeneration="hasStartedGeneration()"
              @hasGenerated="hasGenerated($event)"
              ref="html2Pdf"
          >
              <section slot="pdf-content">
                <div class="handle-box">
                    Total butget Cost : HKD {{ sumTotal }}
                </div>
              </section>
          </vue-html2pdf>
        </div>


        


        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                border
                stripe
                @selection-change="handleSelectionChange">
            <el-table-column
              prop="assetCode"
              label="Asset Code"
              width="120">
            </el-table-column>
            <el-table-column
              prop="assetName"
              label="Asset Name"
              width="320">
            </el-table-column>
            <el-table-column
              prop="typeCode"
              label="Type Code"
              width="100">
            </el-table-column>
            <el-table-column
              prop="typeName"
              label="Type Name"
              width="150">
            </el-table-column>
            <el-table-column
              prop="placeCode"
              label="Place Code"
              width="100">
            </el-table-column>
            <el-table-column
              prop="placeName"
              label="Place Name"
              width="150">
            </el-table-column>
            <el-table-column
              prop="deptCode"
              label="Department Code"
              width="100">
            </el-table-column>
            <el-table-column
              prop="deptName"
              label="Department Name"
              width="150">
            </el-table-column>
            <el-table-column
              prop="buyDate"
              width="200"
              label="Buy Date"
            >
            </el-table-column>
        </el-table>

    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import axios from '../../../../axios'
import VueHtml2pdf from 'vue-html2pdf'

export default Vue.extend({
        name: 'AssetList',
        data() {
            const searchForm: any = {
                limit: 200,
                page: 1
            }
            return {
                searchForm,
                delBtlStatu: true,
                sumTotal: 0,
                total: 0,
                size: 10,
                current: 1,

                dialogVisible: false,
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
        components: {
          VueHtml2pdf
        },
        created() {
            this.assetAllList()
            this.getTotalCost()
            this.generateReport()
        },
        methods: {
          generateReport () {
            this.$refs.html2Pdf.generatePdf()
          },
          getTotalCost() {
            axios.get(
              '/asset/assetList/getTotalSum'
            ).then(
              (res: any) => {
                this.sumTotal = res.data.data
              }
            )
          },
            assetAllList() {
                axios.post(
                    '/asset/assetList/listAll',
                    this.searchForm
                ).then(
                    (res: any) => {
                    this.tableData = res.data.data.records
                    this.size = res.data.data.size
                    this.current = res.data.data.current
                    this.total = res.data.data.total
                })
            },
            toggleSelection(rows: any) {
                if (rows) {
                    rows.forEach((row: any) => {
                        const multipleTable: any = this.$refs.multipleTable
                        multipleTable.toggleRowSelection(row);
                    });
                } else {
                    const multipleTable: any = this.$refs.multipleTable
                    multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val: any) {
                this.multipleSelection = val;

                this.delBtlStatu = val.length == 0
            },
            handleSizeChange(val: number) {
                this.searchForm.limit = val
                this.assetAllList()
            },
            handleCurrentChange(val: number) {
                this.searchForm.page = val
                this.assetAllList()
            },

            resetForm(formName: string) {
                const refs: any = this.$refs[formName]
                refs.resetFields();
                this.dialogVisible = false
                this.editForm = {}
            },
            handleClose() {
                this.resetForm('editForm')
            },
            submitForm(formName: string) {
                const refs: any = this.$refs[formName]
                refs.validate((valid: any) => {
                    if (valid) {
                      console.log(this.editForm)
                        axios.post('/asset/assetList/' + (this.editForm.id ? 'update' : 'create'), this.editForm)
                            .then((res: any) => {
                                this.assetAllList()
                                this.$notify({
                                    title: '',
                                    showClose: true,
                                    message: '恭喜你，Action成功',
                                    type: 'success',
                                });

                                this.dialogVisible = false
                            })
                    } else {
                        return false;
                    }
                });
            },
            editHandle(id: number) {
                axios.get(`/asset/assetList/${id}`).then((res: any) => {
                    console.log(this.placeItem)
                    this.editForm = res.data.data
                    this.dialogVisible = true
                })
            },
            delItem(id: number) {
                axios.delete(`/asset/assetList/remove/${id}`).then(res => {
                    this.assetAllList()
                    this.$notify({
                        title: '',
                        showClose: true,
                        message: '恭喜你，Action成功',
                        type: 'success'
                    });
                })
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