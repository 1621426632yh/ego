<template>
    <div>
        <el-button v-show="addBtnShow" class="addBtn" type="primary" @click="addDialogVisible = true">添加{{category.name}}</el-button>
        <el-table :data="content" style="width:100%">
            <el-table-column show-overflow-tooltip prop="id" label="ID"></el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="标题"></el-table-column>
            <el-table-column show-overflow-tooltip prop="url" label="url地址"></el-table-column>
            <el-table-column show-overflow-tooltip prop="image" label="图片"></el-table-column>
             <el-table-column prop="updateProduct" label="操作" width="120" fixed="right">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        icon="el-icon-delete"
                        circle
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="添加内容"
            :visible="addDialogVisible"
            width="60%"
            :before-close="handleClose"> 
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="标题">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="URL地址">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item label="图片地址">
                    <el-input v-model="form.image"></el-input>
                </el-form-item>
            </el-form>
            <span>
                <el-button @click="addDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addDialogHandle">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:"ContentShow",
    inject:["reload"],
    data(){
        return{
            content:[],
            addDialogVisible:false,
            form:{},
            category:{},
            addBtnShow:false
        }
    },
    mounted(){
        this.$bus.$on("nav",msg=>{
            this.category=msg;
            this.addBtnShow=true
              this.$api.getSelectTbContentAllByCategoryId({
                  id:msg.pid
              }).then(res=>{
                  if(res.data.status===200){
                      this.content=res.data.data
                  }else{
                       this.content=[]
                  }
              })
        })
      
    },
    methods:{
        handleClose(){
            this.addDialogVisible=false
        },
        addDialogHandle(){
            this.$api.getInsertTbContent({
                pid:this.category.pid,
                name:this.form.name,
                url:this.form.url,
                image:this.form.image
            }).then(res=>{
                if(res.data.status===200){
                    this.addDialogVisible=false
                    this.reload()
                }else{
                    alert("添加失败")
                }
            })
        },
        handleDelete(index,row){
            this.$api.getDeleteContentByIds({
                id:row.id
            }).then(res =>{
                if(res.data.status === 200){


                    this.$api.getInsertTbContent({
                pid:this.category.pid,
                name:this.form.name,
                url:this.form.url,
                image:this.form.image
            }).then(res=>{
                if(res.data.status===200){
                    this.addDialogVisible=false
                    this.reload()
                }else{
                    alert("添加失败")
                }
            })


                }else{
                    alert("删除失败")
                }
            })
        }
    }
}
</script>
