<template>
    <div class="login" :style="'background-image:url(' + Background + ');'">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px"
                 class="login-form">
            <h3 class="title">Fixed Asset</h3>
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
                <el-input v-model="loginForm.code" auto-complete="off" placeholder="Captcha Code" style="width: 63%">
                    <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
                </el-input>
                <div class="login-code">
                    <el-image :src="captchaImg" class="captchaImg" @click="getCaptcha"></el-image>
                </div>
            </el-form-item>
            <!--
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">
        记住我
      </el-checkbox> -->
            <el-form-item style="width: 100%">
                <el-button :loading="loading" size="medium" type="primary" style="width: 100%" @click="submitForm('loginForm')">
                    <span v-if="!loading">Login</span>
                    <span v-else>Now Login...</span>
                </el-button>
            </el-form-item>
            <el-form-item style="width: 100%">
                <el-button size="medium"  style="width: 100%" @click="resetForm('loginForm')">
                    <span>Reset</span>
                </el-button>
            </el-form-item>
        </el-form>
        <!--  底部  -->
        <!-- <div v-if="$store.state.settings.showFooter" id="el-login-footer">
      <span v-html="$store.state.settings.footerTxt" />
      <span> ⋅ </span>
      <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">{{ $store.state.settings.caseNumber }}</a>
    </div> -->
    </div>
</template>

<script lang="ts">
import Background from '@/assets/img/background3.jpg';
import qs from 'qs'
import axios from '../axios'
import Vue from 'vue'

export default Vue.extend({
        name: 'Login',
        data() {
            const loginForm: any = {
                    username: 'admin',
                    password: '111111',
                    code: '111111',
                    token: ''
            }
            const captchaImg: any = ''
            return {
                Background: Background,
                codeUrl: '',
                cookiePass: '',
                loginForm,
                loginRules: {
                    username: [{required: true, trigger: 'blur', message: '用户名不能为空'}],
                    password: [{required: true, trigger: 'blur', message: '密码不能为空'}],
                    code: [{required: true, trigger: 'change', message: '验证码不能为空'}]
                },
                captchaImg,
                loading: false,
                redirect: undefined
            };
        },
        created() {
            this.getCaptcha()
        },
        methods: {
            submitForm(formName: string) {
                const refs: any = this.$refs
                refs[formName].validate((valid) => {
                    if(valid) {
                        axios.post('/login?' + qs.stringify(this.loginForm) ).then(res => {
                            const jwt = res.data.data.token

                            this.$store.commit('SET_TOKEN', jwt)

                            this.$router.push('/')
                        })
                        this.getCaptcha()
                    } else {
                        return false
                    }
                })
            },
            resetForm(formName: string) {
                const refs: any = this.$refs[formName]
                refs.resetFields()
            },
            getCaptcha() {
                axios.get('/captcha').then(res => {
                    this.loginForm.token = res.data.data.token
                    this.captchaImg = res.data.data.captchaImg
                })
            }
        }
})
</script>

<style rel="stylesheet/scss" lang="scss">
    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-size: cover;
    }

    .title {
        margin: 0 auto 30px auto;
        text-align: center;
        color: #707070;
    }

    .login-form {
        border-radius: 6px;
        background: #ffffff;
        width: 385px;
        padding: 25px 25px 5px 25px;

        .el-input {
            height: 38px;

            input {
                height: 38px;
            }
        }

        .input-icon {
            height: 39px;
            width: 14px;
            margin-left: 2px;
        }
    }

    .login-tip {
        font-size: 13px;
        text-align: center;
        color: #bfbfbf;
    }

    .login-code {
        width: 33%;
        display: inline-block;
        height: 38px;
        float: right;

        img {
            cursor: pointer;
            vertical-align: middle;
        }
    }
    .captchaImg {
        float: left;
        margin-left: 8px;
        margin-top: 2px;
        border-radius: 4px;
        width: 100px;
    }
</style>