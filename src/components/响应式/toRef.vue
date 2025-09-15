<template>
    <div>{{ user.name }}
        地址：{{ user.address.city }}
        <div @click="handleClick">修改name</div>
        <div @click="handleClick2">修改地址</div>
    </div>

</template>

<script setup>
import { ref,reactive, toRef,toRefs } from 'vue'

// 1. 定义 reactive 对象
const user = reactive({
  name: '张三',
  age: 20,
  address: {
    city: '北京'
  }
})

/**
 * toRef
 */
// const userName = toRef(user, 'name') 

// userName.value = '李四'
// console.log(user.name)

// user.name = '五'
// console.log(userName.value)

/**
 * toRefs
 */
const { name, age, address } = toRefs(user) 


const handleClick = ()=>{
    name.value = '四'
    console.log(user.name)
}

const handleClick2 = ()=>{
    address.value.city = '上海'
    console.log(user.address.city)
}
</script>

