<template>
    <div class="block">
    <el-timeline>
        <el-timeline-item v-for="(item,index) in this.phaseOpnionList" :timestamp="item.beginTime" placement="top">
            <el-card>
                <el-row>
                <p>{{ item.phaseName}}-&nbsp签署人：{{item.userId}} 开始时间：{{item.beginTime}} 结束时间：{{item.endTime}} </p>
                <p>
                    <el-col :span="10"><span style="width:200px;">客户名称：{{customername}} </span></el-col>
                    <el-col :span="10"><span>处理意见：{{item.phaseOpinion}}</span></el-col>
                </p>
                
                </el-row>
            </el-card>
        </el-timeline-item>
       
    </el-timeline>
    </div>
</template>
<script>
import {queryOpinionByObjectno} from '@/api/WorkFlow/workflow'
import {Message} from 'element-ui'
export default {
    props:{
        menu_props:Object,
    },
    data(){
        return{
            objectno:'',
            phaseOpnionList:[],
            customername:''
        }
    },
    mounted(){
        this.objectno =  this.menu_props.objectNo
        this.customername = this.$store.getters.customername
        let params = {
            objectno: this.objectno
        }
        queryOpinionByObjectno(params).then(response =>{
            if (response.code == 'S') {
                console.log("res ===== "+ JSON.stringify(response))
                this.phaseOpnionList = response.phaseOpnionList
            } else {
                 Message(response.messages)
            }
        })
    },
    created(){
    }
}
</script>
<style>
.el-card__body {
    padding: 10px;
}
</style>