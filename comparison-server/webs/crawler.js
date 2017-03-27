var exec = require('child_process').execSync;

function getList(word){
    //构造执行字符串
    var execs = [
        //'taobao.js',
        'jd.js',
        //'dangdang.js',
        //'amazon.js'
    ];
    var lists = [];
    //链接phantomjs获取结果
    for(var i=0;i<execs.length;i++)
    {
        var path = 'phantomjs '+
                   './webs/' +
                   execs[i] +
                   ' ' + word;
        var output = exec(path);
        var list = JSON.parse(output);
        lists = lists.concat(list);
    }
    return lists;
}

exports.getList = getList;