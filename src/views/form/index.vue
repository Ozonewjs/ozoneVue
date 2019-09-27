<template>
  <div class="app-container">
    <el-row type="flex" justify="space-between" >
      <el-col :span='10' ><div style="float:right;">{{this.page_title}}</div></el-col>
      <el-col :span='14' >
        <div style="float:right;">
          <el-button v-for="(menu, key) in this.buttonmenulist" :key="key"  size="mini" >{{menu.menuName}}</el-button>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-tabs style="margin-top:10px;" v-model="activeName" :tab-position= "tabPosition = 'right'" @tab-click="handleClick">
      <el-tab-pane v-for="(menu, key) in this.bussinessmenulist" 
          :key="key" :label= "menu.menuName" 
          :name= "menu.menuNo">
          <div v-if= " menu.menuNo == '2105'">
            <scpglist :menu_props= 'menu'></scpglist>
          </div>
          <div v-else-if= " menu.menuNo == '12103' || menu.menuNo == '22103'">
            <investigationReport :menu_props= 'menu'></investigationReport>
          </div>
          <div v-else-if= " menu.menuNo == '3106'">
            <workflowopinion :menu_props= 'menu'></workflowopinion>
          </div>
          <div v-else>
            {{menu.menuNo}}
          </div>
      </el-tab-pane>
    </el-tabs>
    <div class="footer">
      <div class="gotop" v-show="gotop" @click="toTop">Top</div>
    </div>
  </div>
</template>

<script>
import {queryBusinessMenu} from '@/api/daily'
import { Message  } from 'element-ui'
import store from '@/store'
import scpglist from '@/components/BusinessLoans/scpg_list'
import workflowopinion from '@/components/WorkFlowOpinion/workflowopinion'
import investigationReport from '@/components/xfdcomponents/investigation_report'
export default {
  components:{
    scpglist,
    investigationReport,
    workflowopinion
  },
  data() {
    return {
      form:{
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        name: '',
      },
      page_title: '',
      activeName: '',
      menulist_params: {},
      bussinessmenulist: [],
      buttonmenulist: [],
      gotop: false,
    }
  },
  created(){
    this.page_title = store.getters.title
    this.menulist_params.customerid = store.getters.customerid
    this.menulist_params.objectno = store.getters.businessNo
    this.menulist_params.menutype = store.getters.menutype
    queryBusinessMenu(this.menulist_params).then(response =>{
      console.log(response.code)
      if (response.code === 'S') {
        response.businessmenulist.forEach(element => {
          if (element.menuType != "Function") {
            this.bussinessmenulist.push(element)
            if(element.readonly == "modify"){
              this.activeName = element.menuNo
            }

            if(this.activeName == '0'){
              this.activeName = element.menuNo
            }
          } else if(element.menuType == "Function" && !element.readonly) {
            this.buttonmenulist.push(element)
          }
        });

      }else{
          Message.error(response.messages)
        }
        }).catch(error => {
          Message.error(error)
    })
    if (this.activeName == '') {
      console.log("aaaaaaaaa")
    } 
   
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.label);
    },
    handleScroll() {
       let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
      scrolltop > 30 ? (this.gotop = true) : (this.gotop = false);
    },
    toTop() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果 
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    }
  },
  activated(){
    // console.log("activated====")
  },
  beforeDestroy(){
    // console.log('beforeDestroy========'+ JSON.stringify(this.$route.meta))
    console.log("visitedViews========="+JSON.stringify(store.getters.cachedViews[1]))
    // this.$store.dispatch('taskcard/releasetaskist')
  },
  mounted() {
　　// 此处true需要加上，不加滚动事件可能绑定不成功
    window.addEventListener("scroll", this.handleScroll, true);
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.footer .gotop {
  text-align: center;
  position: fixed;
  right: 50px;
  bottom: 30px;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  background: #e8e8e8;
  color: #000000;
}

</style>

