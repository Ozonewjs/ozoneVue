<template>
<div>
  <div>
     <el-row style="margin-top:5px;margin-bottom:5px;">
          团队名称：
          <el-input size="mini" v-model="teamName" clearable></el-input>
          团队长名称：
          <el-input size="mini" v-model="leadername" clearable></el-input>
          团队职能：
          <el-input size="mini" v-model="teamTitle" clearable></el-input>
          <el-button size="mini" @click="queryByUserIdOrName" type="primary">搜索</el-button>
     </el-row>
  </div>
  <el-table  :data="tableData"  height="500"  style="width: 100%;"  border  default-expand-all>
    <el-table-column  prop="teamName" label="团队名称"  width="180"></el-table-column>
    <el-table-column  prop="teamid"   label="团队编号"  width="180"></el-table-column>
    <el-table-column  prop="sortno" label="排序号"></el-table-column>
    <el-table-column  prop="homeLocal" label="归属地"></el-table-column>
    <el-table-column prop="zipCode" label="邮编"></el-table-column>
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
import {getTeamList} from '@/api/table'
import { Message } from 'element-ui'
export default {
    name: 'TeamInfo',
    data(){
        return{
            tableData: [],
            currentPage: 1,
            totalcount:0,
            teamName: '',
            leadername: '',
            teamTitle: '',
            params:{
              keylist: null,
              operation:"total",
              page: "1",
              pagesize: "10",
            },
        }
    },
    created(){
      getTeamList(this.params).then((response) => {
        if (response.code == 'S') {
          this.tableData = response.resultlist
          this.totalcount = response.totalcount
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
        getTeamList(this.params).then((response) => {
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
        getTeamList(this.params).then((response) => {
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
        if (this.teamName) {
          this.params.keylist.push({comparetype:'include',key:'teamName',type:'',valuelist:[this.teamName]});
        }
        if (this.leadername !== ''  ){
          this.params.keylist.push({comparetype:'include',key:'leadername',type:'',valuelist:[this.leadername]})
        }
        if (this.teamTitle !== ''  ){
          this.params.keylist.push({comparetype:'include',key:'teamTitle',type:'',valuelist:[this.teamTitle]})
        }
        if(!this.teamName && this.leadername == ''&& this.teamTitle == '') {
           Message.error('请输入查询条件');
        }
        this.tableData = [];
        getTeamList(this.params).then((response) => {
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
    
      },
  
}
</script>
<style>
.el-input{
  width: 180px
}
</style>