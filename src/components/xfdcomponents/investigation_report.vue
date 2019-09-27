<template>
    <div style="width:100%;height:480px;border:0px;">
        <router-link target="_blank" :to= "pdfdownload">
            <el-button type="mini" style="float:right;z-index:9999;position:relative;" @click="fetchData">下载此PDF文档</el-button>
        </router-link>
        <el-tabs v-model="choiceReport" type="card"  @tab-click= "handleClick">
            <el-tab-pane v-for="(report, key) in this.report_info"  label="调查报告" :name= "key.toString()" >
                <iframe  v-bind:srcdoc= "report" style="width:100%;height:400px;border:0px;margin-botom:50px;"></iframe>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import {fileDownload}from '@/api/DocManage/docmange'
import { async } from 'q'
export default {
    props:{
        menu_props:Object,
    },
    data(){
        return{
        report_info: [],
        choiceReport: 0,
        pdfdownload: {}
        }
    },
    mounted(){
        this.menu_props.businessNo.split("@").forEach(element => {
            let param = {
                fileId : element,
                flag : 'htmlReport'
            }
            fileDownload(param).then( async  response =>{
                const blob = new Blob([response],{type:"text/html"});//处理文档流
                //blob转file
                let res = await this.blob2file(blob)
                this.report_info.push(res)
            })
        });
    },
    methods:{
        blob2file(blob){
            return new Promise((resolve) => {
                var reader = new FileReader();
                let res = ''
                reader.readAsText(blob);
                reader.onload = function(){
                    //读取完成后，数据保存在对象的result属性中
                    res = new String(this.result)
                    resolve(res.replace("document.getElementById(\"jfwdLog\").style.display = \"none\";",""))
                }
            })
        },
        handleClick(tab, event) {
            console.log(this.choiceReport);
        },
        fetchData() {
            console.log("fileId========"+ this.menu_props.businessNo.split("@")[this.choiceReport] )
            // this.pdfdownload = {name:'pdfdownload',params: {pdfinfo:this.report_info[this.choiceReport]}}
            this.pdfdownload = {name:'pdfdownload',query: {fileId:this.menu_props.businessNo.split("@")[this.choiceReport]}}
        }   
    },
   
}
</script>