<template>
    <div class="questionsViewVue">
        <!--<div>-->
        <!--    <h1>浏览题目</h1>-->
        <!--</div>-->
        <div class="query_container">
            <a-form :model="searchParams" layout="inline">
                <a-form-item field="name" label="名称" style="min-width: 300px">
                    <a-input v-model="searchParams.title" placeholder="请输入名称" />
                </a-form-item>
                <a-form-item field="post" label="标签" style="min-width: 350px">
                    <a-input-tag v-model="searchParams.tags" placeholder="请输入标签" />
                </a-form-item>
                <a-form-item>
                    <a-space>
                        <a-button type="primary" @click="doQueryPage">提交</a-button>
                        <a-button type="primary" @click="doResetQuery">重置</a-button>
                    </a-space>
                </a-form-item>
            </a-form>
        </div>

        <a-table
            column-resizable
            :bordered="{ cell: true }"
            :columns="columns"
            :data="dataList"
            :pagination="{
                showTotal: true,
                pageSize: searchParams.pageSize,
                pageNum: searchParams.current,
                total: total
            }"
            @page-change="onPageChange"
        >
            <template #tagsSlot="{ record }">
                <a-space>
                    <a-tag v-for="(item, index) in record.tags" :key="index" color="green"
                        >{{ item }}
                    </a-tag>
                </a-space>
            </template>
            <template #passRate="{ record }">
                {{ record.submitNum ? record.acceptedNum / record.submitNum : 0 }} ({{
                    record.acceptedNum
                }}
                / {{ record.submitNum }})
            </template>
            <template #createTime="{ record }">
                {{ moment(record.createTime).format('YYYY-MM-DD') }}
            </template>
            <template #optional="{ record }">
                <a-button @click="toQuestionPage(record.id)">去做题</a-button>
            </template>
        </a-table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type Question, type QuestionQueryRequest, Service } from '../../../generated'
import { Message } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'

import moment from 'moment'

const router = useRouter()

const dataList = ref([])
const total = ref(0)
const searchParams = ref<QuestionQueryRequest>({
    pageSize: 10,
    current: 1,
    title: '',
    tags: []
})

const columns = [
    {
        title: '题号',
        dataIndex: 'id'
    },
    {
        title: '题目名称',
        dataIndex: 'title'
    },
    {
        title: '标签',
        slotName: 'tagsSlot'
    },
    {
        title: '通过率',
        slotName: 'passRate'
    },
    {
        title: '创建时间',
        slotName: 'createTime'
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

const doQueryPage = () => {
    searchParams.value.current = 1
    loadData()
}

const doResetQuery = () => {
    searchParams.value = {
        ...searchParams.value,
        title: '',
        tags: []
    }

    loadData()
}

const loadData = async () => {
    const res = await Service.listQuestionVoByPageUsingPost(searchParams.value)
    if (res.code === 0) {
        dataList.value = res.data.records
        total.value = res.data.total
    } else {
        Message.error('加载失败: ' + res.message)
    }
    console.log(dataList.value)
}

/**
 * 跳转到题目做题页面
 * @param questionId
 */
const toQuestionPage = (questionId: number) => {
    console.log(questionId)
    router.push({
        path: `/view/question/${questionId}`
    })
}

onMounted(() => {
    loadData()
})
</script>

<style scoped>
.questionsViewVue {
    max-width: 80%;
    margin: 0 auto;

    .query_container {
        padding: 20px 20px 20px 0px;
    }
}
</style>
