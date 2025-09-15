<template>
    <div>{{ user.name }}
        地址：{{ user.address.city }}
        <div @click="handleClick">修改name</div>
        <div @click="handleClick2">修改地址</div>
    </div>

</template>

<script setup>
import { ref,reactive, toRef,toRefs,shallowReactive } from 'vue'

/**
 * shallowReactive：只让 “顶层属性” 响应式
 */
const user = shallowReactive({
  name: '张三', // 顶层属性：响应式
  address: { // 嵌套对象：非响应式
    city: '北京'
  }
})


const handleClick = ()=>{
    user.name = '四'
}

// // 不更新
const handleClick2 = ()=>{
    user.address.city = '上海'
}
</script>

