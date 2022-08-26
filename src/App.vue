<template>
  <div id="app">
    <div class="container">
      <div 
        class="box" 
        v-for="item of imageData"  
        :key="item.id"
      >
        <div class="img">
          <img 
            v-lazy="item.src" 
            :alt="item.title"
          />
        </div>
        <div class="content">
          <h1 class="tt">{{ item.title }}</h1>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
/**
 * 自定义指令
 *    Vue.directive('lazy', {
 *      bind (el, bindings, vNode) {
 *        
 *      }
 *    })
 * 
 * const VueLazyload = {
 *    install (Vue, options) {
 *      Vue.directive('lazy', {
 *        bind
 *      })
 *    }
 * }
 */

export default {
  name: 'App',
  data () {
    return {
      imageData: []
    }
  },
  async mounted () {
    const res = await axios.get('http://localhost:3000/imgs');
    this.imageData = res.data;
  }
}
</script>

<style lang="scss">
  html,
  body,
  #app {
    margin: 0;
    padding: 0;
    height: 100%;
  }




  .container{
    width: 100%;
    height: 100%;
    overflow: auto;

    .box {
      position: relative;
      height: 300px;
      padding: 10px;
      border-bottom: solid 2px #ddd;

      .img {
        width: 300px;
        height: 300px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .content {
        position: absolute;
        padding-left: 320px;
        top: 0;
        left: 0;

        .tt {
          color: aqua;
        }

        .name {
          color: hotpink;
          font-size: 20px;
        }
      }
    }
  }
</style>
