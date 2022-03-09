import Vue from 'vue'
import Vuex from 'vuex'
// 此模块暂时只需要使用getitem和setitem 所以只加载这两个
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

// 使用常量作为名字是因为此处的本地存储不仅仅需要存储,而且还需要用来访问这个,所以用一个常量,
// 这样的话不论是存还是访问,都只需要输这一个名字,防止会写错
const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  // VueX + 本地存储的操作,
  // VueX是为了让token能够在全局下直接调用
  // 本地存储是为了让其延长存储时间
  state: {
    // 初始化一个叫user的对象 用于存储当前登录用户的信息(token等数据)
    // 只有在登录成功之后 user 才可以设置数据,且要通过mutations修改数据(这是标准)
  
    // user: null,
    // 如果此处写的是null,那只有本地存储有token数据,但vue那儿没有存住
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    // 注释上面的原因是暂时不需要上面的功能了,因为对应的已经封装在storage.js中了
    
    user: getItem(TOKEN_KEY)
  },
  getters: {
  },
  mutations: {
    // 定义一个mutations函数 里面放入state的参数,这是规则
    // 而第二个参数则为data
    setUser (state, data) {
      // 给data传什么值,那么state就是什么值
      // 下一步需要考虑的是登陆成功之后,需要调用这个mutations,实现对statue里面的数据的修改
      state.user = data

      // 为了防止刷新丢失(因为VueX只能实现在运行过程中的token数据,但无法保证数据持久化),
      // 所以 我们需要把token数据备份到本地存储(使用本地存储技术)
      // 但本次存储只能存储字符串,所以需要把 对象转成字符串,最后再把用户登录的token数据放入本地存储
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      // 注释上面的原因是暂时不需要上面的功能了,因为对应的已经封装在storage.js中了
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
