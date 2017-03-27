var system = require('system');
var page=require('webpage').create();
var word = '';
if(system.args.length <= 1){
    console.log('至少需要两个参数');
}else{
    //word = system.args[1];
    word=encodeURIComponent(system.args[1]);
}
//京东按照综合排序
var url="https://search.jd.com/Search?keyword="+word+"&enc=utf-8&wq="+word+"&psort=0";

page.open(url,function(status){
    if(status!='success'){
        console.log('fail');
        phantom.exit();
    }

    var product=page.evaluate(function(){
        var list=[];
        var itemUtils={
            //获取物品
            getItem:function(){
                return document.getElementsByClassName('gl-i-wrap');
            },
            //获取商品名称
            getTitle:function(item){
                var name=item.getElementsByClassName('p-name')[0].textContent.trim();
                var index=name.indexOf('\n');
                if(index === -1)
                    return name;

                return name.substring(0,index);
            },
            //获取商品价格
            getPrice:function(item){
                return item.getElementsByClassName('p-price')[0].textContent.trim();
            },
            //评论数
            getCommit:function(item){
                return item.getElementsByClassName('p-commit')[0].textContent.trim();
            }
        };

        var items=itemUtils.getItem();
        var len=items.length;
        for(var i=0;i<len;i++){
            var item=items[i];
            var title=itemUtils.getTitle(item);
            var price=itemUtils.getPrice(item);
            var commit=itemUtils.getCommit(item);

            var objItem={
                'title':title,
                'price':price,
                'commit':commit
            };
            list.push(objItem);
        }
        return list;
    });
    var listData=JSON.stringify(product);
    console.log(listData);
    phantom.exit();
})
