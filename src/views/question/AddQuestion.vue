<template>
    <div class="addQuestionContainer">
        <div style="margin-left: 300px">
            <h1>创建题目</h1>
        </div>
        <a-form :model="questionForm">
            <a-form-item field="title" label="标题">
                <a-input v-model="questionForm.title" placeholder="请输入标题" />
            </a-form-item>

            <a-form-item field="tags" label="标签">
                <a-input-tag v-model="questionForm.tags" placeholder="请选择标签" />
            </a-form-item>

            <a-form-item field="content" label="题目内容">
                <MdEditor :value="questionForm.content" :handle-change="contentChange" style="width: 80%" />
            </a-form-item>

            <a-form-item field="answer" label="题目答案">
                <MdEditor :value="questionForm.answer" :handle-change="answerChange" style="width: 80%" />
            </a-form-item>

            <a-form-item label="判题配置">
                <a-space direction="vertical" fill style="min-width: 400px">
                    <a-form-item
                        field="judgeConfig.timeLimit"
                        label="时间限制"

                    >
                        <a-input-number
                            v-model="questionForm.judgeConfig.timeLimit"
                            placeholder="请输入时间限制"
                            mode="button"
                            min="0"
                            size="large"
                        />
                    </a-form-item>
                    <a-form-item
                        field="judgeConfig.stackLimit"
                        label="堆栈限制"
                    >
                        <a-input-number
                            v-model="questionForm.judgeConfig.stackLimit"
                            placeholder="请输入堆栈限制"
                            mode="button"
                            min="0"
                            size="large"
                        />
                    </a-form-item>
                    <a-form-item
                        field="judgeConfig.memoryLimit"
                        label="内存限制"
                    >
                        <a-input-number
                            v-model="questionForm.judgeConfig.memoryLimit"
                            placeholder="请输入内存限制"
                            mode="button"
                            min="0"
                            size="large"
                        />
                    </a-form-item>
                </a-space>
            </a-form-item>

            <a-form-item label="测试用例配置">
                <a-space direction="vertical" fill>
                    <a-form-item
                        v-for="(judgeCase, index) of questionForm.judgeCases"
                        :key="index"
                        no-style
                    >
                        <a-space direction="horizontal" fill>
                            <div style="display: flex">
                                <a-form-item
                                    :field="`judgeCases[${index}].input`"
                                    :label="`输入用例-${index}`"
                                    :key="index"
                                    style="min-width: 500px"
                                >
                                    <a-input
                                        v-model="judgeCase.input"
                                        placeholder="请输入测试输入用例"
                                    />
                                </a-form-item>

                                <a-form-item
                                    :field="`judgeCases[${index}].output`"
                                    :label="`输出用例-${index}`"
                                    :key="index"
                                    style="min-width: 500px"
                                >
                                    <a-input
                                        v-model="judgeCase.output"
                                        placeholder="请输入测试输出用例"
                                    />
                                </a-form-item>

                                <a-button
                                    @click="delJudgeCase(index)"
                                    status="danger"
                                    style="margin-left: 20px"
                                    >删除
                                </a-button>
                            </div>
                        </a-space>
                    </a-form-item>
                    <a-form-item style="margin-left: -120px">
                        <a-button type="outline" status="success" @click="addJudgeCase"
                            >新增测试用例</a-button
                        >
                    </a-form-item>
                </a-space>
            </a-form-item>

            <a-form-item>
                <a-button
                    @click="doSubmit"
                    type="primary"
                    style="min-width: 200px; margin-top: 30px"
                    >提交</a-button
                >
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup lang="ts">
import MdEditor from '@/components/MdEditor/index.vue'
import { reactive, toRaw } from 'vue'
import { Message } from '@arco-design/web-vue'
import { Service } from '../../../generated'

const questionForm = reactive({
    answer: '',
    content: '',
    judgeCases: [
        {
            input: '',
            output: ''
        }
    ],
    judgeConfig: {
        memoryLimit: 0,
        stackLimit: 0,
        timeLimit: 0
    },
    tags: [],
    title: ''
})

/**
 * 题目内容发生改变
 * @param v
 */
const contentChange = (v: string) => {
    questionForm.content = v
}

/**
 * 题目答案发生改变
 * @param v
 */
const answerChange = (v: string) => {
    questionForm.answer = v
}

/**
 * 删除判题用例
 * @param index
 */
const delJudgeCase = (index: number) => {
    if (questionForm.judgeCases.length <= 1) {
        Message.warning('判题用例为必填项')
        return
    }
    questionForm.judgeCases.splice(index, 1)
}

/**
 * 增加判题用例
 */
const addJudgeCase = () => {
    questionForm.judgeCases.push({
        input: '',
        output: ''
    })
}

/**
 * 提交题目
 */
const doSubmit = async () => {
    console.log(toRaw(questionForm))

    const res = await Service.addQuestionUsingPost(questionForm)
    if (res.code === 0) {
        Message.success(res.message || "题目创建成功")
    } else {
        Message.error("创建失败: " + res.message)
    }
}
</script>

<style scoped>
.addQuestionContainer {
}
</style>
