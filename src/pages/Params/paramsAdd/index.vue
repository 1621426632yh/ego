<template>
    <div>
        <el-button @click="addDomain">添加分组</el-button>
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" lebel-width="100px">
            <el-form-item
            v-for="(domain,index) in dynamicValidateForm.domains"
            :key="index"
            :label="'规格参数'+index"
            :prop="'domains'+index+'.value'"
            >
            <el-input v-model="domain.value" style="width:60%;margin-right:10px;"></el-input>
            <el-button @click.prevent="addjieshao(index)">添加规格参数</el-button>
            <el-button @click.prevent="removeDomain(domain)">删除</el-button>
            <div
            v-for="(item,index1) in dynamicValidateForm.domains[index].children"
            :key="index1"
            :label="'参数'+index1"
            :prop="'children.'+index1+'.childValue'"
            >
            <el-input v-model="item.childValue" style="width:60%;margin-right:10px;"></el-input>
            <el-button @click.prevent="removeChild(index,item)">删除</el-button>
            </div>
            </el-form-item>
            <el-form-iem>
                <el-button type="primary" @click="submitFrom('dynamicValidateForm')">提交</el-button>
                <el-button @click="resetFrom('dynamicValidateForm')">重置</el-button>
            </el-form-iem>
        </el-form>
    </div>
</template>
<script>
export default {
    name:"ParamsAdd",
    data(){
        return{
            dynamicValidateForm:{
                domains:[
                    {
                        value:'',
                        children:[
                           {
                                childValue:"",
                            value:""
                           }
                        ]
                    },
                ]
            }
        }
    },
    methods:{
        addDomain(){
            this.dynamicValidateForm.domains.push({
                value:"",
                children:[{
                    value:"",
                    children:[]
                }]
            })
        },
        addjieshao(index){
            this. dynamicValidateForm.domains[index].children.push({
                    childValue:"",
                    value:""
            })
        },
        removeChild(index,item){
            var num=this.dynamicValidateForm.domains[index].children.indexOf(item);
            if(num !==-1){
                this.dynamicValidateForm.domains[index].children.splice(num,1);
            }
        },

        removeDomain(item){
             var index=this.dynamicValidateForm.domains.indexOf(item);
             if(index !==-1){
                 this.dynamicValidateForm.domains.splice(index,1)
             }
        },
        submitFrom(data){
            this.$refs[data].validate(valid =>{
                if(valid){
                    this.$emit("onParamsAdd",JSON.stringify(this.dynamicValidateForm.domains))
                }else{
                    return false;
                }
            })
        },
        resetFrom(data){
            this.$refs[data].resetFilds();
        }
    }
}
</script>