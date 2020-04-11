<template>
    <div class="params">
        <div>
            <el-button type="primary" @click="addParams">添加</el-button>
        </div>
        <ElementTap :tableDate="paramsData">
            <el-table-column show-overflow-tooltip prop="id" label="规格参数ID"></el-table-column>
            <el-table-column show-overflow-tooltip prop="itemCatId" label="分类ID"></el-table-column>
            <el-table-column show-overflow-tooltip prop="paramData" label="规格参数结构"></el-table-column>
            <el-table-column label="操作" width="120" fiexd="right">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </ElementTap>
        <ParamsPagination @currentPageEvent="getCurrentPageData"/>
        <el-dialog
        width="50%"
        title="商品类目选择"
        :visible.sync="paramsVisible"
        >
        <ParamsTree @onTreeData="getTreeData"/>
        <el-dialog
        append-to-body
        width="50%"
        title="添加分组" 
        :visible.sync="groupVisble"
        >
        <paramsAdd @onParamsAdd="getParamsAdd"/>
        </el-dialog>
        <div slot="footer" class="dialog-footer">
            <el-button @click="paramsVistble =false">取消</el-button>
            <el-button type="primary" @click="groupVisbleHandle">确定添加并分组</el-button> 
        </div>
        </el-dialog>
    </div>
</template>
<script>
import ElementTap from '../../../components/element-tap'
import ParamsTree from '../ParamsTree'
import paramsAdd from '../paramsAdd'
import ParamsPagination from "../ParamsPagination"
export default {
    name:"ParamsList",
    inject:["reload"],
    data(){
        return{
            paramsData:[],
            currentPage:1,
            paramsVisible:false,
            groupVisble:false,
            itemCatId:{},
            page:1
        }
    },
    components:{
        ElementTap,
        ParamsTree,
        paramsAdd,
        ParamsPagination
    },
    mounted(){
        this.http()
    },
    methods:{
   
        http(page){
                 this.$api.getSelectItemParamAll({
            page:this.currentPage
        }).then(res=>{
            if(res.data.status==200){
                console.log(res.data.data.result)
                this.paramsData=res.data.data.result
            }else{
                alert(res.data.msg)
            }
        })
        },
             getCurrentPageData(page){     
                //  console.log(page)  
                 this.http(page) 
        },
        addParams(){
            this.paramsVisible=true
        },
        getTreeData(data){
            this.itemCatId=data
        },
        groupVisbleHandle(){
            this.groupVisble=true;
        },
        getParamsAdd(data){
            // console.log(data)
           this.$api.getInsertItemParam({
               itemCatId:this.itemCatId.id,
               paramData:data
           }).then(res=>{
               if(res.data.status===200){
                   console.log(res.data);
                   this.paramsVisible=false
                   this.groupVisble=false
                   this.http()
            // this.reload()
               }else{
                   console.log(res.data.msg)
               }
           })
        },

        handleDelete(index,row){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             this.$api.getDeleteItemParamById({
                id:row.id
            }).then(res=>{
                if(res.data.status ===200){
                       this.$message({
                         type: 'success',
                        message: '删除成功!'
                     });
                    this.http();
            // this.reload()
                }else{
                       this.$message({
                     type: 'error',
                     message: res.data.msg
                   });
                }
            });

       
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
           
        },
        
    }
}
</script>
<style scoped>
.params{
    width: 1200px;
    margin: 0 auto;
    margin-top: 10px;
}
</style>