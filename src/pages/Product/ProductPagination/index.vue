<template>
    <div>
        <el-pagination
        background
        :current-page="currentPage"
        layout="prev,pager,next"
        :total="total"
        @current-change="currentChange"
        >
        </el-pagination>
    </div>
</template>
<script>
export default {
    name:"Pagination",
    data(){
        return{
            currentPage:1,
            total:0
        }
    },
    mounted(){
        this.$api.getTotal().then(res=>{
            // console.log(res.data.result[0]["COUNT (*)"])
            this.total=res.data.result[0]["COUNT (*)"]
        })
    },
    methods:{
        currentChange(currentPage){
            this.$emit("currentPageEvent",currentPage)
        }
    }
}
</script>