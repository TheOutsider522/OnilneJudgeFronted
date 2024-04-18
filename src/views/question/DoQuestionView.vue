<template>
    <div class="doQuestionViewVue">
        <div class="questionInfoContainer">
            <div class="question_content">
                <a-tabs default-active-key="1">
                    <a-tab-pane key="1" v-if="question" title="题目">
                        <div class="question_info">
                            <div class="question_title">
                                {{ question.title }}
                            </div>
                            <div class="question_tags">
                                <a-space>
                                    <a-tag
                                        v-for="(item, index) in question.tags"
                                        :key="index"
                                        color="green"
                                        >{{ item }}
                                    </a-tag>
                                </a-space>
                            </div>
                        </div>
                        <MdViewer :value="question?.content" />
                    </a-tab-pane>
                    <a-tab-pane key="2" title="评论区"></a-tab-pane>
                    <a-tab-pane key="3" title="题解"></a-tab-pane>
                    <a-tab-pane key="4" title="提交记录"></a-tab-pane>
                </a-tabs>
            </div>
        </div>
        <div class="codeQuestionContainer">
            <div class="code_info">
                <div class="title">编码区域</div>
                <div class="select_lang">
                    <a-select
                        :style="{ width: '320px' }"
                        placeholder="请选择编程语言"
                        :model-value="submitInfo.language"
                        @change="onLangChange"
                    >
                        <a-option>java</a-option>
                        <a-option>cpp</a-option>
                        <a-option>go</a-option>
                    </a-select>
                </div>
            </div>
            <div class="code_content">
                <CodeEditor
                    :value="submitInfo.code"
                    :language="submitInfo.language"
                    :handle-change="onCodeChange"
                />
            </div>
            <div class="code_submit">
                <a-button
                    status="success"
                    type="primary"
                    size="large"
                    style="width: 150px"
                    shape="round"
                    @click="doSubmit"
                    >提交
                </a-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type QuestionSubmitVO, type QuestionVO, Service } from '../../../generated'
import { Message } from '@arco-design/web-vue'

import CodeEditor from '@/components/CodeEditor/index.vue'
import MdViewer from '@/components/MdViewer/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Props {
    id: number
}

const props = withDefaults(defineProps<Props>(), {
    id: () => 0
})

const question = ref<QuestionVO>()

const submitInfo = ref<QuestionSubmitVO>({
    questionId: props.id,
    language: 'java',
    code: ''
})

const onCodeChange = (v: string) => {
    submitInfo.value.code = v
}

const onLangChange = (v: any) => {
    submitInfo.value.language = v
}

const doSubmit = async () => {
    const res = await Service.doQuestionSubmitUsingPost(submitInfo.value)
    if (res.code === 0) {
        Message.success('提交成功')
    } else {
        Message.error('提交失败')
    }
}

const loadData = async (questionId: number) => {
    const res = await Service.getQuestionVoByIdUsingGet(questionId)
    if (res.code === 0) {
        question.value = res.data
    } else {
        Message.error('加载失败: ' + res.message)
    }
}

onMounted(() => {
    console.log(props.id)
    if (String(props.id) === ':id' || !props.id) {
        console.log('错误')
        Message.warning('请选择题目')
        router.push({
            path: '/questions'
        })
        return
    }
    loadData(props.id)
})
</script>

<style scoped>
.doQuestionViewVue {
    display: flex;
    min-height: 80vh;

    .questionInfoContainer {
        background-color: #f7f7f7;
        border-radius: 10px;
        padding: 15px;
        margin: 10px;
        min-height: 75vh;
        width: 50%;

        .question_content {
            padding-left: 20px;

            .question_info {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .question_title {
                    padding: 10px;
                    color: #00b8ff;
                    font-size: 20px;
                    font-style: italic;
                }

                .question_tags {
                    margin-right: 30px;
                }
            }
        }
    }

    .codeQuestionContainer {
        background-color: #f9f7f7;
        border-radius: 10px;
        padding: 15px;
        margin: 10px;
        height: 100%;
        width: 50%;

        .code_info {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .title {
                padding: 10px;
                color: #00b8ff;
                font-size: 20px;
                font-style: italic;
            }

            .select_lang {
                padding-right: 30px;
            }
        }

        .code_submit {
            display: flex;
            justify-content: end;
            align-items: center;
            padding: 20px;
        }
    }
}
</style>
