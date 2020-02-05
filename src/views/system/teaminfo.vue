<template>
<div>
  <div style="float:right;margin-top:3px;">
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
  <el-table  
        :data="tableData" 
        row-key="teamid"
        style="width: 100%;" 
        :default-expand-all = 'expand'
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column  prop="teamName" label="团队名称"  width="180"></el-table-column>
    <el-table-column  prop="teamid"   label="团队编号"  width="180"></el-table-column>
    <el-table-column  prop="sortno" label="排序号"></el-table-column>
    <el-table-column  prop="homeLocal" label="归属地"></el-table-column>
    <el-table-column prop="zipCode" label="邮编"></el-table-column>
  </el-table>
</div>
</template>
<script>
import {getTeamList} from '@/api/table'
import { Message } from 'element-ui'
export default {
    name: 'TeamInfo',
    data(){
        return{
            defaultProps: {
            children: 'children',
            label: 'teamName'
            },
            tableData: [],
            tableData2: [],
            teamName: '',
            expand: true,
            leadername: '',
            teamTitle: '',
            params:{
              keylist: null,
              operation:"total",
              page: "1",
              pagesize: "100",
            },
        }
    },
    created(){
      getTeamList(this.params).then((response) => {
        if (response.code == 'S') {
          this.tableData2 = response.resultlist
          this.tableData = this.arrayToTreedata(this.searchFromArray('0'))
        } else {
          Message.error('Has Error')
        }
      }).catch((err) => {
        Message.error('Has Error')
      });
    },
     
    methods:{
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
          this.tableData = response.resultlist
        }else {
          Message.error('Has Error')
        }
        }).catch((err) => {
          Message.error('Has Error')
        });

      },
      arrayToTreedata(data){
            var res = []
            data.forEach(element => {
              let dep = {}
              dep = Object.assign({},dep,element)
              if (element!=null) {
                  var child = this.searchFromArray(element.teamid)
                  if (child!=null && child.length>0) {
                    dep.children = this.arrayToTreedata(child)
                  }
              }
              res.push(dep)
            });
            return res
        },
        searchFromArray(key){
          var res = []
          this.tableData2.forEach(element => {
            if(element.upTeamId == key){
              res.push(element) 
            }
          })
          return res
        },
      },
  
}
</script>
<style>
.el-input{
  width: 180px
}
</style>