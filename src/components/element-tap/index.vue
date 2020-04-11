<template>

        <el-table :data="tableDate" style="width:100%">
        <slot></slot>
        </el-table>
</template>
<script>
export default {
    name:"ElementTable",
    props:{
        tableDate:{
            type:Array,
            default:()=>{
                return[]
            }
        }
    }
}
</script>