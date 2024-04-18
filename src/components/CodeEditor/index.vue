<template>
    <div ref="codeEditorRef" style="min-height: 650px"></div>
</template>
<script setup lang="ts">
import * as monaco from 'monaco-editor' // 全部导入
import { ref, onMounted, toRaw, watch } from 'vue'

const codeEditorRef = ref<HTMLElement>()
const CodeEditor = ref()

/**
 * 定义组件属性类型
 */
interface Props {
    value: string
    language: string
    handleChange: (v: string) => void
}

/**
 * 初始化组件属性
 */
const props = withDefaults(defineProps<Props>(), {
    value: () => 'Hello World',
    language: () => 'java',
    handleChange: (v: string) => {}
})

const fillValue = () => {
    if (!codeEditorRef.value) {
        return
    }
    toRaw(CodeEditor.value).setValue('新的值')
}

watch(
    () => props.language,
    () => {
        monaco.editor.setModelLanguage(toRaw(CodeEditor.value).getModel(), props.language)
    }
)

onMounted(() => {
    if (!codeEditorRef.value) {
        return
    }
    CodeEditor.value = monaco.editor.create(codeEditorRef.value!, {
        value: props.value,
        language: props.language,
        automaticLayout: true,
        minimap: {
            enabled: true
        },
        colorDecorators: true, //颜色装饰器
        readOnly: false, //是否开启已读功能
        theme: 'vs-dark' //主题
    })

    // 监听编辑器内容变化
    CodeEditor.value.onDidChangeModelContent(() => {
        props.handleChange(toRaw(CodeEditor.value).getValue())
    })
})
</script>
