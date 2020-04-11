const express=require("express");
const router = express();
const SQLConnect = require('./SQLConnect')
const config = require('./config')
const jwt =require('jsonwebtoken')
const url = require('url')
const multer = require("multer")
const fs = require("fs")
router.post("/login",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const sql= "select * from user where username=? and password=?"
    var arr=[username,password];
    SQLConnect(sql,arr,result =>{
        if(result.length >0){
            const token=jwt.sign({
                username:username,
                password:password
            },config.jwtSecret);
            res.send({
                status:200,
                data:result,
                token:token
            })
        }else{
            res.send({
                status:500,
                msg:"用户名密码错误"
            })
        }
    })
})

/**商品查询 */
router.get("/backend/item/selectTbItemAllByPage",(req,res)=>{
    const page = url.parse(req.url,true).query.page || 1;
    const sql = "select * from project order by id desc limit 10 offset "+(page-1)*10;
    SQLConnect(sql,null,result=>{
        if(result.length>0){
            res.send({
                status:200,
                data:{
                    result:result
                }
            })
        }else{
            res.send({
                status:500,
                msg:"暂无数据"
            })
        }
    })
})


router.get("/total",(req,res)=>{
    const sql="SELECT COUNT (*) FROM project where id"
    SQLConnect(sql,null,result =>{
        console.log(result);
        if(result.length>0){
            res.send({
                status:200,
                result:result
            })
        }else{
            res.send({
                status:500,
                msg:"查询失败"
            })
        }
    })
})


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './mock/upload/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};
var uploadFolder = './mock/upload/';
createFolder(uploadFolder);
var upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), function (req, res, next) {
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.json({ res_code: '0', name: file.originalname, url: file.path });
});

/*类目选择
*/
router.get("/backend/itemCategory/selectItemCategoryByParentId",(req,res)=>{
    const id=url.parse(req.url,true).query.id || 1;
    const sql ="select * from category where id =?";
    var arr =[id];
    SQLConnect(sql,arr,result =>{
        if(result.length >0){
            res.send({
                status:200,
                data:result
            })
        }else{
            res.send({
                status:500,
                msg:"暂无数据"
            })
        }
    })
})


router.get("/backend/item/insertTbItem",(req,res)=>{
    var title = url.parse(req.url,true).query.title || "";
    var cid = url.parse(req.url,true).query.cid || "";
    var sellPoint = url.parse(req.url,true).query.sellPoint || "";
    var price = url.parse(req.url,true).query.price || "";
    var num = url.parse(req.url,true).query.numv || "";
    var desc = url.parse(req.url,true).query.desc || "";
    var image = url.parse(req.url,true).query.image || "";
    const sql = "insert into project values (null,?,?,?,?,?,?,'',1,'','',?)";
    var arr=[title,image,sellPoint,price,cid,num,desc];
    SQLConnect(sql,arr,result =>{
        if(result.affectedRows >0){
            res.send({ 
                status:200,
                success:true
            })
        }else{
            res.status(500).send({
                msg:"添加失败"
            })
        }
    })
})


router.get("/backend/item/deleteItemById",(req,res)=>{
    const id= url.parse(req.url,true).query.id;
    const sql ="delete from project where id=?"
    const arr = [id]
    SQLConnect(sql,arr,result=>{
        if(result.affectedRows >0){
            res.send({ 
                status:200,
                success:true
            })
        }else{
            res.status(500).send({
                msg:"添加失败"
            })
        }
    })
})


router.get("/backend/item/preUpdateItem",(req,res)=>{
    const id= url.parse(req.url,true).query.id;
    const sql ="select * from project where id=?";
    const arr =[id]
    SQLConnect(sql,arr,result =>{
        if(result.length>0){
            res.send({
                status:200,
                data:result[0]
            })
        }else{
            res.send({
                status:500,
                msg:"暂无数据"
            })
        }
    })
})



router.get("/backend/item/updateTbItem",(req,res)=>{
    var id = url.parse(req.url,true).query.id;
    var title = url.parse(req.url,true).query.title;
    var cid = url.parse(req.url,true).query.cid;
    var sellPoint = url.parse(req.url,true).query.sellPoint;
    var price = url.parse(req.url,true).query.price;
    var num = url.parse(req.url,true).query.numv;
    var desc = url.parse(req.url,true).query.desc;
    var image = url.parse(req.url,true).query.image;
    var sql="update project set title=?,image=?,sellPoint=?,price=?,cid=?,num=?,descs=? where id =?"
    var arr=[title,image,sellPoint,price,cid,num,desc,id];
    SQLConnect(sql,arr,result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                success:true
            })
        }else{
            res.send({
                status:500,
                msg:"修改失败"
            });
        }
    })
})


router.get("/backend/itemParam/selectItemParamAll",(req,res)=>{
    const page=url.parse(req.url,true).query.page || 1;
    const sql="select * from params order by id desc limit 10 offset "+(page-1)*10
    SQLConnect(sql,null,result =>{
        if(result.length>0){
            res.send({
                status:200,
                data:{
                    result:result
                }
            })
        }else{
            res.send({
                status:500,
                msg:"暂无数据"
            })
        }
    })
})

router.get('/backend/itemParam/insertItemParam',(req,res)=>{
    const itemCatId = url.parse(req.url,true).query.itemCatId
    const paramData = url.parse(req.url,true).query.paramData
    const sql = "insert into params values (null,?,?,'','')";
    const arr=[itemCatId,paramData]
    SQLConnect(sql,arr,result=>{
        if(result.affectedRows >0){
            res.send({ 
                status:200,
                success:true
            })
        }else{
            res.status(500).send({
                msg:"添加失败"
            })
        }
    })
})

router.get("/backend/itemParam/deleteItemParamById",(req,res)=>{
    const id = url.parse(req.url,true).query.id;
    const sql="delete from params where id=?";
    const arr =[id];
    SQLConnect(sql,arr,result =>{
        if(result.affectedRows >0){
            res.send({ 
                status:200,
                success:true
            })
        }else{
            res.status(500).send({
                msg:"删除失败"
            })
        }
    })
})


router.get("/content/selectContentCategoryByParentId",(req,res)=>{
    const id =url.parse(req.url,true).query.id || 1;
    const sql="select * from content where id=?";
    const arr=[id]
    SQLConnect(sql,arr,result=>{
        if(result.length>0){
            res.send({
                status:200,
                data:result
            })
        }else{
            res.send({
                status:500,
                msg:"暂无数据"
            })
        }
    })
})


router.get("/content/insertContentCategory",(req,res)=>{
    const pid =url.parse(req.url,true).query.pid;
    const name =url.parse(req.url,true).query.name;
    const currentId=Math.floor(Math.random()*100000);
    const sql="insert into content values (?,?,?)";
    const arr=[pid,name,currentId];
    SQLConnect(sql,arr,result=>{
        if(result.affectedRows >0){
            res.send({ 
                status:200,
                success:true
            })
        }else{
            res.status(500).send({
                msg:"添加失败"
            })
        }
    })
})

router.get("/totals",(req,res)=>{
    const sql="SELECT COUNT (*) FROM params where id"
    SQLConnect(sql,null,result =>{
        console.log(result);
        if(result.length>0){
            res.send({
                status:200,
                result:result
            })
        }else{
            res.send({
                status:500,
                msg:"查询失败"
            })
        }
    })
})

router.get('/content/deleteContentCategoryById',(req,res)=>{
    const id=url.parse(req.url,true).query.id;
    const sql ="delete from content where pid=?";
    const arr=[id];
    SQLConnect(sql,arr,result =>{
        if(result.affectedRows >0){
            res.send({ 
                status:200,
                success:true
            })
        }else{
            res.status(500).send({
                msg:"添加失败"
            })
        }
    })
})


router.get("/content/updateContentCategory",(req,res)=>{
    const id =url.parse(req.url,true).query.id;
    const name =url.parse(req.url,true).query.name;
    const sql="update content set name=? where pid=?"
    const arr =[name,id];
    SQLConnect(sql,arr,result=>{
        if(result.affectedRows >0){
            res.send({ 
                status:200,
                success:true
            })
        }else{
            res.status(500).send({
                msg:"修改失败"
            })
        }
    })
})


router.get("/content/selectTbContentAllByCategoryId",(req,res)=>{
    const id =url.parse(req.url,true).query.id;
    const sql="select * from contentinfo where pid=?"
    const arr =[id];
    SQLConnect(sql,arr,result =>{
        if(result.length>0){
            res.send({
                status:200,
                data:result
            })
        }else{
            res.send({
                status:500,
                msg:"暂无数据"
            })
        }
    })
})


router.get("/content/insertTbContent", (req, res) => {
    const pid = url.parse(req.url, true).query.pid;
    const name = url.parse(req.url, true).query.name;
    const httpurl = url.parse(req.url, true).query.url;
    const image = url.parse(req.url, true).query.image;
    const sql = 'insert into contentinfo values (null,?,?,?,?)';
    const arr = [pid, name, httpurl, image];
    SQLConnect(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                success: true
            })
        } else {
            res.status(500).send({
                msg: "添加失败"
            })
        }
    })
})

/**
 * 内容分类管理 内容删除
 */
router.get("/content/deleteContentByIds", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const sql = "delete from contentinfo where id=?"
    const arr = [id];
    SQLConnect(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                success: true
            })
        } else {
            res.status(500).send({
                msg: "删除失败"
            })
        }
    })
})
module.exports = router;