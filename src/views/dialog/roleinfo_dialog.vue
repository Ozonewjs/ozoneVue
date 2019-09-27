<template>
<div>
    <el-dialog title = "角色信息" :visible.sync = "dialogVisible" 
                    :modal-append-to-body='false' :fullscreen = "false"  @close="close" width= "50%" center>
        <el-form ref= "roleInfoForm" :model= "roleInfoForm" label-width="150px" :label-position= "labelPosition"  style="margin-top:5px;">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="角色编号" prop="roleid" :required="true">
                        <el-input v-model= "roleInfoForm.roleid" style="solid: #409EFF;" @blur= 'summryMarkCheck'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="角色名称" prop="rolename"  :required="true">
                        <el-input v-model= "roleInfoForm.rolename" style="solid: #409EFF;"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="角色说明" prop="remark"  :required="true">
                        <el-input v-model= "roleInfoForm.remark"  type="textarea" :autosize="{ minRows: 2, maxRows: 4}" style="solid: #409EFF;"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if= "summrymark">
                <el-col :span="12">
                    <el-form-item label="意见汇总标志" prop="opinionsummrymark"  :required="true">
                        <el-radio v-model = "roleInfoForm.opinionsummrymark" label="Y">打开</el-radio>
                        <el-radio v-model = "roleInfoForm.opinionsummrymark" label="N">关闭</el-radio>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if= "confirmmark">
                <el-col :span="12">
                    <el-form-item label="意见汇总确认标志" prop="confirmOpinions"  :required="true">
                        <el-radio v-model = "roleInfoForm.confirmOpinions" label="Y">打开</el-radio>
                        <el-radio v-model = "roleInfoForm.confirmOpinions" label="N">关闭</el-radio>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="状态" prop="status"  :required="true">
                        <el-radio v-model = "roleInfoForm.status" label="1">正常</el-radio>
                        <el-radio v-model = "roleInfoForm.status" label="2">停用</el-radio>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="2" :offset="12">
                    <el-form-item>
                        <el-button @click= "close">取 消</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="2" :offset="1">
                    <el-form-item>
                        <el-button type="primary" size="medium" @click="onSubmit('roleInfoForm')">保存</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-transfer
            v-model= "roelmenu_data"
            :titles="['可选权限', '已拥有权限']"
            :props="{
            key: 'menuid',
            label: 'menuname'
            }"
            :render-content= "renderFunc"
            :data= "allroelmenu_data">
        </el-transfer>
    </el-dialog> 
</div>
</template>
<script>
import {Message} from 'element-ui'
import {roleUpdate, saveUserMenu} from '@/api/table'
export default {
    props: {
        props_roleInfoForm: {
            roleid: '',
            rolename: '',
            remark: '',
            status: '',
        },
        props_creditSuggest_dialogVisible: false,
        props_roelmenu: Array,
        props_no_roelmenu: Array,
    },
    computed: {
        dialogVisible: {
            get() {
                return this.props_creditSuggest_dialogVisible
            },
            set(){
            }
        },
        roleInfoForm: {
            get() {
                return this.props_roleInfoForm
            },
            set(){
            }
        },
        roelmenu: {
            get() {
                return this.props_roelmenu
            },
            set(){
            }
        },
        allroelmenu: {
            get() {
                return this.props_no_roelmenu
            },
            set(){
            }
        },
    },
    data(){
        return{
            labelPosition: 'right',
            summrymark: false,
            confirmmark: false,
            allroelmenu_data: [],
            roelmenu_data: [],
        }
    },
    methods:{
        close(){
            this.$refs.roleInfoForm.resetFields()
            this.summrymark= false,
            this.confirmmark= false,
            this.$emit('colseDialog')
        },
        async onSubmit(formName){
            var formdata ={
                role: this[formName]
            }
            let rolemenures= []
            this.allroelmenu_data.forEach(menu =>{
                const temp = {...menu}
                if (this.checkrolemenu(temp, this.roelmenu_data)) {
                    temp.roleid = formdata.role.roleid
                    rolemenures.push(temp)
                } 
            })
            let a, b
            let i = 0
            this.$refs[formName].validate(async function(valid) {
                if (valid) {
                    i++
                }else{
                    Message.error('数据填写不完整！！')
                } 
            })
            if (i>0) {
                a = await this.saveformdata(formName, formdata)
            }
            b = await this.saveMenuRole(formdata.role.roleid, rolemenures)
            if ( a && b) {
                Message.success('保存成功')
            } else {
                Message.error('保存失败')
            }

        },
        saveformdata(formName, formdata){
            return new Promise((resolve, reject)=>{
                let res
                roleUpdate(formdata).then((response) => {
                    if (response.code == 'S') {
                        res = true
                    }else{
                        res = false; 
                    }
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        saveMenuRole(roleid,menuroles){
            return new Promise((resolve, reject)=>{
                let params = {
                    roleid: roleid,
                    menuroles: menuroles
                }
                let res
                saveUserMenu(params).then((response) => {
                    if (response.code == 'S') {
                        res = true
                    } else {
                        res = true
                    }
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        checkrolemenu(temp, menus){
            let checkres = 0
            menus.forEach( menuid =>{
                if (menuid === temp.menuid) {
                    checkres++
                }
            })
            if (checkres > 0) {
                return true
            } else {
                return false
            }
        },
        summryMarkCheck(){
            if (this.roleInfoForm.roleid === '60300') {
                this.summrymark = true
                this.confirmmark = false
            }else if (this.roleInfoForm.roleid === '60400') {
                this.summrymark = false
                this.confirmmark = true
            }

        },
        handleChange(value, direction, movedKeys){
            console.log(value, direction, movedKeys);
        },
        renderFunc(h, option){
            return <span>{ option.menuid } - { option.menuname } - {option.remark}</span>;
        },
        putroelmenudata(){
            this.roelmenu_data = this.roelmenu
        },
        putallroelmenudata(){
            this.allroelmenu_data = this.allroelmenu
        }
    },
    created(){
        // console.log("roleInfoForm========"+JSON.stringify(this.roleInfoForm))
    },
    watch:{
        roleInfoForm:{
            handler(val, oldVal){
                this.summryMarkCheck();
            },
        },
        roelmenu:{
            handler(val, oldVal){
                this.putroelmenudata();
            },
        },
        allroelmenu:{
            handler(val, oldVal){
                this.putallroelmenudata();
            },
        }
    }

}
</script>
<style>
.el-transfer-panel{
    width: 300px
}
</style>