<template>
    <div class="basic_layout_container">
        <a-layout style="min-height: 100vh">
            <a-layout-header class="header">
                <GlobalHeader />
            </a-layout-header>
            <a-layout-content class="content">
                <router-view />
            </a-layout-content>
            <a-layout-footer class="footer">在线判题系统</a-layout-footer>
        </a-layout>
    </div>
</template>

<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader/index.vue'
</script>

<style scoped>
.basic_layout_container {
}

.basic_layout_container .header {
}

.basic_layout_container .content {
    padding: 20px;
}

.basic_layout_container .footer {
    background-color: #e7f5f5;
    padding: 16px;
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
}
</style>
