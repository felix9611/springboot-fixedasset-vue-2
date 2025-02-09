<template>
    <div class="bg-cover w-screen min-h-screen text-white bg-[url('assets/img/background3.jpg')]">
        <div class="] grid md:grid-cols-1 xl:grid-cols-3 gap-3 p-10">
            <div class="xl:col-span-2 xl:my-[15rem]">
                <div>
                    <div
                        class="text-center font-bold text-[3rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] xs:[text-shadow:_0_15px_30px_rgb(99_102_241_/_0.8)]  [text-shadow:_0_8px_10px_rgb(99_102_241_/_0.8)] hover:[text-shadow:_0_10px_15px_#b5edff]"
                    >
                        Fixed Asset Management
                    </div>
                    <div
                       class="text-center font-bold text-[1.5rem] md:text-[2rem] lg:text-[2rem] xl:text-[3rem] xs:[text-shadow:_0_15px_30px_rgb(99_102_241_/_0.8)]  [text-shadow:_0_8px_10px_rgb(99_102_241_/_0.8)] hover:[text-shadow:_0_10px_15px_#b5edff]"
                    >
                        Take more efficiency in here
                    </div>
                </div>
            </div>
            <div class="xl:col-span-1 xl:my-[10.5rem]">
                <div class="bg-white bg-opacity-80 p-6 rounded-x rounded-3xl shadow-lg">
                    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="grid grid-cols-1 gap-2">
                        <el-form-item prop="username" class="w-100">
                            <input
                                v-model="loginForm.username"
                                placeholder="Username"
                                class="text-[1.6rem] placeholder-blue-800 text-black border border-white border-8 w-full rounded-lg"
                            />
                        </el-form-item>
                        <el-form-item prop="password">
                            <input
                                v-model="loginForm.password"
                                type="password"
                                placeholder="Paasword"
                                class="text-[1.6rem] placeholder-blue-800 text-black border border-white border-8 w-full rounded-lg"
                            />
                        </el-form-item>
                        <div class="grid grid-cols-3 gap-2">
                            <div class="col-span-2">
                                <input 
                                    v-model="loginForm.code"
                                    placeholder="Captcha"
                                    class="text-[1.6rem] placeholder-blue-800 text-black border border-white border-8 w-full h-full rounded-lg"
                                />
                            </div>
                            <div>
                                <el-image :src="captchaImg" @click="getCaptcha" class="w-full"></el-image>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-5 py-5">
                            <button
                                @click.prevent="submitForm('loginForm')"
                                class="p-3 bg-[#b5b5b5] bg-opacity-30 hover:bg-opacity-100 rounded-lg text-blue-800 font-bold"
                            >Login</button>
                            <button
                                class="p-3 bg-[#b5b5b5]  bg-opacity-30 hover:bg-opacity-100 rounded-lg text-blue-800 font-bold"
                                @click.prevent="resetForm('loginForm')"
                            >Reset</button>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
    <!--<div class="flex w-full h-screen bg-[url('assets/img/background3.jpg')]">
         <div class="m-auto bg-white w-[400px] p-6 rounded-xl">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px"
                    class="login-form">
                    <div class="text-center text-[1.3rem] p-3 font-black">Fixed Asset</div>
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="Username">
                        <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                            v-model="loginForm.password"
                            type="password"
                            auto-complete="off"
                            placeholder="Paasword"
                    >
                        <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
                    </el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="loginForm.code" auto-complete="off" placeholder="Captcha Code" class="w-[63%]">
                        <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
                    </el-input>
                    <div class="login-code">
                        <el-image :src="captchaImg" class="captchaImg" @click="getCaptcha"></el-image>
                    </div>
                </el-form-item>

                <el-form-item class="w-[100%]">
                    <el-button :loading="loading" size="medium" type="primary"  class="w-[100%]" @click="submitForm('loginForm')">
                        <span v-if="!loading">Login</span>
                        <span v-else>Now Login...</span>
                    </el-button>
                </el-form-item>
                <el-form-item class="w-[100%]">
                    <el-button size="medium"   class="w-[100%]" @click="resetForm('loginForm')">
                        <span>Reset</span>
                    </el-button>
                </el-form-item>
            </el-form>
         </div>   
    </div>-->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Background from '@/assets/img/background3.jpg'
import qs from 'qs'
import axios from '@/axios'
import outAxios from 'axios'

@Component
export default class Login extends Vue {

    get Background() {
        return Background
    }

    codeUrl: string = ''
    cookiePass: string = ''
    
    loginForm: any = {
        username: '',
        password: '',
        code: '',
        token: ''
    }
    loginRules =  {
        username: [{required: true, trigger: 'blur', message: 'Username cannot blank!'}],
        password: [{required: true, trigger: 'blur', message: 'Passowrd cannot blank!'}],
        code: [{required: true, trigger: 'change', message: 'Capture cannot blank!'}]
    }

    captchaImg: any = null
    loading: boolean = false
    redirect: undefined

    loginUserIP: string = ''


    created() {
        this.getCaptcha()
       // this.getClientIP()
    }

    getClientIP() {
        outAxios({
            url: 'https://jsonip.com/',
            method: 'get'
        }).then((rs: any)=>{
            this.loginUserIP = rs.data.ip
            console.log(this.loginUserIP)
        })
    }

    submitForm(formName: string) {
        const refs: any = this.$refs[formName]
        refs.validate((valid: any) => {
            if(valid) {
                axios.post('/login?' + qs.stringify(this.loginForm) ).then(res => {
                    this.saveLoginRecord()
                    const jwt = res.data.data.token
                    this.$store.commit('SET_TOKEN', jwt)
                    this.$router.push('/')
                })
                this.getCaptcha()
            } else {
                this.saveLoginRecordFailure()
                return false
            }
        })
    }

    saveLoginRecord() {
        const record = {
            username: this.loginForm.username,
            loginStatus: 'success',
            ipAddress: this.loginUserIP
        }
        axios.post('/sys/user/saveRecord', record)
    }

    saveLoginRecordFailure() {
        const record = {
            username: this.loginForm.username,
            loginStatus: 'Failure',
            ipAddress: this.loginUserIP
        }
        axios.post('/sys/user/saveRecord', record)
    }
            
    resetForm(formName) {
        this.$store.commit('resetState', '')
        const refs: any = this.$refs[formName]
        refs.resetFields()
        this.$router.push('/login')
        this.getCaptcha()
    }
            
    getCaptcha() {
        axios.get('/captcha').then(res => {
            console.log(res)
            this.loginForm.token = res.data.data.token
            this.captchaImg = res.data.data.captchaImg
            if(this.loginForm === {}) {
                this.loginForm.code = ''
            }
        })
    }
}
</script>