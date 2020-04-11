<template>
    <div>
        <el-tree
        :props="defaultProps"
        :load="loadTreeNodes"
        lazy
        highlight-current
        @node-click="handleNodeClick"
        :expand-on-click-node="false"
        :render-content="renderContent"
        >
        </el-tree>
        <el-dialog
        title="添加广告"
        :visible.sync="categoryVisible"
        width="30%"
        :before-close="handleClose"
        >
        <span>
            <el-input type="text" v-model="caregoryName" placeholder="请添加广告名"></el-input>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="categoryVisible=false" >取消</el-button>
            <el-button type="primary" @click="sureHandler" >确定</el-button>
        </span>
        </el-dialog>

        <el-dialog
         title="修改"
        :visible.sync="updateCategoryVisible"
        width="30%"
        :before-close="handleClose"
        >
         <span>
            <el-input type="text" v-model="updateCaregoryName" :placeholder="oldCaregoryName.name"></el-input>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="updateCategoryVisible=false" >取消</el-button>
            <el-button type="primary" @click="sureUpdateHandler" >确定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:"ContentNav",
    inject:["reload"],
    data(){
        return{
            defaultProps:{
                children:"children",
                label:"name"
            },
            categoryVisible:false,
            caregoryName:"",
            currentCategory:{},
            updateCategoryVisible:false,
            updateCaregoryName:"",
            oldCaregoryName:""
        }
    },
    mounted(){
      
    },
    methods:{
        loadTreeNodes(node,resolve){
            if(node.level===0){
                  this.$api.getSelectContentCategoryByParentId().then(res=>{
                     if(res.status===200){
                         return resolve(res.data.data)
                     }
            }).catch(error=>{
                resolve([])
            })
            }
            if(node.level>=1){
                 this.$api.getSelectContentCategoryByParentId({
                     id:node.data.pid
                 }).then(res=>{
                     if(res.status===200){
                         return resolve(res.data.data)
                     }
            }).catch(error=>{
                resolve([])
            })
            }
        },
        handleNodeClick(data){
            this.$bus.$emit('nav',data)
        },
        renderContent(h,{node,data,store}){
            return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>添加</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
              <el-button size="mini" type="text" on-click={ () => this.editor(node, data) }>修改</el-button>
            </span>
          </span>);
        },
        append(data){
            this.currentCategory=data
            this.categoryVisible=true
        },
        sureHandler(){
            this.$api.getInsertContentCategory({
                name:this.caregoryName,
                pid: this.currentCategory.pid
            }).then(res=>{
                if(res.data.status===200){
                    this.categoryVisible=false
                    this.reload();
                }else{
                    alert("添加失败")
                }
            })
        },
        remove(node,data){
            this.$confirm("是否永久删除文件,是否继续？","提示",{
                confirmButtonText:"确定",
                cancelButtonText:"取消",
                type:"warning",
                center:true
            }).then(()=>{
                this.$api.getDeleteContentCategoryById({
                    id:data.pid
                }).then(res=>{
                    if(res.data.status ===200){
                         this.$message({
                        type:'success',
                        message:"删除成功"
                });
                this.reload()
                    }else{
                         this.$message({
                        type:'error',
                     message:"删除失败"
                })
                    }
                })
            }).catch(()=>{
                this.$message({
                    type:'info',
                    message:"已取消删除"
                })
            })
        },
        editor(node,data){
            this.oldCaregoryName=data
            this.updateCategoryVisible=true
        },
        handleClose(){
            this.categoryVisible=false,
            this.updateCategoryVisible=false
        },
        sureUpdateHandler(){
            if(this.updateCaregoryName){
                  this.$api.getUpdateContentCategory({
                id:this.oldCaregoryName.pid,
                name:this.updateCaregoryName
            }).then(res=>{
                if(res.data.status===200){
                     this.$message({
                        type:'success',
                        message:"修改成功"
                 });
                 this.reload();
                }else{
                     this.$message({
                        type:'error',
                        message:"修改失败"
                });
                }
            })
            }else{
                alert("请输入数据")
            }
          
        }
    }
}
</script>