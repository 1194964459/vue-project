<template>
  <div class="address-form" :class="`address-form--${theme}`">
    <!-- 地址类型切换 -->
    <div v-if="showAddressType" class="address-form__item">
      <label class="address-form__label">{{ $t('address.type') }}</label>
      <div class="address-form__content">
        <el-radio-group
          v-model="form.addressType"
          :disabled="isDisabled('addressType')"
        >
          <el-radio
            v-for="item in addressTypeOptions"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </div>
    </div>

    <!-- 国家/地区选择 -->
    <div class="address-form__item">
      <label class="address-form__label required" v-if="isRequired('country')">{{ $t('address.country') }}</label>
      <div class="address-form__content">
        <el-select
          v-model="form.country"
          :disabled="isDisabled('country')"
          @change="handleCountryChange"
        >
          <el-option
            v-for="country in countryOptions"
            :key="country.code"
            :label="country.name"
            :value="country.code"
          ></el-option>
        </el-select>
        <el-form-item prop="country" class="address-form__error"></el-form-item>
      </div>
    </div>

    <!-- 省市区三级联动 -->
    <div class="address-form__item">
      <label class="address-form__label required" v-if="isRequired('province')">{{ $t('address.region') }}</label>
      <div class="address-form__content">
        <el-cascader
          v-model="regionValue"
          :options="filteredAreaData"
          :disabled="isDisabled('province') || isDisabled('city') || isDisabled('district')"
          :props="{ label: 'name', value: 'code', expandTrigger: 'click' }"
          @change="handleRegionChange"
          placeholder="请选择省/市/区"
        ></el-cascader>
        <el-form-item prop="province" class="address-form__error"></el-form-item>
      </div>
    </div>

    <!-- 详细地址 -->
    <div class="address-form__item">
      <label class="address-form__label required" v-if="isRequired('detail')">{{ $t('address.detail') }}</label>
      <div class="address-form__content">
        <el-input
          v-model="form.detail"
          :disabled="isDisabled('detail')"
          placeholder="请输入门牌号、楼栋号等详细地址"
          type="textarea"
          :rows="2"
        ></el-input>
        <el-form-item prop="detail" class="address-form__error"></el-form-item>
      </div>
    </div>

    

    <!-- 默认地址勾选框 -->
    <div class="address-form__item address-form__default">
      <el-checkbox
        v-model="form.isDefault"
        :disabled="isDisabled('isDefault')"
      >
        {{ $t('address.setDefault') }}
      </el-checkbox>
    </div>

    <!-- 操作按钮（新增/编辑模式） -->
    <div v-if="mode !== 'view'" class="address-form__actions">
      <el-button type="text" @click="emit('cancel')">{{ $t('common.cancel') }}</el-button>
      <el-button type="primary" @click="handleSubmit">{{ $t('common.save') }}</el-button>
    </div>
  </div>
</template>

<script setup> 
const areaData = [
  {
    code: 'CN',
    name: '中国',
    children: [
      {
        code: '110000',
        name: '北京市',
        children: [
          { code: '110101', name: '东城区' },
          { code: '110102', name: '西城区' },
          // ...其他区县
        ]
      },
      // ...其他省份
    ]
  },
  // ...其他国家/地区
];


const defaultRules = {
  country: [{ required: true, message: '请选择国家/地区', trigger: 'change' }],
  province: [{ required: true, message: '请选择省份', trigger: 'change' }],
  city: [{ required: true, message: '请选择城市', trigger: 'change' }],
  district: [{ required: true, message: '请选择区县', trigger: 'change' }],
  detail: [{ required: true, message: '请输入详细地址', trigger: 'blur' }, { min: 5, message: '详细地址至少5个字符', trigger: 'blur' }],
  contact: [{ required: true, message: '请输入联系人', trigger: 'blur' }, { min: 2, max: 20, message: '联系人2-20个字符', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误', trigger: 'blur' }
  ],
  postalCode: [{ pattern: /^[0-9]{6}$/, message: '邮编为6位数字', trigger: 'blur' }]
};
</script>

<style>
.address-form {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  --primary-color: #1890ff;
  --text-color: #333;
  --label-color: #666;
  --border-color: #e8e8e8;
  --error-color: #ff4d4f;
}

.address-form--mini {
  padding: 8px;
}

.address-form__item {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
  align-items: flex-start;
}

.address-form__label {
  width: 80px;
  font-size: 14px;
  color: var(--label-color);
  margin-right: 8px;
  line-height: 32px;
}

.address-form__label.required::after {
  content: '*';
  color: var(--error-color);
  margin-left: 2px;
}

.address-form__content {
  flex: 1;
  min-width: 200px;
}

.address-form__error {
  margin-top: 4px;
  height: 16px;
}

.address-form__default {
  padding-left: 88px;
}

.address-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

/* 响应式适配移动端 */
@media (max-width: 768px) {
  .address-form__item {
    flex-direction: column;
  }

  .address-form__label {
    width: 100%;
    margin-bottom: 4px;
  }

  .address-form__default {
    padding-left: 0;
  }
}
</style>