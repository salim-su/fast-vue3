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
        <nut-searchbar v-model="stateTab1.searchValue" @clear="clearEvent">
          <template v-slot:rightout>
            <nut-icon size="20" name="search2" @click="clickAlter"></nut-icon>
          </template>
        </nut-searchbar>
        <div class="tab1">
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
                      <div class="status-in" v-if="item.isWorking">
                        <div class="w h flex align-items-center pl10">
                          <div class="dot mr10"></div>
                          <span>作业中</span>
                        </div>
                      </div>
                      <div class="status-out" v-if="!item.isWorking">
                        <div class="w h flex align-items-center pl10">
                          <div class="dot mr10"></div>
                          <span>待派车</span>
                        </div>
                      </div>
                    </div>
                    <div class="tab1-body-c pl15 pr15">
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
                      <!--                      <button @click.stop="dispatch(item)">派车</button>-->
                      <nut-button plain type="info" @click="dispatch(item)">派车</nut-button>
                      <nut-button type="info" @click="done(item)">作业完成，解绑车辆</nut-button>
                    </div>
                  </div>
                </div>
              </template>
            </nut-infiniteloading>
          </ul>
        </div>
      </nut-tabpane>

      <nut-tabpane title="作业完结">
        <nut-searchbar v-model="stateTab1.searchValue">
          <template v-slot:rightout>
            <nut-icon size="20" name="search2" @click="clickAlter"></nut-icon>
          </template>
        </nut-searchbar>

        <div class="tab1">
          <ul class="infiniteUl" id="refreshScroll1">
            <nut-infiniteloading
              pull-icon="loading"
              load-icon="loading"
              container-id="refreshScroll1"
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
                    </div>
                    <div class="tab1-body-c pl15 pr15">
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
                          <div class="tr flex1 pche flex align-items-center justify-content-end"> [{{ item?.dispatchTruck ? item?.dispatchTruck : '-' }}]</div>
                        </div>

                        <div class="cell p5 flex">
                          <div class="tl">净重：</div>
                          <div class="tr flex1 jzhong flex align-items-center justify-content-end"> {{ item?.netWeight ? item?.netWeight + '吨' : '-' }} </div>
                        </div>

                        <div class="cell p5 flex">
                          <div class="tl">皮重：</div>
                          <div class="tr flex1 flex align-items-center justify-content-end"> {{ item?.tareWeight ? item?.tareWeight + '吨' : '-' }} </div>
                        </div>

                        <div class="cell p5 flex">
                          <div class="tl">毛重：</div>
                          <div class="tr flex1 flex align-items-center justify-content-end">
                            {{ item?.grossWeight ? item?.grossWeight + '吨' : '-' }}
                          </div>
                        </div>

                        <div class="cell p5 flex">
                          <div class="tl">车次：</div>
                          <div class="tr flex1 checi flex align-items-center justify-content-end"> {{ item?.times ? item?.times + '次' : '-' }} </div>
                        </div>
                        <div class="cell p5 flex">
                          <div class="tl">回皮：</div>
                          <div class="tr flex1 flex align-items-center justify-content-end"> {{ item?.tareTimes ? item?.tareTimes + '次' : '-' }} </div>
                        </div>
                      </div>
                    </div>
                    <div class="tab1-body-b flex justify-content-end p20">
                      <nut-button plain type="info" @click="dispatch(item)">派车</nut-button>
                    </div>
                  </div>
                </div>
              </template>
            </nut-infiniteloading>
          </ul>
        </div>
      </nut-tabpane>
      <nut-tabpane title="已归档">
        <nut-searchbar v-model="stateTab1.searchValue">
          <template v-slot:rightout>
            <nut-icon size="20" name="search2" @click="clickAlter"></nut-icon>
          </template>
        </nut-searchbar>
        <div class="tab1">
          <ul class="infiniteUl" id="refreshScroll2">
            <nut-infiniteloading
              pull-icon="loading"
              load-icon="loading"
              container-id="refreshScroll2"
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
                    </div>
                    <div class="tab1-body-c pl15 pr15">
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
                          <div class="tr flex1 pche flex align-items-center justify-content-end"> [{{ item?.dispatchTruck ? item?.dispatchTruck : '-' }}]</div>
                        </div>

                        <div class="cell p5 flex">
                          <div class="tl">净重：</div>
                          <div class="tr flex1 jzhong flex align-items-center justify-content-end"> {{ item?.netWeight ? item?.netWeight + '吨' : '-' }} </div>
                        </div>

                        <div class="cell p5 flex">
                          <div class="tl">皮重：</div>
                          <div class="tr flex1 flex align-items-center justify-content-end"> {{ item?.tareWeight ? item?.tareWeight + '吨' : '-' }} </div>
                        </div>

                        <div class="cell p5 flex">
                          <div class="tl">毛重：</div>
                          <div class="tr flex1 flex align-items-center justify-content-end">
                            {{ item?.grossWeight ? item?.grossWeight + '吨' : '-' }}
                          </div>
                        </div>

                        <div class="cell p5 flex">
                          <div class="tl">车次：</div>
                          <div class="tr flex1 checi flex align-items-center justify-content-end"> {{ item?.times ? item?.times + '次' : '-' }} </div>
                        </div>
                        <div class="cell p5 flex">
                          <div class="tl">回皮：</div>
                          <div class="tr flex1 flex align-items-center justify-content-end"> {{ item?.tareTimes ? item?.tareTimes + '次' : '-' }} </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </nut-infiniteloading>
          </ul>
        </div>
      </nut-tabpane>
    </nut-tabs>
  </div>
</template>

<script type="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { Toast } from "@nutui/nutui";
import { listPlanForGroup, workDone } from "@/api";
import router from "@/router";
import Router from "@/router";

/*生命周期*/
onMounted(() => {
  initTab1();
});
/*方法*/
const clearEvent = () => {
  resetQureyForm();
  refresh();
}
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
    query: {
      groupId: item?.groupId,
      planId: item?.planId,
      realCount: item?.realCount,
      dispatchCount: item?.dispatchCount
    }
  });
};
const done = (item) => {
  const { dispatchId } = item;
  workDone({ dispatchId }).then(res => {
    console.log(res);
    Toast.success("操作成功");
  });
};
const tabsChange = async (e) => {
  stateTab1.searchValue = "";
  if (e.title === "进行中") {
    qureyFrom.status = 0;
  }
  if (e.title === "作业完结") {
    qureyFrom.status = 1;
  }
  if (e.title === "已归档") {
    qureyFrom.status = 2;
  }
  data.refreshList = [];
  resetQureyForm();
  await refresh();
};
const resetQureyForm = () => {
  qureyFrom.current = 1;
  qureyFrom.size = 10;
  qureyFrom.keyword=''

};
const clickAlter = () => {
  console.log(stateTab1.searchValue);
  qureyFrom.keyword = stateTab1.searchValue;
  qureyFrom.current = 1;
  data.refreshList = [];
  refresh();
  // Toast.success("我是搜索");
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
  status: 0,
  keyword:''
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

    .status-in {
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
    .status-out {
      width: 90px;
      height: 30px;
      //line-height: 25px;
      background: #e78638;
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
  .jzhong,
  .checi {
    color: red;
  }
}
</style>
