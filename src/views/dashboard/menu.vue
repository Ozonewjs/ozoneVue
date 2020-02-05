<template>
<div>
  <div style="float:right;margin-top:3px;">
     <el-row style="margin-top:5px;margin-bottom:5px;">
          团队职能：
          <el-input size="mini" v-model="teamTitle" clearable></el-input>
          <el-button size="mini" @click="changExpand" type="primary">{{ close ? '折叠' : '展开' }}</el-button>
     </el-row>
  </div>
  <el-table  
        :data="tableData" 
        row-key="menuid"
        height="530"  
        style="width: 100%;" 
        border  
        :default-expand-all = 'close'
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column  prop="menuid" label="菜单编号"  width="180"></el-table-column>
    <el-table-column  prop="menuname"   label="菜单名称"  width="180"></el-table-column>
    <el-table-column  prop="sortno" label="排序号"width="180"></el-table-column>
    <el-table-column  prop="inputdate" label="创建时间" width="180"></el-table-column>
    <el-table-column  prop="remake" label="备注" width="180"></el-table-column>
    <el-table-column prop="status" label="状态" width="180"></el-table-column>
  </el-table>
</div>
</template>
<script>
import { queryMenus} from '@/api/user'
import { Message } from 'element-ui'
export default {
    name: 'TeamInfo',
    data(){
        return{
            tableData: [],
            teamName: '',
            leadername: '',
            teamTitle: '',
            close: true,
            menu_params:{
              keylist: null,
              operation:"total",
              page: "1",
              pagesize: "1000",
            },
        }
    },
    created(){
        queryMenus(this.menu_params).then(response => {
                if (response.code === 'S') {
                    // this.tableData = response.resultlist
                    this.tableData = this.arrayToTreedata(response.resultlist)
                    // console.log(JSON.stringify(this.arrayToTreedata(this.tableData)))
                }else{
                    Message.error(response.messages)
                }
                }).catch(error => {
                Message.error(error)
        });
    },
     
    methods:{

        arrayToTreedata(data){
            const menulevel1 = []
            const menulevel2 = []
            const res = []
            data.forEach(element => {
                if (element.menulevel == '1') {
                    menulevel1.push(element)
                } else {
                    menulevel2.push(element)
                }
            });
            menulevel1.forEach(element => {
                let level1 = {}
                let children = []
                menulevel2.forEach(item =>{
                    if (element.menuid == item.parentid) {
                        children.push(item)
                    } 
                })
                level1 = Object.assign({},level1, element);
                level1.children = children
                res.push(level1)
            })
           
            return res
        },
        changExpand() {
            this.$nextTick(() => {
                // this.set(data,close,!close)
                this.close = !this.close
                console.log(this.close)
                this.tableData = []
                queryMenus(this.menu_params).then(response => {
                    if (response.code === 'S') {
                        // this.tableData = response.resultlist
                        this.tableData = this.arrayToTreedata(response.resultlist)
                        // console.log(JSON.stringify(this.arrayToTreedata(this.tableData)))
                    }else{
                        Message.error(response.messages)
                    }
                    }).catch(error => {
                    Message.error(error)
                });
            })
            this.$forceUpdate()
        }
    
    },
  
}
</script>
<style>
.el-input{
  width: 180px
}
</style>