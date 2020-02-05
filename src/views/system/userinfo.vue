<template>
<div style="padding:3px;">
  <div style="padding:5px;">
     <el-row >
       <div style="float:right;">
          用户编号：
          <el-input size="mini" v-model="userid" @keyup.enter.native="queryByUserIdOrName"></el-input>
          用户名称：
          <el-input size="mini" v-model="userName"></el-input>
          <el-button size="mini" @click="queryByUserIdOrName" type="primary">搜索</el-button>
          <el-button size="mini":loading="downloadLoading" @click="handleExcelDownload" type="primary">Excel</el-button>
       </div>
     </el-row>
 
  <el-row :gutter="5" style="margin-top:10px;">
    <el-col :span="4">
      <el-tree :data="teamList" :props="defaultProps" :expand-on-click-node="false" :default-expand-all="true" @node-click="handleNodeClick"></el-tree>
    </el-col>
    <el-col :span="20">
      <el-table :data="tableData"  size='small'  style="width: 100%;">
        <el-table-column prop="userid" label="用户编号" width="100"> </el-table-column>
        <el-table-column prop="userName" label="用户名称" width="120"> </el-table-column>
        <el-table-column prop="teamid" label="所属团队" width="120"  :formatter="show_Formatter"> </el-table-column>
        <el-table-column prop="roleid" label="用户角色" width="120" > </el-table-column>
        <el-table-column prop="weixin" label="微信" width="180"> </el-table-column>
        <el-table-column prop="email" label="邮箱" width="200"> </el-table-column>
        <el-table-column prop="sex" label="性别" width="120" :formatter="show_Formatter"> </el-table-column>
        <el-table-column prop="userstatus" label="状态" width="120" :formatter="show_Formatter"> </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalcount">
      </el-pagination>
    </el-col>
  </el-row>
   </div>
</div>
</template>
<script>
import { getUserList, getTeamList, getRoleList} from '@/api/table'
import { renderValue, renderTeamValue1, renderRoleValue} from '@/utils/function.mf2'
import { Message } from 'element-ui'
import Qs from "qs"
export default {
    name: 'UserInfo',
    data(){
        return{
            tableData: [],
            currentPage: 1,
            totalcount:0,
            userid: '',
            userName: '',
            searchform: {},
            teamList: [],
            teamList2: [],
            roleList: [],
            downloadLoading: false,
            defaultProps: {
              children: 'children',
              label: 'teamName'
            },
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
          this.teamList2 = response.resultlist
          this.teamList = this.arrayToTreedata(this.searchFromArray('0'))
        } else {
          Message.error(response.message)
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
        this.currentPage = 1
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
        console.log(JSON.stringify(this.params))
        getUserList(this.params).then((response) => {
          if (response.code == 'S') {
          this.tableData = response.resultlist,
          this.totalcount = response.totalcount
        } else {
          Message.error(response.messages)
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
          this.params.keylist=[]
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
          else if (columntype == 'userstatus'){
            return renderValue(row[columntype],'SystemPublic.Status');
          } 
          else if (columntype == 'teamid'){
            return renderTeamValue1(this.teamList2,row[columntype]);
          } 
          else if (columntype == 'roleid'){
            return renderRoleValue(this.roleList,row[columntype]);
          } 
      },
      handleExcelDownload(){
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['用户编号', '用户名称', '所属团队', '用户角色', '微信', '邮箱', '性别', '状态']
          const filterVal = ['userid', 'userName', 'teamid', 'roleid', 'weixin', 'email', 'sex', 'userstatus']
          const list = this.tableData
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '用户信息',
            autoWidth: true,
            bookType: 'xlsx'
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'teamid') {
            return renderTeamValue1(this.teamList,v[j]);
          }else if(j === 'sex'){
            return renderValue(v[j],'customer.sex');
          }else if(j === 'userstatus'){
            return renderValue(v[j],'SystemPublic.Status');
          }else if (j === 'roleid'){
            return renderRoleValue(this.roleList,v[j]);
          } else {
            return v[j]
          }
        }))
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
          this.teamList2.forEach(element => {
            if(element.upTeamId == key){
              res.push(element) 
            }
          })
          return res
        },
        handleNodeClick(data){
          let searchParams={}
          this.params.keylist=[]
          this.params.page="1"
          this.currentPage = 1
          for(var key in this.params){
            searchParams[key] = this.params[key];
          }
          searchParams.keylist.push({comparetype:"eq",key:"teamid",type:"",valuelist:[data.teamid]}) 
          getUserList(searchParams).then((response) => {
            if (response.code == 'S') {
              this.tableData = response.resultlist
              this.totalcount = response.totalcount
              console.log(this.currentPage)
            } else {
              Message.error(response.message)
            }

          }).catch((err) => {
            Message.error('Has Error')
          }); 
          
        }
  }
}
</script>
<style>
.el-input{
  width: 100px
}
/* .el-table td{
  padding:7px;
} */
</style>