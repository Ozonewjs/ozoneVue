<template>
<div style="text-align:center;" v-loading.fullscreen.lock= "loading" >
    <table border="1" cellpadding="10" class="table_a">
        <caption style="font-size:30px;">经营性贷款审查评估表</caption>
        <tr class="tr_a">
            <td colspan="2">客户姓名</td>
            <td>{{this.mapData.customername}}</td>
            <td colspan="2">身份证号码</td>
            <td colspan="2">{{this.mapData.certid}}</td>
        </tr>
        <tr class="tr_a">
            <td  colspan="2">经办机构</td>
            <td  colspan="2">{{this.mapData.teamname}}</td>
            <td colspan="1">经办客户经理姓名</td>
            <td colspan="2">{{this.mapData.username}}</td>
        </tr>
        <tr class="tr_a">
            <td  colspan="2" rowspan="2">审查材料</td>
            <td  colspan="2">资料详情</td>
            <td colspan="3">审查情况评价</td>
        </tr>
        <tr class="tr_a">
            <td>有无该材料</td>
            <td style="width:200px;">备注</td>
            <td>完整性评价</td>
            <td>可信度评价</td>
            <td>可信度说明</td>
        </tr>
        <template v-for="(item, i) in this.map">
        <tr class="tr_b" v-for="(iteminfo, index) in item"  >
        <th :rowspan= "item.length" v-if = " index == 0">{{iteminfo.gategoryname}}</th>
        <td>{{iteminfo.subgategoryname}}</td>
        <td class="td_a input_width">
            <template>
                <el-select v-model = "iteminfo.materialGetStyle" size='mini'  placeholder="请选择" >
                    <el-option
                    v-for="item in materialGetStyle_options"
                    :key="item.itemno"
                    :label="item.itemname"
                    :value="item.itemno">
                    </el-option>
                </el-select>
            </template>
        </td>
        <td class="td_a"><template><el-input v-model="iteminfo.proofDocument" type="textarea" size="mini"/></template></td>
        <td class="td_a input_width">
            <template>
                <el-select v-model="iteminfo.completenessEstimate" size='mini'  placeholder="请选择" >
                    <el-option
                    v-for="item in completenessEstimate_options"
                    :key="item.itemno"
                    :label="item.itemname"
                    :value="item.itemno">
                    </el-option>
                </el-select>
            </template>
        </td>
        <td class="td_a input_width">
            <template>
                <el-select v-model="iteminfo.reliablity" size='mini'  placeholder="请选择" >
                    <el-option
                    v-for="item in reliablity_options"
                    :key="item.itemno"
                    :label="item.itemname"
                    :value="item.itemno">
                    </el-option>
                </el-select>
            </template></td>
        <td class="td_a"><template><el-input v-model="iteminfo.writecontent" type="textarea" size="mini"/></template></td>
        </tr>
        </template>
    </table>
    <el-form ref= "icm"  :model= "icm" style="width:80%; text-align:center;margin:20px auto;" label-width="150px">
        <el-form-item label="表内信息完整性" prop="tableMessageCompletable" :required="true">
            <el-input v-model= "icm.tableMessageCompletable" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="交叉检查力度" prop="examination" :required="true">
            <el-input v-model= "icm.examination" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="综合评价" prop="comprehensionEvaluation" :required="true">
            <el-input v-model= "icm.comprehensionEvaluation" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="审查经理" prop="username">
            <el-input v-model= "username" :disabled=" true" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click= "submit('icm')">保存</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
import {queryInverstigationComment, saveInverstigationComment} from '@/api/LoanInvestigate/loaninvestigate'
import { getSelectoption} from '@/utils/function.mf2'
import {Message} from 'element-ui'
export default {
    props:{
        menu_props:Object,
    },
    data(){
        return{
            materialGetStyle_options: [],
            completenessEstimate_options: [],
            reliablity_options: [],
            value: '',
            cardinfo: '准确',
            map: {},
            mapData: {},
            username: '',
            icm: {
                tableMessageCompletable: '',
                examination: '',
                comprehensionEvaluation: '',
                objectno: '',
                objecttype: '',
            },
            loading: true,
        }
    },
    created(){
        console.log("menu_props----------"+ JSON.stringify(this.menu_props))
        this.materialGetStyle_options =  getSelectoption('investigation.HaveNots')
        this.completenessEstimate_options =  getSelectoption('investigation.compliteNess')
        this.reliablity_options =  getSelectoption('investigation.reliablity')
        let params = {
           objectno :  this.menu_props.objectNo,
           objecttype :  this.menu_props.objecttype,
        }
        this.icm.objectno = this.menu_props.objectNo,
        this.icm.objecttype = this.menu_props.objecttype,
       
        queryInverstigationComment(params).then( response => {
            if (response.code == "S") {
                this.map = response.map
                this.mapData = response.mapData
                this.username = response.username
                this.icm = response.icm ? response.icm : this.icm
                this.loading = false
            } else {
                Message(response.messages)
            }
        })
    },
    methods:{
        submit(formName){
            let invCtms = []
            this.map.m0001.forEach(element => {
                invCtms.push(element)
            });
            this.map.m0002.forEach(element => {
                invCtms.push(element)
            });
            this.map.m0003.forEach(element => {
                invCtms.push(element)
            });
            var formdata ={
                customerAssess: this[formName],
                invCtms : invCtms
            }
             

            this.$refs[formName].validate( function(valid) {
                if (valid) {
                     saveInverstigationComment(formdata).then(response =>{
                         if (response.code == 'S') {
                            Message.success('保存成功')
                         } else {
                             Message.error(response.messages)
                         }
                     })
                }else{
                    Message.error('数据填写不完整！！')
                } 
            })
           
        }
    }
}
</script>
<style>
.table_a {
     width: 90%;
     border-collapse: collapse;
     margin: auto
}
.tr_a{
    text-align: center;
    padding-bottom: 4px;
    padding-top: 5px;
}
        
.tr_b{
    text-align: left;
    padding-bottom: 4px;
    padding-top: 5px;
}
.td_a{
    border: 1px solid;
    padding: 0px;
    text-align: center;

}
.input_width{
    width: 25px;
}
.el-textarea__inner{
    border-radius: 0px;
}
</style>