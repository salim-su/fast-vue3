<script setup name="salimsu">
import { ref, reactive, toRefs, watch, inject } from 'vue';
import { onMounted } from 'vue';

defineProps({
  msg: String
});
const count = ref(0);
const info = reactive({ name: 'salimsuinfo', age: '18' });
const { name } = toRefs({ name: 'salimsuname' });
const names = inject('names');

watch(count, (currentValue, prevValue) => {
  console.log(currentValue);
  console.log(prevValue);
});

watch([() => info.name, () => info.age], ([c, v], [cc, vv]) => {
  console.log(c);
  console.log(v);
  console.log(cc);
  console.log(vv);
});
onMounted(() => {
  console.log('mounted===');
  console.log(count);
});

const emit = defineEmits(['msgChange']);
const msgFn = () => {
  emit('msgChange', 2);
};

const vMyDirective = {
  beforeMount: (el) => {
    // 在元素上做些操作
    console.log(el);
  },
  mounted: (el) => {
    console.log((el.innerText = 'snsnsn'));
  }
};
// console.log();

const inputVal = ref('');
const inputValLists = reactive([]);
const add = () => {
  inputValLists.push(inputVal.value);
  inputVal.value = '';
};
</script>

<template>
  <div>
    <h1>input表单</h1>
    <input type="text" v-model="inputVal" />
    <button @click="add">添加</button>
  </div>
  <div>
    <h1>toDoList</h1>
    <ul>
      <li v-for="item of inputValLists">{{ item }}</li>
    </ul>
  </div>

  <!--  <h1 v-my-directive>This is a Heading</h1>-->

  <h1 @click="msgFn">{{ msg }}</h1>

  <h2>{{ count }}</h2>

  <h3>{{ info.name }}</h3>
  <h3>{{ name }}</h3>
  <h3>{{ names }}</h3>

  <input type="text" v-model="name" />
  <br />
  <input type="text" v-model="count" />
  <br />
  <input type="text" v-model="info.name" />
  <br />
  <input type="text" v-model="info.age" />
  <br />
  <input type="text" v-model="msg" />

  <!--  <p>-->
  <!--    Recommended IDE setup:-->
  <!--    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>-->
  <!--    +-->
  <!--    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>-->
  <!--  </p>-->

  <!--  <p>-->
  <!--    <a href="https://vitejs.dev/guide/features.html" target="_blank">-->
  <!--      Vite Documentation-->
  <!--    </a>-->
  <!--    |-->
  <!--    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>-->
  <!--  </p>-->

  <!--  <button type="button" @click="count++">count is: {{ count }}</button>-->
  <!--  <p>-->
  <!--    Edit-->
  <!--    <code>components/HelloWorld.vue</code> to test hot module replacement.-->
  <!--  </p>-->
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
