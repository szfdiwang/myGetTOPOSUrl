<template>
  <div class="main-wrap">
    <div class="sign-wrapper">
      <h3 class="mb-40px">Sign</h3>
      <el-form :model="requestForm" label-width="120px">
        <el-form-item label="Merchant ID">
          <el-input v-model="requestForm.merchantId" />
        </el-form-item>
        <el-form-item label="RSA Private Key">
          <el-input
            v-model="requestForm.privateKey"
            :rows="12"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <el-form-item label="Order Info">
          <el-input
            v-model="requestForm.orderInfo"
            :rows="10"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <el-form-item label="">
          <el-button size="large" class="h-40px w-100 m-0" type="primary" @click="generateReq"
            >Generate Request</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="sign-wrapper">
      <h3 class="mb-40px">Request</h3>
      <el-form :model="showForm" label-width="120px">
        <el-form-item label="Requst Header">
          <el-input
            v-model="showForm.reqHeader"
            readonly
            :rows="8"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <el-form-item label="Request Body">
          <el-input
            v-model="showForm.reqBody"
            readonly
            :rows="10"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <el-form-item label="">
          <el-button size="large" class="h-40px w-100 m-0" type="primary" @click="getResponse"
            >POST（place order）</el-button
          >
        </el-form-item>
        <el-form-item label="Response Body">
          <el-input
            v-model="showForm.resBody"
            readonly
            :rows="6"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { encryptRsa } from '@/utils'
import { placeOrder } from '@/api/order'

const generateReq = () => {
  //TODO 校验字段
  const merchantId = requestForm.merchantId
  const privateKey = requestForm.privateKey
  console.log('requestForm.orderInfo', requestForm.orderInfo)

  const reqBody: any = {
    requestTime: Date.now(),
    bizContent: JSON.parse(requestForm.orderInfo)
  }

  const reqHeader: any = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Content-Language': 'en',
    'Partner-Id': merchantId,
    sign: encryptRsa(privateKey, reqBody)
  }
  showForm.reqHeader = JSON.stringify(reqHeader)
  showForm.reqBody = JSON.stringify(reqBody)
}

const getResponse = () => {
  placeOrder(JSON.parse(showForm.reqBody), JSON.parse(showForm.reqHeader)).then((res) => {
    console.log(res)
  })
}

const requestForm: any = reactive({
  merchantId: '',
  privateKey: '',
  orderInfo: ''
})
const showForm: any = reactive({
  reqHeader: '',
  reqBody: '',
  resBody: ''
})
</script>

<style scoped lang="scss">
.main-wrap {
  height: calc(100vh - 160px);
  background: #fff;
  width: 1160px;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  .sign-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20px;
  }
}
</style>
