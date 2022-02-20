<template>
    <div class="container">
      <el-form :model="myAccount" ref="editForm">
        <el-form-item label="Username"  prop="username" label-width="100px">
          <el-input v-model="myAccount.username" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="Created At"  prop="created" label-width="100px">
          <el-input v-model="myAccount.created" autocomplete="off" readonly></el-input>
        </el-form-item>
      </el-form>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import axios from '../../axios'

export default Vue.extend({
  name: 'UserIndex',
  data() {
    const myAccount: any = {}
    return {
      myAccount
    }
  },
  created() {
    this.getMyAccount()
  },
  methods: {
    getMyAccount() {
      axios.get('/sys/userInfo').then((res: any)=>{
        console.log(res.data)
        this.myAccount = res.data.data
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