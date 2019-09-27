<template>
    <div class="panel">
      <el-card class="box-card" shadow="hover" :body-style="{ padding: '0px' }" @click.native= "routerTo" >
          <div class="image" v-if="this.props_task_info.timeout == '1'"
              >
              <!-- :class= "{panel_header:this.props_task_info.timeout == '1'}" -->
              <span style="line-height:30px;">{{this.props_task_info.objecttypename}}</span>
          </div>
          <div class="image2" v-else
              >
              <!-- :class= "{panel_header:this.props_task_info.timeout == '1'}" -->
              <span style="line-height:30px;">{{this.props_task_info.objecttypename}}</span>
          </div>
          <div class="text item" v-if= 'this.props_task_info.beginTime'> 
              {{'开始时间:'+this.props_task_info.beginTime}} 
              <el-divider></el-divider>
          </div>
          
          <div class="text item" v-if= 'this.props_task_info.customername'> {{'客户名称:'+this.props_task_info.customername}}<el-divider></el-divider> </div>
          
          <div class="text item" v-if= 'this.props_task_info.familyadd'> {{'登记地址:'+this.props_task_info.familyadd}} <el-divider></el-divider></div>
          
          <div class="text item" v-if= 'this.props_task_info.businesssum'> {{'申请金额:'+this.props_task_info.businesssum}}  <el-divider></el-divider></div>
         
          <div class="text item" v-if= 'this.props_task_info.level3'> {{'产品:'+this.props_task_info.level3}} <el-divider></el-divider></div>
          
          <div class="text item" v-if= 'this.props_task_info.credituser'> {{'客户经理:'+this.props_task_info.credituser}} <el-divider></el-divider></div>
          
          <div class="text item" v-if= 'this.props_task_info.inputuserteam'> {{'所属支行:'+this.props_task_info.inputuserteam}} </div>
      </el-card>
    </div>  
</template>
<script>
export default {
  props:{
    props_task_info:Object,
  },
  methods:{
   routerTo(){
      // console.log(this.props_task_info.businessNo)
      let card_params = {
          businessNo: this.props_task_info.businessNo,
          menutype: this.props_task_info.menutype,
          customerid: this.props_task_info.customerid,
          customername: this.props_task_info.customername,
          title: this.props_task_info.objecttypename
      }
      // console.log('card_params======='+JSON.stringify(card_params))
      this.$store.dispatch('taskcard/gettaskist',card_params)
      this.$router.push({
        // name:'/test/test1',
        name:'todolist',
        params: {
          title: this.props_task_info.objecttypename,
        }
      })
    }
  }
}
</script>
<style>
.panel{
  position:relative;
  float:left; 
  margin-top:15px;
  margin-left:10px;
  width:24%;
  height: 290px;
}
.panel_header{
  background-color:pink
}
.panel_header_0{
  background-color:#dddddd
}
.image {
    width: 100%;
    position: relative;
    display: block;
    background-color:pink;
    /* text-align: center; */
    height: 30px;
    /* display:block; */
  }
.image2 {
    width: 100%;
    position: relative;
    display: block;
    background-color:#dddddd;
    /* text-align: center; */
    height: 30px;
    /* display:block; */
  }
  .text {
    font-size: 14px;
    padding: 5px
  }

  .item {
    margin-bottom: 3px;
    margin-left: 10px
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 320px;
    height: 275px;
  }

  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 3px 0;
}
</style>