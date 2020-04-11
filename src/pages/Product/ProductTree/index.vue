<template>
    <div>
        <el-tree 
        :props="defaultProps"
        :load="loadTree"
        lazy
        highlight-current
         @node-click="handleNodeClick"
         >

        </el-tree>
    </div>
</template>
<script>
export default {
    name:"ProductTree",
    data() {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      };
    },
     methods: {
      handleNodeClick(data) {
        console.log(data);
        this.$emit("onTreeData",data)
      },
      loadTree(node,resolve){
          if(node.level ===0){
              this.$api.getSelectItemCategoryByParentId().then(res=>{
                  if(res.status===200){
                      return resolve(res.data.data)
                  }else{
                      alert("请求失败")
                  }
              })
          }
          if(node.level>=1){
              this.$api.getSelectItemCategoryByParentId({
                  id:node.data.cid
              }).then(res=>{
                   if(res.status===200){
                      return resolve(res.data.data)
                  }else{
                      alert("请求失败")
                  }
              }).catch(error=>{
                  resolve([])
              })
          }
      }
    }
}
</script>