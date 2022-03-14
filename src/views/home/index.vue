<template>
  <div class="home-container">
        <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar">
      <van-button 
      slot="title"
      type="info"
      size="small"
      round
      icon="search"  
      >搜索</van-button>
    </van-nav-bar> 

    <!-- 导航栏 -->
  </div>

</template>

<script>
export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.home-container {
  .van-nav__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
  }
}
</style>