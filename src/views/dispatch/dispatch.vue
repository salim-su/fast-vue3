<template>
  <nut-searchbar v-model="state.searchValue" @clear="clearEvent">
    <template v-slot:rightout>
      <nut-icon size="20" name="search2" @click="clickSearch"></nut-icon>
    </template>
  </nut-searchbar>

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
          <div class="flex w align-items-center infiniteLi-top posr">
            <div
              style="border-bottom-right-radius: 5px; border-top-right-radius: 5px; width: 5px; height: 50%; background: #d24443; position: absolute; left: 0"
              v-if="item?.isLocked"
            ></div>
            <div
              style="border-bottom-right-radius: 5px; border-top-right-radius: 5px; width: 5px; height: 50%; background: #789cf2; position: absolute; left: 0"
              v-if="item?.inWorking"
            ></div>

            <div class="infiniteLi flex w">
              <div class="fs20 fw" style="color: #ecdab6">
                <span>{{ index < 9 ? '0' + (index + 1) : index + 1 }} </span>

                、</div
              >
              <div class="tl">
                <div class="fs20 fw" :class="{ 'is-lock': item?.isLocked }">{{ item?.licenseNumber }}</div>
                <div class="fs14 c999" v-if="item.inWorking">
                  <span>已派：</span>
                  {{ item?.inWorking }}
                </div>
                <div v-if="item?.isLocked" style="color: #d24443">
                  <div class="fs14 pt5">
                    <span>锁定：</span>
                    <span>{{ item?.lockedTime }}</span>
                    <span> 日解锁</span>
                  </div>
                </div>
              </div>
              <div class="flex1 flex justify-content-end">
                <template v-if="!item?.isLocked">
                  <nut-checkbox :disabled="checkFlag && !item.dispatch" label="复选框" v-model="item.dispatch" @change="changeBox(item, $event)"></nut-checkbox>
                </template>
                <!--                <template v-if="!item?.isLocked"></template>-->
              </div>
            </div>
          </div>
        </template>
      </nut-infiniteloading>
    </ul>
  </div>
</template>
<script type="ts" setup>
import { onMounted, reactive, ref } from "vue";
import router from "@/router";
import { dispatchCar, listTruck, unDispatchCar } from "@/api";
import { Toast } from "@nutui/nutui";

const groupId = ref("");
const checkFlag = ref(false);
const dispatchCount = ref(0);
const realCount = ref(0);
const planId = ref("");
const refreshHasMore = ref(true);
const state = reactive({
  searchValue: ""
});
const qureyFrom = reactive({
  current: 1,
  size: 10,
  groupId: "",
  planId: "",
  keyword: ""
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
  qureyFrom.groupId = groupId.value;
  qureyFrom.planId = planId.value;
  initTab1();
});

const resetQureyForm = () => {
  qureyFrom.current = 1;
  qureyFrom.size = 10;
  qureyFrom.keyword = "";
};

const changeBox = (item, e) => {
  const postData = {
    truckId: item.truckId,
    planId: planId.value
  };
  if (e) {
    dispatchCar(postData).then(res => {
      realCount.value++;
      if (realCount.value >= dispatchCount.value) {
        checkFlag.value = true;
      } else {
        checkFlag.value = false;
      }
      Toast.success("派车成功");
    }).catch(e => {
      item.dispatch = false;
    });
  } else {
    unDispatchCar(postData).then(res => {
      realCount.value--;
      if (realCount.value >= dispatchCount.value) {
        checkFlag.value = true;
      } else {
        checkFlag.value = false;
      }
      Toast.success("解绑成功");
    });
  }
};
const clickSearch = () => {
  qureyFrom.keyword = state.searchValue;
  refresh();
};
const clearEvent = () => {
  resetQureyForm();
  refresh();
};
const initTab1 = async () => {
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
.is-lock {
  color: #acacac !important;
}
</style>
