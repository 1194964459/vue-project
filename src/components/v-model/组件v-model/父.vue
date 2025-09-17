<template>
    <p>{{bookTitle  }}</p>
    <MyComponent v-model:title="bookTitle" />
</template>

<script setup>
import {ref} from 'vue'
import MyComponent from './子.vue'
const bookTitle = ref('1')
</script>