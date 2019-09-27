<template>
    <div>
        <div style="float:right;padding:7px;">
            <el-row >
                角色编号：
                <el-input size="mini" v-model="roleId" clearable></el-input>
                角色名称：
                <el-input size="mini" v-model="roleName" clearable></el-input>
                角色说明：
                <el-input size="mini" v-model="remark" clearable></el-input>
                <el-button size="mini" @click="queryRes" type="primary">搜索</el-button>
                <el-button size="mini" @click="rowInfo('','')" type="primary">新增</el-button>
            </el-row>
        </div>
        <el-table  :data="tableData"  height="527"  style="width: 100%;" size='small' border v-loading="loading"  default-expand-all>
            <el-table-column  prop="roleid" label="角色编号"  width="180"></el-table-column>
            <el-table-column  prop="rolename"   label="角色名称"  width="200"></el-table-column>
            <el-table-column  prop="remark" label="角色说明" width="400"></el-table-column>
            <el-table-column  prop="status" label="状态" :formatter="show_Formatter" width="180"></el-table-column>
            <el-table-column  label="操作" width="120">
                <template slot-scope="scope">
                    <el-button  @click.native.prevent="rowInfo(scope.$index, scope.row)" type="text"  size="small">
                       详情
                    </el-button>
                </template>
            </el-table-column>
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
        <RoleInfoDialog 
            :props_roleInfoForm = "roleInfoForm" 
            :props_creditSuggest_dialogVisible = "creditSuggest_dialogVisible"
            :props_roelmenu = "rolemenu"
            :props_no_roelmenu = "allmenu"
            @colseDialog= "close">
        </RoleInfoDialog>
    </div>
</template>
<script>
import { getRoleList} from '@/api/table'
import { getMenus, queryMenus} from '@/api/user'
import { renderValue} from '@/utils/function.mf2'
import { Message } from 'element-ui'
import RoleInfoDialog from '../dialog/roleinfo_dialog'
export default {
    components: {
        RoleInfoDialog,
    },
    name: 'RoleInfo',
    data(){
        return{
            tableData: [],
            rolemenu: [],
            allmenu: [],
            roleId:'',
            roleName: '',
            remark: '',
            currentPage: 1,
            totalcount:0,
            loading: true,
            roleInfoForm: {
                roleid: '',
                rolename: '',
                remark: '',
                status: '',
            },
            creditSuggest_dialogVisible: false,
            dialogVisible: false,
            params:{
              keylist: null,
              operation:"total",
              page: "1",
              pagesize: "10",
            },
            menu_params:{
              keylist: null,
              operation:"total",
              page: "1",
              pagesize: "1000",
            },
        }
    },
    created(){
        getRoleList(this.params).then((response) => {
        if (response.code == 'S') {
          this.tableData = response.resultlist
          this.totalcount = response.totalcount
          this.loading = false
        } else {
          Message.error('Has Error')
        }
        }).catch((err) => {
            Message.error('Has Error')
        });
        queryMenus(this.menu_params).then(response => {
                if (response.code === 'S') {
                    this.allmenu = response.resultlist
                }else{
                    Message.error(response.messages)
                }
                }).catch(error => {
                Message.error(error)
        });
    },
    methods:{
        handleSizeChange(val) {
        this.params.pagesize = val ;
        this.params.page = "1" ;
        this.currentPage = 1
        getRoleList(this.params).then((response) => {
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
        getRoleList(this.params).then((response) => {
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
        queryRes(){
            this.params.keylist=[]
            if (this.roleId) {
                this.params.keylist.push({comparetype:'include',key:'roleid',type:'',valuelist:[this.roleId]});
            }
            if (this.roleName !== ''  ){
                this.params.keylist.push({comparetype:'include',key:'rolename',type:'',valuelist:[this.roleName]})
            }
            if (this.remark !== ''  ){
                this.params.keylist.push({comparetype:'include',key:'remark',type:'',valuelist:[this.remark]})
            }
            if(!this.teamName && this.leadername == '' && this.teamTitle == '') {
             Message.error('请输入查询条件');
            }
            this.tableData = [];
            getRoleList(this.params).then((response) => {
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
            if(columntype == 'status'){
                return renderValue(row[columntype],'SystemPublic.Status');
            }
        },
        rowInfo(index, row) {
            var menu_by_roleid = []
            if (row != '') {
                this.roleInfoForm = row; 
                if(this.roleInfoForm.roleid) {
                    getMenus(this.roleInfoForm.roleid).then(response => {
                        console.log("response.code======"+response.code)
                        if (response.code === 'S') {
                            menu_by_roleid = response.menus
                            this.allmenu.forEach( menu =>{
                                const temp = {...menu}
                                if (this.hasrolemenu(temp, menu_by_roleid)) {
                                    this.rolemenu.push(temp.menuid)
                                } 
                            })
                        }else{
                            Message.error(response.messages)
                        }
                    }).catch(error => {
                        Message.error(error)
                    })
                } 
            }
            this.creditSuggest_dialogVisible = true;
           
        },
        hasrolemenu(temp, menus){
            let checkres = 0
            menus.forEach( menu =>{
                if (menu.menuid === temp.menuid) {
                    checkres++
                }
            })
            if (checkres > 0) {
                return true
            } else {
                return false
            }
        },
        close(){
            this.creditSuggest_dialogVisible = false;
            this.roleInfoForm= {}
            this.rolemenu.splice(0,this.rolemenu.length),
            getRoleList(this.params).then((response) => {
                if (response.code == 'S') {
                    this.tableData = response.resultlist,
                    this.totalcount = response.totalcount
                } else {
                    Message.error('Has Error')
                }
            }).catch((err) => {
                Message.error('Has Error')
            });
        }
  }
}
</script>
