<template>

  <!-- <input type="radio" v-model="pick" value="1" name="group" /> 选项1
  <input type="radio" v-model="pick" :value="1" name="group" /> 选项2

  <p>当前选中值：{{ typeof(pick) }}</p> -->
    <input  v-model="picked" value="a" />

</template>

<script setup>
import { ref } from 'vue'
const picked = ref()
// const pick = ref(1)


</script>
<!-- `picked` 在被选择时是字符串 "a" -->
<!-- <input v-model="picked" value="a" /> -->

<!-- `toggle` 只会为 true 或 false -->
<!-- <input type="checkbox" v-model="toggle" /> -->

<!-- `selected` 在第一项被选中时为字符串 "abc" -->
<!-- <select v-model="selected">
  <option value="abc">1</option>
  <option value="abc">2</option>
  <option value="abc">3</option>
</select> -->



<!--
 
 v-model 绑定的值通常是静态的字符串 (或者对复选框是布尔值)：
 * 
 * 但有时我们可能希望将该值绑定到当前组件实例上的动态数据。这可以通过使用 v-bind 来实现。
 -->

