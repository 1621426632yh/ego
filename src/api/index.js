import axios from "../utils/http"
import base from "./base"

const api={
    /*
    登录接口
    */
    getLogin(params){
       return axios.post(base.baseUrl+base.login,params);
    },

    /*
    商品查询*/

    getSelectTbItemAllByPage(params){
        return axios.get(base.baseUrl+base.selectTbItemAllByPage,{
            params:params
        })
    },

    getTotal(){
        return axios.get(base.baseUrl + base.total);
    },


    getSelectItemCategoryByParentId(params){
        return axios.get(base.baseUrl+base.selectItemCategoryByParentId,{
            params:params
        })
    },

    getInsertTbItem(params){
        return axios.get(base.baseUrl+base.insertTbItem,{
            params:params
        })
    },


    getDeleteItemById(params){
        return axios.get(base.baseUrl+base.deleteItemById,{
            params:params
        })
    },

    getPreUpdateItem(params){
        return axios.get(base.baseUrl+base.preUpdateItem,{
            params:params
        })
    },

    getUpdateTbItem(params){
        return axios.get(base.baseUrl+base.updateTbItem,{
            params:params
        })
    },


    getSelectItemParamAll(params){
        return axios.get(base.baseUrl+base.selectItemParamAll,{
            params:params
        })
    },

    getInsertItemParam(params){
        return axios.get(base.baseUrl+base.insertItemParam,{
            params:params
        })
    },

    getDeleteItemParamById(params){
        return axios.get(base.baseUrl+base.deleteItemParamById,{
            params:params
        })
    },

    getSelectContentCategoryByParentId(params){
        return axios.get(base.baseUrl+base.selectContentCategoryByParentId,{
            params:params
        })
    },

    getInsertContentCategory(params){
        return axios.get(base.baseUrl+base.insertContentCategory,{
            params:params
        })
    },

    getTotals(){
        return axios.get(base.baseUrl + base.totals);
    },

    getDeleteContentCategoryById(params){
        return axios.get(base.baseUrl+base.deleteContentCategoryById,{
            params:params
        })
    },

    getUpdateContentCategory(params){
        return axios.get(base.baseUrl+base.updateContentCategory,{
            params:params
        })
    },

    getSelectTbContentAllByCategoryId(params){
        return axios.get(base.baseUrl+base.selectTbContentAllByCategoryId,{
            params:params
        })
    },

    getInsertTbContent(params){
        return axios.get(base.baseUrl + base.insertTbContent,{
            params
        })
    },
    /**
     * 内容分类管理 内容删除
     */
    getDeleteContentByIds(params){
        return axios.get(base.baseUrl + base.deleteContentByIds,{
            params
        })
    }
}

export default api