<template>
    <div class="addQuestionContainer">
        <div>
            <h1>管理题目</h1>
        </div>

        <a-table
            :columns="columns"
            :data="dataList"
            bordered
            :pagination="{
                showTotal: true,
                pageSize: searchParams.pageSize,
                pageNum: searchParams.current,
                total: total
            }"
            @page-change="onPageChange"
        >
            <!-- 自定义标签插槽 -->
            <template #tagsSlot="{ record }">
                <a-space>
                    <a-tag v-for="(item, index) in JSON.parse(record.tags)" :key="index"
                        >{{ item }}
                    </a-tag>
                </a-space>
            </template>

            <!--<template #contentSlot="{ record }">-->
            <!--    <MdViewer :value="record.content" />-->
            <!--</template>-->

            <!-- 自定义标签插槽 -->
            <template #configSlot="{ record }">
                <a-space direction="vertical" fill>
                    <a-tag> 时间消耗: {{ JSON.parse(record.judgeConfig).timeLimit }}</a-tag>
                    <a-tag> 内存消耗: {{ JSON.parse(record.judgeConfig).memoryLimit }}</a-tag>
                    <a-tag> 堆栈消耗: {{ JSON.parse(record.judgeConfig).stackLimit }}</a-tag>
                </a-space>
            </template>

            <template #caseSlot="{ record }">
                <a-space
                    v-for="(item, index) in JSON.parse(record.judgeCase)"
                    :key="index"
                    fill
                    style="padding-bottom: 5px"
                >
                    <a-tag>输入: {{ item.input }}</a-tag>
                    <a-tag>输出: {{ item.output }}</a-tag>
                </a-space>
            </template>

            <template #optional="{ record }">
                <a-space>
                    <a-button type="primary" @click="doUpdate(record)">修改</a-button>

                    <a-popconfirm content="确定删除改题目吗?" @ok="doDelete(record)">
                        <a-button status="danger">删除</a-button>
                    </a-popconfirm>
                </a-space>
            </template>
        </a-table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type Question, Service } from '../../../generated'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'

import MdViewer from '@/components/MdViewer/index.vue'

const router = useRouter()

const dataList = ref([])
const total = ref(0)
const searchParams = ref({
    pageSize: 2,
    current: 1
})

const columns = [
    {
        title: 'id',
        dataIndex: 'id'
    },
    {
        title: '标题',
        dataIndex: 'title'
    },
    {
        title: '内容',
        dataIndex: 'content'
    },
    {
        title: '标签',
        dataIndex: 'tags',
        slotName: 'tagsSlot'
    },
    {
        title: '答案',
        dataIndex: 'answer'
    },
    {
        title: '提交数',
        dataIndex: 'submitNum'
    },
    {
        title: '通过数',
        dataIndex: 'acceptedNum'
    },
    {
        title: '判题配置',
        dataIndex: 'judgeConfig',
        slotName: 'configSlot'
    },
    {
        title: '判题用例',
        dataIndex: 'judgeCase',
        slotName: 'caseSlot'
    },
    {
        title: '用户id',
        dataIndex: 'userId'
    },
    {
        title: '创建时间',
        dataIndex: 'createTime'
    },
    {
        title: '操作',
        slotName: 'optional'
    }
]

const onPageChange = (page: number) => {
    searchParams.value.current = page
    loadData()
}

const loadData = async () => {
    const res = await Service.listQuestionByPageUsingPost(searchParams.value)
    if (res.code === 0) {
        dataList.value = res.data.records
        total.value = res.data.total
    } else {
        Message.error('加载失败: ' + res.message)
    }
}

const doDelete = async (value: Question) => {
    const res = await Service.deleteQuestionUsingPost({ id: value.id })
    if (res.code === 0) {
        Message.success('删除成功')
        await loadData()
    } else {
        Message.error('删除失败: ' + res.message)
    }
}

const doUpdate = (value: Question) => {
    console.log(value)
    router.push({
        path: '/update/question',
        query: {
            id: value.id
        }
    })
}

onMounted(() => {
    loadData()
})
</script>

<style scoped>
.addQuestionContainer {
}
</style>
