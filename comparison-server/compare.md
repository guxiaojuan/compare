# 任务列表

## 后台(×)

### 构建package.json(×)

### 文件夹结构设计(×)

1. root：index.js,package.json(×)
2. webs(爬虫相关):(×)
3. node_modules(模块自动生成)(√)
4. configs:config.js(√)
5. test:覆盖测试(×)
6. pages:网页测试(×)

### 配置项(×)
用config模块返回配置数组，供其他模块调用，包括：
- mysql:用于mysql数据库连接
- msg:用于保存提示消息
- listen:用于监听配置

### 后台工作流程：

1. index.js

- Step 1 
> 包含需要的模块,有webs/crawler,configs/config,express,body-parser,mysql等
- Step 2
> 一些启动准备,包括错误捕捉、连接mysql数据库、请求解析、静态请求允许
- Step 3
> 路由设置（在请求接口中详细介绍）
- Step 4
> 监听端口

### 请求接口(×)
1. GET app.use(express.static('./')):
*	静态资源请求
2. GET "/",
*	根路径请求，仅用作检测服务是否启动
3. POST "/login",
*	说明：
>>		登录接口，
>>		请求参数：
>>		username : 用户名
>>		password : 密码
>>		返回结果:
>>		status : 0为失败,1为成功
>>		msg : 附加信息
*	流程：
>>		1. 获取请求数据
>>		2. 表单验证
>>		3. 查询用户，登录
4. POST "/search"
*	说明：
>>		搜索接口search
>>		请求参数：
>>		word : 查询关键词
>>		返回结果：
>>		status : 'ok'为成功，'failure'为失败
>>		msg : 错误时返回错误信息
>>		data : 成功时返回物品数据
*	流程：
>>		1. 获取关键词
>>		2. 验证
>>		3. 与爬虫接口通信，获取结果列表
>>		4. 返回结果
5. POST "/register"
*	说明：
>>		注册接口register
>>		请求参数：
>>		username : 用户名
>>		password : 密码
>>		email    : 邮件
>>		confirm  : 用于确认密码
>>		返回结果：
>>		status : 1为成功，0为失败
>>		msg : 附加信息
*	流程：
>>		1. 提取变量
>>		2. 表单验证
>>		3. 插入数据注册
>>		4. 返回结果

### 请求接口测试(×)

### 爬虫请求(×)
* 爬虫基于phantomjs,安装请使用如下代码：
    ```
      npm install phantomjs -g
    ```
* crawler.js用于爬虫调用，将淘宝、京东、当当等的接口统一起来，用child_process模块来进行子进程调用
* 函数wordToBuffer用于处理编码问题，将字符串硬编码为16进制，此为保留函数，由于可以使用`encodeURLcomponent`简单处理
* 函数getList用于调用子进程（TODO:用异步调用提高速度）
* 函数中`__dirname.split('\\').join('/')`一句，`__dirname`用于获取当前模板完整文件夹路径，为了兼容性，将`\`转化为`/`

#### 淘宝案例
1. 调用格式类似 `phantomjs taobao.js dota`
2. 用system.args获取参数,此中`dota`
3. 用`encodeURLcomponent`函数对关键词进行编码
4. 构造`url`,以便请求
5. 用page.open方法请求，并在加载完成后执行js脚本获取数据
6. 包装数据，返回

### 细致功能
1. 数据库设计(×)
2. 接口注释文档(√)
3. 表单验证(√)
- username （1）非空 （2）正则 /^([a-zA-Z0-9_]){6,}$/ （3）非全数字
- password （1）非空 （2）正则 /^([a-zA-Z0-9_]){6,}$/ 
- email    （1）非空 （2）正则 /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/
### 线程安全处理
1. 监听uncaughtException事件，做console处理

## 前台(×)

### 搜索框行为逻辑
1. 未搜索前：下面显示热门词和收藏词；
2. 点击后：下面内容消失但不实质删除；
3. 点击搜索后：删除下面内容，显示加载图片，加载完成后显示内容；
4. 分淘宝，京东和当当显示，一个对应一个按钮，高亮显示；
5. 再次搜索，返回步骤二；
6. 一个叉用于删除搜索词，仅做dom级别删除，不触发其他事件；