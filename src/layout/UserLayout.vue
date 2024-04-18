<template>
    <div class="user_layout_container">
        <a-layout style="min-height: 100vh">
            <a-layout-header class="header">
                <a-space>
                    <img src="@/assets/egg.svg" height="50px" />
                    在线判题系统
                </a-space>
            </a-layout-header>
            <a-layout-content class="content">
                <router-view />
            </a-layout-content>
            <a-layout-footer class="footer">
                <a href="#">在线判题系统 by 宋学亮</a>
            </a-layout-footer>
        </a-layout>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.user_layout_container {
}

.user_layout_container .header {
    text-align: center;
    padding-top: 20px;
}

.user_layout_container .content {
    padding: 20px;
}

.user_layout_container .footer {
    //background-color: aqua;
    padding: 16px;
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
}
</style>
