<template>
<div>
  <div>
     <el-row style="margin-top:5px;margin-bottom:5px;">
          用户编号：
          <el-input v-model="userid"></el-input>
          用户名称：
          <el-input v-model="userName"></el-input>
          <el-button @click="queryByUserIdOrName" type="primary">搜索</el-button>
     </el-row>
  </div>
  <el-table :data="tableData" height="532"  border style="width: 100%">
    <el-table-column prop="userid" label="用户编号" width="120"> </el-table-column>
    <el-table-column prop="userName" label="用户名称" width="150"> </el-table-column>
    <el-table-column prop="teamid" label="所属团队" width="180"  :formatter="show_Formatter"> </el-table-column>
    <el-table-column prop="roleid" label="用户角色" width="150" > </el-table-column>
    <el-table-column prop="weixin" label="微信" width="180"> </el-table-column>
    <el-table-column prop="email" label="邮箱" width="200"> </el-table-column>
    <el-table-column prop="sex" label="性别" width="120" :formatter="show_Formatter"> </el-table-column>
    <el-table-column prop="userstatus" label="状态" width="120"> </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalcount">
    </el-pagination>
</div>
</template>
<script>
import { getUserList, getTeamList, getRoleList} from '@/api/table'
import { renderValue, renderTeamValue1, renderRoleValue} from '@/utils/function.mf2'
import { Message } from 'element-ui'
import Qs from "qs"
export default {
    name: 'WorkList',
    data(){
        return{
            tableData: [],
            currentPage: 1,
            totalcount:0,
            userid: '',
            userName: '',
            searchform: {},
            teamList: [],
            roleList: [],
            params:{
              keylist: [{comparetype:"eq",key:"userstatus",type:"",valuelist:["1","2"]}],
              operation:"total",
              page: "1",
              pagesize: "10",
            },
            params2:{
              keylist: null,
              operation:"total",
              page: "1",
              pagesize: "100",
            },
        }
    },
    created(){
      console.log("created=========userinfo")
      getUserList(this.params).then((response) => {
        if (response.code == 'S') {
          this.tableData = response.resultlist,
          this.totalcount = response.totalcount
        } else {
          Message.error('Has Error')
        }

      }).catch((err) => {
        Message.error('Has Error')
      });
      getTeamList(this.params2).then((response) => {
        if (response.code == 'S') {
          this.teamList = response.resultlist
        } else {
          Message.error('Has Error')
        }
      }).catch((err) => {
        Message.error('Has Error')
      });
      getRoleList(this.params2).then((response) => {
        if (response.code == 'S') {
          this.roleList = response.resultlist
        } else {
          Message.error('Has Error')
        }
      }).catch((err) => {
        Message.error('Has Error')
      });
    },
     
    methods:{
      handleSizeChange(val) {
        this.params.pagesize = val ;
        this.params.page = "1" ;
        this.currentPage = "1"
        getUserList(this.params).then((response) => {
          if (response.code == 'S') {
          this.tableData = response.resultlist,
          this.totalcount = response.totalcount
        } else {
          Message.error('Has Error')
        }
        }).catch((err) => {
          Message.error('Has Error')
        });
      },
      handleCurrentChange(val){
        this.params.page = val ;
        getUserList(this.params).then((response) => {
          if (response.code == 'S') {
          this.tableData = response.resultlist,
          this.totalcount = response.totalcount
        } else {
          Message.error('Has Error')
        }
        }).catch((err) => {
          Message.error('Has Error')
        });
      },
      queryByUserIdOrName(){
        this.params.keylist=[]
        if (this.userid) {
          this.params.keylist.push({comparetype:'include',key:'userid',type:'',valuelist:[this.userid]});
        }
        if (this.userName !== ''  ){
          this.params.keylist.push({comparetype:'include',key:'userName',type:'',valuelist:[this.userName]})
        }
        if(!this.userid && this.userName == '') {
           Message.error('请输入查询条件');
        }
         this.tableData = [];
        getUserList(this.params).then((response) => {
          if (response.code == 'S') {
          this.tableData = response.resultlist,
          this.totalcount = response.totalcount
        } else {
          Message.error('Has Error')
        }
        }).catch((err) => {
          Message.error('Has Error')
        });

      },
      show_Formatter(row, column){
          var columntype = column.property;
          if(columntype == 'sex'){
            return renderValue(row[columntype],'customer.sex');
          }
          else if (columntype == 'teamid'){
            return renderTeamValue1(this.teamList,row[columntype]);
          } 
          else if (columntype == 'roleid'){
            return renderRoleValue(this.roleList,row[columntype]);
          } 
      },
  }
}
</script>
<style>
.el-input{
  width: 180px
}
</style>