<template>
  <div class="test">
    <!--    <ul class="infiniteUl" id="refreshScroll">
      <nut-infiniteloading
        pull-icon="JD"
        container-id="refreshScroll"
        :use-window="false"
        :is-open-refresh="true"
        :has-more="refreshHasMore"
        @load-more="refreshLoadMore"
        @refresh="refresh"
      >
        <li class="infiniteLi" v-for="(item, index) in data.refreshList" :key="index">{{ item.id }}</li>
      </nut-infiniteloading>
    </ul>-->
    <nut-tabs v-model="state.tab1value" @change="tabsChange($event)">
      <nut-tabpane title="进行中">
        <!--        <nut-searchbar v-model="state1.searchValue"></nut-searchbar>-->
        <nut-searchbar v-model="stateTab1.searchValue">
          <template v-slot:rightout>
            <nut-icon size="20" name="search2" @click="clickAlter"></nut-icon>
          </template>
        </nut-searchbar>
        <div class="tab1" v-if="showPanelTan1">
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
                <!--                <li class="infiniteLi">{{ item.apEnt }}</li>-->
                <div class="infiniteLi">
                  <div class="tab1-body">
                    <!--                    {{ item.id }}-->
                    <div class="tab1-body-t posr">
                      <div class="tips-bg flex align-items-center pl15">
                        <img src="../../assets/img/bz.svg" alt="" width="15" />
                        <span style="color: #a16723" class="ml10 fw">
                          <span>{{ item?.areaName }}</span>
                          <span>-</span>
                          <span>{{ item?.bizNo }}</span>
                        </span>
                      </div>
                      <div class="status">
                        <div class="w h flex align-items-center pl10">
                          <div class="dot mr10"></div>
                          <span>作业中</span>
                        </div>
                      </div>
                    </div>
                    <div class="tab1-body-c pl10 pr10">
                      <div class="tab1-body-c-content p10">
                        <div class="cell p5 flex">
                          <div class="tl">船名：</div>
                          <div class="tr flex1">{{ item?.shipName ? item?.shipName : '-' }}</div>
                        </div>

                        <div class="cell p5 flex">
                          <div class="tl">作业类型：</div>
                          <div class="tr flex1">{{ item?.operationModeName ? item?.operationModeName : '-' }}</div>
                        </div>

                        <div class="cell p5 flex">
                          <div class="tl">分票标记：</div>
                          <div class="tr flex1">{{ item?.billNo ? item?.billNo : '-' }}</div>
                        </div>

                        <div class="cell p5 flex">
                          <div class="tl">货名：</div>
                          <div class="tr flex1">{{ item?.cargoName ? item?.cargoName : '-' }}</div>
                        </div>

                        <div class="cell p5 flex">
                          <div class="tl">派车：</div>
                          <div class="tr flex1 pche flex align-items-center justify-content-end"> [{{ item?.dispatchTruck ? item?.dispatchTruck : '-' }}] </div>
                        </div>
                        <div class="cell p5 flex">
                          <div class="tl">车队：</div>
                          <div class="tr flex1 pche flex align-items-center justify-content-end"> [{{ item?.groupName ? item?.groupName : '-' }}] </div>
                        </div>
                      </div>
                    </div>
                    <div class="tab1-body-b flex justify-content-between p10">
                      <nut-button plain type="info" @click="dispatch(item)">派车</nut-button>
                      <nut-button type="info">作业完成，解绑车辆</nut-button>
                    </div>
                  </div>
                </div>
              </template>
            </nut-infiniteloading>
          </ul>
        </div>
      </nut-tabpane>

      <nut-tabpane title="作业完结">
        <nut-searchbar v-model="stateTab2.searchValue">
          <template v-slot:rightout>
            <nut-icon size="20" name="search2" @click="clickAlter"></nut-icon>
          </template>
        </nut-searchbar>

        <div class="tab1" v-if="showPanelTan2">
          <ul class="infiniteUl" id="refreshScroll1">
            <nut-infiniteloading
              pull-icon="loading"
              container-id="refreshScroll1"
              :use-window="false"
              :is-open-refresh="true"
              :has-more="refreshHasMore"
              @load-more="refreshLoadMore"
              @refresh="refresh"
            >
              <li style="color: red" class="infiniteLi" v-for="(item, index) in data.refreshList" :key="index">
                {{ item.apEnt + 111111 }}
              </li>
            </nut-infiniteloading>
          </ul>
        </div>
      </nut-tabpane>
      <nut-tabpane title="已归档"> Tab 3</nut-tabpane>
    </nut-tabs>
  </div>
</template>

<script type="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { Toast } from "@nutui/nutui";
import { apPage, listPlanForGroup } from "@/api";
import router from "@/router";
import Router from "@/router";

/*生命周期*/
onMounted(() => {
  initTab1();
  console.log(data.refreshList.length);

  // const postData = {
  //   status: 0,
  //   size: 10,
  //   current: 1
  // };
  // listPlanForGroup(postData).then(res => {
  //   console.log(res);
  // });
});
/*方法*/

/*
* router 两种传参方式组合
* 1、name: 'Dispatch',params: { id: '1'},路由中添加/:id
* 2、path: '/dispatch',query: { queryId:  '3' } 正常路由
* */
const dispatch = (item) => {
  // console.log(item?.groupId);
  // router.push({ name: 'Dispatch', params: { userId: 123 }})
  console.log(item);
  router.push({
    path: "/dispatch",
    query: { groupId: item?.groupId,planId:item?.planId,realCount:item?.realCount,dispatchCount:item?.dispatchCount }
  });
};
const tabsChange = async (e) => {
  console.log(e);

  if (e.title === "进行中") {
    data.refreshList = [];
    resetQureyForm();
    qureyFrom.status = 0;
    await refresh();
    showPanelTan1.value = true;
    showPanelTan2.value = false;
  }

  if (e.title === "作业完结") {
    data.refreshList = [];
    resetQureyForm();
    qureyFrom.status = 1;
    refresh();
    showPanelTan2.value = true;

    // setTimeout(res=>{
    //   showPanelTan2.value = true
    // },2000)
  }
};
const resetQureyForm = () => {
  qureyFrom.current = 1;
  qureyFrom.size = 10;

};
const clickAlter = () => {
  Toast.success("我是搜索");
};
const refreshLoadMore = async (done) => {

  await initTab1();
  done();

  // setTimeout(async () => {
  //   await initTab1();
  //   done();
  // }, 500);
};
const initTab1 = async () => {
  // alert('salimsu')
  // await apPage(qureyFrom).then(res => {
  await listPlanForGroup(qureyFrom).then(res => {
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
  // setTimeout(async () => {
  //   // Toast.success("刷新成功");
  //
  // }, 500);

  data.refreshList = [];
  qureyFrom.current = 1;
  refreshHasMore.value = true;
  await initTab1();
  done();

};
/*属性*/

const stateTab1 = reactive({
  searchValue: ""
});
const stateTab2 = reactive({
  searchValue: ""
});
const state = reactive({
  tab1value: "0"
});
const qureyFrom = reactive({
  current: 1,
  size: 10,
  status: 0
});
const refreshHasMore = ref(true);
const data = reactive({
  refreshList: []
});
const showPanelTan1 = ref(true);
const showPanelTan2 = ref(false);
const showPanelTan3 = ref(false);
</script>
<style scoped lang="less">
.style {
  width: 100%;
  height: 50px;
  background: #41b6a6;
}

.infiniteUl {
  //height: 250px;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;
  //background: #eee;
}

.infiniteLi {
  margin-top: 10px;
  font-size: 14px;
  //color: rgba(100, 100, 100, 1);
  text-align: center;
  height: auto;
  //line-height: 80px;
  padding-left: 15px;
  padding-right: 15px;
}

.tab1-body {
  width: 100%;
  //height: 200px;
  height: auto;
  background: #ffffff;
  box-shadow: 0 1px 7px #edeef1;

  .tab1-body-t {
    height: 50px;
    //background: #6e6e6e;
    .tips-bg {
      width: 147px;
      height: 38px;
      background-image: url('../../assets/img/l-tips.png');
      background-size: cover;
    }

    .status {
      width: 90px;
      height: 30px;
      //line-height: 25px;
      background: #83c946;
      position: absolute;
      right: -5px;
      top: 10px;
      border-radius: 3px;
      color: #ffffff;

      .dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #ffffff;
        box-shadow: 0 1px 1px #f7f7f7;
      }
    }
  }

  .tab1-body-c {
    height: auto;

    .tab1-body-c-content {
      background: #f9f9f9;
    }
  }

  .tab1-body-b {
  }
}

.test {
  //height: calc(100vh - 200px);
  height: calc(100vh);
  width: 100%;
  //background: #41b6a6;
  overflow: auto;
  //position: fixed;
  //left: 0;
  .nut-tabs__titles {
    font-size: 20px !important;
    //position: fixed;
    //left: 0;
    //top: 0;
  }

  .nut-tabs__titles-item__text {
    font-size: 20px !important;
  }

  .tab1 {
    width: 100%;
    height: calc(100vh - 100px);
    overflow: auto;
    //background: #6e6e6e;
  }
}

.cell {
  .tl {
    color: #666666;
    font-size: 16px;
  }

  .tr {
    font-weight: 500;
    font-size: 16px;
    word-break: break-all;
  }

  .pche {
    color: #5275c9;
    font-weight: 500;
  }
}
</style>
