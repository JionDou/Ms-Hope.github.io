---
title: Vue3
icon: vue
prev: ../website/https.html
category: 基础
---

## Vue2 🆚 Vue3
响应式数据：vue2中通过Object.defineProperty实现。缺点：无法检测到对象属性动态添加和删除；无法检测数组的下标和length属性的变更；深度监听需要递归到底，较耗费性能。解决方案：vue2提供Vue.$set动态给对象添加属性，Vue.$delete动态删除对象属性；也可以通过splice解决数组中的问题，object.assign解决批量添加对象属性的问题；通过重写数组方法实现对数组的监听。
vue3中通过Proxy实现。优点：可以检测到代理对象属性的动态新增和删除；可以检测数组的下标和length属性的变化。缺点：es6的proxy不支持低版本的浏览器IE11，无法polyfill。
选项式API和组合式API：vue2中使用选项类型API(Options API)，选项式API在代码中分割了不同的属性，data，computed属性，methods，等等。vue3中使用合成型API，用方法(function)来分割，相对于选项型属性分割，代码更加简便和整洁。
```js
export default{
    props:{
        title: String
    },
    data(){
        return{
            username:'',
            password:''
        }
    },
    methods:{
        login(){
            // 登录方法
        }
    },
    components:{
        "buttonComponent":btnComponent
    },
    computed:{
        fullName(){
            return this.firstName + " " + this.lastName;
        }
    }
}
export default {
    props:{ title: String },
    setup(){
        const state = reactive({
            username:'',
            password:'',
            lowerCaseUsername:computed(() => state.username.toLowerCase()) // 计算属性
        })
        const login = () => {}
        return{
            login,
            state
        }
    }
}
```
## 生命周期钩子函数改变
###### Vue2--------------------Vue3
beforeCreate   -> setup() 开始创建组件之前，创建的是data和method <br/>
created        -> setup() <br/>
beforeMount    -> onBeforeMount   组件挂在到节点上之前执行的函数。<br/>
mounted        -> onMounted       组件挂载完成后执行的函数。<br/>
beforeUpdate   -> onBeforeUpdate  组件更新之前执行的函数。<br/>
updated        -> onUpdated       组件更新完成之后执行的函数。<br/>
beforeDestory  -> onBeforeUnmount 组件卸载之前执行的函数。<br/> 
destoryed      -> onUnmounted     组件卸载完成后执行的函数。<br/>
activited      -> onActivated     被包含在中的组件，会多出两个生命周期钩子函数，被激活时执行。<br/>
deactivted     -> onDeactivated   比如从A组件，切换到B组件，A组件消失时执行。<br/>

## 组件传参
父子传参：setup函数接受两个参数，props和context(包含attrs、slots、emit)。setup函数中的props是响应式的，当传入新的prop时，他将被更新。但是，因为props是响应式的，不能使用es6解构，会消除prop的响应性。可以通过使用setup函数中的toRefs来完成此操作。

父组件传子组件：
```vue
<!-- 父组件 -->
<template>
    <Son :msg="state.msg" />
</template>
<script>
import Son from "@components/transParams/Son";
import { reactive } from "vue";
export default {
    name: "Parent",
    components: {Son},
    setup(){
        const state = reactive({
            msg:'父组件传递给子组件的参数'
        });
        return{
            state
        }
    }
}
</script>
<!-- 子组件 -->
<template>
    <div>这是子组件</div>
    <div>这是父组件传递过来的值呀：{{msg}}</div>
</template>
<script>
export default {
    name:"Son",
    props:{
        msg:{
            type:String,
            default:''
        }
    },
    setup(props){
        return{
            console.log(props) //proxy {msg:'父组件传递给子组件的参数'}
        }
    }
}
</script>
```
子传父(emit event)

```vue
<template>
    <div>这里是父组件</div>
    <div>这是子组件传递过来的值呀：{{state.sonMsg}}</div>
    <hr/>
    <!-- 子传父：定义子组件emit时的函数sonSendMsg, 并且绑定到父组件中注册的receiveMessageFromSon函数 -->
    <Son @sonSendmsg="receiveMessageFromSon" :msg="state.msg" />
</template>
<script>
import Son from "@/components/transParams/Son";
import {reactive} from "vue";
export default {
    name:"Parent",
    components:{Son},
    setup(){
        const state = reactive({
            msg:'父组件传递给子组件的参数',
            sonMsg:''
        });
        //子传父：定义接受函数
        const receiveMessageFromSon = (data)=>{
            state.sonMsg = data.sonMsg
        }
        return {
            state,
            receiveMessageFromSon
        }
    }
}
</script>
<!-- 子组件 -->
<template>
    <div>这是子组件</div>
    <button @click="sendMsgToParent">向父组件传递数据</button>
    <div>这里是父组件传递过来的值呀：{{msg}}</div>
</template>
<script>
export default {
    name: "Son",
    //差别一：子组件向父组件传值要注册emits
    emits:['sonSendMsg'],
    props:{
        msg:{
            type:String,
            default:''
        }
    },
    setup(props,{ attrs, slots, emit }){
        const sendMsgToParent = () => {
            //差别二：向父组件传递参数：不再通过this.$emit触发函数
            emit('sonSendMsg',{
                sonMsg:'子组件传递过来的数据'
            })
        };
        return {
            sendMsgToParent
        }
    }
}
</script>
```



## Vue.js 教程目录

- [开发环境安装](core/install.md)

- [起步上手](core/get-started.md)

- [创建 Vue 应用](core/app.md)

- [模板语法](core/template.md)

- [Vue 单文件组件说明](core/sfc.md)

## Vue 生态

### Vue Router

- [Vue Router 概述](router/README.md)

<!-- TODO: Add pinia and vite -->

### 其他 Vue 生态

- [VuePress](https://vuepress-theme-hope.github.io/basic/vuepress/): 静态站点生成器；
- [Ant Design Vue](https://vue.ant.design/docs/vue/introduce-cn/): 阿里的一套 UI 组件库；
- [BootstrapVue](https://bootstrap-vue.js.org/)

## 官方文档

- [Vue.js 介绍](https://cn.vuejs.org/guide/introduction.html)

- [Vue.js API](https://cn.vuejs.org/api/)

---

- [Vue Router 介绍](https://router.vuejs.org/zh/guide/#html)

- [Vue Router API](https://router.vuejs.org/zh/api/)

## 其他文档

- [Vue 与小程序的异同](compare.md)
