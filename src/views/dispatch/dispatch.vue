<template>
  <nut-searchbar v-model="state.searchValue">
    <template v-slot:rightout>
      <nut-icon size="20" name="search2" @click="clickAlter"></nut-icon>
    </template>
  </nut-searchbar>
  <!--  <div class="box"></div>-->

  <div class="w flex justify-content-center">
    <div class="pc-bg cfff">
      <div class="flex w justify-content-between pl20 pr20">
        <div class="mt50 flex align-items-center">
          <span class="fs14">计划车辆 :</span>
          <span class="fs20 pl5">{{ dispatchCount }}</span>
        </div>
        <div class="mt50 flex align-items-center">
          <span class="fs14">已选车辆 :</span>
          <span class="fs20 pl5">{{ realCount }}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="infinitebody">
    <ul class="infiniteUl" id="refreshScroll">
      <nut-infiniteloading
        pull-icon="loading"
        load-icon="loading"
        container-id="refreshScroll"
        :use-window="false"
        :is-open-refresh="true"
        :has-more="refreshHasMore"
        @load-more="refreshLoadMore"
        @refresh="refresh"
      >
        <template v-for="(item, index) in data.refreshList" :key="index">
          <div class="flex w align-items-center infiniteLi-top">
            <div class="infiniteLi flex w">
              <div class="fs20 fw" style="color: #ecdab6">{{ index + 1 }} 、</div>
              <div class="tl">
                <div class="fs20 fw">{{ item?.licenseNumber }}</div>
                <div class="fs14 c999" v-if="item.inWorking">
                  <span>已派：</span>
                  {{ item?.inWorking }}
                </div>
              </div>
              <div class="flex1 flex justify-content-end">
                <nut-checkbox :disabled="checkFlag && !item.dispatch" label="复选框" v-model="item.dispatch" @change="changeBox(item, $event)"></nut-checkbox>
              </div>
            </div>
          </div>
        </template>
      </nut-infiniteloading>
    </ul>
  </div>
</template>
<!--shipName: "阿托恩"-->
<!--truckId: "1469963427388182529"-->
<script type="ts" setup>
import { onMounted, reactive, ref } from "vue";


import router from "@/router";
import { dispatchCar, listTruck, unDispatchCar } from "@/api";
import { Toast } from "@nutui/nutui";

const groupId = ref("");
const checkFlag = ref(false);
const salimsu = ref("");
const dispatchCount = ref(0);
const realCount = ref(0);
const planId = ref("");
const refreshHasMore = ref(true);
const state = reactive({
  tab1value: "0"
});
const qureyFrom = reactive({
  current: 1,
  size: 10,
  groupId: "",
  planId: ""
});
const data = reactive({
  refreshList: []
});
onMounted(() => {

  groupId.value = router.currentRoute.value.query.groupId;
  planId.value = router.currentRoute.value.query.planId;
  dispatchCount.value = router.currentRoute.value.query.dispatchCount;
  realCount.value = router.currentRoute.value.query.realCount;
  if (parseInt(realCount.value) >= parseInt(dispatchCount.value)) {
    checkFlag.value = true;
  }
  console.log(groupId.value);
  console.log(planId.value);
  console.log(dispatchCount.value);
  console.log(realCount.value);
  qureyFrom.groupId = groupId.value;
  qureyFrom.planId = planId.value;
  initTab1();
  console.log(salimsu);
});
const changeBox = (item, e) => {
  console.log(item);
  console.log(e);
  const postData = {
    truckId: item.truckId,
    planId: planId.value
  };
  console.log(postData);
  if (e) {
    dispatchCar(postData).then(res => {
      realCount.value++;
      if (realCount.value >= dispatchCount.value) {
        checkFlag.value = true;
      }else{
        checkFlag.value = false;
      }
      Toast.success("派车成功");
    }).catch(e=>{
      item.dispatch = false;
      console.log(e);
    });
  } else {
    unDispatchCar(postData).then(res => {
      realCount.value--;
      if (realCount.value >= dispatchCount.value) {
        checkFlag.value = true;
      }else{
        checkFlag.value = false;
      }
      Toast.success("解绑成功");
    });
  }
};
const clickAlter = () => {
  Toast.success("我是搜索");
};
const initTab1 = async () => {
  // alert('salimsu')
  // await apPage(qureyFrom).then(res => {
  await listTruck(qureyFrom).then(res => {
    console.log(res.success);
    if (res.success) {
      qureyFrom.current++;
      const { records, total } = res.data;
      data.refreshList = data.refreshList.concat(records);
      if (data.refreshList.length >= total) {
        refreshHasMore.value = false;
      }
    }
  });
};
const refresh = async (done) => {
  data.refreshList = [];
  qureyFrom.current = 1;
  refreshHasMore.value = true;
  await initTab1();
  done();
};
const refreshLoadMore = async (done) => {
  await initTab1();
  done();
};
</script>

<style scoped lang="less">
.infiniteUl {
  background: #ffffff;
  //height: 350px;
  height: 100%;
  width: 347px;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 auto;
  //background: #eee;
}

.infiniteLi {
  //margin-top: 10px;
  font-size: 14px;
  //color: rgba(100, 100, 100, 1);
  text-align: center;
  height: 100%;
  //line-height: 80px;
  //padding-left: 15px;
  //padding-right: 15px;
  border-bottom: 1px solid #cccccc;
  align-items: center;
}

.pc-bg {
  width: 347px;
  height: 89px;
  background-image: url('../../assets/img/pche-bg.png');
  background-size: cover;
}

.infinitebody {
  width: 100%;
  height: calc(100vh - 160px);
  //background: #41b6a6;
  //padding-left: 21px;
  //padding-right: 21px;
}
.infiniteLi-top {
  height: 70px;
  padding-left: 15px;
  padding-right: 15px;
}
.box {
  width: 375px;
  height: 50px;
  background: #41b6a6;
}
</style>
