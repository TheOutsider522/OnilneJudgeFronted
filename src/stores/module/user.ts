import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LoginUserVO } from '../../../generated'
import { Service } from '../../../generated'
import { useRouter } from 'vue-router'

const router = useRouter()
export const useUserStore = defineStore(
    'userStore',
    () => {
        const loginUser = ref<LoginUserVO>(
            JSON.parse(localStorage.getItem('loginUser')!) as LoginUserVO
        )
        const getLoginUser = async () => {
            const res = await Service.getLoginUserUsingGet()

            if (res.code === 0) {
                loginUser.value = res.data!
                localStorage.setItem('loginUser', JSON.stringify(loginUser.value))
            }
        }

        const logout = () => {
            loginUser.value = {}
            localStorage.removeItem("loginUser")
        }

        return {
            loginUser,
            getLoginUser,
            logout
        }
    },
    {
        persist: false
    }
)
