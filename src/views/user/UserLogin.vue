<template>
    <div class="login_container">
        <div class="login_title">用户登录</div>
        <div class="login_content">
            <a-form :model="form" auto-label-width @submit="handleSubmit">
                <a-form-item field="userAccount" label="账号">
                    <a-input v-model="form.userAccount" placeholder="请输入用户名" />
                </a-form-item>
                <a-form-item field="userPassword" label="密码">
                    <a-input-password v-model="form.userPassword" placeholder="请输入密码" />
                </a-form-item>
                <a-form-item class="sub_button">
                    <a-button size="large" type="primary" shape="round" html-type="submit">登录</a-button>
                </a-form-item>
            </a-form>
            {{userStore.count}}
            <button @click="userStore.addCount()">加1</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import {
    type BaseResponse_LoginUserVO_,
    Service,
    type UserLoginRequest
} from '../../../generated'
import { Message } from '@arco-design/web-vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/module/user'

const route = useRoute()
const router = useRouter()

const userStore = useUserStore()

const form = reactive<UserLoginRequest>({
    userAccount: 'songxueliang',
    userPassword: '12345678'
})
const handleSubmit = async () => {
    const res: BaseResponse_LoginUserVO_ = await Service.userLoginUsingPost(form)
    if (res.code === 0) {
        await userStore.getLoginUser()
        router.push({
            path: route.redirectedFrom?.path ?? '/'
        })
    } else {
        Message.error('登录失败' + res.message)
    }
}
</script>

<style scoped>

.login_container {
    display: flex;
    flex-direction: column;
}

.login_container .login_title {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
    font-style: italic;
    font-weight: 600;
    color: aqua;
}

.login_container .login_content {
    background-color: #95c2c2;
    padding: 40px 20px 20px 20px;
    width: 35%;
    margin: auto;
    border-radius: 20px;
}
.login_container .login_content .sub_button /deep/ .arco-form-item-content-flex {
    justify-content: center;
}
</style>
