<template>
<div v-loading.fullscreen.lock= "fullscreenLoading" element-loading-text=" 加载PDF...." id="pdf">
    <iframe id="pdf" :srcdoc= "pdfinfo" style="width:100%;height:2000px;border:0px;margin-top:20px;margin-right:200px;margin-bottom:10px;" scrolling="auto"></iframe>
</div>
</template>
<script>
import {fileDownload}from '@/api/DocManage/docmange'
export default {
    data(){
        return{
            pdfinfo: '',
            fullscreenLoading : true,
            fileId: ''
        }
    },
    mounted() {
        this.fetchData()
    },
  methods: {
    fetchData() {
        console.log(this.$route.query.fileId)
        this.fileId = this.$route.query.fileId
        let param = {
                fileId : this.fileId,
                flag : 'htmlReport'
            }
        fileDownload(param).then( async  response =>{
            const blob = new Blob([response],{type:"text/html"});//处理文档流
            //blob转file
            let res = await this.blob2file(blob)
            this.pdfinfo = res
            console.log("wwwwwww"+JSON.stringify(this.pdfinfo))
            setTimeout(() => {
            this.fullscreenLoading = false
            this.$nextTick(() => {
                var mywindow = window.open('', '', 'height=2000px;,width=1000px');
                mywindow.document.write(this.pdfinfo)
                mywindow.print();
            })
            }, 3000)
        })
       
    },
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
  }
}
</script>

