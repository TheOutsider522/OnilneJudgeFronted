<template>
    <div class="globalHeaderContainer">
        <a-row class="grid-demo" align="center" :wrap="false">
            <a-col flex="auto">
                <a-menu
                    mode="horizontal"
                    :selected-keys="select_keys"
                    @menu-item-click="doMenuClick"
                >
                    <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
                        <div class="title_bar">
                            <img class="logo" src="@/assets/oj_logo.svg" />
                            <div class="title">在线判题系统</div>
                        </div>
                    </a-menu-item>
                    <a-menu-item v-for="item in visibleRoutes" :key="item.path">
                        {{ item.name }}
                    </a-menu-item>
                </a-menu>
            </a-col>
            <a-col flex="150px" style="display: flex; align-items: center; margin-right: 20px">
                <AImage src="src/assets/avatar.jpg" width="50px" style="border-radius: 50%" />
                <div style="margin-left: 10px; font-weight: 500">
                    {{ userStore.loginUser?.userName }}
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
import { routes } from '@/router/routes'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/module/user'
import { checkAccess } from '@/access/checkAccess'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const visibleRoutes = computed(() =>
    routes.filter((item) => {
        if (item.meta?.hidden) {
            return false
        }

        if (!checkAccess(userStore.loginUser, item?.meta?.access as string)) {
            return false
        }
        return true
    })
)

setTimeout(() => {
    userStore.getLoginUser()
}, 3000)

const select_keys = ref([route.path])
router.afterEach((to, from, failure) => {
    select_keys.value = [to.path]
})

const doMenuClick = (key: string) => {
    router.push({
        path: key
    })
}
</script>

<style scoped>
.globalHeaderContainer {
    box-shadow: #eee 1px 1px 5px;
}

.title_bar {
    display: flex;
    align-items: center;
}

.logo {
    height: 48px;
}

.title {
    color: #31b9dd;
    margin-left: 20px;
    font-size: 20px;
    font-weight: 600;
    font-style: italic;
}
</style>
