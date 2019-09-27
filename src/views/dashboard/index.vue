<template>
    <el-row v-loading.fullscreen.lock= "loading">
        <TaskCard v-for="(o, key) in this.todolist" :key="key" :props_task_info = "o"></TaskCard>
    </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import TaskCard from '@/components/TaskCard'
import {queryUserTodoList} from '@/api/daily'
import { Message } from 'element-ui'
export default {
  name: 'Dashboard',
  components:{
    TaskCard
  },
  data(){
    return{
      todolist: [],
      loading: true
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods: {
    routerTo(){
      this.$router.push('/test/test1')
    }
  },
  created(){
    queryUserTodoList().then(response =>{
      // console.log("response====="+JSON.stringify(response))
      if (response.code === 'S') {
          this.todolist = response.todolist
          this.loading = false
        }else{
            Message.error(response.messages)
        }
        }).catch(error => {
        Message.error(error)
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
