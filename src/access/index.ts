import router from '@/router'
import { useUserStore } from '@/stores/module/user'
import pinia from '@/stores'
import ACCESS_ENUM from '@/access/accessEnum'
import { checkAccess } from '@/access/checkAccess'

const userStore = useUserStore(pinia)

router.beforeEach(async (to, from, next) => {
    // 如果之前登陆过, 自动登录
    const loginUser = userStore.loginUser
    if (!loginUser || !loginUser.userRole) {
        await userStore.getLoginUser()
    }

    // 访问的不需要登陆的页面, 直接放行
    const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN
    // 访问必须登录的页面
    if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
        if (!loginUser || !loginUser.userRole || loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
            console.log('111')
            next(`/user/login?redirect=${to.fullPath}`)
            return
        }

        if (!checkAccess(loginUser, needAccess)) {
            next('/noAuth')
            return
        }
    }

    next()
})
