<template>
     <!-- 地址列表展示 -->
    <div class="list" v-for="addr in mockList" :key="addr.id">
        <!-- 地址展示中，非编辑态 -->
        <div v-if="addr.status == 'show'" class="item" style="display: flex;">
            <input v-if="isSelect" type="radio" :checked="addr.id == selectedAddrId" @change="handleSelect" />  
            <div>
                <p v-if="add.isDefault">默认地址</p>
                <p><strong>北京故宫</strong></p>
                <p>122626</p>
            </div>
            <div onclick="handleClick(itemId)">
                <img src="url" alt="编辑">
            </div>
        </div>

        <!-- 编辑态 -->
        <div v-if="addr.status == 'show'" class="item" style="display: flex;">
            <form @submit="handleSubmit">
                <div>
                    <label>地址名称</label>
                    <input type="text" v-model="form.address" required />
                </div>
                 <div>
                    <label>手机号码</label>
                    <input type="number" v-model="form.phone" required />
                </div>
                <div>
                    <button @click="handCancelItem(item)">取消</button>
                    <button @click="handSaveItem(item)">保存</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import {useRoute, useRouter} from 'vue-router'

const router = useRouter()
const route = useRoute()
const action = route.params.action // 可能的值有show、edit；若action为空则默认为show
const addressId = route.params.id 

let isEdit = ref(action == 'edit')  // 是否编辑中
let selectedAddrId = ref(1)  // 当前选中的Id
let isSelect = ref(false)  // 是否选择地址？ 由路由跳转携带的参数进行控制

const form = ref({
    id: '',
    phone:'',
    address: '',
    isDefault: ''
})

 let mockList = reactive([
    {
        id:1,status: 'show',isDefault: true, name: 'a', iphone:122626, address:'北京故宫'
    },
    {
        id:2,status: 'edit', isDefault: false,name: 'b', iphone:122626, address:'上海'
    },
    {
        id:3,status: 'show',isDefault: false, name: 'c', iphone:122626, address:'湖北'
    }
])

// 选择指定的地址项然后回传给 结算页面
const handleSelect = (id)=>{
    selectedAddrId.value = id
    router.push('/shop')
}

// 表单提交
const handleSubmit = ()=>{
    fetch('url',form)
    .then(()=>{
        console.log('更新成功')
    })
    .catch((e)=>{
        console.log(e)
    })
}

// 取消编辑
const handCancelItem = (item)=>{
    let it = mockList.find((it)=>it.id == item.id)
    it.status = 'show'

}

// 保存编辑后的内容
const handSaveItem = (item)=>{
    let it = mockList.find((it)=>it.id == item.id)
    it.phone = item.phone
    it.name= item.name
    it.status = 'show'
}

</script>