<template>
    <div>
        <MdEditor :value="mdValue" :handle-change="mdChange"/>

        <CodeEditor :value="codeValue" :handle-change="codeChange" />
    </div>
</template>
<script setup lang="ts">
import MdEditor from '@/components/MdEditor/index.vue'
import CodeEditor from '@/components/CodeEditor/index.vue'
import { ref } from 'vue'

const mdValue = ref("")
const mdChange = (v: string) => {
    mdValue.value = v
    console.log(v)
}

const codeValue = ref("")
const codeChange = (v: string) => {
    codeValue.value = v
    console.log(v)
}

</script>
<style scoped></style>
