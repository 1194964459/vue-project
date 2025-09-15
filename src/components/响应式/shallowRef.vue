<template>
    <div>{{ user.name }}
        <div @click="handleClick">修改 .value 内部属性 → 非响应式</div>
        <div @click="handleClick2">整体替换 .value → 响应式</div>
    </div>

</template>

<script setup>
import {shallowRef } from 'vue'

const user = shallowRef({
  name: '张三',
  age: 20
})

const handleClick = ()=>{
    user.value.name = '李四' 
    console.log(user.value.name) 
}

const handleClick2 = ()=>{
    user.value = { name: '王五', age: 22 } 
    console.log(user.value.name) // 输出：王五（组件更新）
}

</script>