var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var search=require('./webs/search');
var home=require('./webs/home');
var config=require('./config/config');

//错误处理，保证进程安全
process.on('uncaughtException', function (err) {
    console.log(err);
});

var client=mysql.createConnection(config.mysql);
client.connect();
var app = express();
//需要header中设置"Content-Type": "application/x-www-form-urlencoded"
//用于解析post请求 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('./'));

//首页
app.get('/',function(req,res){
    var homeData=home.getHomeList('http://m.smzdm.com/');
    if(homeData.data){
        res.send({
            list:homeData,
            status:'success'
        });
    }
    else{
        res.send({
            status:'failure',
            msg:'今天没有新的咨询可以推送'
        })
    }

})

/**
 * 登录接口login
 * 请求参数：
 *  username : 用户名
 *  password : 密码
 * 返回结果:
 *  status : 0为失败,1为成功
 *  msg : 附加信息
 */
app.post('/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var status = 0;
    var res1 = res;

    //表单非空验证
    if(!username || !password){
        res.send({status:status,msg:config.msg[0]}).end();
        return;
    }

    //查询用户
    var sql = "SELECT * FROM user WHERE username = '{username}' AND userpass = '{password}'";
    sql = sql.replace("{username}",username);
    sql = sql.replace("{password}",password);
    console.log(sql);
    client.query(sql,function(err,res,field){
        if(err){
            res.status(500);
            res.send({
                status : status,
                msg : config.msg[10]
            }).end();
            throw err;
            return;
        }
        //console.log(res.length);
        if(res.length>0)  status = 1;
        res1.send({status : status,msg:config.msg[9]}).end();
        return;
    });
});

//搜索
app.get('/search/:word',function(req,res){
    //从小程序，获取查询词
    var word = req.params.word;
    //验证不为空
    if(!word){
        res.send({status:'failure',msg:config.msg[8]}).end();
        return;
    }
    var itemList = search.getSearchList(word);
    console.log(itemList);

    res.send({
        list : itemList,
        status:'success'
    });

});

/**
 * 注册接口register
 * 请求参数：
 *  username : 用户名
 *  password : 密码
 *  confirm  : 用于确认密码
 * 返回结果：
 *  status : 1为成功，0为失败
 *  msg : 附加信息
 */
app.post('/register',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var confirm = req.body.confirm;
    var status = 0;
    var res1 = res;

    //非空判定
    if(!username || !password ){
        res.send({status:status,msg:config.msg[0]}).end();
        return;
    }
    //确认密码
    if(confirm != password){
        res.send({status:status,msg:config.msg[1]}).end();
        return;
    }

    //重复账号名判定
    var sqlRepeat = "SELECT * FROM user WHERE username = '"+ username+"'";
    //accoutRepeatSql = accoutRepeatSql.replace("{username}",username);
    console.log(sqlRepeat);
    client.query(sqlRepeat,function(err,res,field){
        if(err) throw err;
        if(res.length > 0){
            res1.send({status:status,msg:config.msg[3]}).end();
            return;
        }
    });
    //账号名和密码验证
    var accAndPwdReg = /^([a-zA-Z0-9_]){6,}$/ ;

    if(!accAndPwdReg.test(password)){
        res.send({status:status,msg:config.msg[5]}).end();
        return;
    }
    //执行数据库插入数据
    var sql = "INSERT INTO user(username,userpass) VALUES( "+"'"+username+"','"+password+"')";

    console.log(sql);
    client.query(sql,function(err,res,field){
        //if(err) throw err;
        if(res.affectedRows >0){
            status = 1;
        }
        res1.send({status : status,msg:config.msg[6]}).end();
        return;
    });
});

app.listen(config.listen.port);

console.log("listen "+config.listen.hostname+' on port '+config.listen.port);

