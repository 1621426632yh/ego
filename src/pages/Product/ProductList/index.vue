<template>
    <div class="product-list">
        <div>
            <el-button type="primary" @click="addProduct">添加商品</el-button>
        </div>
        <ElementTable :tableDate="tableDate">
        <el-table-column show-overflow-tooltip prop="id" label="商品id"></el-table-column>
        <el-table-column show-overflow-tooltip prop="title" label="商品名称"></el-table-column>
        <el-table-column show-overflow-tooltip prop="image" label="商品图片"></el-table-column>
        <el-table-column show-overflow-tooltip prop="sellPoint" label="商品卖点"></el-table-column>
        <el-table-column show-overflow-tooltip prop="price" label="商品价格"></el-table-column>
        <el-table-column show-overflow-tooltip prop="num" label="商品数量"></el-table-column>
        <el-table-column show-overflow-tooltip prop="descs" label="商品描述"></el-table-column>
         <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
        </ElementTable>
        <ProductPagination @currentPageEvent="getCurrentPageDate"/>
        <el-dialog
            title="添加产品"
            append-to-body
            :visible.sync="dialogAddProuctVisible"
            width="60%"
        >
        <el-dialog
        width="60%"
        title="商品类目"
        :visible.sync="dialogProductCategoryVisible"
        append-to-body
        >
        <ProductTree @onTreeData="getTreeData"/>
        <span>
            <el-button type="primary" @click="dialogProductCategoryVisible = false">确定</el-button>
        </span>
        </el-dialog>
            <el-form ref="form" :model="product" label-width="80px">
                <el-form-item label="商品类目">
                    <el-button style="float:left" type="primary" @click="productTree">选择类目</el-button>
                    <span style="float:left;margin-left:20px">{{treeData.name}}</span>
                </el-form-item>
            <el-form-item label="商品标题">
                <el-input v-model="product.title"></el-input>
            </el-form-item>
            <el-form-item label="商品卖点">
                <el-input v-model="product.sellPoint"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
                <el-input v-model="product.price"></el-input>
            </el-form-item>
            <el-form-item label="库存数量">
                <el-input v-model="product.num"></el-input>
            </el-form-item>
            <el-form-item label="上传图片">
                <el-button @click="uploadHandle" style="float:left" type="primary">上传图片</el-button>
                <span>{{ uploadImg.url }}</span>
                <el-dialog
                    title="上传图片"
                    :visible.sync="dialogUploadImgVisible"
                    width="40%"
                    append-to-body
                    :before-close="handleClose"
                >
                    <ProductUpLoad @onUpload="getUpload"/>
                    <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogUploadImgVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogUploadImgVisible = false">确 定</el-button>
                        </span>
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品描述">
                <ProductUEditor @onProductDesc="getProductDesc" />
            </el-form-item>
            </el-form>
            <el-button @click="dialogAddProductVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitProduct">提 交</el-button>
        </el-dialog>


         <el-dialog
            title="更新产品"
            append-to-body
            :visible.sync="dialogUpdateProuctVisible"
            width="60%"
        >
        <el-dialog
        width="60%"
        title="商品类目"
        :visible.sync="dialogProductCategoryVisible"
        append-to-body
        >
        <ProductTree @onTreeData="getTreeData"/>
        <span>
            <el-button type="primary" @click="dialogProductCategoryVisible = false">确定</el-button>
        </span>
        </el-dialog>

            <el-form ref="form" :model="updateProduct" label-width="80px">
                <el-form-item label="商品类目">
                    <el-button style="float:left" type="primary" @click="productTree">选择类目</el-button>
                    <span style="float:left;margin-left:20px">{{treeData.name}}</span>
                </el-form-item>
            <el-form-item label="商品标题">
                <el-input v-model="updateProduct.title"></el-input>
            </el-form-item>
            <el-form-item label="商品卖点">
                <el-input v-model="updateProduct.sellPoint"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
                <el-input v-model="updateProduct.price"></el-input>
            </el-form-item>
            <el-form-item label="库存数量">
                <el-input v-model="updateProduct.num"></el-input>
            </el-form-item>
            <el-form-item label="上传图片">
                <el-button @click="uploadHandle" style="float:left" type="primary">上传图片</el-button>
                <span>{{ uploadImg.url }}</span>
                <el-dialog
                    title="上传图片"
                    :visible.sync="dialogUploadImgVisible"
                    width="40%"
                    append-to-body
                    :before-close="handleClose"
                >
                    <ProductUpLoad @onUpload="getUpload"/>
                    <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogUploadImgVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogUploadImgVisible = false">确 定</el-button>
                        </span>
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品描述">
                <ProductUEditor @onProductDesc="getProductDesc" :updateProductDesc="updateProductDesc"/>
            </el-form-item>
            </el-form>
            <el-button @click="dialogUpdateProuctVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateProductHeadl">更 新</el-button>
        </el-dialog>
    </div>
</template>
<script>
import ElementTable from '../../../components/element-tap'
import ProductPagination from '../ProductPagination'
import ProductUEditor from "../ProductUEditor";
import ProductUpLoad from "../ProductUpload";
import ProductTree from '../ProductTree'
export default {
    name:"ProductList",
    data(){
        return{
            tableDate:[],
            page:1,
            dialogAddProuctVisible:false,
            dialogUploadImgVisible: false,
            dialogProductCategoryVisible:false,
            product:{},
            uploadImg:{},
            treeData:{},
            productDesc:"",
            updateProduct:{ },
            dialogUpdateProuctVisible:false,
            updateProductDesc:"",
            updateId:0
        }
    },
    components:{
        ElementTable,
        ProductPagination,
        ProductUEditor,
        ProductUpLoad,
        ProductTree
    },
    mounted(){
        this.http(this.page)
    },
    methods:{
        http(page){
            this.$api.getSelectTbItemAllByPage({
            page:page
        }).then(res=>{
            console.log(res.data)
            if(res.data.status==200){
                this.tableDate=res.data.data.result;
            }else{
                console.log("暂无数据")
            }
        })
        },
        getCurrentPageDate(page){
            this.http(page);
        },
        addProduct(){
            this.dialogAddProuctVisible=true
        },
        getProductDesc(desc) {
            this.productDesc=desc
        },
        /**
         * 上传图片
         */
        uploadHandle() {
            this.dialogUploadImgVisible = true;
        },
        handleClose() {
            this.dialogUploadImgVisible = false;
        },
        /**
         * 获取上传图片资源
         */
        getUpload(data){
            console.log(data)
            this.uploadImg = data;
        },

        productTree(data){
            this.dialogProductCategoryVisible=true
        },
        getTreeData(data){
            this.treeData=data
        },

        submitProduct(){
            this.$api.getInsertTbItem({
                title:this.product.title,
                cid:this.treeData.cid,
                sellPoint:this.product.sellPoint,
                price:this.product.price,
                num:this.product.num,
                desc:this.productDesc,
                image:this.uploadImg.url,
            }).then(res=>{
               if(res.data.status ===200){
                    this.http(this.page);
                    this.dialogAddProuctVisible=false
               }else{
                   alert("添加失败")
               }
            })
        },
        handleEdit(index,row){
            this.dialogUpdateProuctVisible=true;
            this.updateId=row.id
            this.$api.getPreUpdateItem({
                id:row.id
            }).then(res=>{
                
                this.updateProduct={
                    title:res.data.data.title,
                    num:res.data.data.num,
                    price:res.data.data.price,
                    sellPoint:res.data.data.sellPoint
                };
                this.uploadImg.url=res.data.data.image
                this.treeData.name=res.data.data.cid
                this.updateProductDesc=res.data.data.descs
            });
        },
        handleDelete(index,row){
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
               this.$api.getDeleteItemById({
                id:row.id
            }).then(res=>{
                if(res.data.status===200){
                    this.http(this.page);
                    this.$message({
            type: 'success',
            message: '删除成功!'
          });
                }else{
                    this.$message({
                type: 'info',
                message: '删除失败'
           }); 
                }
            })


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

         
        },
        updateProductHeadl(){
            this.$api.getUpdateTbItem({
                id:this.updateId,
                 title:this.updateProduct.title,
                cid:this.treeData.cid,
                sellPoint:this.updateProduct.sellPoint,
                price:this.updateProduct.price,
                num:this.updateProduct.num,
                desc:this.productDesc,
                image:this.uploadImg.url,
            }).then(res=>{
                if(res.data.status===200){
                    this.http(this.page);
                    this.dialogUpdateProuctVisible=false
                }else{
                    alert("修改失败")
                }
                console.log(res.data)
            })
        }
    }
}
</script>
<style scoped>
    .product-list {
    width: 1200px;
    margin: 0 auto;
    margin-top: 10px;
}
.upload-img {
    width: 200px;
    float: left;
    margin-left: 10px;
}
</style>