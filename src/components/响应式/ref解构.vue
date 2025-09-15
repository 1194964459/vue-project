<template>

    <div>测试： {{name}}
      <div >abb</div>
    <div  @click="handleClick">按钮</div>
    </div>
</template>

<script setup>
import { ref,reactive, toRef } from 'vue'

function useUser() {
  const name = ref('Alice');
  const age = ref(20);
  return { name, age }; // 返回 ref 对象
}

const handleClick = ()=>{
  console.log('?')
  name.value = '11'
}
// 组件中使用
const { name, age } = useUser(); // 直接解构，通过 .value 访问
////


// 1. 定义 reactive 对象
const user = reactive({
  name: '张三',
  age: 20
})

// 2. 用 toRef 抽离单个属性（保持响应式）
const userName = toRef(user, 'name') 

userName.value = '李四'
console.log(user.name)

user.name = '五'
console.log(userName.value)



// 3. 修改测试：改 toRef 生成的 ref，原对象也变
// userName.value = '李四' 
// console.log(user.name) // 输出：李四（响应式关联生效）

// // ❌ 错误：直接解构会丢失响应式，改 userName2 不会影响 user.name
// const { age: userName2 } = user 
// // 4. 改原对象，toRef 生成的 ref 也变
// user.age = 21 
// console.log(userName2) // 输出：20（无响应式，因为是直接解构）



</script>